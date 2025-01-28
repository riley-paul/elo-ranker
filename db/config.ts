import { column, defineDb, defineTable, NOW } from "astro:db";

const timestamps = {
  createdAt: column.text({ default: NOW }),
  updatedAt: column.text({ default: NOW }),
};

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    googleId: column.text(),
    name: column.text(),
    email: column.text(),
    password: column.text(),
    ...timestamps,
  },
});

const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text({ references: () => User.columns.id }),
    expiresAt: column.number(),
  },
});

const Category = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    sessionId: column.text({ references: () => Session.columns.id }),
    name: column.text(),
    ...timestamps,
  },
});

const Player = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    categoryId: column.text({ references: () => Category.columns.id }),
    name: column.text(),
    ...timestamps,
  },
});

const Comparisons = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    categoryId: column.text({ references: () => Category.columns.id }),
    playerAId: column.text({ references: () => Player.columns.id }),
    playerBId: column.text({ references: () => Player.columns.id }),
    winnerId: column.text({ references: () => Player.columns.id }),
    ...timestamps,
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    Session,
    Category,
    Player,
    Comparisons,
  },
});
