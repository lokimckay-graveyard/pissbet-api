import mri from "mri";
import { greet } from "./meta";
import server from "./server";
import db from "./db";

// CLI args
const argv = process.argv.slice(2);
const {
  port = 4000,
  path = "/graphql",
  d: devMode = false,
  p: playground = false,
} = mri(argv);
greet({ port, path, playground, devMode });

// Runtime
const dbPath = devMode ? "pissmas-api.db" : "pissmas.db";
const dbInstance = db({ devMode, dbPath });
server({ port, path, dbInstance, playground });
