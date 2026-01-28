const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function resetAdminPassword() {
  const newPassword = "admin@123"; // You can change this
  
  try {
    console.log("🔐 Resetting admin password...");
    console.log(`   Target email: executivefleet.au@gmail.com`);

    // Find the admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: "executivefleet.au@gmail.com" },
    });

    if (!adminUser) {
      console.log("❌ Admin user not found!");
      console.log("   Run: node scripts/seed-admin.js to create one");
      return;
    }

    console.log(`✅ Found admin user: ${adminUser.name}`);
    console.log(`   Current role: ${adminUser.role}`);
    console.log(`   Is Admin: ${adminUser.isAdmin}`);

    // Hash the new password
    console.log("\n🔐 Hashing new password...");
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    console.log("📝 Updating password in database...");
    await prisma.user.update({
      where: { email: "executivefleet.au@gmail.com" },
      data: { 
        password: hashedPassword,
        isAdmin: true, // Ensure admin flag is set
        role: "admin"  // Ensure role is set
      },
    });

    console.log("\n✅ Password reset successfully!");
    console.log("\n🔑 New login credentials:");
    console.log("   Email: executivefleet.au@gmail.com");
    console.log(`   Password: ${newPassword}`);
    
  } catch (error) {
    console.error("❌ Error resetting password:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword();
