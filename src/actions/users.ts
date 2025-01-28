import { defineAction } from "astro:actions";

export const getMe = defineAction({
  handler: async (_, c) => {
    return c.locals.user;
  },
});
