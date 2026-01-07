const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixEmailCase() {
    try {
        console.log('🔧 Fixing email case for editor user...\n');

        // Update the email to lowercase
        const updatedUser = await prisma.user.update({
            where: { email: 'Nayabriaz31@gmail.com' },
            data: { email: 'nayabriaz31@gmail.com' }
        });

        console.log('✅ Email updated successfully!');
        console.log(`   Old: Nayabriaz31@gmail.com`);
        console.log(`   New: ${updatedUser.email}`);
        console.log('\n✅ You can now log in with: nayabriaz31@gmail.com / nayab@123\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

fixEmailCase();
