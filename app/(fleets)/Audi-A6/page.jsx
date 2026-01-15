import AudiA6Client from "./AudiA6Client";

export const metadata = {
    title: "Audi A6 Chauffeur Melbourne | Executive Fleet",
    description: "Book an Audi A6 for professional and stylish chauffeur services in Melbourne. Ideal for corporate travel and airport transfers.",
    alternates: {
        canonical: '/Audi-A6/',
    },
    openGraph: {
        title: "Audi A6 Chauffeur Melbourne | Executive Fleet",
        description: "Modern design and advanced technology. The Audi A6 drives business in Melbourne.",
        images: ["/assets/imgs/cars/Audi-A6-VIP.png"],
    },
};

export default function AudiA6Page() {
    return <AudiA6Client />;
}
