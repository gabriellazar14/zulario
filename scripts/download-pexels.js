import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const DESTINATIONS_FILE = path.join(ROOT, "destinations.json");

const IMAGE_SUBFOLDER = process.env.IMAGE_SUBFOLDER || "images/pexels";
const IMAGES_DIR = path.join(ROOT, "public", ...IMAGE_SUBFOLDER.split("/"));

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

const START_INDEX = Number(process.env.START_INDEX || 0);
const LIMIT = Number(process.env.LIMIT || 10);
const OVERWRITE = process.env.OVERWRITE === "true";

const IMAGES_PER_DESTINATION = Number(process.env.IMAGES_PER_DESTINATION || 10);
const CANDIDATES_PER_QUERY = Number(process.env.CANDIDATES_PER_QUERY || 30);

const MIN_WIDTH = Number(process.env.MIN_WIDTH || 1920);
const MIN_HEIGHT = Number(process.env.MIN_HEIGHT || 1080);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function getBaseName(imagePath) {
  return path.basename(imagePath, path.extname(imagePath));
}

const CITY_LANDMARKS = {
  amsterdam: ["Canals", "Damrak", "Rijksmuseum", "Canal Houses"],
  athens: ["Acropolis", "Parthenon", "Lycabettus Hill"],
  barcelona: ["Sagrada Familia", "Park Guell", "Casa Batllo"],
  berlin: ["Brandenburg Gate", "Reichstag", "Museum Island"],
  brussels: ["Grand Place", "Atomium", "Mont des Arts"],
  budapest: ["Parliament Building", "Fisherman's Bastion", "Chain Bridge"],
  dublin: ["Ha'penny Bridge", "Temple Bar", "Dublin Castle"],
  edinburgh: ["Edinburgh Castle", "Royal Mile", "Calton Hill"],
  florence: ["Duomo", "Ponte Vecchio", "Piazzale Michelangelo"],
  istanbul: ["Hagia Sophia", "Blue Mosque", "Galata Tower"],
  lisbon: ["Belem Tower", "Alfama", "Praça do Comércio"],
  london: ["Tower Bridge", "Big Ben", "St Paul's Cathedral"],
  madrid: ["Plaza Mayor", "Royal Palace", "Gran Via"],
  milan: ["Duomo di Milano", "Galleria Vittorio Emanuele", "Sforza Castle"],
  paris: ["Eiffel Tower", "Montmartre", "Louvre"],
  porto: ["Dom Luis Bridge", "Ribeira", "Porto Old Town"],
  prague: ["Charles Bridge", "Prague Castle", "Old Town Square"],
  rome: ["Colosseum", "Trevi Fountain", "Roman Forum"],
  seville: ["Plaza de España", "Seville Cathedral", "Alcazar"],
  stockholm: ["Gamla Stan", "City Hall", "Skeppsholmen"],
  venice: ["Grand Canal", "Rialto Bridge", "St Mark's Basilica"],
  vienna: ["Schonbrunn Palace", "Belvedere Palace", "St Stephen's Cathedral"],
  warsaw: ["Old Town", "Royal Castle", "Palace of Culture"],
  zurich: ["Old Town", "Lake Zurich", "Grossmünster"],
};

function detectDestinationType(destination) {
  const category = String(
    destination.primary_category ||
      destination.category ||
      destination.type ||
      destination.destination_type ||
      ""
  ).toLowerCase();

  if (category === "city") return "city";
  if (category === "beach") return "beach";
  if (category === "mountains") return "nature";
  if (category === "nature") return "nature";

  const cityScore = Number(destination.city || 0);
  const beachScore = Number(destination.beach || 0);
  const mountainsScore = Number(destination.mountains || 0);
  const natureScore = Number(destination.nature || 0);

  const maxScore = Math.max(cityScore, beachScore, mountainsScore, natureScore);

  if (maxScore === 0) return "mixed";
  if (beachScore === maxScore) return "beach";
  if (mountainsScore === maxScore || natureScore === maxScore) return "nature";
  if (cityScore === maxScore) return "city";

  return "mixed";
}

function buildSearchQueries(destination) {
  const city = destination.city || destination.name || "";
  const country = destination.country || "";
  const type = detectDestinationType(destination);
  const cityKey = normalizeKey(city);

  if (type === "city") {
    const landmarks = CITY_LANDMARKS[cityKey];

    if (landmarks?.length) {
      return landmarks.flatMap((landmark) => [
        `${city} ${landmark} sunset`,
        `${city} ${landmark} golden hour`,
        `${city} ${landmark} travel photography`,
      ]);
    }

    return [
      `${city} ${country} skyline sunset`,
      `${city} ${country} cityscape`,
      `${city} ${country} old town`,
      `${city} ${country} architecture`,
      `${city} ${country} famous landmark`,
    ];
  }

  if (type === "beach") {
    return [
      `${city} ${country} beach turquoise water`,
      `${city} ${country} beach aerial view`,
      `${city} ${country} coastline`,
      `${city} ${country} ocean cliffs`,
      `${city} ${country} beach sunset`,
      `${city} ${country} crystal clear water`,
      `${city} ${country} tropical beach`,
      `${city} ${country} sandy beach`,
    ];
  }

  if (type === "nature") {
    return [
      `${city} ${country} mountain landscape`,
      `${city} ${country} alpine scenery`,
      `${city} ${country} lake mountains`,
      `${city} ${country} panoramic view`,
      `${city} ${country} dramatic landscape`,
      `${city} ${country} national park`,
      `${city} ${country} scenic viewpoint`,
    ];
  }

  return [
    `${city} ${country} travel destination`,
    `${city} ${country} scenic landscape`,
    `${city} ${country} landmark`,
  ];
}

function containsAny(text, words) {
  return words.some((word) => text.includes(word));
}

function looksLikePeoplePhoto(photo) {
  const text = `${photo.alt || ""} ${photo.url || ""}`.toLowerCase();

  return containsAny(text, [
    "person",
    "people",
    "man",
    "woman",
    "girl",
    "boy",
    "portrait",
    "crowd",
    "tourist",
    "family",
    "couple",
    "selfie",
    "friends",
    "wedding",
    "bride",
    "groom",
  ]);
}

function scorePhoto(photo, index, type) {
  const text = `${photo.alt || ""} ${photo.url || ""}`.toLowerCase();

  let score = 0;

  score += (CANDIDATES_PER_QUERY - index) * 20;

  const megapixels = (photo.width * photo.height) / 1_000_000;
  score += Math.min(megapixels, 12) * 5;

  const ratio = photo.width / photo.height;
  const targetRatio = 16 / 9;
  score -= Math.abs(ratio - targetRatio) * 60;

  const universalPositive = [
    "dramatic",
    "golden hour",
    "sunset",
    "sunrise",
    "twilight",
    "panorama",
    "scenic",
    "landscape",
  ];

  const universalNegative = [
    "black and white",
    "monochrome",
    "grayscale",
    "washed out",
    "pale",
    "hazy",
    "fog",
    "foggy",
    "mist",
    "misty",
    "overcast",
    "cloudy",
    "flat",
    "blank sky",
    "indoor",
    "inside",
    "food",
    "coffee",
    "restaurant",
    "bar",
  ];

  for (const word of universalPositive) {
    if (text.includes(word)) score += 60;
  }

  for (const word of universalNegative) {
    if (text.includes(word)) score -= 150;
  }

  if (type === "city") {
    const cityPositive = [
      "skyline",
      "cityscape",
      "architecture",
      "landmark",
      "old town",
      "bridge",
      "cathedral",
      "tower",
      "castle",
      "historic",
      "square",
      "street",
    ];

    const cityNegative = [
      "beach",
      "forest",
      "field",
      "food",
      "restaurant",
      "coffee",
      "sand",
      "ocean",
      "sea",
    ];

    for (const word of cityPositive) {
      if (text.includes(word)) score += 120;
    }

    for (const word of cityNegative) {
      if (text.includes(word)) score -= 150;
    }
  }

  if (type === "beach") {
    const beachPositive = [
      "beach",
      "ocean",
      "sea",
      "shore",
      "sand",
      "sandy",
      "coast",
      "coastline",
      "turquoise",
      "water",
      "island",
      "lagoon",
      "cliff",
      "waves",
      "tropical",
    ];

    const beachNegative = [
      "city",
      "cityscape",
      "skyline",
      "building",
      "buildings",
      "architecture",
      "street",
      "downtown",
      "old town",
      "cathedral",
      "church",
      "tower",
      "bridge",
      "apartment",
      "hotel",
      "restaurant",
      "bar",
    ];

    for (const word of beachPositive) {
      if (text.includes(word)) score += 120;
    }

    for (const word of beachNegative) {
      if (text.includes(word)) score -= 250;
    }
  }

  if (type === "nature") {
    const naturePositive = [
      "mountain",
      "mountains",
      "lake",
      "forest",
      "valley",
      "river",
      "waterfall",
      "nature",
      "landscape",
      "alpine",
      "peak",
      "panorama",
      "scenic",
      "national park",
    ];

    const natureNegative = [
      "city",
      "cityscape",
      "building",
      "buildings",
      "architecture",
      "downtown",
      "street",
      "tower",
      "restaurant",
      "bar",
    ];

    for (const word of naturePositive) {
      if (text.includes(word)) score += 120;
    }

    for (const word of natureNegative) {
      if (text.includes(word)) score -= 200;
    }
  }

  if (looksLikePeoplePhoto(photo)) {
    score -= 1000;
  }

  return score;
}

async function searchPexels(query, type) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query
  )}&orientation=landscape&size=large&per_page=${CANDIDATES_PER_QUERY}`;

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
    .map((photo, index) => ({
      ...photo,
      searchQuery: query,
      pexelsRank: index + 1,
      score: scorePhoto(photo, index, type),
    }))
    .filter((photo) => !looksLikePeoplePhoto(photo))
    .filter((photo) => photo.width >= MIN_WIDTH)
    .filter((photo) => photo.height >= MIN_HEIGHT);
}

async function downloadImage(url, outputPath) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Image download failed: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
}

async function getBestPhotosForDestination(destination) {
  const type = detectDestinationType(destination);
  const queries = buildSearchQueries(destination);
  const allPhotos = [];

  for (const query of queries) {
    console.log(`Searching query: ${query}`);

    try {
      const photos = await searchPexels(query, type);
      allPhotos.push(...photos);
      await sleep(400);
    } catch (error) {
      console.log(`Query failed: ${query} - ${error.message}`);
    }
  }

  const uniquePhotos = Array.from(
    new Map(allPhotos.map((photo) => [photo.id, photo])).values()
  );

  return uniquePhotos
    .sort((a, b) => b.score - a.score)
    .slice(0, IMAGES_PER_DESTINATION);
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

  const destinations = JSON.parse(fs.readFileSync(DESTINATIONS_FILE, "utf-8"));
  const batch = destinations.slice(START_INDEX, START_INDEX + LIMIT);

  console.log(`Total destinations: ${destinations.length}`);
  console.log(`Start index: ${START_INDEX}`);
  console.log(`Limit: ${LIMIT}`);
  console.log(`Images per destination: ${IMAGES_PER_DESTINATION}`);
  console.log(`Candidates per query: ${CANDIDATES_PER_QUERY}`);
  console.log(`Output folder: public/${IMAGE_SUBFOLDER}`);

  for (let i = 0; i < batch.length; i++) {
    const destination = batch[i];

    if (!destination.image) {
      console.log(`Skipping ${destination.id || i}: missing image path`);
      continue;
    }

    const baseName = getBaseName(destination.image);
    const type = detectDestinationType(destination);

    try {
      console.log(`\n=== ${destination.city || destination.name || baseName} ===`);
      console.log(`Destination type: ${type}`);

      const photos = await getBestPhotosForDestination(destination);

      if (!photos.length) {
        console.log("No suitable images found.");
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
        console.log(`Search query: ${photo.searchQuery}`);
        console.log(`Pexels rank: ${photo.pexelsRank}`);
        console.log(`Score: ${photo.score.toFixed(2)}`);
        console.log(`Original size: ${photo.width}x${photo.height}`);
        console.log(`Alt: ${photo.alt || "No alt text"}`);
        console.log(`Credit: ${photo.photographer} - ${photo.url}`);

        await sleep(300);
      }

      await sleep(1000);
    } catch (error) {
      console.error(`Failed for ${destination.id || baseName}:`, error.message);
    }
  }

  console.log("\nDone.");
}

main();