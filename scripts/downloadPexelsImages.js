import "dotenv/config";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();

const DESTINATIONS_FILE = path.join(ROOT, "destinations.json");
const IMAGES_DIR = path.join(ROOT, "public", "images", "pexels");

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

const START_INDEX = Number(process.env.START_INDEX || 0);
const LIMIT = Number(process.env.LIMIT || 10);
const OVERWRITE = process.env.OVERWRITE === "true";

const IMAGES_PER_DESTINATION = Number(
  process.env.IMAGES_PER_DESTINATION || 3
);

const CANDIDATES_PER_DESTINATION = Number(
  process.env.CANDIDATES_PER_DESTINATION || 40
);

// Best for your result cards + modal image
const OUTPUT_WIDTH = Number(process.env.OUTPUT_WIDTH || 1920);
const OUTPUT_HEIGHT = Number(process.env.OUTPUT_HEIGHT || 1080);

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

  return `${city} ${country} travel landscape landmark scenic architecture skyline nature no people`;
}

function looksLikePeoplePhoto(photo) {
  const text = `${photo.alt || ""} ${photo.url || ""}`.toLowerCase();

  return [
    "person",
    "people",
    "man",
    "woman",
    "girl",
    "boy",
    "tourist",
    "crowd",
    "portrait",
    "couple",
    "family",
    "human",
    "model",
    "selfie",
  ].some((word) => text.includes(word));
}

function scorePhoto(photo, index) {
  const ratio = photo.width / photo.height;
  const targetRatio = 16 / 9;
  const ratioPenalty = Math.abs(ratio - targetRatio);

  const megapixels = (photo.width * photo.height) / 1_000_000;

  let score = 0;

  // Keep Pexels' own ranking important
  score += (CANDIDATES_PER_DESTINATION - index) * 20;

  // Prefer close to 16:9
  score -= ratioPenalty * 80;

  // Prefer good resolution, but don't overdo it
  score += Math.min(megapixels, 12) * 5;

  if (photo.width >= 1920 && photo.height >= 1080) score += 50;

  if (looksLikePeoplePhoto(photo)) score -= 1000;

  return score;
}

async function searchPexels(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query
  )}&orientation=landscape&size=large&per_page=${CANDIDATES_PER_DESTINATION}`;

  const response = await fetch(url, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Pexels search failed: ${response.status}`);
  }

  const data = await response.json();

  return (data.photos || [])
    .filter((photo) => !looksLikePeoplePhoto(photo))
    .filter((photo) => photo.width >= OUTPUT_WIDTH)
    .filter((photo) => photo.height >= OUTPUT_HEIGHT)
    .sort((a, b) => scorePhoto(b) - scorePhoto(a))
    .slice(0, IMAGES_PER_DESTINATION);
}

async function downloadImage(url, outputPath) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Image download failed: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  await sharp(buffer)
    .resize(OUTPUT_WIDTH, OUTPUT_HEIGHT, {
      fit: "cover",
      position: "attention",
    })
    .jpeg({
      quality: 88,
      mozjpeg: true,
    })
    .toFile(outputPath);
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
  console.log(`Candidate images per destination: ${CANDIDATES_PER_DESTINATION}`);
  console.log(`Output size: ${OUTPUT_WIDTH}x${OUTPUT_HEIGHT}`);

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
        console.log(`No suitable images found for: ${query}`);
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
          photo.src.original ||
          photo.src.large2x ||
          photo.src.large ||
          photo.src.medium;

        await downloadImage(imageUrl, outputPath);

        console.log(`Saved: ${outputFileName}`);
        console.log(`Score: ${scorePhoto(photo).toFixed(2)}`);
        console.log(`Size: ${photo.width}x${photo.height}`);
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