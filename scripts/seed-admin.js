const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log("🚀 Starting admin user seeding...");

    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { isAdmin: true },
    });

    if (existingAdmin) {
      console.log("✅ Admin user already exists:");
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Name: ${existingAdmin.name}`);
      return;
    }

    // Hash the password
    console.log("🔐 Hashing password...");
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash("admin@123", saltRounds);

    // Create the admin user
    console.log("👤 Creating admin user...");
    const adminUser = await prisma.user.create({
      data: {
        email: "executivefleet.au@gmail.com",
        password: hashedPassword,
        name: "Executive Fleet Admin",
        isAdmin: true,
      },
    });

    console.log("✅ Admin user created successfully:");
    console.log(`   ID: ${adminUser.id}`);
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Name: ${adminUser.name}`);
    console.log(`   Admin: ${adminUser.isAdmin}`);
    console.log("");
    console.log("🔑 Login credentials:");
    console.log("   Email: executivefleet.au@gmail.com");
    console.log("   Password: admin@123");
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();


