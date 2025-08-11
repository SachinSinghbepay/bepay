'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer1';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't render footer on specific pages
  if (pathname === '/cookie-policy' || pathname === '/bepay-foundations') {
    return null;
  }
  
  return <Footer />;
}
