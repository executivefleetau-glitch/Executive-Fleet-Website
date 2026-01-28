import LandingLayout from "@/components/landing/LandingLayout";
import WeddingCarHireContent from "@/components/landing/WeddingCarHireContent";

export const metadata = {
  title: "Wedding Car Hire Melbourne | Luxury Chauffeur Service",
  description: "Elegant wedding car hire in Melbourne. Mercedes, BMW & Audi luxury vehicles. Professional chauffeurs, red carpet service. Make your special day unforgettable.",
  keywords: "wedding car hire melbourne, wedding chauffeur melbourne, luxury wedding car, bridal car hire, wedding transport melbourne",
  openGraph: {
    title: "Wedding Car Hire Melbourne | Luxury Chauffeur Service",
    description: "Elegant wedding car hire in Melbourne. Mercedes, BMW & Audi luxury vehicles. Professional chauffeurs.",
    url: "https://executivefleet.com.au/lp/wedding-car-hire/",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://executivefleet.com.au/lp/wedding-car-hire/",
  },
};

export default function WeddingCarHireLandingPage() {
  return (
    <LandingLayout>
      <WeddingCarHireContent />
    </LandingLayout>
  );
}
