const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const imageDir = path.join(__dirname, 'public', 'images');

// Define optimal dimensions for different image contexts
const IMAGE_SIZES = {
    'home': { width: 800, height: 600 },
    'case-studies': { width: 600, height: 400 },
    'team': { width: 300, height: 300 },
    'logo': { width: 150, height: 150 },
    'Services': { width: 600, height: 400 }
};

// Helper function to determine optimal size based on image path
function getOptimalSize(filePath) {
    const relativePath = path.relative(imageDir, filePath);
    const directory = relativePath.split(path.sep)[0].toLowerCase();
    
    return IMAGE_SIZES[directory] || { width: 800, height: 600 }; // Default size if no match
}

async function convertToWebP(filePath) {
    try {
        const ext = path.extname(filePath).toLowerCase();
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

        const webpPath = filePath.replace(ext, '.webp');
        const optimalSize = getOptimalSize(filePath);

        // Get image metadata
        const metadata = await sharp(filePath).metadata();

        // Only resize if image is larger than optimal dimensions
        const needsResize = metadata.width > optimalSize.width || metadata.height > optimalSize.height;

        let sharpInstance = sharp(filePath);
        
        if (needsResize) {
            sharpInstance = sharpInstance.resize(optimalSize.width, optimalSize.height, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        await sharpInstance
            .webp({ quality: 80, effort: 6 })
            .toFile(webpPath);

        console.log(`Converted and optimized ${filePath} to WebP`);
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