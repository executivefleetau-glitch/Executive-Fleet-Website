const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:\\Projetcs\\Executive Fleet Website\\Executive Fleet';

const replacements = {
    '/services': '/services',
    '/services': '/services',
    '/services': '/services',
    '/blogs': '/blogs',
    '/blogs': '/blogs',
    '/blogs': '/blogs',
    '/fleet-list': '/fleet-list',
    '/fleet-list': '/fleet-list',
    '/fleet-list': '/fleet-list',
    '/contact': '/contact',
    '/about': '/about',
    '/about': '/about', // User doesn't seem to have a dedicated team page linked, about is safer
    '/contact': '/contact', // Pricing variation doesn't exist, redirect to contact or home
};

function getAllFiles(dir, allFiles = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git' && file !== 'bulk-archive') {
                getAllFiles(fullPath, allFiles);
            }
        } else {
            if (file.endsWith('.jsx') || file.endsWith('.js')) {
                allFiles.push(fullPath);
            }
        }
    }
    return allFiles;
}

const files = getAllFiles(ROOT_DIR);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    for (const [key, value] of Object.entries(replacements)) {
        // Use regex to match only full quotes / strings
        const regex = new RegExp(`(['"])${key.replace(/\//g, '\\/')}(['"])`, 'g');
        if (regex.test(content)) {
            content = content.replace(regex, `$1${value}$2`);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated links in: ${path.relative(ROOT_DIR, file)}`);
    }
});

console.log('Link fixing complete.');
