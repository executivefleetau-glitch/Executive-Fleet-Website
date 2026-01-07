import BMW7SeriesClient from "./BMW7SeriesClient";

export const metadata = {
    title: "BMW 7 Series Chauffeur Melbourne | Executive Fleet",
    description: "Experience the pinnacle of BMW luxury with the 7 Series. Perfect for VIP corporate transfers and executive travel in Melbourne.",
    alternates: {
        canonical: '/BMW-7-Series',
    },
    openGraph: {
        title: "BMW 7 Series Chauffeur Melbourne | Executive Fleet",
        description: "Innovation meets executive luxury. Book the BMW 7 Series (i7) for your next journey.",
        images: ["/assets/imgs/cars/BMW-7-Series-VIP.png"],
    },
};

export default function BMW7SeriesPage() {
    return <BMW7SeriesClient />;
}
