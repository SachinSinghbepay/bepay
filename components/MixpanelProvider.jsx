'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnalyticsService } from '../services/analyticsService';

// ❗ Replace with your actual Mixpanel token
const MIXPANEL_TOKEN = "b04da96f35b5d2e2afaa9c364a366590";

export default function MixpanelProvider({ children }) {
  const pathname = usePathname();

  // This effect runs once when the app loads.
  // It initializes Mixpanel, starts the session, and sets up the listener for the session end.
  useEffect(() => {
    AnalyticsService.init(MIXPANEL_TOKEN);
    AnalyticsService.startSession();

    const handleBeforeUnload = () => {
      AnalyticsService.endSession();
    };

    // Add the event listener to reliably track when the user leaves.
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove the listener when the component unmounts.
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // The empty dependency array ensures this runs only once.

  // This effect runs every time the page's pathname changes.
  // It sends a "Page View" event.
  useEffect(() => {
    if (pathname) {
      AnalyticsService.sendEvent("Page View", { path: pathname });
    }
  }, [pathname]);

  return <>{children}</>;
} 