"use client";

import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import WaitlistPopup from "./waitlist-popup";

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
