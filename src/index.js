import mri from "mri";
import { greet } from "./meta";
import server from "./server";
import db from "./db";

// CLI args
const argv = process.argv.slice(2);
const { port = 4000, path, d: devMode = false, p: playground = false } = mri(
  argv
);
const dbPath = path || (devMode ? "pissmas-api.db" : "pissmas.db");
greet({ port, path: dbPath, playground, devMode });

// Runtime
const dbInstance = db({ devMode, dbPath });
server({ port, dbInstance, playground });
