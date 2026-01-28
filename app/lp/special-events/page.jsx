import LandingLayout from "@/components/landing/LandingLayout";
import SpecialEventsContent from "@/components/landing/SpecialEventsContent";

export const metadata = {
  title: "Special Event Transport Melbourne | Executive Fleet Chauffeurs",
  description: "Luxury chauffeur service for Melbourne special events. Concerts, sports, races, galas, and more. Professional drivers, premium vehicles, stress-free arrival.",
  keywords: "event transport melbourne, concert chauffeur, spring racing carnival transport, melbourne cup chauffeur, gala transport melbourne",
  openGraph: {
    title: "Special Event Transport Melbourne | Executive Fleet Chauffeurs",
    description: "Luxury chauffeur service for Melbourne special events. Concerts, sports, races, galas, and more.",
    url: "https://executivefleet.com.au/lp/special-events/",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://executivefleet.com.au/lp/special-events/",
  },
};

export default function SpecialEventsLandingPage() {
  return (
    <LandingLayout>
      <SpecialEventsContent />
    </LandingLayout>
  );
}
