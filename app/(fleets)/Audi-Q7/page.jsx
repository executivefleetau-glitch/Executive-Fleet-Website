import AudiQ7Client from "./AudiQ7Client";

export const metadata = {
    title: "Audi Q7 Chauffeur Melbourne | Executive Fleet",
    description: "Hire the Audi Q7 for a luxurious group transfer in Melbourne. Spacious, stylish, and perfect for families or extra luggage.",
    alternates: {
        canonical: '/Audi-Q7',
    },
    openGraph: {
        title: "Audi Q7 Chauffeur Melbourne | Executive Fleet",
        description: "The perfect blend of space and luxury. Book the Audi Q7 SUV for your next journey.",
        images: ["/assets/imgs/cars/Audi-Q7-VIP.png"],
    },
};

export default function AudiQ7Page() {
    return <AudiQ7Client />;
}
