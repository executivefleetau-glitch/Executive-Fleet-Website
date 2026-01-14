const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:\\Projetcs\\Executive Fleet Website\\Executive Fleet';
const APP_DIR = path.join(ROOT_DIR, 'app');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');

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
            if (/\.(jsx|js|tsx|ts)$/.test(file)) {
                allFiles.push(fullPath);
            }
        }
    }
    return allFiles;
}

const allAppFiles = getAllFiles(APP_DIR);
const allCompFiles = getAllFiles(COMPONENTS_DIR);
const allFiles = [...allAppFiles, ...allCompFiles, ...getAllFiles(path.join(ROOT_DIR, 'data')), ...getAllFiles(path.join(ROOT_DIR, 'utlis'))];

const usedFiles = new Set();

function resolveImport(currentFile, importPath) {
    let resolved = null;
    if (importPath.startsWith('@/')) {
        resolved = path.join(ROOT_DIR, importPath.substring(2));
    } else if (importPath.startsWith('.')) {
        resolved = path.resolve(path.dirname(currentFile), importPath);
    } else {
        return null; // Likely a library
    }

    const extensions = ['', '.jsx', '.js', '.tsx', '.ts', '/index.jsx', '/index.js'];
    for (const ext of extensions) {
        const full = resolved + ext;
        if (fs.existsSync(full) && fs.lstatSync(full).isFile()) {
            return full;
        }
    }
    return null;
}

function trace(file) {
    if (usedFiles.has(file)) return;
    usedFiles.add(file);

    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf8');

    // Simple regex for imports
    const importRegex = /(?:import|from)\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const resolved = resolveImport(file, match[1]);
        if (resolved) {
            trace(resolved);
        }
    }

    // Also check for dynamic imports: import(...)
    const dynamicRegex = /import\(['"]([^'"]+)['"]\)/g;
    while ((match = dynamicRegex.exec(content)) !== null) {
        const resolved = resolveImport(file, match[1]);
        if (resolved) {
            trace(resolved);
        }
    }
}

// Start tracing from all active pages
allAppFiles.forEach(file => {
    // Treat everything currently in app as "Active" (since we already archived the unused ones)
    trace(file);
});

// Also trace from layout files specifically
trace(path.join(APP_DIR, 'layout.jsx'));
trace(path.join(APP_DIR, 'ClientLayout.jsx'));

console.log('--- COMPONENT AUDIT (DEEP TRACE) ---');
let unusedCount = 0;
allCompFiles.forEach(file => {
    const rel = path.relative(ROOT_DIR, file);
    if (!usedFiles.has(file)) {
        console.log(`[UNUSED] ${rel}`);
        unusedCount++;
    }
});

console.log(`Total Unused Components: ${unusedCount}`);

// Output list for the next script
if (unusedCount > 0) {
    const list = allCompFiles.filter(f => !usedFiles.has(f)).map(f => path.relative(ROOT_DIR, f));
    fs.writeFileSync(path.join(ROOT_DIR, 'scripts/unused_components.json'), JSON.stringify(list, null, 2));
}
