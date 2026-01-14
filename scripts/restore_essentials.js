const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:\\Projetcs\\Executive Fleet Website\\Executive Fleet';
const ARCHIVE_DIR = path.join(ROOT_DIR, 'bulk-archive');

function moveBack(rel) {
    const src = path.join(ARCHIVE_DIR, rel);
    const dest = path.join(ROOT_DIR, rel);

    if (!fs.existsSync(src)) {
        console.log(`Not found in archive: ${rel}`);
        return;
    }

    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    try {
        if (fs.lstatSync(src).isDirectory()) {
            // Recursive move for directory
            moveDir(src, dest);
            console.log(`Restored Directory: ${rel}`);
        } else {
            fs.renameSync(src, dest);
            console.log(`Restored File: ${rel}`);
        }
    } catch (err) {
        console.error(`Error restoring ${rel}: ${err.message}`);
    }
}

function moveDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const files = fs.readdirSync(src);
    for (const file of files) {
        const s = path.join(src, file);
        const d = path.join(dest, file);
        if (fs.lstatSync(s).isDirectory()) {
            moveDir(s, d);
        } else {
            fs.renameSync(s, d);
        }
    }
    // Remove the archived dir if empty
    if (fs.readdirSync(src).length === 0) {
        fs.rmdirSync(src);
    }
}

const toRestore = [
    'app/api',
    'app/blogs',
    'app/booking',
    'app/(booking)/booking-vehicle',
    'app/(fleets)/fleet-list',
    'app/invoice',
    'app/sitemap.js',
    'app/robots.js',
    'app/not-found.jsx',
    'app/[slug]',
    'app/page-not-found',
    'app/(fleets)/Mercedes-Sprinter', // User mentioned it might be used
    'app/(fleets)/BMW-i5',
    'app/(fleets)/BMW-X5',
];

toRestore.forEach(p => moveBack(p));

console.log('Restoration complete.');
