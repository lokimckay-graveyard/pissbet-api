import mri from "mri";
import { greet } from "./meta";
import server from "./server";
import db from "./db";
import Logger from "./lib/logger";

// CLI args
const argv = process.argv.slice(2);
const {
  domain = "localhost",
  port = 4000,
  path = "pissmas.db",
  url = "/graphql",
  d: devMode = false,
  p: playground = false,
} = mri(argv);

const dbPath = devMode ? "pissmas-api.db" : path;
greet({ domain, port, url, path: dbPath, playground, devMode });
Logger.setDevMode(devMode);

// Runtime
const dbInstance = db({ devMode, dbPath });
server({ domain, port, url, dbInstance, playground });
