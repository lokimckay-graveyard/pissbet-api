import x from "sqlite3";
import { mockBets, mockMatches, mockParticipants, mockPlayers } from "./mock";
import { createTables, insertRows } from "./ops";
const sqlite3 = x.verbose();

const init = (db) => {
  createTables({ db });
};

const create = ({ devMode }) => {
  const dbPath = "pissmas-api.db";
  const dbPermissions = devMode
    ? sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
    : sqlite3.OPEN_READONLY | sqlite3.OPEN_CREATE;

  const dbInstance = new sqlite3.Database(dbPath, dbPermissions, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(`Connected to ${dbPath} database`);
  });

  if (devMode) {
    dbInstance.serialize(() => {
      init(dbInstance);
      mockPopulate(dbInstance);
    });
  }
  return dbInstance;
};

const mockPopulate = (db) => {
  insertRows({
    db,
    table: "players",
    columnNames: ["id", "tag"],
    records: mockPlayers,
  });

  insertRows({
    db,
    table: "participants",
    columnNames: ["id", "username", "balance"],
    records: mockParticipants,
  });

  insertRows({
    db,
    table: "matches",
    columnNames: [
      "id",
      "player_1_id",
      "player_2_id",
      "betting_open",
      "winning_player_id",
    ],
    records: mockMatches,
  });

  insertRows({
    db,
    table: "bets",
    columnNames: [
      "id",
      "participant_id",
      "match_id",
      "player_number",
      "volume",
    ],
    records: mockBets,
  });
};

export default create;
