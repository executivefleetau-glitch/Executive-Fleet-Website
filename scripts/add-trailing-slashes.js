// Script to add trailing slashes to all canonical links
// Run this with: node scripts/add-trailing-slashes.js

const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    // Service pages
    'app/winery-tour/page.jsx',
    'app/special-event/page.jsx',
    'app/family-travel/page.jsx',
    'app/corporate-travel/page.jsx',
    'app/airport-transfer/page.jsx',
    'app/booking/page.jsx',

    // Fleet pages
    'app/(fleets)/Audi-A6/page.jsx',
    'app/(fleets)/Mercedes-V-Class/page.jsx',
    'app/(fleets)/Mercedes-Sprinter/page.jsx',
    'app/(fleets)/Mercedes-GLS/page.jsx',
    'app/(fleets)/Mercedes-E-Class/page.jsx',
    'app/(fleets)/Mercedes-Benz-Sprinter/page.jsx',
    'app/(fleets)/Mercedes-S-Class/page.jsx',
    'app/(fleets)/BMW-X5/page.jsx',
    'app/(fleets)/BMW-X7/page.jsx',
    'app/(fleets)/BMW-5-series/page.jsx',
    'app/(fleets)/BMW-7-Series/page.jsx',
    'app/(fleets)/BMW-i5/page.jsx',
    'app/(fleets)/Audi-Q7/page.jsx',
    'app/(fleets)/Audi-A8/page.jsx',
];

const baseDir = 'd:/Projetcs/Executive Fleet Website/Executive Fleet';

filesToUpdate.forEach(file => {
    const filePath = path.join(baseDir, file);

    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Add trailing slash to canonical if it doesn't have one
    const updated = content.replace(
        /canonical:\s*['"]([^'"]+)(?<!\/)['"]/g,
        (match, url) => {
            if (url === './' || url.endsWith('/')) return match;
            return `canonical: '${url}/'`;
        }
    );

    if (content !== updated) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`✅ Updated: ${file}`);
    } else {
        console.log(`⏭️  Skipped (already has trailing slash): ${file}`);
    }
});

console.log('\n✨ Done! All canonical links now have trailing slashes.');
