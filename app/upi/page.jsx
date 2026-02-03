'use client';
import Hero from "@/components/Hero";
import CreditCardSection from "@/components/credit-card-section";
import ScrollTextAnimation from "@/components/ScrollTextAnimation";
import SavingSection from "@/components/SavingSection";
import AnimatedTextScroll from "@/components/Animatedtextscroll";
import FdSection from "@/components/fd-section";
import HowItWorksSection from "@/components/HowItWorks";
import StickyHeroSection from "@/components/animated-text-section";
import React from "react";
import { Suspense } from 'react'; // 1. Import Suspense


const page = () => {
  return (
    <>
  
      <Hero />
      <CreditCardSection />
      <ScrollTextAnimation />
      <SavingSection/>
      {/* <AnimatedTextScroll/> */}
      <FdSection/>
      <HowItWorksSection/>
      {/* <StickyHeroSection/> */}
      
      {/* <Footer /> */}
    </>
  );
};

export default page;
