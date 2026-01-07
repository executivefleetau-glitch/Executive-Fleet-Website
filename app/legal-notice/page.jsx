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
  title: "Legal Notice | Executive Fleet - Melbourne's Premier Chauffeur Service",
  description:
    "Read Executive Fleet's Legal Notice. Important legal information about terms of use, intellectual property, disclaimers, liability limitations, and consumer rights under Australian law.",
  keywords: "legal notice, terms of use, intellectual property, disclaimers, liability, Australian Consumer Law, Victorian law, Executive Fleet legal",
};
export default function LegalNoticePage() {
  return (
    <>
      <Header2 /> <MobailHeader1 />
      <main className="main">
        <Breadcumb service="Legal Notice" />

        <section className="section pt-60 pb-80">
          <div className="container-sub">
            <div className="mw-900">
              <div className="content-single">

                {/* Introduction */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">Legal Notice</h2>
                <p className="text-16 color-text mb-40 wow fadeInUp">
                  Welcome to Executive Fleet's Legal page. This page outlines the important legal information related to your use of our website and services. Please read these terms carefully.
                </p>

                {/* Terms of Use */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">Terms of Use</h2>
                <p className="text-16 color-text mb-20 wow fadeInUp">
                  By accessing and using this website, you agree to comply with and be bound by the following terms and conditions. If you do not agree, please do not use our website. Executive Fleet reserves the right to update these terms at any time without prior notice. It is your responsibility to review them periodically.
                </p>
                <ul className="list-ticks list-ticks-small mb-40 wow fadeInUp">
                  <li className="text-16 mb-15">Our website and services are provided "as is" without any warranties or guarantees regarding accuracy, reliability, or availability.</li>
                  <li className="text-16 mb-15">You agree not to use the website for any unlawful or prohibited purposes.</li>
                  <li className="text-16 mb-15">Executive Fleet maintains the right to restrict or terminate your access to the site without liability.</li>
                  <li className="text-16 mb-15">Intellectual property on this website, including text, images, logos, and designs, is owned by Executive Fleet and protected by copyright law. Unauthorized use is prohibited.</li>
                </ul>

                {/* Intellectual Property */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">Intellectual Property</h2>
                <p className="text-16 color-text mb-40 wow fadeInUp">
                  All content on this website, including trademarks, logos, graphics, images, and text, is the property of Executive Fleet or our licensors. You may not copy, reproduce, distribute, or create derivative works without explicit permission.
                </p>

                {/* Disclaimers */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">Disclaimers</h2>
                <p className="text-16 color-text mb-40 wow fadeInUp">
                  Executive Fleet provides chauffeur services with a commitment to quality and safety. However, the information on this website is for general informational purposes only. We disclaim any liability for inaccuracies, errors, or omissions. Use of our services is at your own risk, and we encourage responsible use of our vehicles and staff.
                </p>

                {/* Limitation of Liability */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">Limitation of Liability</h2>
                <p className="text-16 color-text mb-40 wow fadeInUp">
                  To the fullest extent permitted by law, Executive Fleet shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use or inability to use this website or our services.
                </p>

                {/* Governing Law */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">Governing Law</h2>
                <p className="text-16 color-text mb-40 wow fadeInUp">
                  These legal terms are governed by the laws of the State of Victoria, Australia. Any disputes will be subject to the exclusive jurisdiction of the courts of Victoria.
                </p>

                {/* Consumer Rights */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">Consumer Rights</h2>
                <p className="text-16 color-text mb-40 wow fadeInUp">
                  We comply with the Australian Consumer Law and ensure your rights as a consumer are respected. If you have any concerns or complaints, please contact us directly.
                </p>

                {/* Updates to Legal Information */}
                <h2 className="heading-32-medium mb-20 color-text wow fadeInUp">Updates to Legal Information</h2>
                <p className="text-16 color-text mb-40 wow fadeInUp">
                  We may update this Legal page as required to reflect changes in the law or our business practices. Please review this page regularly.
                </p>

                {/* Contact */}
                <p className="text-16 color-text mb-20 wow fadeInUp">
                  If you have questions about these terms or need further legal information, please contact:
                </p>
                <div className="box-info-contact mb-40 wow fadeInUp" style={{ padding: '30px', backgroundColor: '#f8f8f8', borderLeft: '4px solid #000000', borderRadius: '8px' }}>
                  <p className="text-18 color-text mb-15" style={{ fontWeight: '600' }}>
                    Executive Fleet
                  </p>
                  <p className="text-16 color-text mb-10">
                    9 Carol Grove Tullamarine, Victoria 3043, Melbourne
                  </p>
                  <p className="text-16 color-text mb-10">
                    <strong>Phone:</strong> <a href="tel:+61431951996" style={{ color: '#000000', textDecoration: 'underline' }}>+61 431 951 996</a>
                  </p>
                  <p className="text-16 color-text mb-0">
                    <strong>Email:</strong> <a href="mailto:admin@executivefleet.com.au" style={{ color: '#000000', textDecoration: 'underline' }}>admin@executivefleet.com.au</a>
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
