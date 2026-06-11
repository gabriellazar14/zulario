import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const DESTINATIONS_FILE = path.join(ROOT, "destinations.json");
const IMAGES_DIR = path.join(ROOT, "public", "images");

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

const START_INDEX = Number(process.env.START_INDEX || 0);
const LIMIT = Number(process.env.LIMIT || 10);
const OVERWRITE = process.env.OVERWRITE === "true";
const IMAGES_PER_DESTINATION = Number(process.env.IMAGES_PER_DESTINATION || 3);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getBaseName(imagePath) {
  const fileName = imagePath.replace("/images/", "").replace(/^\/+/, "");
  return fileName.replace(/\.[^/.]+$/, "");
}

function buildSearchQuery(destination) {
  const city = destination.city || destination.name || destination.id || "";
  const country = destination.country || "";

  return `${city} ${country} travel landscape`;
}

async function searchPexels(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query
  )}&orientation=landscape&per_page=${IMAGES_PER_DESTINATION}`;

  const response = await fetch(url, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Pexels search failed: ${response.status}`);
  }

  const data = await response.json();

  return data.photos || [];
}

async function downloadImage(url, outputPath) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Image download failed: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
}

async function main() {
  if (!PEXELS_API_KEY) {
    throw new Error("Missing PEXELS_API_KEY");
  }

  if (!fs.existsSync(DESTINATIONS_FILE)) {
    throw new Error(`Missing destinations.json at ${DESTINATIONS_FILE}`);
  }

  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const destinations = JSON.parse(
    fs.readFileSync(DESTINATIONS_FILE, "utf-8")
  );

  const batch = destinations.slice(START_INDEX, START_INDEX + LIMIT);

  console.log(`Total destinations: ${destinations.length}`);
  console.log(
    `Downloading destinations from index ${START_INDEX} to ${
      START_INDEX + batch.length - 1
    }`
  );
  console.log(`Images per destination: ${IMAGES_PER_DESTINATION}`);

  for (let i = 0; i < batch.length; i++) {
    const destination = batch[i];

    if (!destination.image) {
      console.log(`Skipping ${destination.id || i}: missing image path`);
      continue;
    }

    const baseName = getBaseName(destination.image);
    const query = buildSearchQuery(destination);

    try {
      console.log(`\nSearching: ${query}`);

      const photos = await searchPexels(query);

      if (!photos.length) {
        console.log(`No images found for: ${query}`);
        continue;
      }

      for (let p = 0; p < photos.length; p++) {
        const photo = photos[p];

        const outputFileName =
  IMAGES_PER_DESTINATION === 1
    ? `${baseName}.jpg`
    : `${baseName}_${p + 1}.jpg`;
        const outputPath = path.join(IMAGES_DIR, outputFileName);

        if (!OVERWRITE && fs.existsSync(outputPath)) {
          console.log(`Skipping existing: ${outputFileName}`);
          continue;
        }

        const imageUrl =
          photo.src.large2x ||
          photo.src.large ||
          photo.src.original ||
          photo.src.medium;

        await downloadImage(imageUrl, outputPath);

        console.log(`Saved: ${outputFileName}`);
        console.log(`Credit: ${photo.photographer} - ${photo.url}`);

        await sleep(500);
      }

      await sleep(1000);
    } catch (error) {
      console.error(
        `Failed for ${destination.id || baseName}:`,
        error.message
      );
    }
  }

  console.log("\nDone.");
}

main();