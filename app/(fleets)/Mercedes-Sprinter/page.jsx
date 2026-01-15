import MercedesSprinterClient from "./MercedesSprinterClient";

export const metadata = {
    title: "Mercedes-Benz Sprinter Chauffeur Melbourne | Executive Fleet",
    description: "Hire a Mercedes-Benz Sprinter for group transfers and corporate travel in Melbourne. Spacious luxury van for up to 15 passengers. Book your premium ride today.",
    alternates: {
        canonical: '/Mercedes-Sprinter/',
    },
    openGraph: {
        title: "Mercedes-Benz Sprinter Chauffeur Melbourne | Executive Fleet",
        description: "Experience luxury group travel with our Mercedes-Benz Sprinter chauffeur service in Melbourne. Ideal for corporate events and airport transfers.",
        images: ["/assets/imgs/cars/Mercedes-Sprinter.webp"],
    },
};

export default function MercedesSprinterPage() {
    return <MercedesSprinterClient />;
}
