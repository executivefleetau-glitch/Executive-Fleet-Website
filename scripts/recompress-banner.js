const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function recompressBanner() {
    const inputPath = path.join(process.cwd(), 'public/assets/imgs/banner/V-class+bags.webp');
    const tempPath = path.join(process.cwd(), 'public/assets/imgs/banner/V-class+bags-temp.webp');

    if (!fs.existsSync(inputPath)) {
        console.error('File not found:', inputPath);
        return;
    }

    console.log(`Re-compressing: ${inputPath}`);

    try {
        await sharp(inputPath)
            .webp({ quality: 65 }) // More aggressive compression for this large file
            .toFile(tempPath);

        // Replace original
        fs.unlinkSync(inputPath);
        fs.renameSync(tempPath, inputPath);

        const newSize = fs.statSync(inputPath).size;
        console.log(`✅ Compressed V-class+bags.webp to ${(newSize / 1024).toFixed(2)}KB`);

    } catch (error) {
        console.error('Error compressing banner:', error);
    }
}

recompressBanner();
