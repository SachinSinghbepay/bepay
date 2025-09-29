"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { SmartphoneIcon as DeviceMobile } from "lucide-react";
import WaitlistTriggerButton from "../waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service

const iconsData = [
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

export default function CryptoHeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const words = ["Save", "Send", "Earn", "Grow"];
  const containerRef = useRef(null);
  const heroSectionRef = useRef(null); // For intersection observer

  // ANALYTICS: Track when the hero section is actually viewed
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("Hero Section Viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target); // Stop observing after first view
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the component is visible
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]); // Empty dependency array means this runs only once when the component mounts

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -700]);

  // Desktop scroll transforms
  const xTransform0 = useTransform(
    scrollYProgress,
    [0, 0.6],
    [iconsData[0].initialX, iconsData[0].finalX]
  );
  const yTransform0 = useTransform(
    scrollYProgress,
    [0, 0.6],
    [iconsData[0].initialY, iconsData[0].finalY]
  );
  const scaleTransform0 = useTransform(scrollYProgress, [0, 0.6], [1.5, 1]);
  const opacityTransform0 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    [0, 1, 1]
  );

  const xTransform1 = useTransform(
    scrollYProgress,
    [0, 0.6],
    [iconsData[1].initialX, iconsData[1].finalX]
  );
  const yTransform1 = useTransform(
    scrollYProgress,
    [0, 0.6],
    [iconsData[1].initialY, iconsData[1].finalY]
  );
  const scaleTransform1 = useTransform(scrollYProgress, [0, 0.6], [1.5, 1]);
  const opacityTransform1 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    [0, 1, 1]
  );

  const xTransform2 = useTransform(
    scrollYProgress,
    [0, 0.6],
    [iconsData[2].initialX, iconsData[2].finalX]
  );
  const yTransform2 = useTransform(
    scrollYProgress,
    [0, 0.6],
    [iconsData[2].initialY, iconsData[2].finalY]
  );
  const scaleTransform2 = useTransform(scrollYProgress, [0, 0.6], [1.5, 1]);
  const opacityTransform2 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    [0, 1, 1]
  );

  const xTransform3 = useTransform(
    scrollYProgress,
    [0, 0.6],
    [iconsData[3].initialX, iconsData[3].finalX]
  );
  const yTransform3 = useTransform(
    scrollYProgress,
    [0, 0.6],
    [iconsData[3].initialY, iconsData[3].finalY]
  );
  const scaleTransform3 = useTransform(scrollYProgress, [0, 0.6], [1.5, 1]);
  const opacityTransform3 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    [0, 1, 1]
  );

  const xTransforms = [xTransform0, xTransform1, xTransform2, xTransform3];
  const yTransforms = [yTransform0, yTransform1, yTransform2, yTransform3];
  const scaleTransforms = [
    scaleTransform0,
    scaleTransform1,
    scaleTransform2,
    scaleTransform3,
  ];
  const opacityTransforms = [
    opacityTransform0,
    opacityTransform1,
    opacityTransform2,
    opacityTransform3,
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  // ANALYTICS: Handler for the main hero section download button
  const handleButtonClick = () => {
    AnalyticsService.sendEvent("Main hero download button clicked", {
      button_location: "main_hero_section",
    });
    console.log("Main hero button clicked!");
  };

  // ANALYTICS: Handler for the bepay icon click
  const handleBepayIconClick = () => {
    AnalyticsService.sendEvent("bepay icon clicked", {
      bepay_icon: "icon",
    });
    console.log("Bepay icon clicked!");
  };

  return (
    <div
      ref={containerRef}
      className="h-[160vh] lg:h-[300vh] bg-[#F9F9F9] relative"
    >
      <div
        ref={heroSectionRef}
        className="sticky top-0 h-screen flex-col items-center justify-center px-4 py-8 overflow-hidden"
      >
        <div className=" flex items-center justify-center z-10">
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
                  {/* ANALYTICS: Added onClick handler to this clickable div wrapping the icon */}
                  <div
                    className="mb-6 cursor-pointer"
                    onClick={handleBepayIconClick}
                  >
                    <Image
                      src="/bepayiconlogo.png"
                      alt="BePay Logo"
                      width={105}
                      height={105}
                      className="mx-auto h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] 2xl:h-[105px] 2xl:w-[105px] object-cover transition-all"
                      priority
                    />
                  </div>

                  <div className="text-center mb-6 lg:mb-4 ">
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
                    {iconsData.map((icon, index) => {
                      if (isMobile) {
                        return (
                          <motion.div
                            key={index}
                            initial={{
                              opacity: 0,
                              y: 100,
                              x: index * -25,
                            }}
                            animate={{
                              opacity: 1,
                              y: -80,
                              x: icon.finalX,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: index * 0.2,
                              ease: "easeOut",
                            }}
                            className="absolute top-[56%] lg:top-[67%] left-1/2 translate-x-[30%]"
                          >
                            <div
                              className="w-12 h-12 rounded-full overflow-hidden"
                              style={{
                                boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)",
                              }}
                            >
                              <Image
                                src={icon.src || "/placeholder.svg"}
                                alt={icon.alt}
                                fill
                                className="object-cover rounded-full"
                              />
                            </div>
                          </motion.div>
                        );
                      }

                      const x = xTransforms[index];
                      const y = yTransforms[index];
                      const scale = scaleTransforms[index];
                      const opacity = opacityTransforms[index];

                      return (
                        <motion.div
                          key={index}
                          style={{ x, y, scale, opacity }}
                          className="absolute flex top-1/2 left-1/2 translate-x-1/2"
                        >
                          <div className="w-12 h-12 overflow-hidden">
                            <Image
                              src={icon.src || "/placeholder.svg"}
                              alt={icon.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="relative z-30 flex justify-center mt-20 lg:mt-35 lg:left-[15px]">

                    <Image
                      src={"/images/crypto/line.png"}
                      height={100}
                      width={10}
                      alt="arrow"
                      className="object-contain h-16 w-auto"
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
                        onClick={handleButtonClick} // ANALYTICS: This handler now tracks the click
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