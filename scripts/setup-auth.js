const { exec } = require('child_process');
const path = require('path');

console.log("🔧 Setting up authentication system...\n");

// Function to run a command and return a promise
function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`📋 ${description}...`);
    exec(command, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
        return;
      }
      
      if (stderr && !stderr.includes('warning') && !stderr.includes('info')) {
        console.error(`❌ Error: ${stderr}`);
        reject(new Error(stderr));
        return;
      }
      
      console.log(`✅ ${description} completed`);
      if (stdout.trim()) {
        console.log(stdout.trim());
      }
      console.log("");
      resolve();
    });
  });
}

async function setupAuthentication() {
  try {
    // Generate Prisma client
    await runCommand('npx prisma generate', 'Generating Prisma client');
    
    // Push schema to database
    await runCommand('npx prisma db push', 'Pushing schema to database');
    
    // Seed admin user
    await runCommand('node scripts/seed-admin.js', 'Creating admin user');
    
    console.log("🎉 Authentication setup completed successfully!");
    console.log("");
    console.log("🔑 Admin Login Credentials:");
    console.log("   Email: executivefleet.au@gmail.com");
    console.log("   Password: admin@123");
    console.log("");
    console.log("🚀 You can now start the development server with: npm run dev");
    console.log("📱 Then visit: http://localhost:3000/admin/login");
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setupAuthentication();


