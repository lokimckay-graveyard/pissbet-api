import { getRandomAmount } from "../lib/random";

const playerTags = ["Loki", "Ari", "Shitashi", "Verse", "Omta", "Mabi"];
const participantUsernames = ["Weeb", "Joz"];
const matches = [
  // player_1_id, player_2_id, betting_open, winning_player_id
  [0, 1, null, null],
  [2, 3, 1, null],
  [4, 5, null, 5],
];
const bets = [
  //participant_id, match_id, player_number, volume
  [0, 0, 1, getRandomAmount(100)],
  [1, 1, 1, getRandomAmount(100)],
];

export const mockPlayers = playerTags.map((tag, index) => [index, tag]);
export const mockParticipants = participantUsernames.map((username, index) => [
  index,
  username,
  getRandomAmount(1000),
]);
export const mockMatches = matches.map((data, index) => [index, ...data]);
export const mockBets = bets.map((data, index) => [index, ...data]);
