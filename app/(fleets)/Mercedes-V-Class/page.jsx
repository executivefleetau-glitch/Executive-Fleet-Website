import MercedesVClassClient from "./MercedesVClassClient";

export const metadata = {
    title: "Mercedes V-Class Chauffeur Melbourne | Executive Fleet",
    description: "Book the Mercedes-Benz V-Class for luxury group travel in Melbourne. Ideal for corporate teams, airport transfers, and family excursions.",
    alternates: {
        canonical: '/Mercedes-V-Class',
    },
    openGraph: {
        title: "Mercedes V-Class Chauffeur Melbourne | Executive Fleet",
        description: "The ultimate luxury people mover. Spacious, comfortable, and stylish group travel.",
        images: ["/assets/imgs/cars/Mercedes-V-Class-VIP.png"],
    },
};

export default function MercedesVClassPage() {
    return <MercedesVClassClient />;
}
