/**
 * Dynamic Sitemap Generator for Executive Fleet
 * Next.js will automatically generate sitemap.xml from this file
 */

export default function sitemap() {
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

  // Blog pages (if applicable)
  const blogPages = [
    '/blog-grid-2',
  ];

  // Combine all pages
  const allPages = [...staticPages, ...servicePages, ...fleetPages, ...blogPages];

  return allPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.includes('booking') ? 0.9 : 0.8,
  }));
}












