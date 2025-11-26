import BookingForm from "@/components/booking/BookingForm";
import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";

export const metadata = {
  title: "Book Your Chauffeur | Executive Fleet - Melbourne's Premier Service",
  description:
    "Book your luxury chauffeur service with Executive Fleet. Choose from our premium fleet, select your pickup and destination, and enjoy Melbourne's best chauffeur experience.",
  keywords: "book chauffeur Melbourne, luxury car booking, Executive Fleet booking, Melbourne airport transfer booking",
};

export default function BookingPage() {
  return (
    <>
      <Header2 /> 
      <MobailHeader1 />
      <main className="main">
        <BookingForm />
      </main>
      <Footer9 />
    </>
  );
}
