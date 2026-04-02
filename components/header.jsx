"use client";

import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import WaitlistTriggerButton from "./waitlist-trigger-button";
import GetStartedPopup from "./popups/getStartedPopup";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service
import { useAppDownload } from "@/hooks/useAppDownload"
import { AppDownloadPopups } from "@/components/AppDownloadPopups"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const pathname = usePathname();


  const {
    handleDownloadClick,
    isOSPopupOpen,
    setIsOSPopupOpen,
    isQRPopupOpen,
    setIsQRPopupOpen,
    selectedOS,
    setSelectedOS,
  } = useAppDownload()


  // 💥 UPDATED: Conditional check to hide the component on /dapps OR /allNetworks route
  if (
    pathname.startsWith("/dapps") || // CHECK if path starts with /dapps
    pathname === "/allNetworks" ||
    pathname === "/airdrops"
  ) {
    return null; // Do not render the header on these routes
  }

  // --- END OF UPDATED CODE --

  // New: Calculate the correct button location identifier
  const calculatedButtonLocation = pathname === "/" ? "personal" : pathname;

  // Check if current page is contact us
  const isContactPage = pathname === "/contact" || pathname === "/contact-us";

  // Make header background white on the IGPS page (now the home page)
  const isIgpsPage = pathname === "/";

  // Check if it is the blogs page
  const isBlogsPage = pathname.startsWith("/blogs") || pathname.startsWith("/admin");

  // Helper function to determine if a link is active
  const isActivePage = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };


  // 1. Determine if it's the business page
  const isBusinessPage = isActivePage("/business");

  // 2. Set the logo source and alt text conditionally
  const logoSrc = isBusinessPage ? "/bepay_business.svg" : "/bepaymoney.svg";
  const logoAlt = isBusinessPage ? "BePay Business Logo" : "BePay Logo";

  // Helper function to get link classes
  const getLinkClasses = (path, baseClasses) => {
    const isActive = isActivePage(path);
    return `${baseClasses} ${isActive
      ? "text-black font-[700]" // Active → bold black
      : "text-[#6A6A6A] hover:text-black font-[400]" // Inactive → thin gray
      } transition-colors duration-200`;
  };

  // FIXED: Changed onPage to buttonLocation
  const handleDownloadAppClick = (pageIdentifier) => {
    AnalyticsService.sendEvent("Download App Clicked", { buttonLocation: pageIdentifier });
  };

  const handlebepaymoneylogoclicked = () => {
    AnalyticsService.sendEvent("bepaymoney logo Clicked");
  };

  // Conditional header classes
  // - Contact pages: transparent (absolute)
  // - IGPS mobile: white background, but on md+ fall back to the regular bg
  // - Other pages: original light gray background
  const headerClasses = isContactPage
    ? "w-full absolute top-0 left-0 right-0 bg-transparent z-50"
    : isIgpsPage
      ? "w-full relative bg-white md:bg-[#F9F9F9] z-50"
      : "w-full relative bg-[#F9F9F9] z-50";

  return (
    <header className={headerClasses}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={"/"} onClick={handlebepaymoneylogoclicked}>
            <div className="flex-shrink-0">
              {/* 3. Use the dynamic variables here */}
              <Image
                src={logoSrc}
                height={46}
                width={110}
                alt={logoAlt}
                className="object-cover h-12 md:h-14 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-14">
            {isBlogsPage ? (
              // Hide Home link on blog slug pages (e.g. /blogs/some-slug)
              (pathname === "/blogs" || pathname.startsWith("/admin")) ? (
                <Link
                  href="/"
                  className={getLinkClasses(
                    "/",
                    "text-sm lg:text-[14px] tracking-wide uppercase"
                  )}
                >
                  Home
                </Link>
              ) : null
            ) : (
              <>
                <Link
                  href="/"
                  className={getLinkClasses(
                    "/",
                    "text-sm lg:text-[14px] tracking-wide uppercase"
                  )}
                  onClick={() => {
                    AnalyticsService.sendEvent("igps_nav_clicked");
                  }}
                >
                  IGPS
                </Link>
                <Link
                  href="/personal"
                  className={getLinkClasses(
                    "/personal",
                    "text-sm lg:text-[14px] tracking-wide uppercase"
                  )}
                  onClick={() => {
                    AnalyticsService.sendEvent("personal_nav_clicked");
                  }}
                >
                  PERSONAL
                </Link>
                <Link
                  href="/business"
                  className={getLinkClasses(
                    "/business",
                    "text-sm lg:text-[14px] tracking-wide uppercase"
                  )}
                  onClick={() => {
                    AnalyticsService.sendEvent("business_nav_clicked");
                  }}
                >
                  BUSINESS
                </Link>
                <Link
                  href="/upi"
                  className={getLinkClasses(
                    "/upi",
                    "text-sm lg:text-[14px] tracking-wide uppercase"
                  )}
                  onClick={() => {
                    AnalyticsService.sendEvent("upi_nav_clicked");
                  }}
                >
                  UPI
                </Link>
              </>
            )}
          </nav>

          {/* Download Button - Hidden on small screens */}
          {/* UPDATED: buttonLocation now uses the calculated value */}
          {/* Hide buttons on Blogs Page */}
          {!isBlogsPage && (
            pathname === "/" ? (
              <div className="hidden lg:flex items-center gap-4">
                <Button
                  onClick={() => setIsGetStartedOpen(true)}
                  variant="outline"
                  className="hidden lg:flex cursor-pointer lg:w-[130px] lg:h-[56px] items-center border border-[#C0C0C0] text-black hover:bg-gray-50 bg-transparent rounded-full transition-all duration-200 hover:scale-105"
                >
                  <span className="font-semibold text-xs lg:text-[12px] whitespace-nowrap">Get in touch</span>
                </Button>
                <Button
                  onClick={() => window.location.href = `/igps/entity?v=${Date.now()}`}
                  className="hidden lg:flex lg:w-[120px] lg:h-[56px] items-center bg-[#C0C0C0] text-black rounded-full transition-all duration-200 opacity-100 cursor-pointer hover:scale-105"
                >
                  <span
                    className="font-semibold text-[12px] lg:text-[12px] whitespace-nowrap text-[#080808] leading-[100%] text-center"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Login
                  </span>
                </Button>
                {isGetStartedOpen && (
                  <GetStartedPopup isOpen={true} onClose={() => setIsGetStartedOpen(false)} />
                )}
              </div>
            ) : (
              <Button
                onClick={() => {

                  handleDownloadClick()
                }} variant="outline"
                className="hidden lg:flex cursor-pointer lg:w-[225px] lg:h-[56px] items-center border border-[#C0C0C0] text-black hover:bg-gray-50 bg-transparent rounded-full transition-all duration-200 hover:scale-105"
              >
                <div className="flex gap-2">
                  <Smartphone className="w-4 h-4 lg:w-5 lg:h-9" />
                  <span className="font-semibold text-xs lg:text-[12px] whitespace-nowrap">
                    Download bepay money app
                  </span>
                </div>
              </Button>

            )
          )}

          {/* Animated Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 relative flex flex-col justify-center items-center">
              {/* Top bar */}
              <motion.span
                className="absolute h-0.5 bg-black rounded-full"
                initial={{ width: 24 }}
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 0 : -6,
                  width: 24,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />

              {/* Middle bar */}
              <motion.span
                className="absolute h-0.5 bg-black rounded-full"
                initial={{ width: 16, x: 4 }}
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  x: isMobileMenuOpen ? -10 : 4,
                  width: 16,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />

              {/* Bottom bar */}
              <motion.span
                className="absolute h-0.5 bg-black rounded-full"
                initial={{ width: 24 }}
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? 0 : 6,
                  width: 24,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            opacity: {
              duration: isMobileMenuOpen ? 0.3 : 0.2,
              delay: isMobileMenuOpen ? 0.1 : 0,
            },
          }}
          className="md:hidden overflow-hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40"
        >
          <motion.nav
            className="flex flex-col p-4 space-y-4"
            initial={false}
            animate={{ y: isMobileMenuOpen ? 0 : -10 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: isMobileMenuOpen ? 0.1 : 0,
            }}
          >
            {isBlogsPage ? (
              <Link
                href="/"
                className={getLinkClasses(
                  "/",
                  "text-sm uppercase tracking-wide py-2"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            ) : (
              <>
                <Link
                  href="/"
                  className={getLinkClasses(
                    "/",
                    "text-sm uppercase tracking-wide py-2"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  IGPS
                </Link>
                <Link
                  href="/personal"
                  className={getLinkClasses(
                    "/personal",
                    "text-sm uppercase tracking-wide py-2"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  PERSONAL
                </Link>
                <Link
                  href="/business"
                  className={getLinkClasses(
                    "/business",
                    "text-sm uppercase tracking-wide py-2"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  BUSINESS
                </Link>

                <Link
                  href="/upi"
                  className={getLinkClasses(
                    "/upi",
                    "text-sm uppercase tracking-wide py-2"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  UPI
                </Link>

                {/* Mobile Download Button */}
                {/* UPDATED: buttonLocation now uses the calculated value */}
                <Button
                  onClick={() => {

                    handleDownloadClick()
                  }} variant="outline"
                  className="flex px-[24px] py-[16px] w-full items-center text-[12px] justify-center space-x-2 border border-[#C0C0C0] text-black hover:bg-gray-50 bg-transparent rounded-full transition-all duration-200 mt-4"
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="font-semibold text-xs">Download bepay money app</span>
                </Button>

              </>
            )}
          </motion.nav>
        </motion.div>
      </div>
      <AppDownloadPopups
        isOSPopupOpen={isOSPopupOpen}
        setIsOSPopupOpen={setIsOSPopupOpen}
        isQRPopupOpen={isQRPopupOpen}
        setIsQRPopupOpen={setIsQRPopupOpen}
        selectedOS={selectedOS}
        setSelectedOS={setSelectedOS}
      />
    </header>
  );
}
