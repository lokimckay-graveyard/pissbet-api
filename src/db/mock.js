import { getRandomAmount } from "../lib/random";

const playerTags = ["Weeb", "Joz", "JANGLIO", "SiqNiq"];
const participantUsernames = [
  "Loki",
  "ARI",
  "Shitashi",
  "Verse",
  "Omta",
  "Mabi",
  "miliscara",
  "Aidento",
  "Python",
  "squidfist",
  "Murke",
  "Churropon",
];

const matches = [
  // player_1_id, player_2_id, betting_open, winning_player_id
  [0, 1, null, null],
  [2, 3, 1, null],
  [1, 2, null, 1],
  [1, 2, null, 1],
  [1, 2, null, 1],
  [1, 2, null, 1],
  [1, 2, null, 1],
  [1, 2, null, 1],
];
const bets = [
  //participant_id, match_id, player_number, volume
  [0, 2, 1, getRandomAmount(100)],
  [1, 2, 2, getRandomAmount(100)],
  [2, 2, 1, getRandomAmount(100)],
  [3, 2, 1, getRandomAmount(100)],
  [4, 2, 2, getRandomAmount(100)],
  [5, 2, 2, getRandomAmount(100)],
  [1, 3, 2, 50],
  [1, 4, 1, 100],
  [0, 5, 2, 50],
  [0, 6, 1, 50],
  [0, 7, 2, 75],
];

export const mockPlayers = playerTags.map((tag, index) => [index, tag]);
export const mockParticipants = participantUsernames.map((username, index) => [
  index,
  username,
  getRandomAmount(1000),
]);
export const mockMatches = matches.map((data, index) => [index, ...data]);
export const mockBets = bets.map((data, index) => [index, ...data]);
