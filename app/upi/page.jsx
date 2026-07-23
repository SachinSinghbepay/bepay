'use client';
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const CreditCardSection = dynamic(() => import("@/components/credit-card-section"), { ssr: false });
const ScrollTextAnimation = dynamic(() => import("@/components/ScrollTextAnimation"), { ssr: false });
const SavingSection = dynamic(() => import("@/components/SavingSection"), { ssr: false });
const FdSection = dynamic(() => import("@/components/fd-section"), { ssr: false });
const HowItWorksSection = dynamic(() => import("@/components/HowItWorks"), { ssr: false });


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
