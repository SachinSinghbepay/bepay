'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer1';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't render footer on specific pages
  if (pathname === '/cookie-policy' || pathname === '/bepay-foundations') {
    return null;
  }
  
  // NEW: Check if the path is '/business'
  if (pathname === '/business') {
    // If it is, render the Footer with a custom heading prop
    return <Footer heading="Experience the power of receiving low-fee, lightening fast global payments for your business!" />;
  }
  
  // For all other pages, render the default Footer without the special heading
  return <Footer />;
}