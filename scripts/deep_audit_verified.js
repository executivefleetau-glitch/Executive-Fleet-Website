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
            if (/\.(jsx|js)$/.test(file)) allFiles.push(fullPath);
        }
    }
    return allFiles;
}

const activeAppFiles = getAllFiles(APP_DIR);
console.log(`Tracing from ${activeAppFiles.length} active app files...`);

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
    if (usedFiles.has(file)) return;
    usedFiles.add(file);
    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf8');
    const importRegex = /(?:import|from|import\()\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const resolved = resolveImport(file, match[1]);
        if (resolved) trace(resolved);
    }
}

activeAppFiles.forEach(file => trace(file));

const allCompFiles = getAllFiles(COMPONENTS_DIR);
const unusedComps = allCompFiles.filter(f => !usedFiles.has(f)).map(f => path.relative(ROOT_DIR, f));

console.log(`\nFound ${unusedComps.length} unused components.`);
fs.writeFileSync(path.join(ROOT_DIR, 'scripts/unused_components_verified.json'), JSON.stringify(unusedComps, null, 2));
