import CorporateTravelClient from "./CorporateTravelClient";
import { services2 } from "@/data/services";

export const metadata = {
  title: "Corporate Transfers Melbourne | Executive Chauffeur Service",
  description:
    "Premium corporate transfers Melbourne by Executive Fleet. Luxury chauffeur-driven sedans, SUVs & vans for airport, hotel, conference & executive meetings. Fixed rates, discreet service across Melbourne CBD & suburbs.",
  keywords:
    "corporate transfers Melbourne, executive chauffeur Melbourne, business travel Melbourne, corporate car service, professional chauffeur services",
  alternates: {
    canonical: "/corporate-travel",
  },
  openGraph: {
    title: "Corporate Transfers Melbourne | Executive Chauffeur Service",
    description:
      "Premium corporate transfers Melbourne by Executive Fleet. Luxury chauffeur-driven sedans, SUVs & vans for executive meetings and events.",
    images: ["/assets/imgs/banner/corporate.jpg"],
  },
};

export default function CorporateTravelPage() {
  const service = services2[0];
  return <CorporateTravelClient service={service} />;
}
