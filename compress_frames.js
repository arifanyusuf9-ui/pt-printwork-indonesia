const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'animation');
const outputDir = path.join(__dirname, 'animation-compressed');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg'));
    console.log(`Found ${files.length} images to compress. Resizing to 1280w and compressing with JPEG quality 65...`);

    let compressedCount = 0;
    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file);
        try {
            await sharp(inputPath)
                .resize({ width: 1280 })
                .jpeg({ quality: 65 })
                .toFile(outputPath);
            compressedCount++;
            if (compressedCount % 20 === 0) {
                console.log(`Compressed ${compressedCount}/${files.length} frames...`);
            }
        } catch (error) {
            console.error(`Error compressing ${file}:`, error);
        }
    }
    console.log('Finished compressing all frames!');
}

run();
