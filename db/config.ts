import { column, defineDb, defineTable, NOW } from "astro:db";

const timestamps = {
  createdAt: column.text({ default: NOW }),
  updatedAt: column.text({ default: NOW }),
};

const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    lastActive: column.text({ default: NOW }),
    ...timestamps,
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
    Session,
    Category,
    Player,
    Comparisons,
  },
});
