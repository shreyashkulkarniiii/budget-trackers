import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "..", "data");
const file = path.join(dataDir, "db.json");

function ensure() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive:true });
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({ users:[], transactions:[] }, null, 2));
}

export function readDB() {
  ensure();
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function writeDB(db) {
  ensure();
  fs.writeFileSync(file, JSON.stringify(db, null, 2));
}
