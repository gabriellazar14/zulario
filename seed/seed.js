import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const raw = fs.readFileSync("destinations.json", "utf-8");
const destinations = JSON.parse(raw);

async function seed() {
  console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Loaded:", destinations.length);

  const ids = destinations.map((d) => d.id);

  // 1. Delete old rows that are no longer in destinations.json
  const { error: deleteError } = await supabase
    .from("destinations")
    .delete()
    .not("id", "in", `(${ids.map((id) => `"${id}"`).join(",")})`);

  if (deleteError) {
    console.error("DELETE ERROR:", deleteError);
    return;
  }

  // 2. Upsert current destinations
  const formatted = destinations.map((d) => ({
    id: d.id,
    data: d,
  }));

  const { error: upsertError } = await supabase
    .from("destinations")
    .upsert(formatted, { onConflict: "id" });

  if (upsertError) {
    console.error("UPSERT ERROR:", upsertError);
    return;
  }

  console.log("DONE ✅");
}

seed();