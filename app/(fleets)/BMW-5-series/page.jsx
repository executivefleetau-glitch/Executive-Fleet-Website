import BMW5SeriesClient from "./BMW5SeriesClient";

export const metadata = {
  title: "BMW 5 Series Chauffeur Melbourne | Executive Fleet",
  description: "Hire a BMW 5 Series for luxury chauffeur services in Melbourne. Perfect for airport transfers, corporate transfers, and weddings. Book your premium ride today.",
  alternates: {
    canonical: '/BMW-5-series',
  },
  openGraph: {
    title: "BMW 5 Series Chauffeur Melbourne | Executive Fleet",
    description: "Experience luxury travel with our BMW 5 Series chauffeur service in Melbourne. Ideal for corporate and airport transfers.",
    images: ["/assets/imgs/cars/BMW 5 series.png"],
  },
};

export default function BMW5SeriesPage() {
  return <BMW5SeriesClient />;
}
