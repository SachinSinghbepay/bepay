// app/layout.js or app/layout.jsx
import { Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smoothScroll";
import Header from "@/components/header";
import Footer from "@/components/Footer1";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { AuthProvider } from "@/lib/auth";

// Load Open Sans as the main font
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

// Load Montserrat for selective use
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "bepay - Stablecoin Payment, Wallet, Merchant Payment",
  description: "A simple and secure way to pay your bills",
  openGraph: {
    title: "bepay - Stablecoin Payment, Wallet, Merchant Payment",
    description: "A simple and secure way to pay your bills",
    url: "https://www.bepay.money/",
    siteName: "bepay",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "bepay Money",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "bepay - Stablecoin Payment, Wallet, Merchant Payment",
    description: "A simple and secure way to pay your bills",
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        {/* <SmoothScroll> */}
          <Header />
          <AuthProvider>{children}</AuthProvider>
          <Footer />
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}
