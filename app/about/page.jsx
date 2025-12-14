import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import Partners from "@/components/common/partners/Partners";
import Process from "@/components/common/process/Process";
import Facts from "@/components/common/facts/Facts";
import Features2 from "@/components/common/features/Features";
import Testimonials from "@/components/common/testimonials/Testimonials";
import DownloadApp from "@/components/common/downloadApp/DownloadApp";
import Banner from "@/components/otherPages/about/Banner";
import Breadcumb from "@/components/otherPages/about/Breadcumb";
import Faq from "@/components/otherPages/about/Faq";
import Features from "@/components/otherPages/about/Features";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Reviews from "@/components/homes/home-8/Reviews";

export const metadata = {
  title: "About Us | Executive Fleet - Melbourne's Premier Chauffeur Service",
  description:
    "Since 2022, Executive Fleet has been Melbourne's trusted luxury chauffeur service. Largest fleet, widest range - spotless vehicles, professional drivers, on-time arrival. Airport transfers, corporate events, special occasions.",
  keywords: "Melbourne chauffeur service, luxury chauffeur Melbourne, Executive Fleet about, professional chauffeur, airport transfers Melbourne, corporate chauffeur Melbourne",
};
export default function Aboutpage() {
  return (
    <>
      <Header2 /> <MobailHeader1 />
      <main className="main">
        <Breadcumb />
        <Banner />
        <Features />
        
        <Features2 />
        <Process />
        
       
        <Reviews />
        
        <Faq />
        
      </main>
      <Footer9 />
    </>
  );
}
