// Quick script to check blog status in database
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkBlogs() {
  try {
    console.log('🔍 Checking all blogs in database...\n');
    
    const allBlogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        published: true,
        publishedAt: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`📊 Total blogs in database: ${allBlogs.length}\n`);

    if (allBlogs.length === 0) {
      console.log('❌ No blogs found in database!');
      return;
    }

    console.log('📋 Blog Details:\n');
    allBlogs.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title}`);
      console.log(`   ID: ${blog.id}`);
      console.log(`   Slug: ${blog.slug}`);
      console.log(`   Status: ${blog.status}`);
      console.log(`   Published (boolean): ${blog.published}`);
      console.log(`   Published At: ${blog.publishedAt || 'Not set'}`);
      console.log(`   Created At: ${blog.createdAt}`);
      console.log('');
    });

    // Count by status
    const statusCount = {};
    allBlogs.forEach(blog => {
      statusCount[blog.status] = (statusCount[blog.status] || 0) + 1;
    });

    console.log('📊 Blogs by Status:');
    Object.entries(statusCount).forEach(([status, count]) => {
      console.log(`   ${status}: ${count}`);
    });

    const publishedCount = allBlogs.filter(b => b.published === true).length;
    console.log(`\n📊 Blogs with published=true: ${publishedCount}`);

    // Check for published blogs
    const publishedBlogs = allBlogs.filter(
      b => b.status === 'published' || b.published === true
    );
    
    console.log(`\n✅ Blogs that should appear on website: ${publishedBlogs.length}`);
    if (publishedBlogs.length > 0) {
      console.log('   These are:');
      publishedBlogs.forEach(blog => {
        console.log(`   - ${blog.title} (status: ${blog.status}, published: ${blog.published})`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBlogs();

