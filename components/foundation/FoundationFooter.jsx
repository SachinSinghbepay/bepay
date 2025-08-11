"use client";
import { motion } from "framer-motion";
import { Linkedin, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FoundationFooter = () => {
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

  // Social media icons (re-using from previous component)
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
          {/* Left Side - Navigation Links, Social Icons, and Logo */}
          <div className="flex flex-col gap-8 lg:gap-16">
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
            {/* Bepay Foundation Logo Section */}
            <motion.div
              className="flex flex-col justify-start"
              variants={itemVariants}
            >
              <div className="flex flex-col items-start gap-9">
                <Image
                  src="/images/foundation/icon.png"
                  alt="Bepay Foundation Logo"
                  width={80}
                  height={80}
                  className="h-16 w-16 md:h-18 md:w-18"
                />
                <div className="flex flex-col gap-4">
                  <h1 className="text-3xl lg:text-[44px] font-bold tracking-tight text-[#C0C0C0] ">
                    bepay foundation
                  </h1>
                  <p className="text-lg italic text-gray-400 md:text-xl">
                    Where impact meets community
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Image */}
          <motion.div
            className="w-full lg:w-auto flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <Image
              src="/images/foundation/footerimg.png"
              width={500}
              height={500}
              alt="Hands holding a small plant"
              className="rounded-xl object-cover w-full max-w-[500px] h-auto"
            />
          </motion.div>
        </motion.div>

        {/* Legal Text */}
        <motion.div
          className="w-full pt-6 border-t border-[#191919]"
          variants={itemVariants}
        >
          <p className="text-[8px] font-[400] lg:tracking-[0.02em] lg:leading-[20px] max-w-[1359px] mx-auto lg:text-[10px] text-[#6A6A6A]">
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

export default FoundationFooter;
