import { invalidateSession, deleteSessionTokenCookie } from "@/lib/auth";

import type { APIRoute } from "astro";

export const POST: APIRoute = async (context) => {
  if (context.locals.session === null) {
    return new Response(null, {
      status: 401,
    });
  }
  await invalidateSession(context.locals.session.id);
  deleteSessionTokenCookie(context);
  return context.redirect("/login");
};
