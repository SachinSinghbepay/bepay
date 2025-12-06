'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer1';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't render footer on specific pages
  if (
    pathname === '/cookie-policy' || 
    pathname === '/bepay-foundations' || 
    // Exclude /dapps and /allNetworks
    pathname.startsWith('/dapps') ||
    pathname === '/allNetworks' || 
    pathname === '/airdrops' ||
    // Exclude admin routes
    pathname.startsWith('/admin')
  ) {
    return null;
  }
  
  // Check for '/business' page
  if (pathname === '/business') {
    return <Footer
        heading="Experience the power of receiving low-fee, lightening fast global payments for your business!"
        headingSize="text-[20px]" 
      />;
  }

  // Check for '/upi' page and pass a special prop
  if (pathname === '/upi') {
    return <Footer
        heading="Tired of being charged to use your own money?"
        // Highlight this specific page to control link rendering in Footer.jsx
        isUpiPage={true} 
      />;
  }

  // /igps uses the footer with IGPS disclaimer
  if (pathname === '/igps') {
    return <Footer
        heading="Ready to accept international payments?"
        // Mark this as the IGPS page so Footer renders IGPS-specific copy/CTA
        isIGPSPage={true}
      />;
  }
  
  // Check for Landing Page
  if (pathname === '/') {
    return <Footer isLandingPage={true} />;
  }

  // For all other pages, render the default Footer (no special heading)
  return <Footer />;
}