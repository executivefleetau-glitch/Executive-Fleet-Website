import BreadCumb from "@/components/contact/BreadCumb";
import ContactForm from "@/components/contact/ContactForm";
import Map from "@/components/contact/Map";
import Offices from "@/components/contact/Offices";
import ContactCards from "@/components/contact/ContactCards";
import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
export const metadata = {
  title:
    "Contact || Lixride Chauffeur Limousine Transport and Car Hire Nextjs Template",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Nextjs Template",
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
