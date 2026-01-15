import Footer1 from "@/components/footers/Footer9";
import Header1 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/service/Breadcumb";
import Services1 from "@/components/service/Services1";
import React from "react";

export const metadata = {
  title: "Our Services || Executive Fleet - Premium Chauffeur Services Melbourne",
  description:
    "Explore our range of premium chauffeur services including corporate travel, airport transfers, weddings, and winery tours in Melbourne.",
};
export default function page() {
  return (
    <>
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <Breadcumb />
        <Services1 />
      </main>
      <Footer1 />
    </>
  );
}
