"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service


export default function CookiePolicyBanner({
  
  currentPreferences,
  onAcceptAll,
  onRejectNonEssentials,
  onSaveCustom,
  onDismiss,
}) {
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [essentialCookies, setEssentialCookies] = useState(true); // Always true and disabled
  const [trackingCookies, setTrackingCookies] = useState(
    currentPreferences?.tracking ?? false
  );
  const [functionalityCookies, setFunctionalityCookies] = useState(
    currentPreferences?.functionality ?? false
  );
  const [marketingCookies, setMarketingCookies] = useState(
    currentPreferences?.marketing ?? false
  );

  // Update local state if currentPreferences prop changes
  // This ensures the switches reflect the actual cookie state after an action
  useEffect(() => {
    if (currentPreferences) {
      setTrackingCookies(currentPreferences.tracking);
      setFunctionalityCookies(currentPreferences.functionality);
      setMarketingCookies(currentPreferences.marketing);
    }
  }, [currentPreferences]);

  // const handleManagePreferencesClick = () => {
  //   setShowPreferences(!showPreferences);
  // };

  const handleToggleChange = (name, value, setter) => {
  setter(value); // update state
  AnalyticsService.sendEvent(`Cookie preference toggled`, {
    toggle: name,
    value: value ? "enabled" : "disabled",
  });
};

  // ANALYTICS: Track when section comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !hasTrackedView) {
              AnalyticsService.sendEvent("cookie section viewed");
              setHasTrackedView(true);
              observer.unobserve(entry.target); // Stop observing after first trigger
            }
          },
          { threshold: 0.1 } // Trigger when 30% of the section is visible
        );
    
        if (sectionRef.current) {
          observer.observe(sectionRef.current);
        }
    
        return () => observer.disconnect();
      }, [hasTrackedView]);

   // ✅ wrap props safely
const handleRejectNonEssentials = (e) => {
  AnalyticsService.sendEvent("Reject non-essential cookies clicked");
  onRejectNonEssentials?.(e); // call the prop if provided
};

const handleAcceptAll = (e) => {
  AnalyticsService.sendEvent("Accept all cookies clicked");
  onAcceptAll?.(e);
};

const handleDismiss = (e) => {
  AnalyticsService.sendEvent("Cookies popup close button clicked");
  onDismiss?.(e); // correctly call the prop, not onAcceptAll
};


  const handleManagePreferencesClick = () => {
  AnalyticsService.sendEvent("Manage cookie preferences clicked");
  setShowPreferences((prev) => !prev);
};





  return (
    <div ref={sectionRef} className="fixed bottom-0 md:right-10 z-50 bg-black text-white p-4 md:p-6 shadow-lg rounded-3xl md:max-w-[610px] md:mx-auto md:bottom-4">
      <div className="relative">
        <button
          
          className="absolute top-0 right-0 text-gray-400 hover:text-white transition-colors"
          onClick={handleDismiss}
          aria-label="Close cookie policy"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="text-[12px] leading-[20px] tracking-[2%] mb-4 pr-8">
          We use cookies to enhance your browsing experience, analyze site
          traffic, and personalize content. By clicking
          {' "Accept All Cookies"'}, you consent to our use of cookies as
          described in our Cookies Policy. You can manage your preferences or
          withdraw consent at any time.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
          <Button
  onClick={handleRejectNonEssentials}
  className="w-full md:w-auto text-[12px] border rounded-xl cursor-pointer bg-transparent text-[#F9F9F9] border-[#333333]"
>
  Reject non-essentials
</Button>
          <Button
  onClick={handleAcceptAll}
  className="w-full md:w-auto bg-white rounded-xl cursor-pointer text-[12px] text-black hover:bg-gray-100"
>
  Accept all cookies
</Button>
          <Button
            variant="link"
            className={cn(
              "w-full md:w-auto text-[#6A6A6A] text-[12px] hover:text-white transition-colors",
              showPreferences && "text-white"
            )}
            onClick={handleManagePreferencesClick}
          >
            Manage preferences
          </Button>
        </div>
        <AnimatePresence>
          {showPreferences && (
            <motion.div
              key="cookie-switches"
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={{ opacity: 1, height: 'auto', transition: { duration: 0.3 } }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="flex flex-col items-start gap-2">
  <span className="text-[11px] font-medium">Essential cookies</span>
  <Switch
    checked={essentialCookies}
    onCheckedChange={(val) => handleToggleChange("Essential cookies", val, setEssentialCookies)}
    disabled={!showPreferences} // keep same behavior as other toggles
    className="data-[state=checked]:bg-transparent border border-[#333333] data-[state=unchecked]:bg-transparent"
  />
</div>


<div className="flex flex-col items-start gap-2">
  <span className="text-[11px] font-medium">Tracking cookies</span>
  <Switch
    checked={trackingCookies}
    onCheckedChange={(val) => handleToggleChange("Tracking cookies", val, setTrackingCookies)}
    disabled={!showPreferences}
    className="data-[state=checked]:bg-transparent border border-[#333333] data-[state=unchecked]:bg-transparent"
  />
</div>

<div className="flex flex-col items-start gap-2">
  <span className="text-[11px] font-medium">Functionality cookies</span>
  <Switch
    checked={functionalityCookies}
    onCheckedChange={(val) => handleToggleChange("Functionality cookies", val, setFunctionalityCookies)}
    disabled={!showPreferences}
    className="data-[state=checked]:bg-transparent border border-[#333333] data-[state=unchecked]:bg-transparent"
  />
</div>

<div className="flex flex-col items-start gap-2">
  <span className="text-[11px] font-medium">Marketing cookies</span>
  <Switch
    checked={marketingCookies}
    onCheckedChange={(val) => handleToggleChange("Marketing cookies", val, setMarketingCookies)}
    disabled={!showPreferences}
    className="data-[state=checked]:bg-transparent border border-[#333333] data-[state=unchecked]:bg-transparent"
  />
</div>

            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showPreferences && (
            <motion.div
              key="save-preferences-button"
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={{ opacity: 1, height: 'auto', transition: { duration: 0.3, delay: 0.1 } }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
              className="mt-6 flex justify-end"
            >
              <Button
                onClick={() =>
                  onSaveCustom(
                    trackingCookies,
                    functionalityCookies,
                    marketingCookies
                  )
                }
                className="w-full md:w-auto bg-white rounded-xl cursor-pointer text-[12px] text-black hover:bg-gray-100"
              >
                Save preferences
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
