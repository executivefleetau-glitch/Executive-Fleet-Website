const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetImages = [
    // Service Images
    'public/assets/services/airport-transfer.png',
    'public/assets/services/corporate-travel.png',
    'public/assets/services/family-travel.png',
    'public/assets/services/special-event-modern.png',
    'public/assets/services/special-event.png',
    'public/assets/services/winery-tour.png',
    // Hero Image
    'public/assets/hero/executive-fleet-hero-bg.png',
    // Large Banner Image
    'public/assets/imgs/banner/V-class+bags.webp', // Already webp but 2.6MB, let's try to re-compress
    // Background Pattern
    'public/assets/imgs/page/homepage1/bg-trans.png'
];

async function optimizeImages() {
    console.log('Installing sharp temporarily...');
    try {
        execSync('npm install sharp --no-save', { stdio: 'inherit' });
    } catch (e) {
        console.error('Failed to install sharp:', e);
        return;
    }

    const sharp = require('sharp');

    for (const imgPath of targetImages) {
        const fullPath = path.join(process.cwd(), imgPath);

        if (!fs.existsSync(fullPath)) {
            console.warn(`File not found: ${imgPath}`);
            continue;
        }

        const dir = path.dirname(fullPath);
        const ext = path.extname(fullPath);
        const name = path.basename(fullPath, ext);
        const outputPath = path.join(dir, `${name}.webp`);

        console.log(`Optimizing: ${imgPath} -> ${name}.webp`);

        try {
            await sharp(fullPath)
                .webp({ quality: 75 }) // Reduce quality to 75%
                .toFile(outputPath);

            console.log(`✅ Created: ${outputPath}`);

            // Compare sizes
            const originalSize = fs.statSync(fullPath).size;
            const newSize = fs.statSync(outputPath).size;
            console.log(`   Size: ${(originalSize / 1024).toFixed(2)}KB -> ${(newSize / 1024).toFixed(2)}KB`);

        } catch (error) {
            console.error(`❌ Error converting ${imgPath}:`, error);
        }
    }
}

optimizeImages();
