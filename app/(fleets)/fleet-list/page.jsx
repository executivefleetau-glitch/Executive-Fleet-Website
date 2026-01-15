import FeetList1 from "@/components/fleet-list/FeetList1";
import Footer1 from "@/components/footers/Footer9";
import Header1 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Faq from "@/components/homes/home-1/Faq";
import { faqsFleet } from "@/data/faq";

export const metadata = {
  title: "Melbourne Luxury Fleet for Hire | Premium Chauffeur Cars",
  description:
    "Explore Executive Fleet's luxury vehicle collection. BMW 5 Series, BMW i5, BMW X5, BMW X7, Mercedes-Benz GLS, Mercedes-Benz Sprinter. Immaculate, modern, and fully equipped for Melbourne chauffeur services.",
  keywords: "Executive Fleet vehicles, luxury cars Melbourne, BMW chauffeur Melbourne, Mercedes chauffeur, premium fleet",
  openGraph: {
    title: "Our Luxury Fleet | Executive Fleet Melbourne",
    description: "Explore our premium vehicle collection - BMW, Mercedes-Benz, and more.",
    type: "website",
    locale: "en_AU",
    siteName: "Executive Fleet",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Luxury Fleet | Executive Fleet",
    description: "Explore our premium vehicle collection - BMW, Mercedes-Benz, and more.",
  },
};
export default function page() {
  return (
    <>
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <FeetList1 />
        {/* Dynamic FAQ Section */}
        <Faq items={faqsFleet} />
      </main>
      <Footer1 />
    </>
  );
}
