const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:\\Projetcs\\Executive Fleet Website\\Executive Fleet';
const ARCHIVE_DIR = path.join(ROOT_DIR, 'bulk-archive');

if (!fs.existsSync(ARCHIVE_DIR)) {
    fs.mkdirSync(ARCHIVE_DIR);
}

function move(relativeSrc) {
    const src = path.join(ROOT_DIR, relativeSrc);
    const dest = path.join(ARCHIVE_DIR, relativeSrc);

    if (!fs.existsSync(src)) {
        console.log(`Skipping (not found): ${relativeSrc}`);
        return;
    }

    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    try {
        fs.renameSync(src, dest);
        console.log(`Moved: ${relativeSrc}`);
    } catch (err) {
        // If rename fails (likely EPERM), try recursive copy and delete if it's a directory
        console.error(`Error moving ${relativeSrc}: ${err.message}. Admin might need to close folders.`);
    }
}

const appFoldersToMove = [
    'app/(homes)/home-1',
    'app/(homes)/home-2',
    'app/(homes)/home-3',
    'app/(homes)/home-4',
    'app/(homes)/home-5',
    'app/(homes)/home-6',
    'app/(homes)/home-7',
    'app/(homes)/home-9',
    'app/(homes)/home-10',
    'app/(blogs)/blog-grid',
    'app/(blogs)/blog-grid-2',
    'app/(blogs)/blog-list',
    'app/(services)/service-grid-2',
    'app/(services)/service-grid-3',
    'app/(pages)/about-2',
    'app/(pages)/contact-2',
    'app/(pages)/our-team',
    'app/(pages)/pricing',
    'app/(fleets)/fleet-list-2',
    'app/(fleets)/fleet-list-3',
    'app/(fleets)/fleet-list-4',
];

appFoldersToMove.forEach(folder => move(folder));

console.log('Targeted archival complete.');
