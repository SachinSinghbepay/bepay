'use client';

import { usePathname } from 'next/navigation';
import CookieConsentProvider from './cookie-consent-provider';

export default function ConditionalCookieConsent() {
  const pathname = usePathname();
  
  // Don't show cookie consent on /dapps page
  if (pathname === '/dapps') {
    return null;
  }
  
  return <CookieConsentProvider />;
}
