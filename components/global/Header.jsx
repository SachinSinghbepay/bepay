"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowUpRight, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { CustomButton } from "./custom-button";
import Image from "next/image";
import MaxWidthWrapper from "./max-width-wrapper";

const menuItems = [
  { name: "AGENDA", href: "/agenda" },
  { name: "SPEAKERS", href: "/speaker" },
  { name: "PARTNER", href: "/partner" },
  { name: "STARTUP PITCH", href: "/startup-pitch" },
  { name: "SIDE EVENTS", href: "/side-events" },
  {
    name: "MORE",
    dropdown: [
      { name: "BLOGS", href: "/blogs" },
      { name: "CONTACT", href: "/contact" },
      { name: "I AM ATTENDING", href: "/iamattending" },
      { name: "BECOME MEDIA PARTNER", href: "/media" },
      
    ],
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 border-b z-50 border-white/5  w-full transition-all duration-300",
        scrolled ? "bg-black/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      )}
    >
      <MaxWidthWrapper>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            onClick={() => setIsOpen(false)}
            href="/"
            className="flex items-center"
          >
            <Image
              src={"/logo.png"}
              height={50}
              width={51}
              alt="logo"
              className="object-cover h-[50px] z-50 w-[51px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <div
                key={item.name}
                className="relative"
                ref={index === activeDropdown ? dropdownRef : null}
              >
                {item.dropdown ? (
                  <>
                    <button
                      className="text-[14px] font-[507] text-white hover:text-gray-300 transition-colors flex items-center"
                      onClick={() => handleDropdownToggle(index)}
                      onMouseEnter={() => setActiveDropdown(index)}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 max-w-3xl bg-black border border-r-white rounded-[4px] shadow-lg z-50"
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <div className="py-1">
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className=" px-4 py-2 text-sm font-bold whitespace-nowrap flex items-center gap-3 text-white hover:bg-white hover:text-black transition-colors"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <ArrowUpRight size={18} />
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[14px] font-[507] text-white hover:text-gray-300 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Register Button (Desktop) */}
          <div className="hidden lg:block">
            <CustomButton variant="primary" href="https://lu.ma/kf7ixael">
              REGISTER NOW
            </CustomButton>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="lg:hidden flex border-[2px] border-white rounded-[3px] flex-col justify-center items-center w-10 h-10 relative z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-6 h-[2px] bg-white mb-1.5"
              animate={isOpen ? { rotate: 48, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-[2px] bg-white mb-1.5"
              animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-[2px] bg-white"
              animate={isOpen ? { rotate: -48, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </MaxWidthWrapper>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 h-screen bg-black z-40 pt-10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col justify-center h-full">
              <nav className="flex flex-col space-y-6 items-center justify-center flex-1">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="w-full flex flex-col items-start"
                  >
                    {item.dropdown ? (
                      <>
                        <button
                          className="text-[14px] font-[507] text-white hover:text-gray-300 transition-colors flex items-center"
                          onClick={() => handleDropdownToggle(index)}
                        >
                          {item.name}
                          <ChevronDown
                            className={`ml-1 h-4 w-4 transition-transform ${
                              activeDropdown === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-2 w-full flex flex-col items-center"
                            >
                              {item.dropdown.map(
                                (dropdownItem, dropdownIndex) => (
                                  <motion.div
                                    key={dropdownItem.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      delay: dropdownIndex * 0.1,
                                      duration: 0.3,
                                    }}
                                    className="py-2"
                                  >
                                    <Link
                                      href={dropdownItem.href}
                                      className="text-[14px] font-[507] text-gray-300 hover:text-white transition-colors"
                                      onClick={() => {
                                        setActiveDropdown(null);
                                        setIsOpen(false);
                                      }}
                                    >
                                    
                                      {dropdownItem.name}
                                    </Link>
                                  </motion.div>
                                )
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[14px] font-[507] text-white hover:text-gray-300 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex justify-center mt-8 mb-12"
              >
                <CustomButton href="https://lu.ma/kf7ixael" onClick={() => setIsOpen(false)}>
                  REGISTER NOW
                </CustomButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
