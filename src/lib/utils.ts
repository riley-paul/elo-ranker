import type { Match, Player } from "./types";

function calculateExpectedScore(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

function updateRating(
  playerRating: number,
  opponentRating: number,
  score: number, // 1 = win, 0.5 = draw, 0 = loss
  kFactor: number = 32 // Typical K-factor
): number {
  const expectedScore = calculateExpectedScore(playerRating, opponentRating);
  return playerRating + kFactor * (score - expectedScore);
}

export function updateEloRatings(players: Player[], matches: Match[]): Player[] {
  const playerMap = new Map(players.map((player) => [player.id, player]));

  matches.forEach(({ playerA, playerB, result }) => {
    const player1 = playerMap.get(playerA);
    const player2 = playerMap.get(playerB);

    if (!player1 || !player2) return; // Skip invalid matches

    const scoreA = result === "A" ? 1 : result === "draw" ? 0.5 : 0;
    const scoreB = 1 - scoreA;

    const newRatingA = updateRating(player1.rating, player2.rating, scoreA);
    const newRatingB = updateRating(player2.rating, player1.rating, scoreB);

    player1.rating = newRatingA;
    player2.rating = newRatingB;
  });

  return Array.from(playerMap.values()).sort((a, b) => b.rating - a.rating); // Sort by Elo descending
}
