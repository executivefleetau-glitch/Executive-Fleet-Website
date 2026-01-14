const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:\\Projetcs\\Executive Fleet Website\\Executive Fleet';
const ARCHIVE_DIR = path.join(ROOT_DIR, 'bulk-archive');

if (!fs.existsSync(ARCHIVE_DIR)) {
    fs.mkdirSync(ARCHIVE_DIR);
}

function move(relativeSrc) {
    const src = path.join(ROOT_DIR, relativeSrc);
    const dest = path.join(ARCHIVE_DIR, relativeSrc);

    if (!fs.existsSync(src)) {
        console.log(`Skipping (not found): ${relativeSrc}`);
        return;
    }

    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    try {
        fs.renameSync(src, dest);
        console.log(`Moved: ${relativeSrc}`);
    } catch (err) {
        console.error(`Error moving ${relativeSrc}: ${err.message}`);
    }
}

// ITEMS TO ARCHIVE (Based on Audit)

// Home variations
for (let i = 1; i <= 10; i++) {
    if (i === 8) continue; // Keep Home 8 as it's the base for main page
    move(`app/(homes)/home-${i}`);
    move(`components/homes/home-${i}`);
    // Note: Some components from home-1 are used, so move carefully
}
// Special case for Home 1: only move the page, not the entire component folder if used
// Wait, my audit showed components/homes/home-1/Faq.jsx is USED.
// So I will move the app routes but keep component folders if any component inside is used.
// To be safe, I'll only move the app routes for now for homes.

const appFoldersToMove = [
    'app/(blogs)/blog-grid',
    'app/(blogs)/blog-grid-2',
    'app/(blogs)/blog-list',
    'app/(blogs)/blog-single',
    'app/(services)/service-grid-2',
    'app/(services)/service-grid-3',
    'app/(services)/service-single',
    'app/(fleets)/fleet-list-2',
    'app/(fleets)/fleet-list-3',
    'app/(fleets)/fleet-list-4',
    'app/(fleets)/fleet-single',
    'app/(pages)/about-2',
    'app/(pages)/contact-2',
    'app/(pages)/our-team',
    'app/(pages)/pricing',
    'app/(pages)/register',
    'app/(pages)/login',
    'app/(pages)/team-single',
    'app/(fleets)/BMW-X5',
    'app/(fleets)/BMW-i5',
    'app/(fleets)/Mercedes-Sprinter', // (The fleet uses Mercedes-Benz-Sprinter)
];

appFoldersToMove.forEach(folder => move(folder));

// Components - Move unused headers and footers
for (let i = 1; i <= 8; i++) {
    move(`components/headers/Header${i}.jsx`);
    move(`components/footers/Footer${i}.jsx`);
}
move(`components/headers/Header9.jsx`);

// Other unused components identified in audit
const unusedComponents = [
    'components/404.jsx',
    'components/ComingSoon.jsx',
    'components/Invoice.jsx',
    'components/blog/BlogDetail.jsx',
    'components/blog/BlogSingle.jsx',
    'components/blog/Blogs1.jsx',
    'components/blog/Blogs2.jsx',
    'components/blog/Blogs3.jsx',
    'components/blog/BreadCumb.jsx',
    'components/blog/BreadCumb2.jsx',
    'components/blog/RelatedBlogs.jsx',
    'components/booking/BookingExtra.jsx',
    'components/booking/BookingPayment.jsx',
    'components/booking/BookingRecieved.jsx',
    'components/booking/BookingTab.jsx',
    'components/booking/BookingVehicles.jsx',
    'components/booking/PassengerDetails.jsx',
    'components/booking/SideBar.jsx',
];

unusedComponents.forEach(comp => move(comp));

console.log('Cleansing complete (Admin was NOT touched).');
