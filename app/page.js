import React from 'react';
import IgpsHero from '@/components/igps/igpsHero';

export const metadata = {
  title: "bepay - Global Stablecoin Payments & Merchant Solutions",
  description: "Send, receive and accept stablecoin payments globally. bepay offers fast cross-border transfers, merchant payment tools, and DeFi yields — all in one platform.",
  alternates: { canonical: "https://www.bepay.money" },
  openGraph: {
    title: "bepay - Global Stablecoin Payments & Merchant Solutions",
    description: "Send, receive and accept stablecoin payments globally. bepay offers fast cross-border transfers, merchant payment tools, and DeFi yields — all in one platform.",
    url: "https://www.bepay.money",
    siteName: "bepay",
    images: [{ url: "/thumbnail.png", width: 1200, height: 630, alt: "bepay - Global Stablecoin Payment Platform" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "bepay - Global Stablecoin Payments & Merchant Solutions",
    description: "Send, receive and accept stablecoin payments globally. bepay offers fast cross-border transfers, merchant payment tools, and DeFi yields — all in one platform.",
    images: ["/thumbnail.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "bepay",
  url: "https://www.bepay.money",
  logo: "https://www.bepay.money/logo.png",
  sameAs: [],
  description: "bepay is a global stablecoin payment platform offering cross-border transfers, merchant payment tools, crypto wallets, and DeFi yield products.",
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
import GlobalNetworkCoverage from '@/components/igps/globeNetwork';
import ImageComparisonTable from '@/components/igps/comparison';
import App from '@/components/igps/transfer';
import BepayLanding from '@/components/igps/chooseBepay';
import ComplianceSection from '@/components/igps/compliance';
import FAQSection from '@/components/igps/faqs';
import PaymentSystemUI from '@/components/igps/paymentSystem';
import SetupGlobalAccount from '@/components/igps/globalAccount';
import VerticalScrollingSection from '@/components/igps/verticalScroll';
import BuiltForMerchants from '@/components/igps/builtForMerchants';

const IgpsPage = () => {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <IgpsHero />
      <BuiltForMerchants/>
      <GlobalNetworkCoverage/>
      <ImageComparisonTable/>
      {/* <App/> */}
      <PaymentSystemUI/>
      <BepayLanding/>
      {/* <VerticalScrollingSection/> */}
      <SetupGlobalAccount/>
      <ComplianceSection/>
      <FAQSection/>
    </div>
  );
};

export default IgpsPage;
