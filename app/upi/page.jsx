'use client';
import dynamic from "next/dynamic";
import SavingSection from "@/components/SavingSection";
import FdSection from "@/components/fd-section";
import HowItWorksSection from "@/components/HowItWorks";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const CreditCardSection = dynamic(() => import("@/components/credit-card-section"), { ssr: false });
const ScrollTextAnimation = dynamic(() => import("@/components/ScrollTextAnimation"), { ssr: false });


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
