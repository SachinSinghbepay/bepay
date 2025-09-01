"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Mock WaitlistTriggerButton component
const WaitlistTriggerButton = ({ children }) => children;

const servicesData = [
  {
    title: "Bitcoin backed loans",
    points: [
      "Get instant loans using your Bitcoin as collateral.",
      "No credit check required.",
      "Flexible repayment terms.",
    ],
    image: "/images/crypto/co1.png",
  },
  {
    title: "Savings Products",
    points: [
      "High-yield savings on BTC, ETH, USDT, and USDC.",
      "No minimum balance.",
      "Instant withdrawals.",
    ],
    image: "/images/crypto/co2.png",
  },
  {
    title: "Insurance Products",
    points: [
      "Protect your assets, income, and life with crypto-powered insurance solutions.",
      "Health, Travel & Life Coverage.",
      "Flexible Plans & Instant Claims.",
    ],
    image: "/images/crypto/co3.png",
  },
  {
    title: "Cross-Border Payments",
    points: [
      "Fast, cheap international money transfers.",
      "Instant settlements globally.",
      "Lowest fee guarantee.",
    ],
    image: "/images/crypto/co5.png",
  },
  {
    title: "Remittance Services",
    points: [
      "Send money home to family and friends globally.",
      "Competitive exchange rates.",
      "Real-time tracking & Multiple payout options.",
    ],
    image: "/images/crypto/co6.png",
  },
  {
    title: "DeFi Marketplace",
    points: [
      "Access DApps and DeFi protocols directly from your wallet.",
      "One-Click Access to Top Protocols.",
      "Secure & Gas-Optimized Transactions.",
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

  let inputRange = [];
  let outputRange = [];

  const isFirst = index === 0;
  const isLast = index === totalServices - 1;

  if (isFirst) {
    inputRange = [
      0,
      end - segmentDuration * fixedTransformDistance,
      end + segmentDuration * fixedTransformDistance,
    ];
    outputRange = [0, 0, -travelDistance];
  } else if (isLast) {
    inputRange = [
      start - segmentDuration * fixedTransformDistance,
      start + segmentDuration * fixedTransformDistance,
      1,
    ];
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

  const y = useTransform(progress, inputRange, outputRange);

  // Split into normal + bold parts
  const normalPart = service.points
    .slice(0, service.points.length - 2)
    .join(" ");
  const boldPart = service.points.slice(-2).join(" ");

  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 flex flex-col items-start justify-center text-left p-12 lg:p-16 2xl:p-20 pl-6"
    >
      {/* Image */}
      <div className="relative w-full max-w-[420px] aspect-[2/3] overflow-hidden mb-6 lg:mb-10 shadow-xl">
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>

      {/* Text */}
      <div className="max-w-sm lg:max-w-md text-left">
        <h3 className="text-3xl font-light text-gray-700 mb-4">
          {service.title}
        </h3>

        <p className="text-sm lg:text-base text-gray-500 leading-tight">
          {normalPart}{" "}
          <span className="font-semibold text-gray-700">{boldPart}</span>
        </p>
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
      const easedProgress = latest * latest * (3 - 2 * latest);
      x.set(-easedProgress * maxScroll);
    });
    return () => unsubscribe();
  }, [scrollYProgress, x]);

  return (
    <div
      ref={mobileContainerRef}
      className="md:hidden relative h-[300vh] bg-white py-8 sm:py-12"
    >
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        {/* Header */}
        <motion.div
          className="px-4 sm:px-6 pt-8 sm:pt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 className="text-3xl sm:text-4xl font-light leading-tight">
            <span className="text-gray-400">COMPLETE</span>
            <br />
            FINANCIAL SERVICES
          </motion.h2>
          <motion.p className="text-[#333333] mt-4 font-medium lg:mt-6 text-sm lg:text-base leading-relaxed">
            <span className="font-semibold block">
              Banking, lending, insurance, and more -
            </span>
            <span className="block">
              all in one comprehensive platform
            </span>
          </motion.p>

          <motion.button className="flex items-center gap-2 bg-black text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mt-4 sm:mt-6 hover:bg-gray-800 transition-colors text-xs sm:text-sm">
            Explore all features
            <ArrowUpRight size={14} className="sm:w-4 sm:h-4" />
          </motion.button>
        </motion.div>

        {/* Services */}
        <div className="mt-8 sm:mt-12 w-full">
          <motion.div
            ref={cardWrapperRef}
            style={{ x }}
            className="flex gap-4 sm:gap-6 px-4 sm:px-6 pb-8"
          >
            {servicesData.map((service, i) => {
              const normalPart = service.points
                .slice(0, service.points.length - 2)
                .join(" ");
              const boldPart = service.points.slice(-2).join(" ");

              return (
                <div
                  key={i}
                  className="w-[75vw] sm:w-[65vw] flex-shrink-0 pl-6"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[2/3] overflow-hidden mb-4 sm:mb-6 shadow-md">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Text */}
                  <h3 className="text-xl sm:text-2xl font-light text-gray-500 mb-3 text-center">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-center">
                    {normalPart}{" "}
                    <span className="font-semibold text-gray-700">
                      {boldPart}
                    </span>
                  </p>
                </div>
              );
            })}
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

  return (
    <section>
      {/* Desktop View */}
      <div ref={containerRef} className="hidden md:block relative h-[600vh]">
        <div className="sticky top-0 h-screen grid grid-cols-[60%_40%] items-stretch">
          <div className="bg-white flex items-center justify-start px-8 lg:px-16 xl:px-20">
            <motion.div
              className="max-w-md lg:max-w-[406px] text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 className="text-4xl lg:text-5xl xl:text-6xl font-[400] leading-none">
                <span className="text-gray-400">COMPLETE</span>
                <br />
                FINANCIAL
                <br />
                SERVICES
              </motion.h2>
              <motion.p className="text-[#333333] mt-4 font-medium lg:mt-6 text-sm lg:text-base leading-relaxed">
                <span className="font-semibold block">
                  Banking, lending, insurance, and more -
                </span>
                <span className="block">
                  all in one comprehensive platform
                </span>
              </motion.p>

              <WaitlistTriggerButton>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black cursor-pointer whitespace-nowrap text-white 
               w-[180px] h-[56px] rounded-full flex items-center 
               justify-center gap-2 text-xs font-normal 
               hover:bg-gray-800 transition-colors mt-7"
                >
                  Explore all features
                  <ArrowUpRight size={18} className="w-5 h-5" />
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
