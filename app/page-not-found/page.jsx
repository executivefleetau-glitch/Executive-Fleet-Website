import NotFound from "@/components/Error404";
import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";

export const metadata = {
  title:
    "Not Found || Lixride Chauffeur Limousine Transport and Car Hire Nextjs Template",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Nextjs Template",
};

export default function page() {
  return (
    <>
      <Header2 /> <MobailHeader1 />
      <main className="main">
        <NotFound />
      </main>
      <Footer9 />
    </>
  );
}
