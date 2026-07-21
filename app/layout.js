// src/app/layout.js
import { Open_Sans, Montserrat } from 'next/font/google';
import "./globals.css";
import SmoothScroll from "@/components/smoothScroll";
import Header from "@/components/header";
import ConditionalFooter from "@/components/ConditionalFooter";
import ConditionalHeader from "@/components/ConditionalHeader";
import ConditionalCookieConsent from "@/components/ConditionalCookieConsent";
import MixpanelProvider from '@/components/MixpanelProvider';
import CampaignTracker from '@/components/campaignTracker';
// import { SpeedInsights } from '@vercel/speed-insights/next';

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
  metadataBase: new URL("https://www.bepay.money"),
  title: "bepay - Stablecoin Payment, Wallet, Merchant Payment",
  description: "A simple and secure way to pay your bills",
  openGraph: {
    title: "bepay - Stablecoin Payment, Wallet, Merchant Payment",
    description: "A simple and secure way to pay your bills",
    url: "https://www.bepay.money/",
    siteName: "bepay",
    images: [
      {
        url: "/pages/home.jpeg",
        width: 1200,
        height: 630,
        alt: "bepay money",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "bepay - Stablecoin Payment, Wallet, Merchant Payment",
    description: "A simple and secure way to pay your bills",
    images: ["/pages/home.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://assets.bepay.money" />
        <link rel="dns-prefetch" href="https://assets.bepay.money" />
      </head>
      <body className={`${openSans.variable} ${montserrat.variable} antialiased`}>
        <MixpanelProvider>
          <SmoothScroll>
            <ConditionalHeader  />
            <ConditionalCookieConsent />
            <CampaignTracker />
            <main>{children}</main>
            <ConditionalFooter />
          </SmoothScroll>
        </MixpanelProvider>
      </body>
    </html>
  );
}