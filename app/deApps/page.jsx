'use client';
import BepayFeatures from "@/components/business/bepay-features";
import BepayComparison from "@/components/business/BepayComparison";
import BusinessSection from "@/components/business/business-section";
import BusinessSmartlySection from "@/components/business/business-smartly-section";
import BusinessHero from "@/components/business/BusinessHero";
import ComplianceSection from "@/components/business/compliance-section";
import FAQSection from "@/components/business/faq-section";
import Footer from "@/components/business/Footer";
import GetStartedSection from "@/components/business/get-started-section";
import Hero from "@/components/business/Hero";
import CryptoPaymentFlowSection from "@/components/business/Howbepayworks";
import HowCryptoMake from "@/components/business/HowCryptoMake";
import MerchantSection from "@/components/business/merchant-section";
import ReadyToStartSection from "@/components/business/ready-to-start-section";
import TestimonialsSection from "@/components/business/testimonials-section";
import Header from "@/components/header";
import TrustedBySection from "@/components/trusted-by-section";
import React from "react";
import { Suspense } from 'react'; // 1. Import Suspense
import DAppMobileView from "@/components/deAppHero";
import NetworkSelectionPage from "@/components/allNetworks";
import DAppPage from "@/components/deAppHero";


const page = () => {
  return (
    <>
  
      < DAppPage/>
      {/* <NetworkSelectionPage/> */}
      {/* <Hero /> */}
      {/* <CryptoPaymentFlowSection /> */}
      {/* <HowCryptoMake />
      <BusinessSmartlySection />
      <BepayFeatures />
      <BepayComparison />
      <Suspense fallback={<div>Loading...</div>}>
        <GetStartedSection />
      </Suspense>
      <ComplianceSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <TrustedBySection />
      <ReadyToStartSection />
      <BusinessSection />
      <MerchantSection />
      <FAQSection />
      <Footer /> */}
    </>
  );
};

export default page;
