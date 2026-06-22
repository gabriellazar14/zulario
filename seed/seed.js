import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

dotenv.config({ path: "../.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const raw = fs.readFileSync("../destinations.json", "utf-8");
const destinations = JSON.parse(raw);

async function seed() {
  console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Loaded:", destinations.length);

  const formatted = destinations.map((d) => ({
    id: d.id,
    data: d,
  }));

  const { error } = await supabase
    .from("destinations")
    .upsert(formatted, { onConflict: "id" });

  if (error) {
    console.error("ERROR:", error);
  } else {
    console.log("DONE ✅");
  }
}

seed();