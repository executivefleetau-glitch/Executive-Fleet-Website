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
        <section style={{
          padding: '60px 20px 40px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '16px',
              letterSpacing: '-0.5px'
            }}>
              Book Your Luxury Chauffeur
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: '#d4a574',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Experience Melbourne's premier chauffeur service. Select your vehicle and complete your booking in minutes.
            </p>
          </div>
        </section>
        <BookingForm initialData={initialData} />
      </main>
      <Footer9 />
    </>
  );
}
