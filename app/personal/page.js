"use client"; // ← top of file
import { useEffect } from "react";

import dynamic from "next/dynamic";
import CryptoHeroSection from "@/components/crypto/CryptoHero";
import CryptoWalletSection from "@/components/crypto/crypto-wallet-section";

const ScrollTextAnimation = dynamic(() => import("@/components/crypto/scroll-text-animation"), { ssr: false });
const OneWallet = dynamic(() => import("@/components/crypto/OneWallet"), { ssr: false });
import { PaymentProofSection } from "@/components/crypto/payment-proof-section";
import { UtilitySection } from "@/components/crypto/utility-section";
import { FinancialServicesSection } from "@/components/crypto/financial-services-section";
import CryptoScrollSection from "@/components/crypto/crypto-scroll-section";
import InvestmentSuite from "@/components/crypto/investment-suite";
import DefiYieldSection from "@/components/crypto/DefiYieldSection ";
import WaitlistPopup from "@/components/waitlist-popup";
import ScrollTextMobile from "@/components/crypto/ScrollTextMobile";
import ComplianceSection from "@/components/igps/compliance";

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
