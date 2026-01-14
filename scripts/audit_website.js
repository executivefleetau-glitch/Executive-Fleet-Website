const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:\\Projetcs\\Executive Fleet Website\\Executive Fleet';
const APP_DIR = path.join(ROOT_DIR, 'app');

function getAllFiles(dir, allFiles = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                getAllFiles(fullPath, allFiles);
            }
        } else {
            if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.tsx') || file.endsWith('.ts')) {
                allFiles.push(fullPath);
            }
        }
    }
    return allFiles;
}

const allFiles = getAllFiles(ROOT_DIR);
const allPages = allFiles.filter(f => f.includes('app') && (f.endsWith('page.jsx') || f.endsWith('page.js')));

function getRouteFromFilePath(filePath) {
    let relative = path.relative(APP_DIR, filePath);
    relative = relative.replace(/\\/g, '/');
    relative = relative.replace(/\/page\.(jsx|js)$/, '');
    if (relative === 'page.jsx' || relative === 'page.js') return '/';

    // Remove route groups
    let parts = relative.split('/').filter(p => !p.startsWith('(') || !p.endsWith(')'));

    return '/' + parts.join('/');
}

const routes = allPages.map(p => ({
    file: p,
    route: getRouteFromFilePath(p),
    isUsed: false,
    mentions: 0
}));

// Route '/' is always used
routes.find(r => r.route === '/').isUsed = true;

// Search for mentions of each route in all files (JSX and JS data files)
allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    routes.forEach(r => {
        if (r.route === '/') return;

        // Escape for regex
        const escapedRoute = r.route.replace(/[.*+?^${}()|[\]\\]/g, '\\$\u0026');
        const regex = new RegExp(`['"]${escapedRoute}['"]`, 'g');

        if (regex.test(content)) {
            // Avoid counting the file itself if it's the page file
            if (file !== r.file) {
                r.isUsed = true;
                r.mentions++;
            }
        }
    });
});

// Special case: Dynamic routes like [id]
// If the parent is used, the [id] route might be used
routes.forEach(r => {
    if (r.route.includes('/[')) {
        const parentRoute = r.route.split('/[').shift();
        if (routes.some(other => other.route === parentRoute && other.isUsed)) {
            // r.isUsed = true; // Not necessarily, but likely
        }
    }
});

console.log('--- PAGE AUDIT ---');
routes.sort((a, b) => a.route.localeCompare(b.route)).forEach(r => {
    console.log(`${r.isUsed ? '[USED]' : '[UNUSED]'} ${r.route} (${path.relative(ROOT_DIR, r.file)})`);
});

// Component Audit
const allComponents = allFiles.filter(f => f.includes('components') && (f.endsWith('.jsx') || f.endsWith('.js')));
const componentUsage = allComponents.map(c => ({
    file: c,
    name: path.basename(c, path.extname(c)),
    isUsed: false
}));

// Components used in USED pages
const usedPages = routes.filter(r => r.isUsed).map(r => r.file);
let checkedFiles = new Set();
// Always include layout and index
let filesToCheck = [...usedPages, path.join(APP_DIR, 'layout.jsx'), path.join(APP_DIR, 'ClientLayout.jsx')];

while (filesToCheck.length > 0) {
    const currentFile = filesToCheck.shift();
    if (checkedFiles.has(currentFile)) continue;
    checkedFiles.add(currentFile);

    if (!fs.existsSync(currentFile)) continue;
    const content = fs.readFileSync(currentFile, 'utf8');

    componentUsage.forEach(c => {
        const compName = c.name;
        // Search for import or usage
        if (content.includes(`/${compName}`) || content.includes(`from "@/components/`) || content.includes(`<${compName}`)) {
            // Heuristic: if filename or component tag is mentioned
            if (content.includes(compName)) {
                c.isUsed = true;
                filesToCheck.push(c.file);
            }
        }
    });

    // Also check if components are used in other components
}

console.log('\n--- COMPONENT AUDIT ---');
componentUsage.sort((a, b) => a.name.localeCompare(b.name)).forEach(c => {
    console.log(`${c.isUsed ? '[USED]' : '[UNUSED]'} ${c.name} (${path.relative(ROOT_DIR, c.file)})`);
});
