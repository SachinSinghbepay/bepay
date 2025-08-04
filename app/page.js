// "use client";
// import AnimatedTextSection from "@/components/animated-text-section";
// import AnimatedTextScroll from "@/components/Animatedtextscroll";
// import CreditCardSection from "@/components/credit-card-section";
// import FdSection from "@/components/fd-section";
// import FTR from "@/components/ftr";
// import Header from "@/components/header";
// import Hero from "@/components/Hero";
// import HowItWorksSection from "@/components/HowItWorks";
// import RealSavingsSection from "@/components/RealSavingSection";
// import SavingSection from "@/components/SavingSection";
// import ScrollAnimatedTextSectionGSAP from "@/components/ScrollAnimatedText";
// import ScrollTextAnimation from "@/components/ScrollTextAnimation";

// export default function Home() {
//   return (
//     <>
//       <main>
//         <Header />
//         <Hero />
//         <CreditCardSection />
//         <ScrollTextAnimation />
//         <SavingSection />
//         <FdSection />
//         <AnimatedTextScroll />
//         <HowItWorksSection />
//         <AnimatedTextSection />
//         <FTR />
//       </main>
//     </>
//   );
// }

// // 'use client';
// // import LocomotiveProvider from '@/components/LocomotiveProvider';
// // import Header from '@/components/header';
// // import Hero from '@/components/Hero';

// // export default function Home() {
// //   return (
// //     <LocomotiveProvider>
// //       <Header />
// //       <Hero />
// //     </LocomotiveProvider>
// //   );
// // }

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
import InvestmentSuitePage from "@/components/crypto/InvestmentSuitePage";
import WaitlistPopup from "@/components/waitlist-popup";
import ScrollTextMobile from "@/components/crypto/ScrollTextMobile";
import ScrollArrow from "@/components/ui/ScrollArrow";

const page = () => {
  return (
    <>
      <main>
        <WaitlistPopup />
        {/* <Header /> */}
        <CryptoHeroSection />
        <CryptoWalletSection /> 
        {/* <InvestmentSuitePage /> */}
        <OneWallet />
        <ScrollTextAnimation />
        <ScrollTextMobile />
        {/* <OneWallet />
        <CryptoDebit />
        <SwissIBAN /> */}
        <DefiYieldSection />
        <InvestmentSuite />
        <UtilitySection />
        <FinancialServicesSection />
        <SecuritySection />
        <CryptoScrollSection />

        <PaymentProofSection />
        {/* <BusinessSection /> */}
        {/* <Footer /> */}
      </main>

      <ScrollArrow />
    </>
  );
};

export default page;
