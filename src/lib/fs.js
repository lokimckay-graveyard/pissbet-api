import fs from "fs";

export const fileExists = (path) => {
  try {
    if (!path) return;
    return fs.existsSync(path);
  } catch (err) {
    console.error(err);
    return false;
  }
};
