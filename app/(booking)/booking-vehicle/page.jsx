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

export default function BookingPage({ searchParams }) {
  // Extract data from URL params and pass to BookingForm
  const initialData = {
    bookingType: searchParams?.bookingType || "distance",
    pickupDate: searchParams?.pickupDate || "",
    pickupTime: searchParams?.pickupTime || "",
    expectedEndTime: searchParams?.expectedEndTime || "",
    pickupLocation: searchParams?.pickupLocation || "",
    pickupLat: searchParams?.pickupLat ? parseFloat(searchParams.pickupLat) : null,
    pickupLng: searchParams?.pickupLng ? parseFloat(searchParams.pickupLng) : null,
    dropoffLocation: searchParams?.dropoffLocation || "",
    dropoffLat: searchParams?.dropoffLat ? parseFloat(searchParams.dropoffLat) : null,
    dropoffLng: searchParams?.dropoffLng ? parseFloat(searchParams.dropoffLng) : null,
  };

  return (
    <>
      <Header2 /> 
      <MobailHeader1 />
      <main className="main">
        <BookingForm initialData={initialData} />
      </main>
      <Footer9 />
    </>
  );
}
