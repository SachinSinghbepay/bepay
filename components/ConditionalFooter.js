'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer1';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't render footer on cookie-policy page
  if (pathname === '/cookie-policy') {
    return null;
  }
  
  return <Footer />;
}
