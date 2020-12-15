import mri from "mri";
import { greet } from "./meta";
import server from "./server";
import db from "./db";

// CLI args
const argv = process.argv.slice(2);
const { port = 4000, d: devMode } = mri(argv);
greet({ port, devMode });

// Runtime
const dbInstance = db({ devMode });
server({ port, dbInstance });
