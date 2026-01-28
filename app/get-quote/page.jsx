import QuoteFormSingle from "@/components/booking/QuoteFormSingle";
import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";

export const metadata = {
  title: "Get a Free Quote | Executive Fleet - Melbourne's Premier Chauffeur Service",
  description:
    "Request a free, no-obligation quote for luxury chauffeur services in Melbourne. Airport transfers, corporate travel, weddings & events. Instant response.",
  keywords: "chauffeur quote Melbourne, luxury car hire quote, Executive Fleet pricing, Melbourne airport transfer quote",
};

export default function GetQuotePage({ searchParams }) {
  // Extract data from URL params and pass to QuoteFormSingle
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
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '16px',
              letterSpacing: '-0.5px'
            }}>
              Get Your Free Quote
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: '#ce9b28',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              No commitment required. Fill in your trip details and we&apos;ll send you a detailed quote within hours.
            </p>
          </div>
        </section>
        <section style={{
          background: '#f5f5f5',
          padding: '40px 0 60px'
        }}>
          <QuoteFormSingle initialData={initialData} />
        </section>
      </main>
      <Footer9 />
    </>
  );
}
