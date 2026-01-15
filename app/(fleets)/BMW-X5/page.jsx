import BMWX5Client from "./BMWX5Client";

export const metadata = {
  title: "Hire BMW X5 Chauffeur Melbourne | Executive Fleet",
  description:
    "Book the BMW X5 for a premium chauffeur experience in Melbourne. Spacious luxury SUV perfect for business travel, airport transfers, and special events.",
  alternates: {
    canonical: "/BMW-X5",
  },
  openGraph: {
    title: "Hire BMW X5 Chauffeur Melbourne | Executive Fleet",
    description:
      "Experience the BMW X5. Luxury, comfort, and style for your next Melbourne journey.",
    images: ["/assets/imgs/cars/BMW X5.png"],
  },
};

export default function BMWX5Page() {
  return <BMWX5Client />;
}
