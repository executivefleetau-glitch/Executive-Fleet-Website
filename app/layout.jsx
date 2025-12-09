import { DM_Sans } from "next/font/google";
import "../public/assets/scss/style.scss";
import { register } from "swiper/element/bundle";
import ClientLayout from "./ClientLayout";
import AuthProvider from "@/components/providers/AuthProvider";
import { OrganizationSchema, LocalBusinessSchema, WebsiteSchema } from "@/components/seo/StructuredData";

const DM_SansFont = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--dm-saans-font",
  display: "swap", // Optimize font loading performance
});

register();

export const metadata = {
  title: {
    default: "Executive Fleet Chauffeur Services Melbourne | Private & Corporate Transfers",
    template: "%s | Executive Fleet"
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
  // PREVENT SEARCH ENGINE INDEXING (Development Mode)
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
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
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
