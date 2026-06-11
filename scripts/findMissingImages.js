import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DESTINATIONS_FILE = path.join(ROOT, "destinations.json");
const IMAGES_DIR = path.join(ROOT, "public", "images");

const destinations = JSON.parse(fs.readFileSync(DESTINATIONS_FILE, "utf-8"));

const missing = [];

for (const destination of destinations) {
  if (!destination.image) continue;

  const fileName = destination.image.replace("/images/", "");
  const imagePath = path.join(IMAGES_DIR, fileName);

  if (!fs.existsSync(imagePath)) {
    missing.push({
      id: destination.id,
      city: destination.city,
      country: destination.country,
      image: fileName,
    });
  }
}

console.log(`Total destinations: ${destinations.length}`);
console.log(`Missing images: ${missing.length}`);

console.table(missing);

fs.writeFileSync(
  path.join(ROOT, "missing-images.json"),
  JSON.stringify(missing, null, 2),
  "utf-8"
);

console.log("Saved missing list to missing-images.json");