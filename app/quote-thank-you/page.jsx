import Link from "next/link";
import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";

export const metadata = {
  title: "Quote Request Received | Executive Fleet",
  description: "Thank you for your quote request. Our team will review your details and send you a personalized quote shortly.",
};

export default function QuoteThankYouPage() {
  return (
    <>
      <Header2 />
      <MobailHeader1 />
      <main className="main">
        <section style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          background: '#ffffff'
        }}>
          <div style={{
            background: '#000000',
            border: '3px solid #ce9b28',
            borderRadius: '24px',
            padding: '70px 50px',
            maxWidth: '650px',
            textAlign: 'center',
            boxShadow: '0 15px 60px rgba(0, 0, 0, 0.15)'
          }}>
            {/* Success Icon */}
            <div style={{
              width: '130px',
              height: '130px',
              background: 'linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '75px',
              color: '#000000',
              margin: '0 auto 35px',
              boxShadow: '0 10px 40px rgba(206, 155, 40, 0.5)'
            }}>
              ✓
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: '46px',
              fontWeight: '800',
              background: 'linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '35px'
            }}>
              Thank You!
            </h1>

            {/* Message */}
            <p style={{
              fontSize: '18px',
              lineHeight: '1.9',
              color: '#e0e0e0',
              marginBottom: '25px'
            }}>
              Your quote request has been received. Our team at <strong style={{ color: '#fffbe9', fontWeight: '700' }}>Executive Fleet</strong> will review your details and send you a personalized quote.
            </p>

            {/* Phone Number Info */}
            <div style={{
              background: 'linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%)',
              padding: '20px 30px',
              borderRadius: '12px',
              margin: '25px 0',
              boxShadow: '0 8px 30px rgba(206, 155, 40, 0.4)'
            }}>
              <p style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#000000',
                margin: 0,
                lineHeight: '1.6'
              }}>
                📱 Your phone number is your reference. If you need to follow up on your quote, simply quote your phone number.
              </p>
            </div>

            {/* Response Time Info */}
            <div style={{
              background: 'rgba(206, 155, 40, 0.15)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '35px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#ce9b28',
                margin: 0
              }}>
                ⏰ <strong>Response Time:</strong> 7am - 10pm same day, otherwise next business day
              </p>
            </div>

            {/* Urgent Contact */}
            <p style={{
              fontSize: '14px',
              color: '#999',
              marginBottom: '35px'
            }}>
              Need an urgent booking? Call us directly:
            </p>

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="tel:+61431951996"
                style={{
                  padding: '18px 40px',
                  fontSize: '14px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block',
                  background: 'linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%)',
                  color: '#000000',
                  border: 'none',
                  boxShadow: '0 6px 20px rgba(206, 155, 40, 0.4)'
                }}
              >
                📞 Call Now
              </a>
              <Link
                href="/"
                style={{
                  padding: '18px 40px',
                  fontSize: '14px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block',
                  background: 'transparent',
                  color: '#fffbe9',
                  border: '2px solid #ce9b28'
                }}
              >
                Return Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer9 />
    </>
  );
}
