import ScrollTextAnimation from "@/components/crypto/scroll-text-animation";
import React from "react";

import Header from "@/components/header";
import CryptoHeroSection from "@/components/crypto/CryptoHero";
import CryptoWalletSection from "@/components/crypto/crypto-wallet-section";
import OneWallet from "@/components/crypto/OneWallet";
import CryptoDebit from "@/components/crypto/CryptoDebit";
import SwissIBAN from "@/components/crypto/SwissIBAN";
import Footer from "@/components/crypto/Footer";
import { BusinessSection } from "@/components/crypto/business-section";
import { PaymentProofSection } from "@/components/crypto/payment-proof-section";
import { SecuritySection } from "@/components/crypto/security-section";
import { UtilitySection } from "@/components/crypto/utility-section";
import { FinancialServicesSection } from "@/components/crypto/financial-services-section";
import CryptoScrollSection from "@/components/crypto/crypto-scroll-section";
import InvestmentSuite from "@/components/crypto/investment-suite";
import DefiYieldSection from "@/components/crypto/DefiYieldSection ";

const page = () => {
  return (
    <>
      <main>
        <Header />
        <CryptoHeroSection />
        <CryptoWalletSection />
        <ScrollTextAnimation />
        {/* <OneWallet />
        <CryptoDebit />
        <SwissIBAN /> */}
       <DefiYieldSection />
        <FinancialServicesSection />
        <InvestmentSuite />
         <CryptoScrollSection />
        <UtilitySection />
        <SecuritySection />
        <PaymentProofSection />
        <BusinessSection />
        <Footer />
      </main>
    </>
  );
};

export default page;
