import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const SOURCE_DIR = path.resolve("public/images");
const OUTPUT_DIR = path.resolve("public/images_webp");

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1280;
const WEBP_QUALITY = 82;

const supportedExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
]);

async function ensureOutputDirectory() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

async function getImageFiles() {
  const entries = await fs.readdir(SOURCE_DIR, {
    withFileTypes: true,
  });

  return entries
    .filter((entry) => {
      if (!entry.isFile()) return false;

      const extension = path.extname(entry.name).toLowerCase();
      return supportedExtensions.has(extension);
    })
    .map((entry) => entry.name);
}

async function optimizeImage(filename) {
  const inputPath = path.join(SOURCE_DIR, filename);
  const outputFilename = `${path.parse(filename).name}.webp`;
  const outputPath = path.join(OUTPUT_DIR, outputFilename);

  try {
    const result = await sharp(inputPath)
      .rotate()
      .resize({
        width: MAX_WIDTH,
        height: MAX_HEIGHT,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: WEBP_QUALITY,
        effort: 5,
      })
      .toFile(outputPath);

    const originalStats = await fs.stat(inputPath);
    const originalKB = Math.round(originalStats.size / 1024);
    const optimizedKB = Math.round(result.size / 1024);

    console.log(
      `✓ ${filename} → ${outputFilename} (${originalKB} KB → ${optimizedKB} KB)`
    );

    return {
      success: true,
      originalSize: originalStats.size,
      optimizedSize: result.size,
    };
  } catch (error) {
    console.error(`✗ Failed: ${filename}`);
    console.error(error.message);

    return {
      success: false,
      filename,
      error: error.message,
    };
  }
}

async function main() {
  await ensureOutputDirectory();

  const files = await getImageFiles();

  console.log(`Found ${files.length} images.`);
  console.log(`Source folder: ${SOURCE_DIR}`);
  console.log(`Output folder: ${OUTPUT_DIR}`);
  console.log("");

  const results = [];

  for (const filename of files) {
    results.push(await optimizeImage(filename));
  }

  const successful = results.filter((item) => item.success);
  const failed = results.filter((item) => !item.success);

  const originalTotal = successful.reduce(
    (sum, item) => sum + item.originalSize,
    0
  );

  const optimizedTotal = successful.reduce(
    (sum, item) => sum + item.optimizedSize,
    0
  );

  console.log("");
  console.log("Optimization complete.");
  console.log(`Successful: ${successful.length}`);
  console.log(`Failed: ${failed.length}`);
  console.log(
    `Original total: ${(originalTotal / 1024 / 1024).toFixed(2)} MB`
  );
  console.log(
    `Optimized total: ${(optimizedTotal / 1024 / 1024).toFixed(2)} MB`
  );

  if (originalTotal > 0) {
    const reduction =
      100 - (optimizedTotal / originalTotal) * 100;

    console.log(`Reduction: ${reduction.toFixed(1)}%`);
  }

  if (failed.length > 0) {
    console.log("");
    console.log("Failed files:");

    failed.forEach((item) => {
      console.log(`- ${item.filename}: ${item.error}`);
    });

    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("Optimization failed:", error);
  process.exit(1);
});