"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, CheckCircle } from "lucide-react";

const servicesData = [
  {
    title: "Remittance Services",
    description: (
      <>
        <div className="flex flex-col space-y-2">
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> Send money home to family and friends
            globally
          </p>
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> Competitive exchange rates.
          </p>
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> Real-time tracking & Multiple payout
            options.
          </p>
        </div>
      </>
    ),
    //   "Send money home to family and friends globally.
    //   Competitive exchange rates.
    //   Real-time tracking & Multiple payout options.",
    image: "/images/crypto/co1.png",
  },
  {
    title: "Insurance products",
    description: (
      <>
        <div className="flex flex-col space-y-2">
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> Protect your assets, income, and life
          </p>
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> Health, Travel & Life Coverage
          </p>
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> Flexible Plans & Instant Claims
          </p>
        </div>
      </>
    ),
    image: "/images/crypto/co2.png",
  },
  {
    title: "Bitcoin backed loans",
    description: (
      <>
        <div className="flex flex-col space-y-2">
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> Get instant loans using your Bitcoin as
            collateral
          </p>
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> No credit check required
          </p>
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> Flexible repayment terms
          </p>
        </div>
      </>
    ),
    image: "/images/crypto/co3.png",
  },
  {
    title: "DeFi Marketplace",
    description: (
      <>
        <div className="flex flex-col space-y-2">
          <p className="flex gap-2  items-center">
           <div><CheckCircle size={20} /></div>  <span className="lg:whitespace-nowrap">Access DApps and DeFi protocols directly
            from your wallet</span> 
          </p>
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> One-Click Access to Top Protocols
          </p>
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> Secure & Gas-Optimized Transactions
          </p>
        </div>
      </>
    ),
    image: "/images/crypto/co4.png",
  },
  {
    title: "Savings products",
    description: (
      <>
        <div className="flex flex-col space-y-2">
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> High-yield savings on BTC, ETH, USDT, and
            USDC
          </p>
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> No minimum balance
          </p>
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> Instant withdrawals
          </p>
        </div>
      </>
    ),
    image: "/images/crypto/co5.png",
  },
  {
    title: "Cross-Border Payments",
    description: (
      <>
        <div className="flex flex-col space-y-2">
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> Fast, cheap international money transfers
          </p>
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> Instant settlements globally
          </p>
          <p className="flex gap-2 items-center">
            <CheckCircle size={20} /> Lowest fee guarantee
          </p>
        </div>
      </>
    ),
    image: "/images/crypto/co6.png",
  },
];

const ServicePanel = ({ service, index, progress, totalServices }) => {
  const segmentDuration = 1 / totalServices;
  const start = index * segmentDuration;
  const end = start + segmentDuration;
  const travelDistance = 800;

  const y = useTransform(
    progress,
    [start, end],
    [
      index === 0 ? 0 : travelDistance,
      index === totalServices - 1 ? 0 : -travelDistance,
    ]
  );
  const opacity = useTransform(
    progress,
    [start, start + segmentDuration * 0.2, end - segmentDuration * 0.2, end],
    [index === 0 ? 1 : 0, 1, 1, index === totalServices - 1 ? 1 : 0]
  );

  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
    >
      <div className="relative w-full max-w-md aspect-[530/633] rounded-3xl overflow-hidden mb-8 shadow-2xl">
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h3 className="text-2xl md:text-3xl font-light text-gray-400">
        {service.title}
      </h3>
      <p className="text-sm md:text-base text-gray-500 mt-2 max-w-md mx-auto">
        {service.description}
      </p>
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
      x.set(-latest * maxScroll);
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
      className="md:hidden relative h-[300vh] bg-white  py-16"
    >
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        <motion.div
          className="px-4 pt-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-4xl font-light leading-none"
            variants={itemVariants}
          >
            <span className="text-gray-400">COMPLETE</span>
            <br />
            FINANCIAL SERVICES
          </motion.h2>
          <motion.p className="text-gray-600 mt-4" variants={itemVariants}>
            Banking, lending, insurance, and more - all in one comprehensive
            platform
          </motion.p>
          <motion.button
            className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full mt-6 hover:bg-gray-800 transition-colors text-sm"
            variants={itemVariants}
          >
            Explore all features
            <ArrowUpRight size={16} />
          </motion.button>
        </motion.div>

        <div className="  mt-10 w-full">
          <motion.div
            ref={cardWrapperRef}
            style={{ x }}
            className="flex gap-6 px-4 pb-8"
          >
            {servicesData.map((service, i) => (
              <div key={i} className="w-[80vw] sm:w-[60vw] flex-shrink-0">
                <div className="relative w-full aspect-[530/633] rounded-3xl overflow-hidden mb-6 shadow-lg">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-xl font-light text-gray-500">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {service.description}
                </p>
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
          <div className="bg-white flex items-center justify-center px-16">
            <motion.div
              className="max-w-md text-left"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2
                className="text-5xl lg:text-6xl font-light leading-none"
                variants={itemVariants}
              >
                <span className="text-gray-400">COMPLETE</span>
                <br />
                FINANCIAL
                <br />
                SERVICES
              </motion.h2>
              <motion.p className="text-gray-600 mt-6" variants={itemVariants}>
                Banking, lending, insurance, and more - all in one comprehensive
                platform
              </motion.p>
              <motion.button
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full mt-8 hover:bg-gray-800 transition-colors text-sm"
                variants={itemVariants}
              >
                Explore all features
                <ArrowUpRight size={16} />
              </motion.button>
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
