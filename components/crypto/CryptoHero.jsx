"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { SmartphoneIcon as DeviceMobile } from "lucide-react";
import WaitlistTriggerButton from "../waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService";

// Move static data outside component to prevent recreation on every render
const ICONS_DATA = [
  {
    src: "/usdt_n.png",
    alt: "ETH",
    initialX: "-950vw",
    initialY: "-500vh",
    finalX: "11.5px",
    finalY: "-20px",
  },
  {
    src: "/dollar_n.png",
    alt: "USDT",
    initialX: "800vw",
    initialY: "-500vh",
    finalX: "-20px",
    finalY: "-20px",
  },
  {
    src: "/eth_n.png",
    alt: "Dollar",
    initialX: "-800vw",
    initialY: "500vh",
    finalX: "-52px",
    finalY: "-20px",
  },
  {
    src: "/bitcoin_n.png",
    alt: "Bitcoin",
    initialX: "800vw",
    initialY: "500vh",
    finalX: "-85px",
    finalY: "-20px",
  },
];

const WORDS = ["Save", "Send", "Earn", "Grow"];
const WORD_CHANGE_INTERVAL = 2000;
const MOBILE_BREAKPOINT = 1024;

export default function CryptoHeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const containerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const intervalRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Create transforms directly (can't memoize hooks)
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -700]);
  
  const iconTransforms = ICONS_DATA.map((icon, index) => ({
    x: useTransform(scrollYProgress, [0, 0.6], [icon.initialX, icon.finalX]),
    y: useTransform(scrollYProgress, [0, 0.6], [icon.initialY, icon.finalY]),
    scale: useTransform(scrollYProgress, [0, 0.6], [1.5, 1]),
    opacity: useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 1]),
  }));

  // Memoized event handlers
  const handleButtonClick = useCallback(() => {
    AnalyticsService.sendEvent("Main hero download button clicked", {
      button_location: "main_hero_section",
    });
  }, []);

  const handleBepayIconClick = useCallback(() => {
    AnalyticsService.sendEvent("bepay icon clicked", {
      bepay_icon: "icon",
    });
  }, []);

  // Optimized mobile detection with debouncing
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  // Analytics tracking with intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("Hero Section Viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3, rootMargin: '50px' } // Add rootMargin for better UX
    );

    const currentRef = heroSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [hasTrackedView]);

  // Mobile detection with cleanup
  useEffect(() => {
    checkMobile();
    let timeoutId;
    
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", debouncedResize, { passive: true });
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [checkMobile]);

  // Word cycling with cleanup
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % WORDS.length);
    }, WORD_CHANGE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Memoized mobile icon component
  const MobileIcon = useMemo(() => ({ icon, index }) => (
    <motion.div
      key={`mobile-${index}`}
      initial={{ opacity: 0, y: 100, x: index * -25 }}
      animate={{ opacity: 1, y: -80, x: icon.finalX }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      }}
      className="absolute top-[56%] lg:top-[67%] left-1/2 translate-x-[30%]"
    >
      <div
        className="w-12 h-12 rounded-full overflow-hidden"
        style={{ boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)" }}
      >
        <Image
          src={icon.src}
          alt={icon.alt}
          width={48}
          height={48}
          className="object-cover rounded-full"
          loading="lazy"
          sizes="48px"
        />
      </div>
    </motion.div>
  ), []);

  // Memoized desktop icon component
  const DesktopIcon = useMemo(() => ({ icon, index, transforms }) => (
    <motion.div
      key={`desktop-${index}`}
      style={transforms}
      className="absolute flex top-1/2 left-1/2 translate-x-1/2"
    >
      <div className="w-12 h-12 overflow-hidden">
        <Image
          src={icon.src}
          alt={icon.alt}
          width={48}
          height={48}
          className="object-cover"
          loading="lazy"
          sizes="48px"
        />
      </div>
    </motion.div>
  ), []);

  return (
    <div
      ref={containerRef}
      className="h-[160vh] lg:h-[300vh] bg-[#F9F9F9] relative"
    >
      <div
        ref={heroSectionRef}
        className="sticky top-0 h-screen flex-col items-center justify-center px-4 py-8 overflow-hidden"
      >
        <div className="flex items-center justify-center z-10">
          <div className="text-center">
            {isMobile ? (
              <div className="leading-none lg:hidden">
                <div
                  className="text-[#C0C0C0] font-thin text-4xl sm:text-[50px] my-[-0.5rem]"
                  style={{ letterSpacing: "-0.14em" }}
                >
                  USE
                  <span
                    className="text-[#4F4F4F] font-[900] text-4xl sm:text-[50px] ml-2 sm:ml-4"
                    style={{ letterSpacing: "-0.06em" }}
                  >
                    CRYP
                    <span className="inline-block ml-0.5">T</span>O
                  </span>
                </div>
                <div
                  className="text-[#B7B7B7] font-thin text-4xl sm:text-[50px] my-[-0.8rem]"
                  style={{ letterSpacing: "-0.11em" }}
                >
                  LI
                  <span className="inline-block -ml-1">K</span>E
                  <span
                    className="text-[#C0C0C0] font-[900] text-4xl sm:text-[50px] ml-2 sm:ml-4"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    CASH
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden lg:block">
                <div className="leading-none">
                  <span
                    className="text-[#B7B7B7] font-thin text-[166px]"
                    style={{ letterSpacing: "-0.17em" }}
                  >
                    USE
                  </span>
                  <span
                    className="text-[#4F4F4F] font-[900] text-4xl sm:text-[166px] ml-2 sm:ml-4"
                    style={{ letterSpacing: "-0.06em" }}
                  >
                    CRYP
                    <span className="inline-block ml-0.5">T</span>O
                  </span>
                </div>
                <div className="leading-none -mt-15">
                  <div
                    className="text-[#B7B7B7] font-thin text-4xl sm:text-[166px] my-[-0.8rem]"
                    style={{ letterSpacing: "-0.11em" }}
                  >
                    LI
                    <span className="inline-block -ml-5">K</span>E
                    <span
                      className="text-[#C0C0C0] font-[900] text-[166px] sm:text-[166px] ml-2 sm:ml-4"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      CASH
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-center mt-15 sm:mt-24 lg:mt-2">
          <motion.div style={{ y: mockupY }} className="flex-shrink-0">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-[280px] h-[560px] sm:w-[320px] sm:h-[640px] lg:w-[393px] 3xl:w-[409px] lg:h-[868px] rounded-[40px] lg:rounded-[60px] p-2"
                style={{
                  background: "rgba(19, 19, 19, 0.15)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "120px 120px 120px 0px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-white via-white to-[#F9F9F966] rounded-[32px] lg:rounded-[52px] flex flex-col items-center justify-start p-6 lg:p-16 relative">
                  {/* Logo */}
                  <div className="mb-6 cursor-pointer" onClick={handleBepayIconClick}>
                    <Image
                      src="/bepayiconlogo.png"
                      alt="BePay Logo"
                      width={105}
                      height={105}
                      className="mx-auto h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] 2xl:h-[105px] 2xl:w-[105px] object-cover transition-all"
                      priority
                      sizes="(max-width: 1024px) 40px, (max-width: 1536px) 60px, 105px"
                    />
                  </div>

                  <div className="text-center mb-6 lg:mb-4">
                    <p className="text-xs 3xl:text-sm text-gray-800 leading-relaxed max-w-[200px] lg:max-w-[280px]">
                      <span className="font-semibold text-black">
                        Web3 Powered Super App
                      </span>{" "}
                      <br />
                      for lifestyle, finance and freedom!
                    </p>
                  </div>

                  <div className="mb-4 lg:mb-6 lg:mt-10">
                    <p className="text-[11px] sm:text-sm 3xl:text-sm text-gray-800 leading-relaxed max-w-[260px] sm:max-w-[320px] mx-auto">
                      <span className="block text-left lg:text-center whitespace-nowrap">
                        Take control of your financial future with
                      </span>
                      <span className="block text-center text-black font-semibold text-[10px] sm:text-sm whitespace-nowrap">
                        self-custody wallets, earning opportunities,
                      </span>
                      <span className="block text-center text-black font-semibold">
                        and seamless spending solutions.
                      </span>
                    </p>
                  </div>

                  <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                    {ICONS_DATA.map((icon, index) => {
                      if (isMobile) {
                        return <MobileIcon key={index} icon={icon} index={index} />;
                      }
                      return (
                        <DesktopIcon
                          key={index}
                          icon={icon}
                          index={index}
                          transforms={iconTransforms[index]}
                        />
                      );
                    })}
                  </div>

                  <div className="relative z-30 flex justify-center mt-20 lg:mt-35 lg:left-[15px]">
                    <Image
                      src="/images/crypto/line.png"
                      height={100}
                      width={10}
                      alt="arrow"
                      loading="lazy"
                      className="object-contain h-16 w-auto"
                      sizes="10px"
                    />
                  </div>

                  <div className="relative z-50 pointer-events-auto mt-10 lg:mt-12">
                    <WaitlistTriggerButton triggerSource="'Download app and start earning' button">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        viewport={{ once: false, amount: 0.5 }}
                        onClick={handleButtonClick}
                        className="bg-black cursor-pointer h-[56px] whitespace-nowrap text-white rounded-full flex items-center justify-center gap-2 px-4 py-2 text-[12px] font-medium select-none hover:bg-black/90 transition-colors active:scale-95 font-montserrat lg:w-[298px] lg:h-[56px] lg:gap-[10px] lg:px-6 lg:py-4 lg:text-[14px] lg:font-medium lg:leading-[100%]"
                        style={{ pointerEvents: "auto" }}
                      >
                        <DeviceMobile className="w-3 h-3 -mt-[1px] lg:w-4 lg:h-4" />
                        Download App & Start Earning
                      </motion.button>
                    </WaitlistTriggerButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}