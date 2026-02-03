import CoreProgramsSection from "@/components/foundation/core-programs-section";
import FoundationFooter from "@/components/foundation/FoundationFooter";
import BepayHero from "@/components/foundation/Hero";
import JoinImpactSection from "@/components/foundation/join-impact-section";
import MissionSection from "@/components/foundation/mission-section";
import React from "react";

const page = () => {
  return (
    <>
      <BepayHero />
      <MissionSection />
      <CoreProgramsSection />
      <JoinImpactSection />
      <FoundationFooter />
    </>
  );
};

export default page;
