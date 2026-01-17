import Footer9 from "@/components/footers/Footer9";
import Header2 from "@/components/headers/Header2";
import Partners from "@/components/common/partners/Partners";
import Process from "@/components/common/process/Process";
import Facts from "@/components/common/facts/Facts";
import Features2 from "@/components/common/features/Features";
import Testimonials from "@/components/common/testimonials/Testimonials";
import DownloadApp from "@/components/common/downloadApp/DownloadApp";
import Banner from "@/components/otherPages/about/Banner";
import Breadcumb from "@/components/otherPages/about/Breadcumb";
import Faq from "@/components/otherPages/about/Faq";
import Features from "@/components/otherPages/about/Features";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Reviews from "@/components/homes/home-8/Reviews";

export const metadata = {
  title: "Terms & Conditions | Executive Fleet - Melbourne's Premier Chauffeur Service",
  description:
    "Read Executive Fleet's Terms & Conditions. Understand your rights and responsibilities when booking our luxury chauffeur services in Melbourne. Service agreement, booking policies, and liability terms.",
  keywords: "terms and conditions, service agreement, booking policies, Executive Fleet terms, Melbourne chauffeur terms, Victorian regulations",
};
export default function TermsAndConditionsPage() {
  return (
    <>
      <Header2 /> <MobailHeader1 />
      <main className="main">
        <Breadcumb service="Terms & Conditions" />

        <section className="section pt-60 pb-80">
          <div className="container-sub">
            <div className="mw-900">
              <div className="content-single">

                {/* Introduction */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">Terms & Conditions</h2>
                <p className="text-16 color-text mb-40 wow fadeInUp">
                  Welcome to Executive Fleet. Please read these Terms & Conditions carefully before using our services or website. By booking or using our chauffeur services, you agree to be bound by the following terms.
                </p>

                {/* 1. Service Agreement */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">1. Service Agreement</h2>
                <ul className="list-ticks list-ticks-small mb-40 wow fadeInUp">
                  <li className="text-16 mb-15">Executive Fleet agrees to provide chauffeur services as confirmed in your booking.</li>
                  <li className="text-16 mb-15">Each booking forms a separate contract between you (the client) and Executive Fleet.</li>
                  <li className="text-16 mb-15">We reserve the right to refuse or cancel bookings if your request violates these terms.</li>
                </ul>

                {/* 2. Booking and Payment */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">2. Booking and Payment</h2>
                <ul className="list-ticks list-ticks-small mb-40 wow fadeInUp">
                  <li className="text-16 mb-15">Bookings must be confirmed via our website, phone, or authorized channels.</li>
                  <li className="text-16 mb-15">Payment terms, including fares, taxes, and additional fees (e.g., tolls, waiting time), will be provided upon booking.</li>
                  <li className="text-16 mb-15">Full payment is required before or immediately after the service, as specified.</li>
                  <li className="text-16 mb-15">Cancellations may be subject to fees depending on the notice period.</li>
                </ul>

                {/* 3. Service Use and Conduct */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">3. Service Use and Conduct</h2>
                <ul className="list-ticks list-ticks-small mb-40 wow fadeInUp">
                  <li className="text-16 mb-15">Our chauffeurs will provide professional, safe, and courteous service throughout the journey.</li>
                  <li className="text-16 mb-15">Clients must comply with all instructions given by the chauffeur for safety reasons.</li>
                  <li className="text-16 mb-15">Smoking, consumption of alcohol, or illegal substances is strictly prohibited in all vehicles.</li>
                  <li className="text-16 mb-15">You are responsible for the behavior of all passengers during the journey.</li>
                </ul>

                {/* 4. Vehicle and Route */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">4. Vehicle and Route</h2>
                <ul className="list-ticks list-ticks-small mb-40 wow fadeInUp">
                  <li className="text-16 mb-15">Executive Fleet will provide the vehicle type as confirmed at booking, subject to availability.</li>
                  <li className="text-16 mb-15">Chauffeurs will generally follow the most efficient route unless directed otherwise by the client.</li>
                  <li className="text-16 mb-15">Unauthorized stops or deviations may incur additional charges.</li>
                </ul>

                {/* 5. Liability and Insurance */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">5. Liability and Insurance</h2>
                <ul className="list-ticks list-ticks-small mb-40 wow fadeInUp">
                  <li className="text-16 mb-15">Our vehicles are fully insured for passenger transport according to Victorian regulations.</li>
                  <li className="text-16 mb-15">Executive Fleet is not liable for any loss, damage, or injury resulting from your use of the service except where required by law.</li>
                  <li className="text-16 mb-15">Clients are responsible for all items brought onto a vehicle. Executive Fleet is not liable for lost or damaged belongings.</li>
                </ul>

                {/* 6. Changes and Cancellations */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">6. Changes and Cancellations</h2>
                <ul className="list-ticks list-ticks-small mb-40 wow fadeInUp">
                  <li className="text-16 mb-15">Executive Fleet reserves the right to amend fares, availability, or terms with reasonable notice.</li>
                  <li className="text-16 mb-15">Cancellation policies and fees will be communicated at the time of booking.</li>
                </ul>

                {/* 7. Privacy and Data */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">7. Privacy and Data</h2>
                <p className="text-16 color-text mb-40 wow fadeInUp">
                  We handle your personal information according to our Privacy Policy, which is available on our website.
                </p>

                {/* 8. Governing Law */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">8. Governing Law</h2>
                <p className="text-16 color-text mb-40 wow fadeInUp">
                  These terms are governed by the laws of Victoria, Australia. Any disputes will be resolved under the jurisdiction of Victorian courts.
                </p>

                {/* 9. Contact */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">9. Contact</h2>
                <p className="text-16 color-text mb-20 wow fadeInUp">
                  For any questions or concerns related to these Terms & Conditions, please contact:
                </p>
                <div className="box-info-contact mb-40 wow fadeInUp" style={{ padding: '30px', backgroundColor: '#f8f8f8', borderLeft: '4px solid #000000', borderRadius: '8px' }}>
                  <p className="text-18 color-text mb-15" style={{ fontWeight: '600' }}>
                    Executive Fleet
                  </p>
                  <p className="text-16 color-text mb-10">
                    9 Carol Grove, Tullamarine VIC 3043, Melbourne
                  </p>
                  <p className="text-16 color-text mb-10">
                    <strong>Phone:</strong> <a href="tel:+61431951996" style={{ color: '#000000', textDecoration: 'underline' }}>+61 431 951 996</a>
                  </p>
                  <p className="text-16 color-text mb-0">
                    <strong>Email:</strong> <a href="mailto:info@executivefleet.com.au" style={{ color: '#000000', textDecoration: 'underline' }}>info@executivefleet.com.au</a>
                  </p>
                </div>

                <p className="text-14 color-grey text-center wow fadeInUp" style={{ fontStyle: 'italic' }}>
                  Last Updated: November 2025
                </p>

              </div>
            </div>
          </div>
        </section>






      </main>
      <Footer9 />
    </>
  );
}
