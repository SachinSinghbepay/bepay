export const metadata = {
  title: "About Us - bepay | Global Fintech Payment Platform",
  description: "Learn about bepay's mission to make global payments simple, fast, and secure. Discover our story, core values, and the team building the future of stablecoin payments.",
  alternates: { canonical: "https://www.bepay.money/about-us" },
  openGraph: {
    title: "About Us - bepay | Global Fintech Payment Platform",
    description: "Learn about bepay's mission to make global payments simple, fast, and secure. Discover our story, core values, and the team building the future of stablecoin payments.",
    url: "https://www.bepay.money/about-us",
    siteName: "bepay",
    images: [{ url: "/pages/about-us.jpeg", width: 1200, height: 630, alt: "About bepay" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - bepay | Global Fintech Payment Platform",
    description: "Learn about bepay's mission to make global payments simple, fast, and secure.",
    images: ["/pages/about-us.jpeg"],
  },
};

import dynamic from "next/dynamic";
import HeroSection from "@/components/aboutus/AboutHero";
import React from "react";

const AboutSection = dynamic(() => import("@/components/aboutus/about-section"));
const BepayStorySection = dynamic(() => import("@/components/aboutus/bepay-story-section"));
const CoreValuesSection = dynamic(() => import("@/components/aboutus/core-values-section"));
const CTASection = dynamic(() => import("@/components/aboutus/cta-section"));
const WhatMakesYouDifferent = dynamic(() => import("@/components/aboutus/different-section"));
const MissionVisionSection = dynamic(() => import("@/components/aboutus/mission-vision-section"));
const PartnershipSection = dynamic(() => import("@/components/aboutus/partnership-section"));

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
