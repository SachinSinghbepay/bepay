'use client'; // <-- MUST be the very first line

import { useEffect, useState, useMemo } from 'react';
import { AnalyticsService } from '../../services/analyticsService';
import { CSSProperties } from 'react'; // Assuming AnalyticsService and CSSProperties types are external
import { APP_DOWNLOAD_LINKS } from '@/lib/appDownloadLinks';
import { OSSelectionPopup } from '@/components/popups/os-selection-popup';

const DownloadRedirect = () => {
  const [isClient, setIsClient] = useState(false); // State to track if we are on the client side
  const [isOSPopupOpen, setIsOSPopupOpen] = useState(false);
  const [needsStoreChoice, setNeedsStoreChoice] = useState(false);

  // Set client-side flag to true when component is mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only use search params when on the client side
  const queryParams = useMemo(() => {
    // Check if window is defined before accessing location.search
    return isClient && typeof window !== 'undefined'
      ? Object.fromEntries(new URLSearchParams(window.location.search).entries())
      : {};
  }, [isClient]);

  // Track query params with Mixpanel if they exist
  useEffect(() => {
    if (queryParams) {
      AnalyticsService.sendEvent('bepay_download_page_view', {
        ...queryParams,
        timestamp: new Date().toISOString(),
      });
    }
  }, [queryParams]);

  useEffect(() => {
    if (!isClient || typeof navigator === 'undefined') return;

    const userAgent = navigator.userAgent || navigator.vendor;

    const deviceDetails = {
      userAgent,
      platform: navigator.platform,
      language: navigator.language,
    };

    const isAndroid = /android/i.test(userAgent);

    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isAndroid) {
      AnalyticsService.sendEvent('bepay_redirect_to_android', { ...deviceDetails, ...queryParams });
      window.location.href = APP_DOWNLOAD_LINKS.android;
    } else if (isIOS) {
      AnalyticsService.sendEvent('bepay_redirect_to_ios', { ...deviceDetails, ...queryParams });
      window.location.href = APP_DOWNLOAD_LINKS.ios;
    } else {
      AnalyticsService.sendEvent('bepay_redirect_to_unsupported_device', { ...deviceDetails, ...queryParams });
      setNeedsStoreChoice(true);
      setIsOSPopupOpen(true);
    }
  }, [isClient, queryParams]);

  const handleOSSelected = (os: string) => {
    const storeUrl = os === 'ios' ? APP_DOWNLOAD_LINKS.ios : APP_DOWNLOAD_LINKS.android;
    AnalyticsService.sendEvent('bepay_download_store_selected', {
      os,
      ...queryParams,
    });
    window.location.href = storeUrl;
  };

  return (
    <div style={styles.container}>
      <p style={styles.message}>
        {needsStoreChoice ? 'Choose your app store to continue.' : 'Redirecting to the Bepay app store...'}
      </p>
      {needsStoreChoice && (
        <button
          className="rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-black/80"
          onClick={() => setIsOSPopupOpen(true)}
        >
          Choose app store
        </button>
      )}
      <OSSelectionPopup
        isVisible={isOSPopupOpen}
        onClose={() => setIsOSPopupOpen(false)}
        onOSSelected={handleOSSelected}
      />
    </div>
  );
};

// Inline styles to center the message
const styles: { container: CSSProperties; message: CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    textAlign: 'center',
  },
  message: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
};

export default DownloadRedirect; 
