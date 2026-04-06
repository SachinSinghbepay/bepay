import AboutSection from "@/components/aboutus/about-section";
import HeroSection from "@/components/aboutus/AboutHero";
import BepayStorySection from "@/components/aboutus/bepay-story-section";
import CoreValuesSection from "@/components/aboutus/core-values-section";
import CTASection from "@/components/aboutus/cta-section";
import WhatMakesYouDifferent from "@/components/aboutus/different-section";
import MissionVisionSection from "@/components/aboutus/mission-vision-section";
import PartnershipSection from "@/components/aboutus/partnership-section";
import Header from "@/components/header";
import React from "react";

const page = () => {
  return (
    <>
      {/* <Header /> */}
      <HeroSection />
      <AboutSection />
      <MissionVisionSection />
      <CoreValuesSection />
      <BepayStorySection />
      <WhatMakesYouDifferent />
      <CTASection />
      <PartnershipSection />
    </>
  );
};

export default page;
