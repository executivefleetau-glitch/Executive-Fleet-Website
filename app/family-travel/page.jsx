import FamilyTravelClient from "./FamilyTravelClient";
import { services2 } from "@/data/services";

export const metadata = {
  title: "Luxury Family Travel Melbourne | Safe Chauffeur Service With Child Seats",
  description:
    "Book stress-free luxury family travel in Melbourne with Executive Fleet. Safe, professional chauffeur services with pre-installed child seats & boosters. Perfect for airport transfers & family outings. Fixed rates, impeccable fleet.",
  keywords:
    "family travel Melbourne, luxury family chauffeur, Melbourne chauffeur with child seat, safe family airport transfers, private family car hire Victoria",
  alternates: {
    canonical: "/family-travel",
  },
  openGraph: {
    title: "Luxury Family Travel Melbourne | Safe Chauffeur Service With Child Seats",
    description:
      "Safe and comfortable luxury transfers for your entire family. Professional chauffeurs and premium vehicles equipped with child seats.",
    images: ["/assets/imgs/banner/V-class+bags.webp"],
  },
};

export default function FamilyTravelPage() {
  const service = services2[1]; // Family Travel service (id: 2)
  return <FamilyTravelClient service={service} />;
}
