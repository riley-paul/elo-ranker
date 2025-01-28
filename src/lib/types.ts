import type { User, Session } from "astro:db";

export type UserSelect = typeof User.$inferSelect;
export type UserInsert = typeof User.$inferInsert;

export type SessionSelect = typeof Session.$inferSelect;
export type SessionInsert = typeof Session.$inferInsert;

export type Player = {
  id: string;
  name: string;
  rating: number; // Elo rating
};

export type Match = {
  playerA: string;
  playerB: string;
  result: "A" | "B" | "draw";
};
