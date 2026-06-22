import fs from "fs";
import path from "path";


const destinations = JSON.parse(
  fs.readFileSync("destinations.json", "utf8")
);

destinations.forEach((d, index) => {
  const name = path.basename(d.image, path.extname(d.image));

  console.log(`${index + 1}. ${name}`);
});
