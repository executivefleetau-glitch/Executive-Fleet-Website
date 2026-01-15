import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Footer9 from "@/components/footers/Footer9";
import BookingForm from "@/components/booking/BookingForm";

export const metadata = {
    title: "Book Your Luxury Chauffeur Melbourne | Executive Fleet Booking",
    description:
        "Secure your premium chauffeur-driven experience in Melbourne. Instant quotes and simple booking for airport transfers, corporate travel, winery tours, and special events. Executive Fleet – Excellence in every journey.",
    keywords:
        "book chauffeur Melbourne, luxury car booking Victoria, airport transfer booking, corporate car hire Melbourne, private driver booking",
    alternates: {
        canonical: '/booking/',
    },
    openGraph: {
        title: "Book Your Luxury Chauffeur Melbourne | Executive Fleet Booking",
        description:
            "Easy and secure booking for Melbourne's premier luxury chauffeur service. Professional drivers and a prestigious fleet at your service.",
        images: ["/assets/imgs/page/homepage1/service3.png"],
    },
};

export default function BookingPage() {
    return (
        <>
            <Header2 />
            <MobailHeader1 />
            <main className="main">
                <section className="section pt-120 pb-120">
                    <div className="container-sub">
                        <div className="text-center mb-60">
                            <h1 className="heading-44-medium wow fadeInUp">Luxury Booking Service</h1>
                            <p className="text-16 color-grey wow fadeInUp" data-wow-delay="0.1s">
                                Complete the form below to receive an instant quotation and secure your chauffeur.
                            </p>
                        </div>
                        <BookingForm />
                    </div>
                </section>
            </main>
            <Footer9 />
        </>
    );
}
