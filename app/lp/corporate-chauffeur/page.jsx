import LandingLayout from "@/components/landing/LandingLayout";
import CorporateChauffeurContent from "@/components/landing/CorporateChauffeurContent";

export const metadata = {
  title: "Corporate Chauffeur Melbourne | Executive Fleet",
  description: "Professional corporate chauffeur service in Melbourne. Executive vehicles, punctual service, confidential. Perfect for business meetings, conferences & client transfers.",
  keywords: "corporate chauffeur melbourne, executive car service, business chauffeur, corporate transfers melbourne, executive transport",
  openGraph: {
    title: "Corporate Chauffeur Melbourne | Executive Fleet",
    description: "Professional corporate chauffeur service in Melbourne. Executive vehicles, punctual service, confidential.",
    url: "https://executivefleet.com.au/lp/corporate-chauffeur/",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://executivefleet.com.au/lp/corporate-chauffeur/",
  },
};

export default function CorporateChauffeurLandingPage() {
  return (
    <LandingLayout>
      <CorporateChauffeurContent />
    </LandingLayout>
  );
}
