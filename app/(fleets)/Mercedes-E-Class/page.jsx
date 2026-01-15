import MercedesEClassClient from "./MercedesEClassClient";

export const metadata = {
    title: "Mercedes-Benz E-Class Chauffeur Melbourne | Executive Fleet",
    description: "Hire the Mercedes-Benz E-Class for reliable and comfortable business transfers in Melbourne. The perfect choice for corporate travel.",
    alternates: {
        canonical: '/Mercedes-E-Class/',
    },
    openGraph: {
        title: "Mercedes-Benz E-Class Chauffeur Melbourne | Executive Fleet",
        description: "The global benchmark for business luxury. Book a Mercedes E-Class for your airport or corporate transfer.",
        images: ["/assets/imgs/cars/Mercedes-E-Class-VIP.png"],
    },
};

export default function MercedesEClassPage() {
    return <MercedesEClassClient />;
}
