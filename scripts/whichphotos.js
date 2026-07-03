import fs from "fs";
import path from "path";

const folder = "D:/our_website/public/images";

const images = fs.readdirSync(folder, {
  recursive: true,
  withFileTypes: true
});

for (const file of images) {
  if (!file.isFile()) continue;

  const ext = path.extname(file.name).toLowerCase();

  if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    console.log(file.name);
  }
}