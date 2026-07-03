import fs from "fs";

const destinations = JSON.parse(
  fs.readFileSync("destinations.json", "utf8")
);

const uniqueDestinations = destinations.filter(
  d => d.primary_category === "unique_experience"
);

console.log(`Total unique experiences: ${uniqueDestinations.length}\n`);

uniqueDestinations.forEach(d => {
  console.log(`${d.city} (${d.country})`);
});