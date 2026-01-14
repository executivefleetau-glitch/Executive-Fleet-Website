const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:\\Projetcs\\Executive Fleet Website\\Executive Fleet';
const APP_DIR = path.join(ROOT_DIR, 'app');
const ARCHIVE_COMP_DIR = path.join(ROOT_DIR, 'bulk-archive', 'components');

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
const activeDataFiles = getAllFiles(path.join(ROOT_DIR, 'data'));
const activeUtilsFiles = getAllFiles(path.join(ROOT_DIR, 'utlis'));
const allEntryFiles = [...activeAppFiles, ...activeDataFiles, ...activeUtilsFiles];

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

        // Also check in archive!
        const rel = path.relative(ROOT_DIR, full);
        const arcFull = path.join(ROOT_DIR, 'bulk-archive', rel);
        if (fs.existsSync(arcFull) && fs.lstatSync(arcFull).isFile()) return arcFull;
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

allEntryFiles.forEach(file => trace(file));

console.log('--- RESTORING NECESSARY COMPONENTS ---');
let restoreCount = 0;
usedFiles.forEach(file => {
    if (file.includes('bulk-archive')) {
        const rel = path.relative(path.join(ROOT_DIR, 'bulk-archive'), file);
        const dest = path.join(ROOT_DIR, rel);
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

        try {
            fs.renameSync(file, dest);
            console.log(`Restored: ${rel}`);
            restoreCount++;
        } catch (err) {
            console.error(`Error restoring ${rel}: ${err.message}`);
        }
    }
});

console.log(`\nVerification complete. Restored ${restoreCount} files.`);
