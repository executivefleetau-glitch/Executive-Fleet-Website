import LandingLayout from "@/components/landing/LandingLayout";
import FamilyTransfersContent from "@/components/landing/FamilyTransfersContent";

export const metadata = {
  title: "Family Chauffeur Service Melbourne | Free Child Seats | Executive Fleet",
  description: "Stress-free family travel in Melbourne. Free child seats, spacious vehicles, patient drivers. Perfect for airport transfers, family outings, and multi-generational trips. Book now!",
  keywords: "family chauffeur melbourne, child seat car service, family airport transfer, baby capsule taxi, family travel melbourne, kids car service",
  openGraph: {
    title: "Family Chauffeur Service Melbourne | Free Child Seats",
    description: "Stress-free family travel in Melbourne. Free child seats, spacious vehicles, patient drivers. Perfect for airport transfers and family trips.",
    url: "https://executivefleet.com.au/lp/family-transfers/",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://executivefleet.com.au/lp/family-transfers/",
  },
};

export default function FamilyTransfersLandingPage() {
  return (
    <LandingLayout>
      <FamilyTransfersContent />
    </LandingLayout>
  );
}
