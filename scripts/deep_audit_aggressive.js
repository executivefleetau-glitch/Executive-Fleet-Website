const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:\\Projetcs\\Executive Fleet Website\\Executive Fleet';
const APP_DIR = path.join(ROOT_DIR, 'app');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');

// 1. Define ALL entry points (Verified Business Pages)
const entryPoints = [
    'app/page.jsx',
    'app/layout.jsx',
    'app/ClientLayout.jsx',
    'app/about/page.jsx',
    'app/services/page.jsx',
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
    'app/booking-extra/page.jsx',
    'app/booking-passenger/page.jsx',
    'app/booking-payment/page.jsx',
    'app/booking-receved/page.jsx',
];

// Add all dedicated fleet pages
const fleetDir = path.join(APP_DIR, '(fleets)');
if (fs.existsSync(fleetDir)) {
    const fleets = fs.readdirSync(fleetDir);
    fleets.forEach(f => {
        // Exclude template-sounding folders if we are sure
        if (f.startsWith('fleet-list-') || f === 'fleet-single') return;

        const page = path.join(fleetDir, f, 'page.jsx');
        if (fs.existsSync(page)) {
            entryPoints.push(path.relative(ROOT_DIR, page).replace(/\\/g, '/'));
        }
    });
}

// Add admin panel (User said "don't touch", so we treat as entry point)
function getAdminFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAdminFiles(file));
        } else {
            if (/\.(jsx|js)$/.test(file)) results.push(path.relative(ROOT_DIR, file).replace(/\\/g, '/'));
        }
    });
    return results;
}
const adminFiles = getAdminFiles(path.join(APP_DIR, 'admin'));
adminFiles.forEach(f => entryPoints.push(f));

console.log(`Tracing from ${entryPoints.length} entry points...`);

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

// Now find ALL components and see which aren't used
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

const allCompFiles = getAllFiles(COMPONENTS_DIR);
const unusedComps = allCompFiles.filter(f => !usedFiles.has(f)).map(f => path.relative(ROOT_DIR, f));

console.log(`\nFound ${unusedComps.length} unused components.`);
fs.writeFileSync(path.join(ROOT_DIR, 'scripts/unused_components_aggressive.json'), JSON.stringify(unusedComps, null, 2));
