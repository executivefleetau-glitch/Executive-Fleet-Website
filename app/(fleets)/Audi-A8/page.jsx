import AudiA8Client from "./AudiA8Client";

export const metadata = {
    title: "Audi A8L Chauffeur Melbourne | Executive Fleet",
    description: "Book the Audi A8L for a sophisticated chauffeur experience in Melbourne. Spacious, stylish, and perfect for business or leisure transfers.",
    alternates: {
        canonical: '/Audi-A8/',
    },
    openGraph: {
        title: "Audi A8L Chauffeur Melbourne | Executive Fleet",
        description: "Sophisticated luxury with commanding presence. Hire the Audi A8L for your next Executive Fleet transfer.",
        images: ["/assets/imgs/cars/Audi-A8-VIP.png"],
    },
};

export default function AudiA8Page() {
    return <AudiA8Client />;
}
