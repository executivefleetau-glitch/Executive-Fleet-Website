const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:\\Projetcs\\Executive Fleet Website\\Executive Fleet';
const ARCHIVE_DIR = path.join(ROOT_DIR, 'bulk-archive');
const UNUSED_LIST_PATH = path.join(ROOT_DIR, 'scripts/unused_components.json');

if (!fs.existsSync(UNUSED_LIST_PATH)) {
    console.error('Unused components list not found.');
    process.exit(1);
}

const unusedComponents = JSON.parse(fs.readFileSync(UNUSED_LIST_PATH, 'utf8'));

unusedComponents.forEach(relSrc => {
    const src = path.join(ROOT_DIR, relSrc);
    const dest = path.join(ARCHIVE_DIR, relSrc);

    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    try {
        if (fs.existsSync(src)) {
            fs.renameSync(src, dest);
            console.log(`Archived: ${relSrc}`);
        }
    } catch (err) {
        console.error(`Error archiving ${relSrc}: ${err.message}`);
    }
});

console.log('Component archival complete.');
