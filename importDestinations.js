require("dotenv").config({ path: ".env.local" });

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// 🔥 Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 📁 IMPORTANT: folder with your JSON files
const folderPath = path.join(__dirname, "data", "destinations");

console.log("🔥 SCRIPT STARTED");
console.log("📂 Folder path:", folderPath);

// 🚨 Check folder exists
if (!fs.existsSync(folderPath)) {
  console.error("❌ Folder not found:", folderPath);
  process.exit(1);
}

// 📁 Read files
const files = fs.readdirSync(folderPath);
console.log("📁 Files found:", files);

if (files.length === 0) {
  console.error("❌ No JSON files found in folder");
  process.exit(1);
}

// 🚀 Import function
async function importDestinations() {
  for (const file of files) {
    try {
      const filePath = path.join(folderPath, file);

      console.log("\n➡️ Processing:", file);

      const rawData = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(rawData);

      console.log("📦 Loaded:", jsonData.id);

      const { error } = await supabase.from("destinations").upsert({
        id: jsonData.id,

        name: jsonData.city || jsonData.name,
        country: jsonData.country,

        destination_type: jsonData.destination_types || [],
        experience_styles: jsonData.experience_styles || [],
        tags: jsonData.tags || [],

        energy: jsonData.emotional_signature?.energy || null,
        romanticism: jsonData.emotional_signature?.romanticism || null,
        social_openness: jsonData.emotional_signature?.social_openness || null,
        spontaneity: jsonData.emotional_signature?.spontaneity || null,
        emotional_warmth: jsonData.emotional_signature?.emotional_warmth || null,
        sensory_intensity: jsonData.emotional_signature?.sensory_intensity || null,
        mystery: jsonData.emotional_signature?.mystery || null,
        freedom: jsonData.emotional_signature?.freedom || null,
        reflectiveness: jsonData.emotional_signature?.reflectiveness || null,
        cultural_depth: jsonData.emotional_signature?.cultural_depth || null,
        nature_connection: jsonData.emotional_signature?.nature_connection || null,
        comfort_zone_expansion: jsonData.emotional_signature?.comfort_zone_expansion || null,

        best_seasons: jsonData.seasonality?.best_seasons || [],

        pace: jsonData.destination_dna?.pace || null,
        emotional_style: jsonData.destination_dna?.emotional_style || null,
        beauty_type: jsonData.destination_dna?.beauty_type || null,
        primary_energy: jsonData.destination_dna?.primary_energy || null,

        content: jsonData,
      });

      if (error) {
        console.error("❌ Supabase error in:", file);
        console.error(error);
      } else {
        console.log("✅ Imported:", jsonData.id);
      }
    } catch (err) {
      console.error("❌ Failed file:", file);
      console.error(err.message);
    }
  }

  console.log("\n🎉 IMPORT FINISHED");
}

// 🚀 RUN
importDestinations();