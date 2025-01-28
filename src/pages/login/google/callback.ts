import {
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
  google,
  getGoogleUser,
} from "@/lib/auth";
import { OAuth2RequestError } from "arctic";
import { v4 as uuid } from "uuid";

import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";
import invariant from "tiny-invariant";

export async function GET(context: APIContext): Promise<Response> {
  const code = context.url.searchParams.get("code");
  const state = context.url.searchParams.get("state");
  const storedState = context.cookies.get("google_oauth_state")?.value ?? null;
  const storedVerifier =
    context.cookies.get("google_oauth_code_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    !storedVerifier ||
    state !== storedState
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, storedVerifier);

    const googleUser = await getGoogleUser(tokens.accessToken());

    const existingUser = await db
      .select()
      .from(User)
      .where(eq(User.email, googleUser.email))
      .then((rows) => rows[0]);

    if (existingUser) {
      await db
        .update(User)
        .set({ googleId: googleUser.id })
        .where(eq(User.id, existingUser.id));
      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, existingUser.id);
      setSessionTokenCookie(context, sessionToken, session.expiresAt);
      return context.redirect("/");
    }

    // add user to database
    const [user] = await db
      .insert(User)
      .values({
        id: uuid(),
        email: googleUser.email,
        googleId: googleUser.id,
        name: googleUser.name,
        avatarUrl: googleUser.picture,
      })
      .returning();
    invariant(user, "Failed to create user");

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    setSessionTokenCookie(context, sessionToken, session.expiresAt);
    return context.redirect("/");
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
