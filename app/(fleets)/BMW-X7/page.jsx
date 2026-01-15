import BMWX7Client from "./BMWX7Client";

export const metadata = {
  title: "BMW X7 Chauffeur Hire in Melbourne | Premium SUV",
  description:
    "Experience the ultimate luxury SUV with the BMW X7. Book your professional chauffeur in Melbourne for weddings, corporate events, and airport transfers.",
  alternates: {
    canonical: '/BMW-X7/',
  },
  openGraph: {
    title: "Hire BMW X7 Chauffeur Melbourne | Executive Fleet",
    description:
      "The BMW X7 sets a new standard for luxury. Chauffeur services available in Melbourne.",
    images: ["/assets/imgs/cars/BMW X7.png"],
  },
};

export default function BMWX7Page() {
  return <BMWX7Client />;
}
