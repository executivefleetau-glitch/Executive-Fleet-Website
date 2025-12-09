import BreadCumb from "@/components/contact/BreadCumb";
import ContactForm from "@/components/contact/ContactForm";
import Map from "@/components/contact/Map";
import Offices from "@/components/contact/Offices";
import ContactCards from "@/components/contact/ContactCards";
import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
export const metadata = {
  title: "Contact Us | Executive Fleet - Melbourne Chauffeur Service",
  description:
    "Contact Executive Fleet for premium chauffeur services in Melbourne. 24/7 bookings, instant quotes, airport transfers, corporate travel, and special events. Call, email, or book online.",
  keywords: "contact Executive Fleet, Melbourne chauffeur booking, chauffeur service enquiry, Executive Fleet phone, airport transfer booking Melbourne",
  openGraph: {
    title: "Contact Us | Executive Fleet - Melbourne Chauffeur Service",
    description: "Contact Executive Fleet for premium chauffeur services in Melbourne. 24/7 bookings, instant quotes for all services.",
    type: "website",
    locale: "en_AU",
    siteName: "Executive Fleet",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Executive Fleet",
    description: "Contact Executive Fleet for premium chauffeur services in Melbourne.",
  },
};
export default function page() {
  return (
    <>
      <Header2 />
      <MobailHeader1 />
      <main className="main">
        <BreadCumb />
        <ContactCards />
        
        <Map />
        <ContactForm />
      </main>
      <Footer9 />
    </>
  );
}
