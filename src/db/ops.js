import Logger from "../lib/logger";

const handleError = ({ reject, error }) => {
  console.error(error);
  reject(error);
};

export const insertRows = ({ db, table, records, columnNames }) => {
  return new Promise((resolve, reject) => {
    const placeholder = `(${columnNames.map(() => "?").join(", ")})`;
    const columnString = `(${columnNames.join(", ")})`;
    const query = `INSERT INTO ${table} ${columnString} VALUES ${placeholder}`;
    const statement = db.prepare(query);

    records.forEach((record) => {
      statement.run(record, (error) => {
        if (error) handleError({ reject, error });
      });
    });

    statement.finalize();
    resolve();
  });
};

export const selectAll = ({ db, table }) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${table}`;
    const results = [];
    db.each(
      query,
      (error, row) => {
        if (error) handleError({ reject, error });
        results.push(row);
      },
      (error, rowCount) => {
        if (error) handleError({ reject, error });
        Logger.log(`[DB] Selected ${rowCount} rows from ${table}`);
        resolve(results);
      }
    );
  });
};

export const selectById = ({ db, table, id }) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${table} WHERE id=${id}`;
    db.get(query, (error, row) => {
      if (error) handleError({ reject, error });
      Logger.log(`[DB] Selected entry #${id} from ${table}`);
      resolve(row);
    });
  });
};

export const selectOrderedByField = ({
  db,
  table,
  count,
  offset,
  orderBy,
  direction,
}) => {
  return new Promise((resolve, reject) => {
    const query = [
      `SELECT * FROM ${table}`,
      orderBy && `ORDER BY ${orderBy}${direction ? ` ${direction}` : ""}`,
      count && `LIMIT ${count}`,
      offset && `OFFSET ${offset}`,
    ]
      .filter(Boolean)
      .join(" ");
    const results = [];
    db.each(
      query,
      (error, row) => {
        if (error) handleError({ reject, error });
        results.push(row);
      },
      (error, rowCount) => {
        if (error) handleError({ reject, error });
        Logger.log(`[DB] Selected ${rowCount} rows from ${table}`);
        resolve(results);
      }
    );
  });
};

export const selectCount = ({ db, table }) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) FROM ${table}`;
    db.get(query, (error, row) => {
      if (error) handleError({ reject, error });
      Logger.log(`[DB] Counted entries in ${table}`);
      resolve(row);
    });
  });
};

export const createTables = ({ db }) => {
  // id === discord id
  db.run(`
            CREATE TABLE IF NOT EXISTS participants (
                id TEXT PRIMARY KEY NOT NULL,
                username TEXT NOT NULL,
                balance INT NOT NULL CHECK (balance >= 0)
            )
        `);
  // id === seed
  db.run(`
            CREATE TABLE IF NOT EXISTS players (
                id INTEGER PRIMARY KEY NOT NULL,
                tag TEXT NOT NULL UNIQUE
            )
        `);

  db.run(`
            CREATE TABLE IF NOT EXISTS matches (
                id INTEGER PRIMARY KEY NOT NULL,
                player_1_id INT NOT NULL,
                player_2_id INT NOT NULL,
                betting_open INT CHECK (betting_open = 1) UNIQUE,
                winning_player_id INT,

                CONSTRAINT ck_player_1_id_lt_player_2_id CHECK (player_1_id < player_2_id),
                CONSTRAINT ck_winning_player_id_in_ids CHECK (winning_player_id IN (player_1_id, player_2_id)),
                CONSTRAINT ck_if_betting_open_winning_player_id_isnull CHECK (betting_open ISNULL OR (betting_open = 1 AND winning_player_id ISNULL)),

                FOREIGN KEY (player_1_id) REFERENCES players (id),
                FOREIGN KEY (player_2_id) REFERENCES players (id)
            )
        `);

  db.run(`
            CREATE TABLE IF NOT EXISTS bets (
                id INTEGER PRIMARY KEY NOT NULL,
                participant_id TEXT NOT NULL,
                match_id INT NOT NULL,
                player_number INT NOT NULL CHECK (player_number IN (1, 2)),
                volume INT NOT NULL CHECK (volume > 0),

                UNIQUE (participant_id, match_id),
                FOREIGN KEY (participant_id) REFERENCES participants (id),
                FOREIGN KEY (match_id) REFERENCES matches (id)
            )
        `);

  Logger.log("[DB] Created tables");
};
