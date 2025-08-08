"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Linkedin, Facebook, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";

const CookiePolicyFooter = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    tracking: false,
    functionality: false,
    marketing: false,
  });

  const handleAcceptAll = () => {
    const allPrefs = {
      essential: true,
      tracking: true,
      functionality: true,
      marketing: true,
    };
    setPreferences(allPrefs);
    setShowCookieConsent(false);
  };

  const handleRejectNonEssentials = () => {
    const essentialOnly = {
      essential: true,
      tracking: false,
      functionality: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    setShowCookieConsent(false);
  };

  const handleManagePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  const handleSavePreferences = () => {
    setShowCookieConsent(false);
  };

  const handleTogglePreference = (type) => {
    if (type === "essential") return;

    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleCloseCookieConsent = () => {
    setShowCookieConsent(false);
  };

  // Social media icons
  const TwitterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  const TelegramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );

  return (
    <footer className="w-full bg-black text-white relative overflow-hidden pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-start"
          variants={itemVariants}
        >
          {/* Left Side - Navigation Links */}
          <div className="flex flex-col gap-6 lg:gap-12">
            <div className="flex flex-col sm:flex-row gap-8 lg:gap-16">
              <div className="flex flex-col gap-4">
                <Link
                  href="/about-us"
                  className="block text-[#6A6A6A] hover:text-gray-400 transition-colors text-sm font-medium"
                >
                  ABOUT US
                </Link>
                <Link
                  href="/contact-us"
                  className="block text-[#6A6A6A] hover:text-gray-400 transition-colors text-sm font-medium"
                >
                  CONTACT US
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="block text-[#6A6A6A] hover:text-gray-400 transition-colors text-sm font-medium"
                >
                  PERSONAL
                </Link>
                <Link
                  href="/business"
                  className="block text-[#6A6A6A] hover:text-gray-400 transition-colors text-sm font-medium"
                >
                  BUSINESS
                </Link>
              </div>
            </div>
            <div className="flex gap-3 justify-start">
              <Link
                href="https://www.linkedin.com/company/bepaymoney/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 border border-[#191919] rounded-[10px] flex items-center justify-center hover:bg-white/10 transition-colors hover:border-white/40"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://x.com/bepaymoney"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 border border-[#191919] rounded-[10px] flex items-center justify-center hover:bg-white/10 transition-colors hover:border-white/40"
              >
                <TwitterIcon />
              </Link>
              <Link
                href="https://www.facebook.com/bepaymoney/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 border border-[#191919] rounded-[10px] flex items-center justify-center hover:bg-white/10 transition-colors hover:border-white/40"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://t.me/officialbepaymoney"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-10 h-10 border border-[#191919] rounded-[10px] flex items-center justify-center hover:bg-white/10 transition-colors hover:border-white/40"
              >
                <TelegramIcon />
              </Link>
            </div>
            {/* Logo Section */}
            <motion.div
              className="flex justify-start mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/bepaylogogradient.png"
                  alt="Bepay Logo"
                  width={400}
                  height={300}
                  className="h-[50px] w-auto"
                />
              </div>
            </motion.div>
          </div>

          {/* Middle - Social Icons */}

          {/* Right Side - Cookie Consent Box */}
          {showCookieConsent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-[597px] bg-white rounded-[24px] shadow-2xl border border-gray-200 p-6 justify-self-end relative"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseCookieConsent}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close cookie consent"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Main Content */}
              <div className="pr-8">
                <p className="text-[#080808] text-[12px] leading-relaxed mb-6">
                  We use cookies to enhance your browsing experience, analyze
                  site traffic, and personalize content. By clicking "Accept All
                  Cookies", you consent to our use of cookies as described in
                  our Cookies Policy. You can manage your preferences or
                  withdraw consent at any time.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    onClick={handleRejectNonEssentials}
                    className="px-4 py-2 border cursor-pointer border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-[12px] font-medium"
                  >
                    Reject non-essentials
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 bg-black cursor-pointer text-white rounded-lg hover:bg-black/90 transition-colors text-[12px] font-medium"
                  >
                    Accept all cookies
                  </button>
                  <button
                    onClick={handleManagePreferences}
                    className="px-4 py-2 text-[#080808]   transition-colors cursor-pointer text-[12px] font-medium underline"
                  >
                    Manage preferences
                  </button>
                </div>

                {/* Cookie Preferences */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Essential Cookies */}
                  <div className="flex flex-col items-start">
                    <label className="text-[11px] text-[#080808] mb-2 text-center">
                      Essential cookies
                    </label>
                    <Switch
                      checked={preferences.essential}
                      disabled={true}
                      className="data-[state=checked]:bg-black"
                    />
                  </div>

                  {/* Tracking Cookies */}
                  <div className="flex flex-col items-start">
                    <label className="text-[11px] text-[#080808] mb-2 text-center">
                      Tracking cookies
                    </label>
                    <Switch
                      checked={preferences.tracking}
                      disabled={!showPreferences}
                      onCheckedChange={() => handleTogglePreference("tracking")}
                      className="data-[state=checked]:bg-black disabled:opacity-50"
                    />
                  </div>

                  {/* Functionality Cookies */}
                  <div className="flex flex-col lg:-mr-5 items-start">
                    <label className="text-[11px] lg:whitespace-nowrap text-[#080808] mb-2 text-center">
                      Functionality cookies
                    </label>
                    <Switch
                      checked={preferences.functionality}
                      disabled={!showPreferences}
                      onCheckedChange={() =>
                        handleTogglePreference("functionality")
                      }
                      className="data-[state=checked]:bg-black disabled:opacity-50"
                    />
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex flex-col items-start">
                    <label className="text-[11px] text-[#080808] mb-2 text-center">
                      Marketing cookies
                    </label>
                    <Switch
                      checked={preferences.marketing}
                      disabled={!showPreferences}
                      onCheckedChange={() =>
                        handleTogglePreference("marketing")
                      }
                      className="data-[state=checked]:bg-black disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Save Preferences Button */}
                {showPreferences && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <button
                      onClick={handleSavePreferences}
                      className="w-full px-6 py-2.5 bg-black cursor-pointer text-white rounded-lg hover:bg-black/90 transition-colors text-sm font-medium"
                    >
                      Save preferences
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Legal Text */}
        <motion.div className="w-full pt-6" variants={itemVariants}>
          <p className="text-[8px] font-[400] lg:tracking-[2%] lg:leading-[20px] max-w-[1359px] mx-auto lg:text-[10px] text-[#6A6A6A]">
            The information and services presented on this website are provided
            for informational purposes only and do not constitute financial,
            investment, or legal advice. The group operates under the brand name
            bepay through its legal entity, Bepay money fintech UAB, registered
            in the European Union (Company Registration No. 306999867). bepay
            does not operate as a bank, financial institution, or digital asset
            exchange. All wallet and payment-related services are offered in a
            non-custodial capacity, leveraging public distributed ledger
            technologies and open-source data from integrated platforms and
            partners. Cryptocurrency trading is highly volatile, and users may
            lose their entire investment; all activities are undertaken at your
            own risk. bepay holds ISO 9001, 20022, and 27001 certifications
            across India, UAE, USA, and the EU.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default CookiePolicyFooter;
