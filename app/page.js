import React from 'react';
import IgpsHero from '@/components/igps/igpsHero';

export const metadata = {
  title: "bepay - Global Stablecoin Payments & Merchant Solutions",
  description: "Send, receive and accept stablecoin payments globally. bepay offers cross-border transfers, multi-currency accounts, merchant payment tools, and DeFi yields.",
  alternates: { canonical: "https://www.bepay.money" },
  openGraph: {
    title: "bepay - Global Stablecoin Payments & Merchant Solutions",
    description: "Send, receive and accept stablecoin payments globally. bepay offers cross-border transfers, multi-currency accounts, merchant payment tools, and DeFi yields.",
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
  sameAs: [
    "https://x.com/bepaymoney",
    "https://www.linkedin.com/company/bepaymoney/",
    "https://www.facebook.com/bepaymoney/",
    "https://t.me/officialbepay",
  ],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What currencies does bepay IGPS support?", acceptedAnswer: { "@type": "Answer", text: "We support over 30 major global currencies, including USD, EUR, GBP, AED, CNY and INR, plus major stablecoins for instant settlement where permitted." } },
    { "@type": "Question", name: "How do I get started with bepay IGPS?", acceptedAnswer: { "@type": "Answer", text: "Sign up, complete a quick KYB, add your business details, and activate your preferred corridors. The process typically takes under 5 minutes for standard accounts." } },
    { "@type": "Question", name: "Is bepay IGPS safe & regulated?", acceptedAnswer: { "@type": "Answer", text: "Yes, licensed as RBI's PA-CB (Payment Aggregator Cross Border), FEMA, MSB (USA), MSB (Canada), VASP (EU), and compliant with DORA, MiCA, DPDP & CFT." } },
    { "@type": "Question", name: "Are there any account maintenance or setup fees?", acceptedAnswer: { "@type": "Answer", text: "No, creating and maintaining your bepay IGPS global account is free." } },
    { "@type": "Question", name: "What can I do with my multi-currency bank account?", acceptedAnswer: { "@type": "Answer", text: "Receive global payments, collect marketplace payouts, generate statements, convert currencies, and withdraw to your local bank account." } },
    { "@type": "Question", name: "Does bepay IGPS support stablecoin-based rails?", acceptedAnswer: { "@type": "Answer", text: "Yes, wherever permitted by regulation, stablecoin rails can be used for faster settlement and lower fees, paired with full compliance controls." } },
    { "@type": "Question", name: "Do you support receiving payments from Amazon?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can receive your Amazon marketplace payouts directly into your bepay IGPS multi-currency virtual accounts." } },
  ],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
