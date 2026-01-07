const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function updateExistingUsers() {
    try {
        console.log("🔄 Updating existing users with role field...\n");

        // Update all admin users to have role "admin"
        const adminUpdate = await prisma.user.updateMany({
            where: { isAdmin: true },
            data: { role: "admin" },
        });

        console.log(`✅ Updated ${adminUpdate.count} admin user(s) to role "admin"`);

        // Update all non-admin users to have role "editor"
        const editorUpdate = await prisma.user.updateMany({
            where: { isAdmin: false },
            data: { role: "editor" },
        });

        console.log(`✅ Updated ${editorUpdate.count} non-admin user(s) to role "editor"`);
        console.log("\n🎉 User role migration complete!");

    } catch (error) {
        console.error("❌ Error updating users:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

updateExistingUsers();
