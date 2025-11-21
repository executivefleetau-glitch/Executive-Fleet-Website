import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Blogs from "@/components/homes/common/blogs/Blogs2";
import Cta from "@/components/homes/common/cta/Cta";

import Facts from "@/components/common/facts/Facts";
import Faq from "@/components/homes/home-1/Faq";
import Features1 from "@/components/homes/home-8/Features";
import Feet from "@/components/homes/home-1/Feet";
import Hero from "@/components/homes/home-8/Hero";
import Partners from "@/components/common/partners/Partners";
import Process from "@/components/common/process/Process";
import Service from "@/components/homes/home-1/Service";
import Testimonials from "@/components/homes/home-8/Testimonials";
import DownloadApp from "@/components/common/downloadApp/DownloadApp";
import About from "@/components/homes/home-8/About";
import Goals from "@/components/homes/home-8/Goals";
import Reviews from "@/components/homes/home-8/Reviews";
export const metadata = {
  title:
    "Luxury Chauffeur Services Melbourne | Private & Corporate Transfers",
  description:
    "Melbourne chauffeur services for families, weddings, events, and smooth, comfortable travel.",
};
export default function Home() {
  return (
    <>
      <Header2 /> <MobailHeader1 />
      <main className="main">
      <Hero />
        <About />
        <Service />
        <Features1 />
        <Feet />
        <Process />
        
        
        
        
        <Goals />
        <Reviews />
        
        <Blogs />
        {/* <div className="border-bottom"> */}
        <Partners />
        <Faq />
      </main>
      <Footer9 />
    </>
  );
}


