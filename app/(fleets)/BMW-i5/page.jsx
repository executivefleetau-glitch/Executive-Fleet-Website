import BMWi5Client from "./BMWi5Client";

export const metadata = {
  title: "Hire BMW i5 Electric Chauffeur Melbourne | Executive Fleet",
  description:
    "Experience the future of luxury travel with the all-electric BMW i5. Book your eco-friendly chauffeur service in Melbourne for business and leisure.",
  alternates: {
    canonical: "/BMW-i5",
  },
  openGraph: {
    title: "Hire BMW i5 Electric Chauffeur Melbourne | Executive Fleet",
    description:
      "All-electric, all-luxury. chauffeur driven BMW i5 available in Melbourne.",
    images: ["/assets/imgs/cars/BMW i5.png"],
  },
};

export default function BMWi5Page() {
  return <BMWi5Client />;
}
