import MercedesGLSClient from "./MercedesGLSClient";

export const metadata = {
  title: "Mercedes-Benz GLS Chauffeur Melbourne | Executive Fleet",
  description:
    "Hire the Mercedes-Benz GLS for premium group travel and family transfers in Melbourne. Spacious luxury SUV with professional chauffeur service.",
  alternates: {
    canonical: "/Mercedes-GLS",
  },
  openGraph: {
    title: "Mercedes-Benz GLS Chauffeur Melbourne | Executive Fleet",
    description:
      "The ultimate luxury SUV. Book the Mercedes GLS for your next family or business transfer in Melbourne.",
    images: ["/assets/imgs/cars/Mercedes GLS.png"],
  },
};

export default function MercedesGLSPage() {
  return <MercedesGLSClient />;
}
