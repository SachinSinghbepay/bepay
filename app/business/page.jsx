'use client';
import { Suspense } from 'react';
import BepayFeatures from "@/components/business/bepay-features";
import BepayComparison from "@/components/business/BepayComparison";
import BusinessSection from "@/components/business/business-section";
import BusinessSmartlySection from "@/components/business/business-smartly-section";
import BusinessHero from "@/components/business/BusinessHero";
import ComplianceSection from "@/components/business/compliance-section";
import FAQSection from "@/components/business/faq-section";
import GetStartedSection from "@/components/business/get-started-section";
import HowCryptoMake from "@/components/business/HowCryptoMake";
import MerchantSection from "@/components/business/merchant-section";
import ReadyToStartSection from "@/components/business/ready-to-start-section";
import TrustedBySection from "@/components/trusted-by-section";


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
