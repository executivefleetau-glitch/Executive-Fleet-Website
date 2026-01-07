const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const prisma = new PrismaClient();

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function createUsers() {
    try {
        console.log("🚀 User Creation Script");
        console.log("========================\n");

        // Admin User Creation
        console.log("📋 ADMIN USER SETUP");
        console.log("-------------------");

        const adminEmail = await question("Admin Email (default: admin@executivefleet.com): ");
        const adminPassword = await question("Admin Password (default: admin@123): ");
        const adminName = await question("Admin Name (default: Executive Fleet Admin): ");

        const finalAdminEmail = adminEmail.trim() || "admin@executivefleet.com";
        const finalAdminPassword = adminPassword.trim() || "admin@123";
        const finalAdminName = adminName.trim() || "Executive Fleet Admin";

        // Check if admin already exists
        const existingAdmin = await prisma.user.findUnique({
            where: { email: finalAdminEmail },
        });

        if (existingAdmin) {
            console.log(`\n⚠️  Admin user with email ${finalAdminEmail} already exists. Skipping...\n`);
        } else {
            const hashedAdminPassword = await bcrypt.hash(finalAdminPassword, 12);

            const adminUser = await prisma.user.create({
                data: {
                    email: finalAdminEmail,
                    password: hashedAdminPassword,
                    name: finalAdminName,
                    role: "admin",
                    isAdmin: true,
                },
            });

            console.log(`\n✅ Admin user created successfully!`);
            console.log(`   Email: ${adminUser.email}`);
            console.log(`   Role: ${adminUser.role}\n`);
        }

        // Editor User Creation
        console.log("📋 EDITOR USER SETUP");
        console.log("--------------------");

        const editorEmail = await question("Editor Email (default: editor@executivefleet.com): ");
        const editorPassword = await question("Editor Password (default: editor@123): ");
        const editorName = await question("Editor Name (default: Blog Editor): ");

        const finalEditorEmail = editorEmail.trim() || "editor@executivefleet.com";
        const finalEditorPassword = editorPassword.trim() || "editor@123";
        const finalEditorName = editorName.trim() || "Blog Editor";

        // Check if editor already exists
        const existingEditor = await prisma.user.findUnique({
            where: { email: finalEditorEmail },
        });

        if (existingEditor) {
            console.log(`\n⚠️  Editor user with email ${finalEditorEmail} already exists. Skipping...\n`);
        } else {
            const hashedEditorPassword = await bcrypt.hash(finalEditorPassword, 12);

            const editorUser = await prisma.user.create({
                data: {
                    email: finalEditorEmail,
                    password: hashedEditorPassword,
                    name: finalEditorName,
                    role: "editor",
                    isAdmin: false,
                },
            });

            console.log(`\n✅ Editor user created successfully!`);
            console.log(`   Email: ${editorUser.email}`);
            console.log(`   Role: ${editorUser.role}\n`);
        }

        console.log("========================");
        console.log("🎉 User creation complete!");
        console.log("========================\n");
        console.log("📝 Login Credentials Summary:");
        console.log("----------------------------");
        console.log(`Admin:  ${finalAdminEmail} / ${finalAdminPassword}`);
        console.log(`Editor: ${finalEditorEmail} / ${finalEditorPassword}\n`);

    } catch (error) {
        console.error("❌ Error creating users:", error);
        process.exit(1);
    } finally {
        rl.close();
        await prisma.$disconnect();
    }
}

createUsers();
