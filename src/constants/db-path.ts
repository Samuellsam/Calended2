import path from "path";

const CURR_WORK_DIR = process.cwd();

export const DB_PATH = path.join(CURR_WORK_DIR, "data/db.json");
