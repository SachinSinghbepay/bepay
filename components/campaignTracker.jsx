"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function CampaignTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const campaignId = searchParams.get("campaignId");

    if (campaignId) {
      localStorage.setItem("campaignId", campaignId);
    }
  }, [searchParams]);

  return null; // no UI, just runs logic
}
