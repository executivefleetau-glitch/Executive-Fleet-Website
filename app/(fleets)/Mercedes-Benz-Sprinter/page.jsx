import MercedesSprinterClient from "./MercedesSprinterClient";

export const metadata = {
  title: "Mercedes-Benz Sprinter Chauffeur Melbourne | Executive Fleet",
  description:
    "Hire the Mercedes-Benz Sprinter for group travel in Melbourne. Luxury van with seating for 12-15 passengers, perfect for corporate events and airport transfers.",
  alternates: {
    canonical: "/Mercedes-Benz-Sprinter",
  },
  openGraph: {
    title: "Mercedes-Benz Sprinter Chauffeur Melbourne | Executive Fleet",
    description:
      "The ultimate luxury van. Book the Mercedes Sprinter for your next group transfer in Melbourne.",
    images: ["/assets/imgs/cars/Mercedes-Benz Sprinter.png"],
  },
};

export default function MercedesSprinterPage() {
  return <MercedesSprinterClient />;
}
