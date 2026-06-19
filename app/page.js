import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "bepay - Global Stablecoin Payments & Merchant Solutions",
  description: "Send, receive and accept stablecoin payments globally. bepay offers fast cross-border transfers, multi-currency accounts, merchant payment tools, and DeFi yields — all in one platform.",
  alternates: { canonical: "https://www.bepay.money" },
  openGraph: {
    title: "bepay - Global Stablecoin Payments & Merchant Solutions",
    description: "Send, receive and accept stablecoin payments globally. bepay offers fast cross-border transfers, multi-currency accounts, merchant payment tools, and DeFi yields — all in one platform.",
    url: "https://www.bepay.money",
    siteName: "bepay",
    images: [{ url: "/pages/home.jpeg", width: 1200, height: 630, alt: "bepay - Global Stablecoin Payment Platform" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "bepay - Global Stablecoin Payments & Merchant Solutions",
    description: "Send, receive and accept stablecoin payments globally. bepay offers fast cross-border transfers, multi-currency accounts, merchant payment tools, and DeFi yields.",
    images: ["/pages/home.jpeg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "bepay",
  url: "https://www.bepay.money",
  logo: "https://www.bepay.money/logo.png",
  description: "bepay is a global stablecoin payment platform offering cross-border transfers, multi-currency accounts, merchant payment tools, crypto wallets, and DeFi yield products.",
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", availableLanguage: "English" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "bepay",
  url: "https://www.bepay.money",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://www.bepay.money/blogs?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

const HomePage = () => {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold mb-4">Global Payments, Simplified</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-xl">
          bepay IGPS lets businesses send and receive international payments instantly. Multi-currency accounts, stablecoin rails, and full compliance — all in one place.
        </p>
        <a
          href="https://igps.bepay.money"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white px-8 py-4 rounded-full font-semibold text-sm hover:scale-105 transition-all duration-200"
        >
          Go to IGPS →
        </a>
      </div>
    </div>
  );
};

export default HomePage;
