import { DM_Sans } from "next/font/google";
import "../public/assets/scss/style.scss";
import { register } from "swiper/element/bundle";
import ClientLayout from "./ClientLayout";

const DM_SansFont = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--dm-saans-font",
});

register();

export const metadata = {
  title: "Executive Fleet - Chauffeur Limousine Service",
  description: "Executive Fleet - Professional Chauffeur and Limousine Transport Service",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/imgs/logo/logo.png", type: "image/png" },
    ],
    apple: "/assets/imgs/template/logo-new.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/assets/imgs/template/logo-new.jpg" type="image/jpg" />
        <link rel="apple-touch-icon" href="/assets/imgs/template/logo-new.jpg" />
      </head>
      <body className={DM_SansFont.variable}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
