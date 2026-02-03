"use client";

import { useState, useEffect } from "react";
import CookiePolicyBanner from "./cookie-consent";

const COOKIE_CONSENT_KEY = "cookieConsentDismissedAt";
const COOKIE_PREFERENCES_KEY = "cookiePreferences";
const ONE_YEAR_IN_MS = 365 * 24 * 60 * 60 * 1000; // Approximately 1 year

export default function CookieConsentProvider() {
  const [currentPreferences, setCurrentPreferences] = useState({
    tracking: false,
    functionality: false,
    marketing: false,
  });
  const [isBannerVisible, setIsBannerVisible] = useState(false); // Default to false, will be determined by useEffect

  useEffect(() => {
    // Load preferences from localStorage
    const storedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (storedPreferences) {
      setCurrentPreferences(JSON.parse(storedPreferences));
    }

    // Check if the banner was dismissed within the last year
    const dismissedAt = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (dismissedAt) {
      const lastDismissedTime = parseInt(dismissedAt, 10);
      const currentTime = Date.now();

      if (currentTime - lastDismissedTime < ONE_YEAR_IN_MS) {
        // Less than a year has passed, keep banner hidden
        setIsBannerVisible(false);
      } else {
        // More than a year has passed, show banner again
        setIsBannerVisible(true);
      }
    } else {
      // Banner has never been dismissed, show it
      setIsBannerVisible(true);
    }
  }, []);

  // Function to hide the banner and record the dismissal time
  const hideBannerAndRecordTime = () => {
    setIsBannerVisible(false);
    localStorage.setItem(COOKIE_CONSENT_KEY, Date.now().toString());
  };

  const onAcceptAll = () => {
    const newPreferences = { tracking: true, functionality: true, marketing: true };
    setCurrentPreferences(newPreferences);
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences));
    console.log("Layout: Accept All Cookies", newPreferences);
    hideBannerAndRecordTime(); // Hide banner and record time
  };

  const onRejectNonEssentials = () => {
    const newPreferences = { tracking: false, functionality: false, marketing: false };
    setCurrentPreferences(newPreferences);
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences));
    console.log("Layout: Reject Non-Essential Cookies", newPreferences);
    hideBannerAndRecordTime(); // Hide banner and record time
  };

  const onSaveCustom = (tracking, functionality, marketing) => {
    const newPreferences = { tracking, functionality, marketing };
    setCurrentPreferences(newPreferences);
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences));
    console.log("Layout: Save Custom Preferences:", newPreferences);
    hideBannerAndRecordTime(); // Hide banner and record time
  };

  const onDismiss = () => {
    console.log("Layout: Dismiss Cookie Policy Banner");
    hideBannerAndRecordTime(); // Hide banner and record time
  };

  return (
    <>
      {isBannerVisible && ( // Conditionally render the banner
        <CookiePolicyBanner
          currentPreferences={currentPreferences}
          onAcceptAll={onAcceptAll}
          onRejectNonEssentials={onRejectNonEssentials}
          onSaveCustom={onSaveCustom}
          onDismiss={onDismiss}
        />
      )}
    </>
  );
}
