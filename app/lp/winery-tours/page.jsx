import LandingLayout from "@/components/landing/LandingLayout";
import WineryToursContent from "@/components/landing/WineryToursContent";

export const metadata = {
  title: "Yarra Valley Winery Tours | Executive Chauffeur Melbourne",
  description: "Premium Yarra Valley winery tours with private chauffeur. Visit top wineries, enjoy tastings, and travel in luxury. Full-day tours from Melbourne from $590.",
  keywords: "yarra valley winery tour, private wine tour melbourne, yarra valley chauffeur, wine tour private driver, luxury winery tour",
  openGraph: {
    title: "Yarra Valley Winery Tours | Executive Chauffeur Melbourne",
    description: "Premium Yarra Valley winery tours with private chauffeur. Visit top wineries, enjoy tastings, and travel in luxury.",
    url: "https://executivefleet.com.au/lp/winery-tours/",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://executivefleet.com.au/lp/winery-tours/",
  },
};

export default function WineryToursLandingPage() {
  return (
    <LandingLayout>
      <WineryToursContent />
    </LandingLayout>
  );
}
