'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer1';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't render footer on specific pages
  if (pathname === '/cookie-policy' || pathname === '/bepay-foundations') {
    return null;
  }
  
  // Check for '/business' page
  if (pathname === '/business') {
    return <Footer
        heading="Experience the power of receiving low-fee, lightening fast global payments for your business!"
        headingSize="text-[20px]" 
      />;
  }

  // ✅ MODIFICATION: Check for '/upi' page and pass a special prop
  if (pathname === '/upi') {
    return <Footer
        heading="Tired of being charged to use your own money?"
        // Highlight this specific page to control link rendering in Footer.jsx
        isUpiPage={true} 
      />;
  }
  
  // For all other pages, render the default Footer (no special heading)
  return <Footer />;
}