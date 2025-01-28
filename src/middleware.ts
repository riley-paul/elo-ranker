import {
  validateSessionToken,
  setSessionTokenCookie,
  deleteSessionTokenCookie,
} from "@/lib/auth";
import { defineMiddleware, sequence } from "astro:middleware";

const userValidation = defineMiddleware(async (context, next) => {
  const token = context.cookies.get("session")?.value ?? null;

  if (token === null) {
    context.locals.user = null;
    context.locals.session = null;
    return next();
  }

  const { session, user } = await validateSessionToken(token);

  if (session !== null) {
    setSessionTokenCookie(context, token, session.expiresAt);
  } else {
    deleteSessionTokenCookie(context);
  }

  context.locals.session = session;
  context.locals.user = user;
  return next();
});

const WHITE_LIST = ["/welcome", "/login", "/test"];
const routeGuarding = defineMiddleware(async (context, next) => {
  const isWhiteListed = WHITE_LIST.some((path) =>
    context.url.pathname.startsWith(path)
  );
  if (!isWhiteListed && !context.locals.user) {
    return context.redirect("/welcome");
  }
  return next();
});

export const onRequest = sequence(userValidation, routeGuarding);
