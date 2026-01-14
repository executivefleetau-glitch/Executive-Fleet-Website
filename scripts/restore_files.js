const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:\\Projetcs\\Executive Fleet Website\\Executive Fleet';
const ARCHIVE_DIR = path.join(ROOT_DIR, 'bulk-archive');

function restoreAll(dir) {
    const fullArchiveDir = path.join(ARCHIVE_DIR, dir);
    if (!fs.existsSync(fullArchiveDir)) return;

    const items = fs.readdirSync(fullArchiveDir, { recursive: true });

    // Sort items so files are moved before directories might be deleted/moved? 
    // Actually items will be relative paths.

    items.forEach(item => {
        const src = path.join(fullArchiveDir, item);
        const dest = path.join(ROOT_DIR, dir, item);

        if (fs.lstatSync(src).isDirectory()) return; // Handle files only, directories will be created by renameSync if needed or handled manually

        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        try {
            fs.renameSync(src, dest);
            console.log(`Restored: ${item}`);
        } catch (err) {
            console.error(`Error restoring ${item}: ${err.message}`);
        }
    });
}

restoreAll('components');
// Also restore some app folders to be safe
restoreAll('app/(fleets)');
console.log('Restoration complete.');
