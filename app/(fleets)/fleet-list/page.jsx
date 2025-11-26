import FeetList1 from "@/components/fleet-list/FeetList1";
import Footer1 from "@/components/footers/Footer9";
import Header1 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";

export const metadata = {
  title:
    "Fleet List || Lixride Chauffeur Limousine Transport and Car Hire Nextjs Template",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Nextjs Template",
};
export default function page() {
  return (
    <>
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <FeetList1 />
      </main>
      <Footer1 />
    </>
  );
}
