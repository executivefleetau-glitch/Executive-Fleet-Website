import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Blogs from "@/components/homes/common/blogs/Blogs2";
import Cta from "@/components/homes/common/cta/Cta";

import Facts from "@/components/common/facts/Facts";
import Faq from "@/components/homes/home-1/Faq";
import { faqsAbout } from "@/data/faq";
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
import PolicyBanner from "@/components/homes/home-8/PolicyBanner";

export const metadata = {
  title: "Luxury Chauffeur Service Melbourne",
  description: "Melbourne's premier luxury chauffeur service. Premium airport transfers, corporate travel & weddings. 24/7 Professional chauffeurs in BMW & Mercedes fleet.",
  keywords: "Melbourne chauffeur, luxury chauffeur Melbourne, airport transfers, corporate travel Melbourne, wedding car hire Melbourne, executive transport",
  openGraph: {
    title: "Executive Fleet - Luxury Chauffeur Service Melbourne",
    description: "Melbourne's premier luxury chauffeur service. Premium airport transfers, corporate travel & weddings. 24/7 Professional chauffeurs.",
    type: "website",
  },
  twitter: {
    title: "Executive Fleet - Luxury Chauffeur Service Melbourne",
    description: "Melbourne's premier luxury chauffeur service. Premium airport transfers, corporate travel & weddings.",
  },
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
        <PolicyBanner />
        <Feet />
        <Process />




        <Goals />
        <Reviews />

        <Blogs />
        {/* <div className="border-bottom"> */}

        <Faq items={faqsAbout} />
      </main>
      <Footer9 />
    </>
  );
}


