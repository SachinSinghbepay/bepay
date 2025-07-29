"use client";
import { Button } from "@/components/ui/button";
import { CreditCard, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
      isActive ? "text-black" : "text-gray-600 hover:text-black"
    } transition-colors duration-200`;
  };

  return (
    <header className="w-full relative bg-[#F9F9F9] z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex-shrink-0">
              <Image
                src="/bepaymoney.svg"
                height={46}
                width={110}
                alt="BePay Logo"
                className="object-cover h-14 md:h-14 w-auto"
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
                "text-sm lg:text-[14px] font-[700]"
              )}
            >
              PERSONAL
            </Link>
            <Link
              href="/business"
              className={getLinkClasses(
                "/business",
                "text-sm lg:text-[14px] font-[700]"
              )}
            >
              BUSINESS
            </Link>
            {/* <Link
              href="/#crypto-card"
              className={getLinkClasses(
                "/crypto",
                "flex items-center space-x-2 cursor-pointer"
              )}
            >
              <CreditCard className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="text-sm lg:text-[14px] font-[700]">
                CRYPTO CARD
              </span>
            </Link> */}
          </nav>

          {/* Download Button - Hidden on small screens */}
          <Button
            variant="outline"
            className="hidden lg:flex  cursor-pointer  lg:w-[199px]  lg:h-[56px] items-center  border border-[#C0C0C0] text-black hover:bg-gray-50 bg-transparent rounded-full transition-all duration-200 hover:scale-105"
          >
            <div className="flex gap-2">
              <Smartphone className="w-4 h-4 lg:w-5 lg:h-9" />
              <span className="font-semibold text-xs lg:text-[12px] whitespace-nowrap">
                Download bepay app
              </span>
            </div>
          </Button>

          {/* Animated Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 relative flex flex-col justify-center items-center">
              {/* Top bar */}
              <motion.span
                className="absolute w-6 h-0.5 bg-black rounded-full"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 0 : -6,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />

              {/* Middle bar */}
              <motion.span
                className="absolute w-6 h-0.5 bg-black rounded-full"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  x: isMobileMenuOpen ? -10 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />

              {/* Bottom bar */}
              <motion.span
                className="absolute w-6 h-0.5 bg-black rounded-full"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? 0 : 6,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu with slide animation */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40"
        >
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="/"
              className={getLinkClasses("/", "text-sm font-[700] py-2")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              PERSONAL
            </Link>
            <Link
              href="/business"
              className={getLinkClasses("/business", "text-sm font-[700] py-2")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BUSINESS
            </Link>
            {/* <Link
              href="/#crypto-card"
              onClick={() => setIsMobileMenuOpen(false)}
              className={getLinkClasses(
                "/crypto",
                "flex items-center space-x-2 cursor-pointer py-2"
              )}
            >
              <CreditCard className="w-4 h-4" />
              <span className="text-sm font-[700]">CRYPTO CARD</span>
            </Link> */}
            {/* Mobile Download Button */}
            <Button
              variant="outline"
              className="flex px-[24px] py-[16px] w-full items-center text-[12px] justify-center space-x-2  border border-[#C0C0C0] text-black hover:bg-gray-50 bg-transparent rounded-full transition-all duration-200 mt-4"
            >
              <Smartphone className="w-4 h-4" />
              <span className="font-semibold text-xs">Download bepay app</span>
            </Button>
          </nav>
        </motion.div>
      </div>
    </header>
  );
}
