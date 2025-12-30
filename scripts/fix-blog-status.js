// Script to fix blog status and published fields
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixBlogStatus() {
  try {
    console.log('🔧 Fixing blog status fields...\n');
    
    // Get all blogs
    const allBlogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        published: true,
        publishedAt: true,
      }
    });

    console.log(`📊 Found ${allBlogs.length} blogs\n`);

    let fixedCount = 0;

    for (const blog of allBlogs) {
      let needsUpdate = false;
      const updates = {};

      // If published=true but status is not 'published', fix it
      if (blog.published === true && blog.status !== 'published') {
        console.log(`⚠️  "${blog.title}": published=true but status="${blog.status}"`);
        updates.status = 'published';
        needsUpdate = true;
      }

      // If status='published' but published=false, fix it
      if (blog.status === 'published' && blog.published === false) {
        console.log(`⚠️  "${blog.title}": status="published" but published=false`);
        updates.published = true;
        needsUpdate = true;
      }

      // If status='published' or published=true but no publishedAt date
      if ((blog.status === 'published' || blog.published === true) && !blog.publishedAt) {
        console.log(`⚠️  "${blog.title}": Missing publishedAt date`);
        updates.publishedAt = new Date();
        needsUpdate = true;
      }

      // Apply updates if needed
      if (needsUpdate) {
        await prisma.blog.update({
          where: { id: blog.id },
          data: updates
        });
        console.log(`   ✅ Fixed: ${JSON.stringify(updates)}\n`);
        fixedCount++;
      }
    }

    if (fixedCount === 0) {
      console.log('✅ All blogs have correct status fields!');
    } else {
      console.log(`\n✅ Fixed ${fixedCount} blog(s)`);
    }

    // Show final status
    const publishedBlogs = await prisma.blog.findMany({
      where: {
        OR: [
          { status: 'published' },
          { published: true }
        ]
      },
      select: {
        title: true,
        status: true,
        published: true,
        publishedAt: true,
      }
    });

    console.log(`\n📊 Final Status:`);
    console.log(`   Published blogs: ${publishedBlogs.length}`);
    publishedBlogs.forEach(blog => {
      console.log(`   - ${blog.title}: status="${blog.status}", published=${blog.published}, publishedAt=${blog.publishedAt}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixBlogStatus();

