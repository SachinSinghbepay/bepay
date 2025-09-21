"use client";

import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import WaitlistTriggerButton from "./waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if current page is contact us
  const isContactPage = pathname === "/contact" || pathname === "/contact-us";

  // Helper function to determine if a link is active
  const isActivePage = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // Helper function to get link classes
  const getLinkClasses = (path, baseClasses) => {
    const isActive = isActivePage(path);
    return `${baseClasses} ${
      isActive
        ? "text-black font-[700]" // Active → bold black
        : "text-[#6A6A6A] hover:text-black font-[400]" // Inactive → thin gray
    } transition-colors duration-200`;
  };

  const handleDownloadAppClick = () => {
    AnalyticsService.sendEvent("Download App Clicked");
  }

  const handlebepaymoneylogoclicked = () => {
    AnalyticsService.sendEvent("bepaymoney logo Clicked");
  }
  // Conditional header classes
  const headerClasses = isContactPage
    ? "w-full absolute top-0 left-0 right-0 bg-transparent z-50"
    : "w-full relative bg-[#F9F9F9] z-50";

  return (
    <header className={headerClasses}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={"/"} onClick={handlebepaymoneylogoclicked}>

            <div className="flex-shrink-0">
              <Image
                src="/bepaymoney.svg"
                height={46}
                width={110}
                alt="BePay Logo"
                className="object-cover h-12 md:h-14 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-14">
            <Link
              href="/"
              className={getLinkClasses(
                "/",
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
            >
              BUSINESS
            </Link>
          </nav>

          {/* Download Button - Hidden on small screens */}
          <WaitlistTriggerButton triggerSource="'Download bepay app' button">
            <Button
              onClick={handleDownloadAppClick }
              variant="outline"
              className="hidden lg:flex cursor-pointer lg:w-[199px] lg:h-[56px] items-center border border-[#C0C0C0] text-black hover:bg-gray-50 bg-transparent rounded-full transition-all duration-200 hover:scale-105"
            >
              <div className="flex gap-2">
                <Smartphone className="w-4 h-4 lg:w-5 lg:h-9" />
                <span className="font-semibold text-xs lg:text-[12px] whitespace-nowrap">
                  Download bepay app
                </span>
              </div>
            </Button>
          </WaitlistTriggerButton>

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
            <Link
              href="/"
              className={getLinkClasses(
                "/",
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

            {/* Mobile Download Button */}
            <WaitlistTriggerButton triggerSource="'download bepay app' button">
              <Button
              
                variant="outline"
                className="flex px-[24px] py-[16px] w-full items-center text-[12px] justify-center space-x-2 border border-[#C0C0C0] text-black hover:bg-gray-50 bg-transparent rounded-full transition-all duration-200 mt-4"
                onClick={handleDownloadAppClick}
              >
                <Smartphone className="w-4 h-4" />
                <span className="font-semibold text-xs">
                  Download bepay app
                </span>
              </Button>
            </WaitlistTriggerButton>
          </motion.nav>
        </motion.div>
      </div>
    </header>
  );
}
