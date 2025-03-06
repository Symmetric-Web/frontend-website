const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const imageDir = path.join(__dirname, 'public', 'images');

async function convertToWebP(filePath) {
    try {
        const ext = path.extname(filePath).toLowerCase();
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

        const webpPath = filePath.replace(ext, '.webp');
        await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(webpPath);

        console.log(`Converted ${filePath} to WebP`);
    } catch (error) {
        console.error(`Error converting ${filePath}:`, error);
    }
}

async function processDirectory(dirPath) {
    try {
        const entries = await fs.readdir(dirPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                await processDirectory(fullPath);
            } else {
                await convertToWebP(fullPath);
            }
        }
    } catch (error) {
        console.error(`Error processing directory ${dirPath}:`, error);
    }
}

processDirectory(imageDir)
    .then(() => console.log('Image conversion completed'))
    .catch(error => console.error('Conversion failed:', error));