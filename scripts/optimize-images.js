const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const QUALITY = 80; // Adjust quality setting (0-100)
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Supported input formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

async function processImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    if (!SUPPORTED_FORMATS.includes(ext)) return;

    const outputPath = filePath.replace(ext, '.webp');
    
    // Skip if WebP version already exists
    try {
      await fs.access(outputPath);
      console.log(`Skipping ${filePath} - WebP version exists`);
      return;
    } catch {}

    await sharp(filePath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    console.log(`Converted ${filePath} to WebP`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function processDirectory(directory) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.isFile()) {
        await processImage(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
  }
}

// Start processing
processDirectory(IMAGES_DIR)
  .then(() => console.log('Image optimization complete!'))
  .catch(console.error);