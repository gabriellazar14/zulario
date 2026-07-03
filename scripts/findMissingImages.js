console.log("Script started");

import fs from "fs";
import path from "path";

const destinations = JSON.parse(
  fs.readFileSync("../destinations.json", "utf8")
);

const imageFolders = [

   "D:/our_website/public/images/pexels",
  "C:/Users/Daniela/Desktop/poze pt 1_2",
  "C:/Users/Daniela/Desktop/poze pt 1_2/ok",
  "C:/Users/Daniela/Desktop/poze pt 1_2/not ok"
];

const allImages = new Set();

for (const folder of imageFolders) {
  console.log(`Scanning ${folder}...`);

  const files = fs.readdirSync(folder, {
    recursive: true,
    withFileTypes: true
  });

  for (const file of files) {
    if (!file.isFile()) continue;

    allImages.add(
      path.basename(file.name, path.extname(file.name))
        .toLowerCase()
    );
  }
}

console.log(`Indexed ${allImages.size} images`);

const missing = [];

for (const d of destinations) {
  const baseName = path
    .basename(d.image, path.extname(d.image))
    .toLowerCase();

const found = [...allImages].some(
  img => img === baseName || img.startsWith(baseName + "_")
);

if (!found) {
  missing.push(baseName);
}
}

console.log(`Destinations: ${destinations.length}`);
console.log(`Images found in folders: ${allImages.size}`);
console.log(`Missing images: ${missing.length}`);

missing.forEach((name) => console.log(name));

fs.writeFileSync(
  "missing-images.txt",
  missing.join("\n"),
  "utf8"
);

console.log("Saved: missing-images.txt");