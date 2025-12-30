/**
 * Dynamic Sitemap Generator for Executive Fleet
 * Next.js will automatically generate sitemap.xml from this file
 */

import prisma from '@/lib/prisma';

export default async function sitemap() {
  const baseUrl = 'https://executivefleet.com.au';

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/booking-vehicle',
    '/faq',
    '/privacy-policy',
    '/terms-and-conditions',
    '/legal-notice',
  ];

  // Service pages
  const servicePages = [
    '/airport-transfer',
    '/corporate-travel',
    '/family-travel',
    '/special-event',
    '/winery-tour',
  ];

  // Fleet pages
  const fleetPages = [
    '/fleet-list',
    '/BMW-5-series',
    '/BMW-i5',
    '/BMW-X5',
    '/BMW-X7',
    '/Mercedes-GLS',
    '/Mercedes-Benz-Sprinter',
  ];

  // Fetch dynamic blog posts
  const blogs = await prisma.blog.findMany({
    where: {
      status: 'published',
      published: true,
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Combine local pages
  const staticUrls = [...staticPages, ...servicePages, ...fleetPages].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.includes('booking') ? 0.9 : 0.8,
  }));

  return [...staticUrls, ...blogUrls];
}















