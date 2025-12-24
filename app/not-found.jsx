import NotFound from "@/components/404";
import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";

export const metadata = {
  title: "Page Not Found | Executive Fleet",
  description: "The page you are looking for does not exist. Return to the Executive Fleet homepage.",
};

export default function page() {
  return (
    <>
      <Header2 />
      <MobailHeader1 />
      <main className="main">
        <NotFound />
      </main>
      <Footer9 />
    </>
  );
}
