"use client"; // ← top of file
import { useEffect } from "react";

import dynamic from "next/dynamic";
import CryptoHeroSection from "@/components/crypto/CryptoHero";

const WaitlistPopup = dynamic(() => import("@/components/waitlist-popup"), { ssr: false });
const ScrollTextAnimation = dynamic(() => import("@/components/crypto/scroll-text-animation"), { ssr: false });
const OneWallet = dynamic(() => import("@/components/crypto/OneWallet"), { ssr: false });
const CryptoWalletSection = dynamic(() => import("@/components/crypto/crypto-wallet-section"), { ssr: false });
const PaymentProofSection = dynamic(() => import("@/components/crypto/payment-proof-section").then(mod => mod.PaymentProofSection), { ssr: false });
const UtilitySection = dynamic(() => import("@/components/crypto/utility-section").then(mod => mod.UtilitySection), { ssr: false });
const FinancialServicesSection = dynamic(() => import("@/components/crypto/financial-services-section").then(mod => mod.FinancialServicesSection), { ssr: false });
const CryptoScrollSection = dynamic(() => import("@/components/crypto/crypto-scroll-section"), { ssr: false });
const InvestmentSuite = dynamic(() => import("@/components/crypto/investment-suite"), { ssr: false });
const DefiYieldSection = dynamic(() => import("@/components/crypto/DefiYieldSection "), { ssr: false });
const ScrollTextMobile = dynamic(() => import("@/components/crypto/ScrollTextMobile"), { ssr: false });
const ComplianceSection = dynamic(() => import("@/components/igps/compliance"), { ssr: false });

const Page = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // ← add this

  return (
    <>
      <main>
        <WaitlistPopup />
        <CryptoHeroSection />
        <CryptoWalletSection />
        <OneWallet />
        {/* <ScrollTextAnimation /> */}
        <ScrollTextMobile />
        <DefiYieldSection />
        <InvestmentSuite />
        <UtilitySection />
        <FinancialServicesSection />
        <ComplianceSection />
        {/* <SecuritySection /> */}
        <CryptoScrollSection />
        <PaymentProofSection />
      </main>
    </>
  );
};

export default Page;
