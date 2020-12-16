import mri from "mri";
import { greet } from "./meta";
import server from "./server";
import db from "./db";

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
greet({ domain, port, url, path, playground, devMode });

// Runtime
const dbPath = devMode ? "pissmas-api.db" : path;
const dbInstance = db({ devMode, dbPath });
server({ domain, port, url, dbInstance, playground });
