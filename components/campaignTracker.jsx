"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CampaignTrackerContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const campaignId = searchParams.get("campaignId");

    if (campaignId) {
      localStorage.setItem("campaignId", campaignId);
    }
  }, [searchParams]);

  return null; // no UI, just runs logic
}

export default function CampaignTracker() {
  return (
    <Suspense fallback={null}>
      <CampaignTrackerContent />
    </Suspense>
  );
}