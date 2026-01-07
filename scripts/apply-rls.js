// Load environment variables from .env file
require('dotenv').config();

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function applyRLS() {
    // Read database URL from environment
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        console.error('❌ DATABASE_URL not found in environment variables');
        process.exit(1);
    }

    console.log('🔐 Applying Row-Level Security (RLS) Migration...\n');

    // Create PostgreSQL client with SSL configuration for Supabase
    const client = new Client({
        connectionString: databaseUrl,
        ssl: {
            rejectUnauthorized: false // Required for Supabase connections
        }
    });

    try {
        // Connect to database
        await client.connect();
        console.log('✅ Connected to database\n');

        // Read SQL migration file
        const sqlPath = path.join(__dirname, 'enable-rls.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Split by statements (simple split by semicolon)
        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0 && !s.startsWith('--'));

        console.log(`📝 Executing ${statements.length} SQL statements...\n`);

        // Execute each statement
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];

            // Skip comments and empty lines
            if (statement.startsWith('--') || statement.trim().length === 0) {
                continue;
            }

            try {
                console.log(`   [${i + 1}/${statements.length}] Executing...`);
                await client.query(statement);
                console.log(`   ✅ Success\n`);
            } catch (error) {
                // Check if it's a "policy already exists" error
                if (error.message.includes('already exists')) {
                    console.log(`   ⚠️  Policy already exists, skipping...\n`);
                } else {
                    console.error(`   ❌ Error: ${error.message}\n`);
                    throw error;
                }
            }
        }

        console.log('🎉 Row-Level Security migration completed successfully!\n');
        console.log('📋 Summary:');
        console.log('   ✅ RLS enabled on "bookings" table');
        console.log('   ✅ RLS enabled on "users" table');
        console.log('   ✅ Created "admin_only_bookings" policy');
        console.log('   ✅ Created "user_access_policy" policy');
        console.log('   ✅ Created "admin_only_user_modifications" policy\n');

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

applyRLS();
