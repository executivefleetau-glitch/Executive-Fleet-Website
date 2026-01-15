import AirportTransferClient from "./AirportTransferClient";
import { services2 } from "@/data/services";

export const metadata = {
  title: "Luxury Airport Transfers Melbourne | Chauffeur Service",
  description:
    "Book premium Melbourne Airport transfers with Executive Fleet. Luxury chauffeur-driven cars, flight tracking, meet & greet, fixed pricing. Private, safe & stress-free rides to/from Tullamarine (MEL).",
  keywords:
    "Melbourne airport transfers, Tullamarine airport chauffeur, luxury airport transfer Melbourne, MEL airport pickup, private airport car service Melbourne",
  alternates: {
    canonical: "/airport-transfer",
  },
  openGraph: {
    title: "Luxury Airport Transfers Melbourne | Chauffeur Service",
    description:
      "Book premium Melbourne Airport transfers with Executive Fleet. Luxury chauffeur-driven cars, flight tracking, meet & greet, fixed pricing.",
    images: ["/assets/imgs/banner/airport_hotel_transfer_melbourne_1768464063555.png"],
  },
};

export default function AirportTransferPage() {
  const service = services2[2]; // Airport Transfers service (id: 3)
  return <AirportTransferClient service={service} />;
}
