import { DM_Sans } from "next/font/google";
import "../public/assets/scss/style.scss";
import Script from "next/script";
import { register } from "swiper/element/bundle";
import ClientLayout from "./ClientLayout";
import AuthProvider from "@/components/providers/AuthProvider";
import VisitTracker from "@/components/VisitTracker";
import { OrganizationSchema, LocalBusinessSchema, WebsiteSchema } from "@/components/seo/StructuredData";

const DM_SansFont = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--dm-saans-font",
  display: "swap", // Optimize font loading performance
});

register();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export const metadata = {
  metadataBase: new URL('https://executivefleet.com.au'),
  title: {
    default: "Executive Fleet Chauffeur Services Melbourne | Private & Corporate Transfers",
    template: "%s | Executive Fleet"
  },
  alternates: {
    canonical: './',
  },
  description: "Melbourne's premier chauffeur service. Luxury airport transfers, corporate travel, weddings, special events. Professional drivers, premium fleet (BMW, Mercedes-Benz), 24/7 service across Melbourne & Victoria.",
  keywords: "Melbourne chauffeur, luxury chauffeur Melbourne, airport transfers Melbourne, corporate chauffeur, executive transport, private driver Melbourne, wedding chauffeur, Executive Fleet",
  authors: [{ name: "Executive Fleet" }],
  creator: "Executive Fleet",
  publisher: "Executive Fleet",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://executivefleet.com.au/",
    siteName: "Executive Fleet",
    title: "Executive Fleet Chauffeur Services Melbourne",
    description: "Melbourne's premier luxury chauffeur service. Airport transfers, corporate travel, weddings & events. Professional drivers, premium fleet, 24/7 service.",
    images: [
      {
        url: "/assets/imgs/logo/EF Logo-01.png",
        width: 1200,
        height: 630,
        alt: "Executive Fleet Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Fleet Chauffeur Services Melbourne",
    description: "Melbourne's premier luxury chauffeur service. Professional drivers, premium fleet, 24/7 service.",
    images: ["/assets/imgs/logo/EF Logo-01.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/imgs/logo/tab.png", type: "image/png" },
    ],
    apple: "/assets/imgs/logo/tab.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/assets/imgs/logo/tab.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/imgs/logo/tab.png" />
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebsiteSchema />
      </head>
      <body className={DM_SansFont.variable}>
        <AuthProvider>
          <VisitTracker />
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R1NLBY4P4M"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-R1NLBY4P4M');
          `}
        </Script>
      </body>
    </html>
  );
}
