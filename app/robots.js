export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/_next/', '/private/'],
        },
        sitemap: 'https://executivefleet.com.au/sitemap.xml',
    }
}
