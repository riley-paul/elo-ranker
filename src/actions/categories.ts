import { defineAction } from "astro:actions";
import { isAuthorized } from "./_utils";
import { Category, db, eq } from "astro:db";
import { z } from "zod";
import { v4 as uuid } from "uuid";

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

export const create = defineAction({
  input: z.object({
    name: z.string(),
  }),
  handler: async (input, c) => {
    const userId = isAuthorized(c).id;

    const [category] = await db
      .insert(Category)
      .values({ id: uuid(), userId, name: input.name })
      .returning();

    return category;
  },
});
