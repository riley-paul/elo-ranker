import { defineAction } from "astro:actions";
import { isAuthorized } from "./_utils";
import { Category, db, eq } from "astro:db";

export const getAll = defineAction({
  handler: async (_, c) => {
    const userId = isAuthorized(c).id;

    const categories = await db
      .select()
      .from(Category)
      .where(eq(Category.userId, userId));

    return categories;
  },
});
