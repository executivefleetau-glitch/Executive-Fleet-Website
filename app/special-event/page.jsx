import SpecialEventClient from "./SpecialEventClient";
import { services2 } from "@/data/services";

export const metadata = {
  title: "Special Event Transfers Melbourne | Luxury Chauffeur Service",
  description:
    "Make your special occasion unforgettable with Executive Fleet's premium event transfers. Chauffeur services for Spring Racing Carnival, concerts, anniversaries & gala dinners across Melbourne. Book your luxury ride today.",
  keywords:
    "special event transfers Melbourne, luxury event chauffeur, Spring Racing Carnival transport, Melbourne concert chauffeur, private event car hire Victoria",
  alternates: {
    canonical: "/special-event",
  },
  openGraph: {
    title: "Special Event Transfers Melbourne | Luxury Chauffeur Service",
    description:
      "Arrive in style with Executive Fleet's dedicated special event chauffeur services. Red-carpet travel for Melbourne's biggest occasions.",
    images: ["/assets/imgs/banner/spring-racing.jpg"],
  },
};

export default function SpecialEventPage() {
  const service = services2[3]; // Special Events service (index 3 corresponds to id: 4 in services2)
  return <SpecialEventClient service={service} />;
}
