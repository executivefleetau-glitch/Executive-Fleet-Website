import MercedesSClassClient from "./MercedesSClassClient";

export const metadata = {
    title: "Mercedes-Benz S-Class Chauffeur Melbourne | Executive Fleet",
    description: "Hire the ultimate Mercedes-Benz S-Class for luxury chauffeur services in Melbourne. Experience first-class comfort, reclining seats, and unmatched prestige.",
    alternates: {
        canonical: '/Mercedes-S-Class',
    },
    openGraph: {
        title: "Mercedes-Benz S-Class Chauffeur Melbourne | Executive Fleet",
        description: "The pinnacle of automotive luxury. Book the Mercedes S-Class for your next VIP transfer in Melbourne.",
        images: ["/assets/imgs/cars/Mercedes-S-Class-VIP.png"],
    },
};

export default function MercedesSClassPage() {
    return <MercedesSClassClient />;
}
