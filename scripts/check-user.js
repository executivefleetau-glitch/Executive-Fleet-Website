const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUser() {
    try {
        console.log('🔍 Checking for editor user...\n');

        const user = await prisma.user.findUnique({
            where: { email: 'Nayabriaz31@gmail.com' }
        });

        if (user) {
            console.log('✅ User found in database:');
            console.log(`   ID: ${user.id}`);
            console.log(`   Email: ${user.email}`);
            console.log(`   Name: ${user.name}`);
            console.log(`   Role: ${user.role}`);
            console.log(`   isAdmin: ${user.isAdmin}`);
            console.log(`   Password Hash: ${user.password.substring(0, 20)}...`);
            console.log('\n✅ User exists! The issue might be with password hashing.');
        } else {
            console.log('❌ User NOT found in database!');
            console.log('   The user creation might have failed.');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkUser();
