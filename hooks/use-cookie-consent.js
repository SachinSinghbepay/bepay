"use client";

import { useState, useEffect } from "react";


const COOKIE_CONSENT_KEY = "bepay-cookie-consent";
const COOKIE_PREFERENCES_KEY = "bepay-cookie-preferences";

export function useCookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    tracking: false,
    functionality: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsented = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (!hasConsented) {
      // Show consent popup after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (savedPreferences) {
      // Load saved preferences
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
      } catch (error) {
        console.error("Error parsing cookie preferences:", error);
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      tracking: true,
      functionality: true,
      marketing: true,
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setShowConsent(false);

    // Initialize tracking scripts if accepted
    if (allAccepted.tracking) {
      initializeTracking();
    }
    if (allAccepted.marketing) {
      initializeMarketing();
    }
  };

  const rejectNonEssentials = () => {
    const essentialOnly = {
      essential: true,
      tracking: false,
      functionality: false,
      marketing: false,
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(essentialOnly));
    setPreferences(essentialOnly);
    setShowConsent(false);
  };

  const savePreferences = (newPreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setShowConsent(false);

    // Initialize or remove scripts based on preferences
    if (newPreferences.tracking) {
      initializeTracking();
    } else {
      removeTracking();
    }
    
    if (newPreferences.marketing) {
      initializeMarketing();
    } else {
      removeMarketing();
    }
  };

  const resetConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    localStorage.removeItem(COOKIE_PREFERENCES_KEY);
    setShowConsent(true);
    setPreferences({
      essential: true,
      tracking: false,
      functionality: false,
      marketing: false,
    });
  };

  return {
    showConsent,
    preferences,
    acceptAll,
    rejectNonEssentials,
    savePreferences,
    resetConsent,
    closeConsent: () => setShowConsent(false),
  };
}

// Helper functions to initialize/remove tracking scripts
function initializeTracking() {
  // Add Google Analytics or other tracking scripts here
  console.log("Tracking cookies enabled");
  
  // Example: Google Analytics
  // if (typeof gtag !== 'undefined') {
  //   gtag('consent', 'update', {
  //     analytics_storage: 'granted'
  //   });
  // }
}

function removeTracking() {
  // Remove tracking cookies and scripts
  console.log("Tracking cookies disabled");
  
  // Example: Disable Google Analytics
  // if (typeof gtag !== 'undefined') {
  //   gtag('consent', 'update', {
  //     analytics_storage: 'denied'
  //   });
  // }
}

function initializeMarketing() {
  // Add marketing/advertising scripts here
  console.log("Marketing cookies enabled");
  
  // Example: Facebook Pixel, Google Ads, etc.
  // if (typeof gtag !== 'undefined') {
  //   gtag('consent', 'update', {
  //     ad_storage: 'granted'
  //   });
  // }
}

function removeMarketing() {
  // Remove marketing cookies and scripts
  console.log("Marketing cookies disabled");
  
  // Example: Disable marketing scripts
  // if (typeof gtag !== 'undefined') {
  //   gtag('consent', 'update', {
  //     ad_storage: 'denied'
  //   });
  // }
}
