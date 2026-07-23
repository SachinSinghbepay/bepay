'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const CookieConsentProvider = dynamic(() => import('./cookie-consent-provider'), { ssr: false });

export default function ConditionalCookieConsent() {
  const pathname = usePathname();
  
  // Don't show cookie consent on /dapps page
  if (pathname === '/dapps') {
    return null;
  }
  
  return <CookieConsentProvider />;
}
