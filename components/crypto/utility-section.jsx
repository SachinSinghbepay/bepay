"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

const utilityData = [
  {
    icon: "/images/crypto/i1.png",
    title: "Bill Payments",
    description: "Pay utilities, mobile recharge, data plans and other bills instantly",
  },
  {
    icon: "/images/crypto/i2.png",
    title: "Travel Bookings",
    description: "Book flights & hotels with Travala",
  },
  {
    icon: "/images/crypto/i3.png",
    title: "Train tickets",
    description: "Book train tickets across the world using crypto",
  },
  {
    icon: "/images/crypto/i4.png",
    title: "Movie Tickets",
    description: "Book your favourite movie tickets and other entertainment events",
  },
  {
    icon: "/images/crypto/i6.png",
    title: "E-commerce shopping",
    description: "Shop online with crypto payments",
  },
  {
    icon: "/images/crypto/i5.png",
    title: "Gift Cards",
    description: "Buy gift cards for popular retailers like Amazon, Uber eats, Starbucks and many more",
  },
];

// Hook to detect mobile vs desktop
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const AnimatedText = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile: Simple entrance animation, stays visible, and is now left-aligned
    return (
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-6xl font-[400] tracking-tight text-left px-4"
      >
        <div>
          <span className="text-[#333333] tracking-[-0.05em]">Crypto </span>
          <span className="text-[#C0C0C0] tracking-[-0.07em]">meets</span>
        </div>
        <div>
          <span className="text-[#333333] tracking-[-0.09em]">daily utility</span>
        </div>
      </motion.h2>
    );
  }

  // Desktop: Original animation remains centered
  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="text-4xl md:text-7xl lg:text-[140px] font-[400] tracking-tight text-center lg:tracking-[-0.09em] lg:leading-[130px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <span className="text-[#333333] tracking-[-0.05em]">Crypto </span>
        <span className="text-[#C0C0C0] tracking-[-0.07em]">meets</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="text-[#333333] tracking-[-0.09em]">daily utility</span>
      </motion.div>
    </motion.h2>
  );
};

// Desktop Card Component
const DesktopCardComponent = ({ cardData }) => {
  return (
    <div className="w-[300px] h-[400px] lg:w-[380px] drop-shadow-2xl lg:h-[500px] bg-white shadow-utility-card rounded-[40px] p-8 flex flex-col items-start relative overflow-hidden flex-shrink-0 border-0">
      <Image
        src={cardData.icon || "/placeholder.svg"}
        alt={cardData.title}
        width={200}
        height={200}
        className="opacity-100 absolute top-4 left-4 w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] z-0"
      />
      <div className="absolute bottom-20 left-8 right-8 z-10">
        <h3 className="text-xl lg:text-[32px] font-[500] text-[#6A6A6A] leading-[38px] tracking-[-0.06em] text-start">
          {cardData.title}
        </h3>
        <p className="text-gray-600 mt-2 text-start text-sm">
          {cardData.description}
        </p>
      </div>
    </div>
  );
};

// ENHANCED MOBILE CARD WITH STRONGER RIGHT-SIDE SHADOW
const MobileCard = ({ cardData }) => (
  <div
    className="h-[50vh] min-h-[380px] w-[75vw] max-w-[320px] bg-white rounded-[40px] p-6 flex flex-col justify-end relative overflow-hidden flex-shrink-0"
    style={{
      // Enhanced right-side shadow with multiple layers for more depth
      boxShadow: `
        0px 10px 25px rgba(0, 0, 0, 0.017),
        120px 0px 100px -30px rgba(0, 0, 0, 0.05),
        80px 0px 60px -20px rgba(0, 0, 0, 0.01),
        40px 0px 30px -10px rgba(0, 0, 0, 0.017)
      `,
    }}
  >
    <Image
      src={cardData.icon || "/placeholder.svg"}
      alt={cardData.title}
      width={120}
      height={120}
      className="absolute top-8 left-4 w-[120px] h-[120px] z-0"
    />
    <div className="z-10">
      <h3 className="text-xl font-semibold text-[#080808] tracking-[-0.04em] text-start">
        {cardData.title}
      </h3>
      <p className="text-gray-600 mt-2 text-start text-sm font-medium leading-snug tracking-[-0.02em]">
        {cardData.description}
      </p>
    </div>
  </div>
);

// DESKTOP ANIMATION
const DesktopCard = ({ cardData, index, progress, totalCards }) => {
  const segment = 1 / totalCards;
  const overlap = segment * 0.7;
  const start = Math.max(0, index * segment - overlap * 0.5);
  const peak = index * segment + segment * 0.5;
  const end = Math.min(1, (index + 1) * segment + overlap * 0.5);

  const y = useTransform(progress, [start, peak, end], ["40%", "0%", "-40%"]);
  const opacity = useTransform(progress, [start, peak, end], [0, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      style={{ y, opacity }}
      transition={{ ease: "easeInOut", duration: 0.6 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative w-full md:w-[800px] h-full md:h-[648px] flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0 px-4 md:px-0">
        <div
          className={`${
            isEven ? "md:absolute md:top-0 md:left-0" : "md:absolute md:bottom-0 md:right-0"
          } relative`}
        >
          <DesktopCardComponent cardData={cardData} />
        </div>
      </div>
    </motion.div>
  );
};

// REVISED MOBILE VIEW with responsive vertical layout
const MobileView = () => {
  const mobileContainerRef = useRef(null);
  const cardWrapperRef = useRef(null);
  const x = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start start", "end end"],
  });

  const easeOutCubic = (val) => 1 - Math.pow(1 - val, 3);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const cardWrapper = cardWrapperRef.current;
      const container = mobileContainerRef.current;
      if (!cardWrapper || !container) return;

      const scrollWidth = cardWrapper.scrollWidth;
      const containerWidth = container.offsetWidth;
      const maxScroll = scrollWidth - containerWidth;
      const easedProgress = easeOutCubic(latest);
      x.set(-easedProgress * maxScroll);
    });
    return () => unsubscribe();
  }, [scrollYProgress, x]);

  return (
    <div ref={mobileContainerRef} className="md:hidden relative h-[300vh] bg-[#f9f9f9]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex flex-col h-full justify-start pt-[5vh] sm:pt-[6vh] pb-[10vh] sm:pb-[12vh]">
          {/* Heading with smaller font & tighter spacing */}
          <div className="px-4 sm:px-6 mb-4">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-4xl sm:text-5xl font-[400] tracking-tight text-left px-4 leading-[1.1]"
            >
              <div>
                <span className="text-[#333333] tracking-[-0.04em]">Crypto </span>
                <span className="text-[#C0C0C0] tracking-[-0.06em]">meets</span>
              </div>
              <div>
                <span className="text-[#333333] tracking-[-0.07em]">daily utility</span>
              </div>
            </motion.h2>
          </div>

          {/* Cards with proper horizontal scroll */}
          <div className="w-full flex-1 flex items-center">
            <motion.div
              ref={cardWrapperRef}
              
              className="flex gap-4 sm:gap-6 px-4 sm:px-6"
              style={{ 
                x,
                // Ensure the container allows shadows to overflow
                overflow: 'visible'
              }}
            >
              {utilityData.map((cardData, i) => (
                <div key={i} className="relative" style={{ zIndex: utilityData.length - i }}>
                  <MobileCard cardData={cardData} index={i} />
                </div>
              ))}
              <div className="flex-shrink-0 w-3 sm:w-16" />
            </motion.div>
          </div>

          {/* Button */}
          <div className="flex items-center justify-center mt-6">
            <button
              className="bg-black cursor-pointer whitespace-nowrap text-white
                px-6 h-[56px] rounded-full flex items-center
                justify-center gap-2 text-xs font-medium
                hover:bg-gray-800 transition-colors"
            >
              <Image
                src="/utility.svg"
                alt="Utility Icon"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>Start paying with crypto</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UtilitySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalCards = utilityData.length;

  // Button animation at very end
  const buttonOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.85, 0.95], [50, 0]);

  return (
    <section>
      {/* Desktop View */}
      <div ref={containerRef} className="hidden md:block relative bg-[#f9f9f9] h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background text */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <AnimatedText />
          </div>

          {/* Cards - Desktop animation */}
          <div className="relative w-full h-full z-10">
            {utilityData.map((cardData, index) => (
              <DesktopCard
                key={index}
                cardData={cardData}
                index={index}
                progress={scrollYProgress}
                totalCards={totalCards}
              />
            ))}
          </div>

          {/* Final button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              opacity: buttonOpacity,
              y: buttonY,
            }}
            transition={{ ease: "easeOut", duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
              bg-black cursor-pointer whitespace-nowrap text-white
              w-[221px] h-[56px] rounded-full flex items-center
              justify-center gap-2 text-xs font-normal
              hover:bg-gray-800 transition-colors"
          >
            <Image
              src="/utility.svg"
              alt="Utility Icon"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Start paying with crypto
          </motion.button>
        </div>
      </div>

      {/* Mobile View */}
      <MobileView />
    </section>
  );
};