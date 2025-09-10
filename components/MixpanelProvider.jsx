// src/components/MixpanelProvider.jsx
'use client'; // This is the crucial line!

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnalyticsService } from '../services/analyticsService';

// Replace with your actual Mixpanel token
const MIXPANEL_TOKEN = "b04da96f35b5d2e2afaa9c364a366590";
export default function MixpanelProvider({ children }) {
  const pathname = usePathname();

  // Initialize Mixpanel once when the app loads
  useEffect(() => {
    AnalyticsService.init(MIXPANEL_TOKEN);
  }, []);

  // Track page views when the path changes
  useEffect(() => {
    if (pathname) {
      AnalyticsService.setCurrentPage(pathname);
      AnalyticsService.sendEvent('Page View', { path: pathname });
    }
  }, [pathname]);

  return <>{children}</>;
}