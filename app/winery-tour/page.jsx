import WineryTourClient from "./WineryTourClient";
import { services2 } from "@/data/services";

export const metadata = {
  title: "Luxury Winery Tours Melbourne | Yarra Valley & Mornington Peninsula",
  description:
    "Experience bespoke luxury winery tours in Melbourne. Expert chauffeurs, premium fleet, and tailored itineraries for Yarra Valley and Mornington Peninsula. Book your elite wine experience today.",
  keywords:
    "winery tours Melbourne, Yarra Valley chauffeur, Mornington Peninsula wine tour, luxury wine transfers, private winery tour Victoria",
  alternates: {
    canonical: "/winery-tour",
  },
  openGraph: {
    title: "Luxury Winery Tours Melbourne | Yarra Valley & Mornington Peninsula",
    description:
      "Elite chauffeur-driven winery tours across Victoria's premiere wine regions. Bespoke itineraries and luxury transport.",
    images: ["/assets/imgs/banner/winry.jpg"],
  },
};

export default function WineryTourPage() {
  const service = services2[4]; // Winery Tour service (index 4 corresponds to id: 5 in services2)
  return <WineryTourClient service={service} />;
}
