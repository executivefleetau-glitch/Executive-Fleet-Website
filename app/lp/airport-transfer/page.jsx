import LandingLayout from "@/components/landing/LandingLayout";
import AirportLandingContent from "@/components/landing/AirportLandingContent";

export const metadata = {
  title: "Melbourne Airport Transfers | Executive Fleet Chauffeurs",
  description: "Premium Melbourne Airport transfers from $150. Professional chauffeurs, luxury vehicles, meet & greet service. Book your Tullamarine airport pickup today.",
  keywords: "melbourne airport transfer, tullamarine chauffeur, airport pickup melbourne, luxury airport transfer, executive airport service",
  openGraph: {
    title: "Melbourne Airport Transfers | Executive Fleet Chauffeurs",
    description: "Premium Melbourne Airport transfers from $150. Professional chauffeurs, luxury vehicles, meet & greet service.",
    url: "https://executivefleet.com.au/lp/airport-transfer/",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://executivefleet.com.au/lp/airport-transfer/",
  },
};

export default function AirportTransferLandingPage() {
  return (
    <LandingLayout>
      <AirportLandingContent />
    </LandingLayout>
  );
}
