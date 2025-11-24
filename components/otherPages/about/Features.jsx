import { features7 } from "@/data/features";

export default function Features() {
  return (
    <section className="section">
      <div className="container-sub">
        <div className="mt-60">
          <h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
          We deliver a smarter, smoother way to travel Melbourne
          </h2>
          <div className="content-single wow fadeInUp">
            <p>
            Experience premium chauffeur services designed for comfort, safety, and total peace of mind. From airport arrivals to private city travel, our team ensures every moment feels seamless. Your chauffeur tracks flights, arrives early, and handles every detail with precision. Luxury vehicles, trained drivers, and clear fixed pricing—your travel experience just became effortless.

            </p>
            <p>
              Every journey is planned with care, whether it’s corporate travel, special occasions, or daily transfers. Our service focuses on reliability, clean vehicles, and respectful chauffeurs who know Melbourne inside and out. Sit back and enjoy a calm, comfortable ride while we handle the roads, timing, and routes for you. Your safety, comfort, and satisfaction remain our highest priorities from start to finish.

            </p>
            <ul className="list-ticks list-ticks-small">
              {features7.map((elm, i) => (
                <li key={i} className="text-16 mb-20">
                  {elm}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
