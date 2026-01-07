const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function applyRLS() {
    console.log('🔐 Applying Row-Level Security (RLS) Migration...\n');

    try {
        // Step 1: Enable RLS on bookings table
        console.log('   [1/5] Enabling RLS on bookings table...');
        await prisma.$executeRawUnsafe('ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;');
        console.log('   ✅ Success\n');

        // Step 2: Enable RLS on users table
        console.log('   [2/5] Enabling RLS on users table...');
        await prisma.$executeRawUnsafe('ALTER TABLE users ENABLE ROW LEVEL SECURITY;');
        console.log('   ✅ Success\n');

        // Step 3: Create admin_only_bookings policy
        console.log('   [3/5] Creating admin_only_bookings policy...');
        await prisma.$executeRawUnsafe(`
      CREATE POLICY "admin_only_bookings" ON bookings
        FOR ALL
        USING (
          EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = current_setting('app.current_user_id', true)::text 
            AND users.role = 'admin'
          )
        )
        WITH CHECK (
          EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = current_setting('app.current_user_id', true)::text 
            AND users.role = 'admin'
          )
        );
    `);
        console.log('   ✅ Success\n');

        // Step 4: Create user_access_policy
        console.log('   [4/5] Creating user_access_policy...');
        await prisma.$executeRawUnsafe(`
      CREATE POLICY "user_access_policy" ON users
        FOR SELECT
        USING (
          EXISTS (
            SELECT 1 FROM users u
            WHERE u.id = current_setting('app.current_user_id', true)::text
            AND (u.role = 'admin' OR u.id = users.id)
          )
        );
    `);
        console.log('   ✅ Success\n');

        // Step 5: Create admin_only_user_modifications policy
        console.log('   [5/5] Creating admin_only_user_modifications policy...');
        await prisma.$executeRawUnsafe(`
      CREATE POLICY "admin_only_user_modifications" ON users
        FOR INSERT, UPDATE, DELETE
        USING (
          EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = current_setting('app.current_user_id', true)::text 
            AND users.role = 'admin'
          )
        )
        WITH CHECK (
          EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = current_setting('app.current_user_id', true)::text 
            AND users.role = 'admin'
          )
        );
    `);
        console.log('   ✅ Success\n');

        console.log('🎉 Row-Level Security migration completed successfully!\n');
        console.log('📋 Summary:');
        console.log('   ✅ RLS enabled on "bookings" table');
        console.log('   ✅ RLS enabled on "users" table');
        console.log('   ✅ Created "admin_only_bookings" policy');
        console.log('   ✅ Created "user_access_policy" policy');
        console.log('   ✅ Created "admin_only_user_modifications" policy\n');

    } catch (error) {
        // Check if it's an "already exists" error
        if (error.message.includes('already exists')) {
            console.log('   ⚠️  Policy or RLS already enabled, skipping...\n');
            console.log('✅ RLS is already configured on your database!\n');
        } else {
            console.error('❌ Migration failed:', error.message);
            process.exit(1);
        }
    } finally {
        await prisma.$disconnect();
    }
}

applyRLS();
