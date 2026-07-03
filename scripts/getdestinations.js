import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const destinations = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../destinations.json"),
    "utf8"
  )
);

destinations.forEach((d, index) => {
  const name = path.basename(d.image, path.extname(d.image));
  console.log(`${index + 1}. ${name}`);
});