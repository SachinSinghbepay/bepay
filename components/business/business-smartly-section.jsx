"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service

// FeatureCard component
function FeatureCard({ title, image, features, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{
        duration: 0.8,
        delay: 0.5 + index * 0.2,
        ease: "easeOut",
      }}
      className="flex-col w-[90vw] md:w-[50vw] lg:w-[35vw] xl:w-[32vw] h-[550px] md:h-[500px] bg-white rounded-[30px] flex-shrink-0 relative"
      // MODIFIED: Shadow only extends right and down, no upward shadow
      style={{
        boxShadow: "60px 20px 30px -20px rgba(0, 0, 0, 0.15), 80px 30px 120px -90px rgba(0, 0, 0, 0.08)",
        zIndex: 100 - index, // Higher z-index for earlier cards so their shadows appear on top
      }}
    >
      <div className="relative w-full h-[225px] overflow-hidden rounded-[30px]">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={650}
          height={225}
          className="object-cover p-2 rounded-[30px] w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-8 flex flex-col justify-between h-[calc(100%-225px)]">
        <div>
          <h3 className="font-['Montserrat'] font-medium text-[20px] leading-[24px] tracking-[-0.02em] mb-6 text-black uppercase">
            {title}
          </h3>
          <ul className="space-y-4 lg:space-y-4">
            {features.map((feature, featureIndex) => (
              <li
                key={featureIndex}
                className="flex items-start gap-3 text-[14px] md:text-[16px] font-[500] text-gray-700"
              >
                <IconCircleCheckFilled className="w-5 h-5 text-[#0D8D37] flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function BusinessSmartlySection() {
  const targetRef = useRef(null);
  const isInView = useInView(targetRef, { once: true, margin: "-100px" });
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // ANALYTICS: track view once
  useEffect(() => {
    if (isInView && !hasTrackedView) {
      AnalyticsService.sendEvent("business smartly section viewed");
      setHasTrackedView(true);
    }
  }, [isInView, hasTrackedView]);

  // Scroll-based horizontal movement
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  
  const xMobile = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);
  const xDesktop = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const cardsData = [
    {
      id: "1",
      title: "SEAMLESS PAYMENTS",
      image: "/images/business/b1.png",
      features: [
        "Accept stablecoins & major cryptos",
        "Real-time instant settlement",
        "QR & NFC-enabled payments",
        "Tap-to-pay/scan & pay options for customers",
      ],
    },
    {
      id: "2",
      title: "UNIVERSAL PLATFORM INTEGRATION",
      image: "/images/business/b2.png",
      features: [
        "Shopify, WooCommerce, Magento plug-ins",
        "REST APIs, SDKs, and custom checkout links",
        "Generate invoices with crypto QR codes",
      ],
    },
    {
      id: "3",
      title: "MULTI-CURRENCY BUSINESS BANKING",
      image: "/images/business/b3.png",
      features: [
        "Dedicated virtual IBANs (EUR, USD, GBP) & crypto debit cards",
        "Mass payouts to contractors, freelancers, vendors",
        "Integrated with Xero, QuickBooks, Sage",
      ],
    },
    {
      id: "4",
      title: "ADVANCED TREASURY MANAGEMENT",
      image: "/images/business/b4.png",
      features: [
        "Yield generation on operational funds through DeFi",
        "Multi-signature wallets for enhanced security",
        "Real-time reporting and analytics dashboard",
        "Automated tax reports, balance analytics, and forecasting",
      ],
    },
  ];

  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] bg-[#F9F9F9] dark:bg-gray-950"
    >
      <div className="sticky top-0 flex flex-col h-screen overflow-hidden">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-2 md:pt-4 pb-4 md:pb-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[400] tracking-[-0.05em] leading-none">
                <span className="block text-[#C0C0C0] dark:text-[#333333]">
                  Everything you need
                </span>
                <span className="text-[#C0C0C0] dark:text-[#333333]">to </span>
                <span className="text-black dark:text-white">
                  run your business smartly
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* Cards Section - Horizontal Scroll */}
        <div className="flex-1 flex items-center overflow-hidden">
          {/* Mobile Cards */}
          <motion.div
            style={{ x: xMobile }}
            className="flex gap-6 pl-4 sm:pl-6 lg:pl-8 md:hidden"
          >
            {cardsData.map((card, index) => (
              <FeatureCard
                key={card.id}
                title={card.title}
                image={card.image}
                features={card.features}
                index={index}
                isInView={isInView}
              />
            ))}
          </motion.div>

          {/* Desktop Cards */}
          <motion.div
            style={{ x: xDesktop }}
            className="hidden md:flex gap-6 pl-4 sm:pl-6 lg:pl-8"
          >
            {cardsData.map((card, index) => (
              <FeatureCard
                key={card.id}
                title={card.title}
                image={card.image}
                features={card.features}
                index={index}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}