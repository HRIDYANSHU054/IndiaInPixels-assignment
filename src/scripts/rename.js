import { readdir, rename } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directoryPath = join(__dirname, "../data/states");

try {
  const files = await readdir(directoryPath);

  for (const file of files) {
    if (file.endsWith(".geojson")) {
      const oldPath = join(directoryPath, file);
      const newPath = join(directoryPath, `${file}.json`);

      try {
        await rename(oldPath, newPath);
        console.log(`Renamed ${file} to ${file}.json`);
      } catch (err) {
        console.error(`Error renaming ${file}:`, err);
      }
    }
  }
} catch (err) {
  console.error("Error reading directory:", err);
}
