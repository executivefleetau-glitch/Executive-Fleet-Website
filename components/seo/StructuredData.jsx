/**
 * Structured Data (JSON-LD) Component
 * For rich snippets in Google Search
 */

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Executive Fleet",
    "description": "Melbourne's premier luxury chauffeur service offering airport transfers, corporate travel, weddings, and special events.",
    "url": "https://executivefleet.com.au",
    "logo": "https://executivefleet.com.au/assets/imgs/logo/EF Logo-01.png",
    "image": "https://executivefleet.com.au/assets/imgs/logo/EF Logo-01.png",
    "telephone": "+61-XXX-XXX-XXX", // TODO: Replace with actual phone
    "email": "executivefleet.au@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Melbourne",
      "addressRegion": "VIC",
      "addressCountry": "AU"
    },
    "sameAs": [
      // TODO: Add social media profiles
      // "https://www.facebook.com/executivefleet",
      // "https://www.instagram.com/executivefleet",
      // "https://www.linkedin.com/company/executivefleet"
    ],
    "priceRange": "$$$",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "-37.8136",
        "longitude": "144.9631"
      },
      "geoRadius": "100000"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://executivefleet.com.au/#localbusiness",
    "name": "Executive Fleet",
    "description": "Premier chauffeur services in Melbourne. Airport transfers, corporate travel, weddings, and special events with luxury vehicles.",
    "url": "https://executivefleet.com.au",
    "telephone": "+61-XXX-XXX-XXX", // TODO: Replace with actual phone
    "email": "executivefleet.au@gmail.com",
    "image": "https://executivefleet.com.au/assets/imgs/logo/EF Logo-01.png",
    "logo": "https://executivefleet.com.au/assets/imgs/logo/EF Logo-01.png",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Melbourne",
      "addressRegion": "VIC",
      "postalCode": "3000",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-37.8136",
      "longitude": "144.9631"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Melbourne"
      },
      {
        "@type": "State",
        "name": "Victoria"
      }
    ],
    "serviceType": [
      "Airport Transfer",
      "Corporate Chauffeur",
      "Wedding Car Hire",
      "Special Event Transport",
      "Winery Tours"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Executive Fleet",
    "description": "Melbourne's premier luxury chauffeur service",
    "url": "https://executivefleet.com.au",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://executivefleet.com.au/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({ service }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "provider": {
      "@type": "Organization",
      "name": "Executive Fleet",
      "url": "https://executivefleet.com.au"
    },
    "areaServed": {
      "@type": "City",
      "name": "Melbourne"
    },
    "description": service.description,
    "image": service.image,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AUD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://executivefleet.com.au${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}











