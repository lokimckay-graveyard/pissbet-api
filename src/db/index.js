import x from "sqlite3";
import { mockBets, mockMatches, mockParticipants, mockPlayers } from "./mock";
import { createTables, insertRows } from "./ops";
import { fileExists } from "../lib/fs";
const sqlite3 = x.verbose();

const init = ({ devMode, dbPath: _dbPath }) => {
  const dbPath = devMode ? "pissmas-api.db" : _dbPath;
  const dbPermissions = devMode
    ? sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
    : sqlite3.OPEN_READONLY;

  const dbInstance = new sqlite3.Database(dbPath, dbPermissions, (err) => {
    if (err) {
      console.error(err);
      process.exit();
    }
    console.log(`Connected to ${dbPath} database`);
  });

  if (devMode) {
    dbInstance.serialize(() => {
      createTables({ db: dbInstance });
      if (!fileExists(dbPath)) mockPopulate(dbInstance);
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

export default init;
