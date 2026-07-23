"use client";

import React from "react";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const WaitlistPopup = dynamic(() => import("./waitlist-popup"), { ssr: false });

export default function WaitlistTriggerButton({
  variant = "default",
  size = "default",
  children,
  className = "",
  triggerSource = "",
  buttonLocation = "",
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsPopupOpen(true)} className={`${className}`}>
        {children}
      </div> 

      <WaitlistPopup
        isOpen={isPopupOpen}
        triggerSource={triggerSource}
        buttonLocation={buttonLocation}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={() => setIsPopupOpen(false)}
      />
    </>
  );
}
