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
import React, { useEffect } from "react";
import { Suspense } from 'react'; // 1. Import Suspense
import DAppMobileView from "@/components/deAppHero";
import NetworkSelectionPage from "@/components/allNetworks";
import DAppPage from "@/components/deAppHero";


const page = () => {
  // Check for bepay_web_session cookie and call test API to verify cookies are sent.
  useEffect(() => {
    const getCookie = (name) => {
      const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : null;
    };

    const sessionId = getCookie('bepay_web_session');
    console.log('[dapps] bepay_web_session (from cookies):', sessionId);

    // If no session cookie found, still call API for debugging (browser will not send Cookie)
    // but include the cookie value in a custom header so you can inspect it in network tab.
    const callStatus = async () => {
      try {
        const res = await fetch('https://dev.bepay.money/api/auth/web-session/status', {
          method: 'GET',
          credentials: 'include', // ensure the browser sends stored cookies when allowed by sameSite/domain
          headers: {
            'Accept': 'application/json',
            // Cannot set the Cookie header from JS; include sessionId in a custom header for debugging
            ...(sessionId ? { 'x-session-cookie-debug': sessionId } : {}),
          },
        });

        let bodyText;
        try {
          bodyText = await res.text();
        } catch (e) {
          bodyText = '<unable to read body>';
        }
        console.log('[dapps] /api/auth/web-session/status', { status: res.status, body: bodyText });
      } catch (err) {
        console.error('[dapps] test API call failed', err);
      }
    };

    // Run the check once on mount
    callStatus();
  }, []);

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
