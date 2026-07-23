'use client';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import BusinessHero from "@/components/business/BusinessHero";

const BepayFeatures = dynamic(() => import("@/components/business/bepay-features"), { ssr: false });
const BepayComparison = dynamic(() => import("@/components/business/BepayComparison"), { ssr: false });
const BusinessSection = dynamic(() => import("@/components/business/business-section"), { ssr: false });
const BusinessSmartlySection = dynamic(() => import("@/components/business/business-smartly-section"), { ssr: false });
const ComplianceSection = dynamic(() => import("@/components/business/compliance-section"), { ssr: false });
const FAQSection = dynamic(() => import("@/components/business/faq-section"), { ssr: false });
const GetStartedSection = dynamic(() => import("@/components/business/get-started-section"), { ssr: false });
const HowCryptoMake = dynamic(() => import("@/components/business/HowCryptoMake"), { ssr: false });
const MerchantSection = dynamic(() => import("@/components/business/merchant-section"), { ssr: false });
const ReadyToStartSection = dynamic(() => import("@/components/business/ready-to-start-section"), { ssr: false });
const TrustedBySection = dynamic(() => import("@/components/trusted-by-section"), { ssr: false });


const page = () => {
  return (
    <>
  
      <BusinessHero />
      <HowCryptoMake />
      <BusinessSmartlySection />
      <BepayFeatures />
      <BepayComparison />
      <Suspense fallback={<div>Loading...</div>}>
        <GetStartedSection />
      </Suspense>
      <ComplianceSection />
      <TrustedBySection />
      <ReadyToStartSection />
      <BusinessSection />
      <MerchantSection />
      <FAQSection />
    </>
  );
};

export default page;
