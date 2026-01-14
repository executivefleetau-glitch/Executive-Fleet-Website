const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:\\Projetcs\\Executive Fleet Website\\Executive Fleet';
const APP_DIR = path.join(ROOT_DIR, 'app');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const ARCHIVE_DIR = path.join(ROOT_DIR, 'bulk-archive');

if (!fs.existsSync(ARCHIVE_DIR)) {
    fs.mkdirSync(ARCHIVE_DIR);
}

// 1. Define ALL entry points (Verified Business Pages)
const entryPoints = [
    'app/page.jsx',
    'app/layout.jsx',
    'app/ClientLayout.jsx',
    'app/about/page.jsx',
    'app/(services)/services/page.jsx',
    'app/fleet-list/page.jsx',
    'app/contact/page.jsx',
    'app/faq/page.jsx',
    'app/blogs/page.jsx',
    'app/booking-vehicle/page.jsx',
    'app/terms-and-conditions/page.jsx',
    'app/privacy-policy/page.jsx',
    'app/legal-notice/page.jsx',
    'app/airport-transfer/page.jsx',
    'app/corporate-travel/page.jsx',
    'app/family-travel/page.jsx',
    'app/special-event/page.jsx',
    'app/winery-tour/page.jsx',
    'app/(booking)/booking-extra/page.jsx',
    'app/(booking)/booking-passenger/page.jsx',
    'app/(booking)/booking-payment/page.jsx',
    'app/(booking)/booking-receved/page.jsx',
    'app/(fleets)/Audi-A6/page.jsx',
    'app/(fleets)/Audi-A8/page.jsx',
    'app/(fleets)/Audi-Q7/page.jsx',
    'app/(fleets)/BMW-5-series/page.jsx',
    'app/(fleets)/BMW-7-Series/page.jsx',
    'app/(fleets)/BMW-X7/page.jsx',
    'app/(fleets)/Mercedes-Benz-Sprinter/page.jsx',
    'app/(fleets)/Mercedes-E-Class/page.jsx',
    'app/(fleets)/Mercedes-GLS/page.jsx',
    'app/(fleets)/Mercedes-S-Class/page.jsx',
    'app/(fleets)/Mercedes-V-Class/page.jsx',
];

// Add everything in admin
function addDirToEntry(dir) {
    if (!fs.existsSync(path.join(ROOT_DIR, dir))) return;
    const files = fs.readdirSync(path.join(ROOT_DIR, dir));
    for (const file of files) {
        const fullPath = path.join(ROOT_DIR, dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            addDirToEntry(path.join(dir, file));
        } else if (/\.(jsx|js)$/.test(file)) {
            entryPoints.push(path.join(dir, file).replace(/\\/g, '/'));
        }
    }
}
addDirToEntry('app/admin');
addDirToEntry('data');
addDirToEntry('utlis');

const usedFiles = new Set();
function resolveImport(currentFile, importPath) {
    let resolved = null;
    if (importPath.startsWith('@/')) {
        resolved = path.join(ROOT_DIR, importPath.substring(2));
    } else if (importPath.startsWith('.')) {
        resolved = path.resolve(path.dirname(currentFile), importPath);
    } else {
        return null;
    }
    const extensions = ['', '.jsx', '.js', '.tsx', '.ts', '/index.jsx', '/index.js'];
    for (const ext of extensions) {
        const full = resolved + ext;
        if (fs.existsSync(full) && fs.lstatSync(full).isFile()) return full;
    }
    return null;
}

function trace(file) {
    const absFile = path.isAbsolute(file) ? file : path.join(ROOT_DIR, file);
    if (usedFiles.has(absFile)) return;
    usedFiles.add(absFile);
    if (!fs.existsSync(absFile)) return;
    const content = fs.readFileSync(absFile, 'utf8');
    const importRegex = /(?:import|from|import\()\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const resolved = resolveImport(absFile, match[1]);
        if (resolved) trace(resolved);
    }
}

entryPoints.forEach(p => trace(p));

// 2. Identify ALL JS/JSX files in app and components
function getAllFiles(dir, allFiles = []) {
    if (!fs.existsSync(dir)) return allFiles;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git' && file !== 'bulk-archive') {
                getAllFiles(fullPath, allFiles);
            }
        } else {
            if (/\.(jsx|js)$/.test(file)) allFiles.push(fullPath);
        }
    }
    return allFiles;
}

const allAppFiles = getAllFiles(APP_DIR);
const allCompFiles = getAllFiles(COMPONENTS_DIR);
const allFilesToAudit = [...allAppFiles, ...allCompFiles];

let moveCount = 0;
allFilesToAudit.forEach(file => {
    if (!usedFiles.has(file)) {
        const rel = path.relative(ROOT_DIR, file);
        const dest = path.join(ARCHIVE_DIR, rel);
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

        try {
            fs.renameSync(file, dest);
            console.log(`Archived: ${rel}`);
            moveCount++;
        } catch (err) {
            console.error(`Error archiving ${rel}: ${err.message}`);
        }
    }
});

// 3. Cleanup Empty Directories
function removeEmptyDirs(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    if (files.length > 0) {
        files.forEach(file => {
            const full = path.join(dir, file);
            if (fs.lstatSync(full).isDirectory()) {
                removeEmptyDirs(full);
            }
        });
    }

    // Re-check after potential child deletion
    const filesAfter = fs.readdirSync(dir);
    if (filesAfter.length === 0 && dir !== APP_DIR && dir !== COMPONENTS_DIR) {
        fs.rmdirSync(dir);
        console.log(`Removed empty dir: ${path.relative(ROOT_DIR, dir)}`);
    }
}

removeEmptyDirs(APP_DIR);
removeEmptyDirs(COMPONENTS_DIR);

console.log(`\nFinal Cleanup Complete. Archived ${moveCount} files.`);
