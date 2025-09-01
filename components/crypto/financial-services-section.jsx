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
      "<strong>No credit check required.</strong>",
      "<strong>Flexible repayment terms.</strong>",
    ],
    image: "/images/crypto/co1.png",
  },
  {
    title: "Savings Products",
    points: [
      "High-yield savings on BTC, ETH, USDT, and USDC.",
      "<strong>No minimum balance.</strong>",
      "<strong>Instant withdrawals.</strong>",
    ],
    image: "/images/crypto/co2.png",
  },
  {
    title: "Insurance Products",
    points: [
      "Protect your assets, income, and life with crypto-powered insurance solutions.",
      "<strong>Health, Travel & Life Coverage.</strong>",
      "<strong>Flexible Plans & Instant Claims.</strong>",
    ],
    image: "/images/crypto/co3.png",
  },
  {
    title: "Cross-Border Payments",
    points: [
      "Fast, cheap international money transfers.",
      "<strong>Instant settlements globally.</strong>",
      "<strong>Lowest fee guarantee.</strong>",
    ],
    image: "/images/crypto/co5.png",
  },
  {
    title: "Remittance Services",
    points: [
      "Send money home to family and friends globally.",
      "<strong>Competitive exchange rates.</strong>",
      "<strong>Real-time tracking & Multiple payout options.</strong>",
    ],
    image: "/images/crypto/co6.png",
  },
  {
    title: "DeFi Marketplace",
    points: [
      "Access DApps and DeFi protocols directly from your wallet.",
      "<strong>One-Click Access to Top Protocols.</strong>",
      "<strong>Secure & Gas-Optimized Transactions.</strong>",
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
      className="absolute inset-0 flex flex-col justify-center p-8 lg:p-12"
    >
      {/* Container with more compact sizing */}
      <div className="w-full max-w-[360px] mx-auto">
        {/* Image - larger proportion, less margin */}
        <div className="relative w-full aspect-[4/5] overflow-hidden mb-4 lg:mb-5 shadow-lg">
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.title}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Text (More compact spacing) */}
        <div className="text-left px-1">
          <h3 className="text-lg lg:text-xl font-medium text-gray-800 mb-2">
            {service.title}
          </h3>
          <p 
            className="text-xs lg:text-sm text-gray-600 leading-snug"
            dangerouslySetInnerHTML={{ __html: service.points.join(" ") }}
          />
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
            <span className="block">all in one comprehensive platform</span>

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

            {servicesData.map((service, i) => (
              <div key={i} className="w-[75vw] sm:w-[65vw] flex-shrink-0">
                {/* Container for aligned content */}
                <div className="px-6">
                  {/* Image */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden mb-4 sm:mb-6 shadow-md">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Text - aligned to start from same position as image */}
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-light text-gray-500 mb-2 sm:mb-3">
                      {service.title}
                    </h3>
                    <p 
                      className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: service.points.join(" ") }}
                    />
                  </div>
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
                <span className="block">all in one comprehensive platform</span>

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
