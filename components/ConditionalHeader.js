'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/header';

export default function ConditionalHeader() {
  const pathname = usePathname();

  // Don't render header on specific pages
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dapps') ||
    pathname === '/allNetworks' ||
    pathname === '/airdrops'
  ) {
    return null;
  }

  // Optional: Special header variations
  if (pathname === '/business') {
    return <Header variant="business" />;
  }

  if (pathname === '/upi') {
    return <Header variant="upi" />;
  }

  // Default header
  return <Header />;
}
