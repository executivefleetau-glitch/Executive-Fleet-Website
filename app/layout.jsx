import { DM_Sans } from "next/font/google";
import "../public/assets/scss/style.scss";
import { register } from "swiper/element/bundle";
import ClientLayout from "./ClientLayout";
import AuthProvider from "@/components/providers/AuthProvider";

const DM_SansFont = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--dm-saans-font",
});

register();

export const metadata = {
  title: "Executive Fleet Chauffeur Services Melbourne | Private & Corporate Transfers",
  description: "Melbourne chauffeur services for families, weddings, events, and smooth, comfortable travel.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/imgs/logo/tab.png", type: "image/png" },
    ],
    apple: "/assets/imgs/logo/tab.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/assets/imgs/logo/tab.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/imgs/logo/tab.png" />
      </head>
      <body className={DM_SansFont.variable}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
