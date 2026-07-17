const fs = require("fs");

const FILE = "./destinations.json"; // adjust path if needed

const SUPABASE_BASE =
  "https://rtqumvrfhrnzhnommtyb.supabase.co/storage/v1/object/public/zulario_images/";

const destinations = JSON.parse(fs.readFileSync(FILE, "utf8"));

for (const destination of destinations) {
  if (!destination.image) continue;

  const filename = destination.image
    .replace("/images/", "")
    .replace(/\.(jpg|jpeg|png|webp)$/i, "");

  destination.image = `${SUPABASE_BASE}${filename}.webp`;
}

fs.writeFileSync(FILE, JSON.stringify(destinations, null, 2));

console.log("✅ Migration complete.");