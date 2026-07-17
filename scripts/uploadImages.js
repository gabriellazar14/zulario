import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const BUCKET_NAME = "zulario_images";
const IMAGE_DIR = path.resolve("public/images_webp");
const DESTINATIONS_FILE = path.resolve("destinations.json");

if (!SUPABASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL is missing from .env.local"
  );
}

if (!SERVICE_ROLE_KEY) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY is missing from .env.local"
  );
}

const supabase = createClient(
  SUPABASE_URL,
  SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

async function getWebpFiles() {
  const entries = await fs.readdir(IMAGE_DIR, {
    withFileTypes: true,
  });

  return entries
    .filter(
      (entry) =>
        entry.isFile() &&
        path.extname(entry.name).toLowerCase() === ".webp"
    )
    .map((entry) => entry.name)
    .sort();
}

async function uploadImage(filename) {
  const localPath = path.join(IMAGE_DIR, filename);
  const fileBuffer = await fs.readFile(localPath);

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filename, fileBuffer, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filename);

  if (!data?.publicUrl) {
    throw new Error(
      `Could not generate public URL for ${filename}`
    );
  }

  return data.publicUrl;
}

async function updateDestinations(imageUrls) {
  const raw = await fs.readFile(
    DESTINATIONS_FILE,
    "utf8"
  );

  const destinations = JSON.parse(raw);

  let updatedCount = 0;
  const missingImages = [];

  const updatedDestinations = destinations.map(
    (destination) => {
      const currentImage = destination.image || "";
      const oldFilename = path.basename(currentImage);
      const imageName = path.parse(oldFilename).name;
      const webpFilename = `${imageName}.webp`;
      const publicUrl = imageUrls.get(webpFilename);

      if (!publicUrl) {
        missingImages.push({
          id: destination.id,
          city: destination.city,
          expected: webpFilename,
        });

        return destination;
      }

      updatedCount += 1;

      return {
        ...destination,
        image: publicUrl,
      };
    }
  );

  const backupPath = path.resolve(
    `destinations.backup-${Date.now()}.json`
  );

  await fs.copyFile(
    DESTINATIONS_FILE,
    backupPath
  );

  await fs.writeFile(
    DESTINATIONS_FILE,
    JSON.stringify(updatedDestinations, null, 2),
    "utf8"
  );

  console.log("");
  console.log(`Updated destinations: ${updatedCount}`);
  console.log(`Backup created: ${backupPath}`);

  if (missingImages.length > 0) {
    console.log("");
    console.log(
      `Destinations without matching images: ${missingImages.length}`
    );

    missingImages.forEach((item) => {
      console.log(
        `- ${item.city} (${item.id}) → ${item.expected}`
      );
    });
  }

  return {
    updatedCount,
    missingImages,
  };
}

async function main() {
  const files = await getWebpFiles();

  console.log(`Bucket: ${BUCKET_NAME}`);
  console.log(`Images found: ${files.length}`);
  console.log("");

  const imageUrls = new Map();
  const failedUploads = [];

  for (let index = 0; index < files.length; index += 1) {
    const filename = files[index];

    try {
      const publicUrl = await uploadImage(filename);
      imageUrls.set(filename, publicUrl);

      console.log(
        `✓ ${index + 1}/${files.length}: ${filename}`
      );
    } catch (error) {
      failedUploads.push({
        filename,
        error: error.message,
      });

      console.error(
        `✗ ${index + 1}/${files.length}: ` +
          `${filename} — ${error.message}`
      );
    }
  }

  console.log("");
  console.log(`Uploaded: ${imageUrls.size}`);
  console.log(`Failed: ${failedUploads.length}`);

  if (imageUrls.size === 0) {
    throw new Error(
      "No images were uploaded. destinations.json was not changed."
    );
  }

  await updateDestinations(imageUrls);

  if (failedUploads.length > 0) {
    console.log("");
    console.log("Failed uploads:");

    failedUploads.forEach((item) => {
      console.log(
        `- ${item.filename}: ${item.error}`
      );
    });

    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("Upload script failed:", error);
  process.exit(1);
});