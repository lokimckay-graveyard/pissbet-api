import mri from "mri";
import { greet } from "./meta";
import server from "./server";
import db from "./db";

// CLI args
const argv = process.argv.slice(2);
const { port = 4000, path: dbPath = "pissmas.db", d: devMode = false } = mri(
  argv
);
greet({ port, dbPath, devMode });

// Runtime
const dbInstance = db({ devMode, dbPath });
server({ port, dbInstance });
