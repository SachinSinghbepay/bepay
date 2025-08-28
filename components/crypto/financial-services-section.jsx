"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import WaitlistTriggerButton from "../waitlist-trigger-button";

const servicesData = [
  {
    title: "Bitcoin-Backed Loans",
    points: [
      "Get instant loans using your Bitcoin as collateral",
      "No credit check required",
      "Flexible repayment terms",
    ],
    image: "/images/crypto/co1.png",
  },
  {
    title: "Savings Products",
    points: [
      "High-yield savings on BTC, ETH, USDT, and USDC",
      "No minimum balance",
      "Instant withdrawals",
    ],
    image: "/images/crypto/co2.png",
  },
  {
    title: "Insurance Products",
    points: [
      "Protect your assets, income, and life with crypto-powered insurance solutions",
      "Health, Travel & Life Coverage",
      "Flexible Plans & Instant Claims",
    ],
    image: "/images/crypto/co3.png",
  },
  {
    title: "Cross-Border Payments",
    points: [
      "Fast, cheap international money transfers",
      "Instant settlements globally",
      "Lowest fee guarantee",
    ],
    image: "/images/crypto/co5.png",
  },
  {
    title: "Remittance Services",
    points: [
      "Send money home to family and friends globally",
      "Competitive exchange rates",
      "Real-time tracking & Multiple payout options",
    ],
    image: "/images/crypto/co6.png",
  },
  {
    title: "DeFi Marketplace",
    points: [
      "Access DApps and DeFi protocols directly from your wallet",
      "One-Click Access to Top Protocols",
      "Secure & Gas-Optimized Transactions",
    ],
    image: "/images/crypto/co4.png",
  },
];

const ServicePanel = ({ service, index, progress, totalServices }) => {
  const segmentDuration = 1 / totalServices;
  const start = index * segmentDuration;
  const end = start + segmentDuration;

  const travelDistance = 900;
  const fixedTransformDistance = 0.4;

  // Define input and output ranges based on index
  let inputRange = [];
  let outputRange = [];

  const isFirst = index === 0;
  const isLast = index === totalServices - 1;

  if (isFirst) {
    inputRange = [0, end - segmentDuration * fixedTransformDistance, end + segmentDuration * fixedTransformDistance];
    outputRange = [0, 0, -travelDistance];
  } else if (isLast) {
    inputRange = [start - segmentDuration * fixedTransformDistance, start + segmentDuration * fixedTransformDistance, 1];
    outputRange = [travelDistance, 0, 0];
  } else {
    inputRange = [
      start - segmentDuration * fixedTransformDistance,
      start + segmentDuration * fixedTransformDistance,
      end - segmentDuration * fixedTransformDistance,
      end + segmentDuration * fixedTransformDistance,
    ];
    outputRange = [travelDistance, 0, 0, -travelDistance];
  }
  
  // ✅ CORRECTED: Conditionally build the arrays, but call the hook unconditionally
  const y = useTransform(progress, inputRange, outputRange);

  return (
    <motion.div
      style={{
        y,
      }}
      className="absolute inset-0 flex flex-col 2xl:ml-20 items-start justify-center text-start px-4 lg:px-8"
    >
      <div className="relative w-full max-w-sm lg:max-w-md aspect-[530/633] overflow-hidden mb-6 lg:mb-8 shadow-2xl ">
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          layout="fill"
          loading="lazy"
          objectFit="cover"
        />
      </div>
      <div>
        <h3 className="text-xl lg:text-2xl text-start xl:text-4xl font-[400] text-[#6A6A6A] mb-3 lg:mb-4">
          {service.title}
        </h3>
        <div className="flex flex-col space-y-2 items-start text-start">
          {service.points.map((point, idx) => (
            <div key={idx} className="flex gap-2 items-start text-left">
              <CheckCircle
                size={10}
                className="text-gray-600 mt-1 flex-shrink-0 lg:w-3 lg:h-3"
              />
              <span className="text-xs lg:text-sm text-gray-500 leading-relaxed">
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
const MobileView = () => {
  const mobileContainerRef = useRef(null);
  const cardWrapperRef = useRef(null);
  const x = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const cardWrapper = cardWrapperRef.current;
      if (!cardWrapper) return;
      const scrollWidth = cardWrapper.scrollWidth;
      const containerWidth = cardWrapper.offsetWidth;
      const maxScroll = scrollWidth - containerWidth;
      // Apply smooth easing to mobile scroll as well
      const easedProgress = latest * latest * (3 - 2 * latest); // Smoothstep function
      x.set(-easedProgress * maxScroll);
    });
    return () => unsubscribe();
  }, [scrollYProgress, x]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={mobileContainerRef}
      className="md:hidden relative h-[300vh] bg-white py-8 sm:py-12"
    >
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        <motion.div
          className="px-4 sm:px-6 pt-8 sm:pt-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-light leading-tight"
            variants={itemVariants}
          >
            <span className="text-gray-400">COMPLETE</span>
            <br />
            FINANCIAL SERVICES
          </motion.h2>
          <motion.p
            className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base"
            variants={itemVariants}
          >
            Banking, lending, insurance, and more - all in one comprehensive
            platform
          </motion.p>
          <motion.button
            className="flex items-center gap-2 bg-black text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mt-4 sm:mt-6 hover:bg-gray-800 transition-colors text-xs sm:text-sm"
            variants={itemVariants}
          >
            Explore all features
            <ArrowUpRight size={14} className="sm:w-4 sm:h-4" />
          </motion.button>
        </motion.div>

        <div className="mt-8 sm:mt-12 w-full">
          <motion.div
            ref={cardWrapperRef}
            style={{ x }}
            className="flex gap-4 sm:gap-6 px-4 sm:px-6 pb-8"
          >
            {servicesData.map((service, i) => (
              <div key={i} className="w-[75vw] sm:w-[65vw] flex-shrink-0">
                <div className="relative w-full aspect-[530/520] sm:aspect-[530/450] rounded-2xl sm:rounded-3xl overflow-hidden mb-4 sm:mb-6 shadow-lg">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    layout="fill"
                    loading="lazy"
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-light text-gray-500 mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <div className="flex flex-col space-y-2">
                  {service.points.map((point, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <CheckCircle
                        size={14}
                        className="text-gray-600 mt-0.5 flex-shrink-0 sm:w-4 sm:h-4"
                      />
                      <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const FinancialServicesSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section>
      {/* Desktop View */}
      <div ref={containerRef} className="hidden md:block relative h-[600vh]">
        <div className="sticky top-0 h-screen grid grid-cols-2 items-stretch">
          <div className="bg-white flex items-center justify-start px-8 lg:px-16 xl:px-20">
            <motion.div
              className="max-w-md lg:max-w-[406px] text-left"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2
                className="text-4xl lg:text-5xl xl:text-6xl font-[400] leading-none"
                variants={itemVariants}
              >
                <span className="text-gray-400">COMPLETE</span>
                <br />
                FINANCIAL
                <br />
                SERVICES
              </motion.h2>
              <motion.p
                className="text-[#333333] mt-4 font-medium lg:mt-6 text-sm lg:text-base"
                variants={itemVariants}
              >
                <span className="font-semibold">
                  Banking, lending, insurance, and more -{" "}
                </span>
                all in one comprehensive platform
              </motion.p>
              <WaitlistTriggerButton>
                <motion.button
                  className="flex items-center cursor-pointer gap-2 bg-black text-white px-5 lg:px-6 py-2.5 lg:py-3 rounded-full mt-6 lg:mt-8 hover:bg-black/90 transition-colors text-sm"
                  variants={itemVariants}
                >
                  Explore all features
                  <ArrowUpRight size={16} />
                </motion.button>
              </WaitlistTriggerButton>
            </motion.div>
          </div>
          <div className="bg-[#F9F9F9] relative overflow-hidden">
            {servicesData.map((service, i) => (
              <ServicePanel
                key={i}
                index={i}
                service={service}
                progress={scrollYProgress}
                totalServices={servicesData.length}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <MobileView />
    </section>
  );
};