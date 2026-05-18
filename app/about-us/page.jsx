export const metadata = {
  title: "About Us - bepay | Global Fintech Payment Platform",
  description: "Learn about bepay's mission to make global payments simple, fast, and secure. Discover our story, core values, and the team building the future of stablecoin payments.",
  alternates: { canonical: "https://www.bepay.money/about-us" },
  openGraph: {
    title: "About Us - bepay | Global Fintech Payment Platform",
    description: "Learn about bepay's mission to make global payments simple, fast, and secure. Discover our story, core values, and the team building the future of stablecoin payments.",
    url: "https://www.bepay.money/about-us",
    siteName: "bepay",
    images: [{ url: "/pages/about-us.png", width: 1200, height: 630, alt: "About bepay" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - bepay | Global Fintech Payment Platform",
    description: "Learn about bepay's mission to make global payments simple, fast, and secure.",
    images: ["/pages/about-us.png"],
  },
};

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
