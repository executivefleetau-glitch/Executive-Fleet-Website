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
        fs.renameSync(src, dest);
        console.log(`Restored: ${rel}`);
    } catch (err) {
        console.error(`Error restoring ${rel}: ${err.message}`);
    }
}

// Restore the fleet list page
moveBack('app/(fleets)/fleet-list/page.jsx');

// Restore fleet list components
moveBack('components/fleet-list/FeetList1.jsx');
moveBack('components/fleet-list/BreadCumb.jsx');

console.log('Restoration of fleet-list complete.');
