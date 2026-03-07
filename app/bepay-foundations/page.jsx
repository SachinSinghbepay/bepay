"use client"

import { useState } from "react"
import CoreProgramsSection from "@/components/foundation/core-programs-section"
import FoundationFooter from "@/components/foundation/FoundationFooter"
import BepayHero from "@/components/foundation/Hero"
import JoinImpactSection from "@/components/foundation/join-impact-section"
import MissionSection from "@/components/foundation/mission-section"
import GetStartedPopup from "@/components/popups/getStartedPopup"

const page = () => {
  const [openPopup, setOpenPopup] = useState(false)

  return (
    <>
      <BepayHero />

      <MissionSection onPartnerClick={() => setOpenPopup(true)} />

      <CoreProgramsSection />
      <JoinImpactSection />
      <FoundationFooter />

      {openPopup && (
        <GetStartedPopup
          isOpen={true}
          onClose={() => setOpenPopup(false)}
        />
      )}
    </>
  )
}

export default page