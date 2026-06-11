import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ROOT = process.cwd();
const DESTINATIONS_FILE = path.join(ROOT, "destinations.json");
const IMAGES_DIR = path.join(ROOT, "public", "images");

const START_INDEX = Number(process.env.START_INDEX || 0);
const LIMIT = Number(process.env.LIMIT || 10);
const OVERWRITE = process.env.OVERWRITE === "true";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getImageFileName(imagePath) {
  return imagePath.replace("/images/", "").replace(/^\/+/, "");
}

function buildPrompt(destination) {
  const city = destination.city || destination.name || "travel destination";
  const country = destination.country || "";
  const types = destination.destination_types?.join(", ") || "";
  const tags = destination.tags?.slice(0, 8).join(", ") || "";
  const mood =
    destination.sensory_profile?.dominant_mood ||
    destination.destination_dna?.travel_feeling ||
    "";

  return `
Create a premium cinematic travel photography image of ${city}, ${country}.

Visual style:
- realistic travel photography
- cinematic dramatic natural light
- vibrant but believable colors
- premium editorial travel magazine look
- wide landscape composition
- no text
- no logo
- no watermark
- no people posing for camera
- no collage
- no UI elements

Destination feeling:
${mood}

Destination type:
${types}

Important atmosphere keywords:
${tags}

The image should feel emotionally immersive, beautiful, realistic, and suitable for a modern travel discovery website hero card.
`;
}

async function generateImage(destination, index) {
  const imagePath = destination.image;

  if (!imagePath) {
    console.log(`Skipping ${destination.id || index}: missing image path`);
    return;
  }

  const fileName = getImageFileName(imagePath);
  const outputPath = path.join(IMAGES_DIR, fileName);

  if (!OVERWRITE && fs.existsSync(outputPath)) {
    console.log(`Skipping existing: ${fileName}`);
    return;
  }

  const prompt = buildPrompt(destination);

  console.log(`Generating ${index + 1}: ${fileName}`);

  const result = await openai.images.generate({
    model: "gpt-image-2",
    prompt,
    size: "1536x1024",
    quality: "medium",
    output_format: "jpeg",
  });

  const imageBase64 = result.data[0].b64_json;
  const imageBytes = Buffer.from(imageBase64, "base64");

  fs.writeFileSync(outputPath, imageBytes);

  console.log(`Saved: ${outputPath}`);
}

async function main() {
  if (!fs.existsSync(DESTINATIONS_FILE)) {
    throw new Error(`Missing destinations.json at: ${DESTINATIONS_FILE}`);
  }

  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const destinations = JSON.parse(
    fs.readFileSync(DESTINATIONS_FILE, "utf-8")
  );

  const batch = destinations.slice(START_INDEX, START_INDEX + LIMIT);

  console.log(`Total destinations: ${destinations.length}`);
  console.log(`Generating from index ${START_INDEX} to ${START_INDEX + batch.length - 1}`);

  for (let i = 0; i < batch.length; i++) {
    const destination = batch[i];

    try {
      await generateImage(destination, START_INDEX + i);
      await sleep(1500);
    } catch (error) {
      console.error(
        `Failed for ${destination.id || destination.city || i}:`,
        error.message
      );
    }
  }

  console.log("Done.");
}

main();