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
