import { db, User, Session } from "astro:db";
import { eq } from "drizzle-orm";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import type { SessionSelect, UserSelect } from "../types";
import invariant from "tiny-invariant";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: string
): Promise<SessionSelect> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const [session] = await db
    .insert(Session)
    .values({
      id: sessionId,
      userId,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30,
    })
    .returning();

  invariant(session, "Failed to create session");
  return session;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const [result] = await db
    .select({ user: User, session: Session })
    .from(Session)
    .innerJoin(User, eq(Session.userId, User.id))
    .where(eq(Session.id, sessionId));

  if (!result) {
    return { session: null, user: null };
  }

  const { user, session } = result;

  // Session is expired
  if (Date.now() >= session.expiresAt) {
    await db.delete(Session).where(eq(Session.id, session.id));
    return { session: null, user: null };
  }

  // Session is about to expire
  if (Date.now() >= session.expiresAt - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 30;
    await db
      .update(Session)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(Session.id, session.id));
  }

  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(Session).where(eq(Session.id, sessionId));
}

export type SessionValidationResult =
  | { session: SessionSelect; user: UserSelect }
  | { session: null; user: null };
