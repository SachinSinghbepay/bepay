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
  const words = ["Save", "Send", "Earn", "Grow"];
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -700]);

  // Desktop scroll transforms
  const xTransforms = iconsData.map((icon) =>
    useTransform(scrollYProgress, [0, 0.6], [icon.initialX, icon.finalX])
  );
  const yTransforms = iconsData.map((icon) =>
    useTransform(scrollYProgress, [0, 0.6], [icon.initialY, icon.finalY])
  );
  const scaleTransforms = iconsData.map(() =>
    useTransform(scrollYProgress, [0, 0.6], [1.5, 1])
  );
  const opacityTransforms = iconsData.map(() =>
    useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 1])
  );

  // Check if mobile on mount and resize
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
  }, []);

  // Button click handler
  const handleButtonClick = () => {
    console.log("Button clicked!");
    // Add your click logic here
  };

  return (
    // Make the container taller to allow for scroll
    <div
      ref={containerRef}
      className="h-[160vh] lg:h-[300vh] bg-[#F9F9F9] relative"
    >
      {/* Sticky background content */}
      <div className="sticky top-0 h-screen flex-col items-center justify-center px-4 py-8 overflow-hidden">
        {/* Background text */}
        <div className=" flex items-center justify-center z-10">
          <div className="text-center">
            {isMobile ? (
              // Mobile Heading (Unchanged)
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
              // Desktop Heading (Adjusted)
              <div className="hidden lg:block">
                <div className="leading-none">
                  <span
                    className="text-[#D1D1D1] font-thin text-[166px]"
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
                {/* --- MODIFIED LINE START (Tighter Spacing) --- */}
                <div className="leading-none -mt-16">
                  {/* --- MODIFIED LINE END --- */}
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

        {/* --- MODIFIED LINE START (Moved Up) --- */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-center mt-15 sm:mt-24 lg:mt-2">
          {/* --- MODIFIED LINE END --- */}

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
                  <div className="mb-6">
                    <Image
                      src="/bepayiconlogo.png"
                      alt="BePay Logo"
                      width={105}
                      height={105}
                      className="mx-auto h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] 2xl:h-[105px] 2xl:w-[105px] object-cover transition-all"
                      priority
                    />
                  </div>

                  {/* Text */}
                  <div className="text-center mb-6 lg:mb-4">
                    <p className="text-xs 3xl:text-sm text-gray-800 leading-relaxed max-w-[200px] lg:max-w-[280px]">
                      <span className="font-semibold text-black">
                        Web3 Powered Super App
                      </span>{" "}
                      <br />
                      for lifestyle, finance and freedom!
                    </p>
                  </div>

                  {/* Secondary text */}
                  <div className="mb-4 lg:mb-6">
                    <p className="text-[11px] sm:text-sm 3xl:text-sm text-gray-800 leading-relaxed max-w-[260px] sm:max-w-[320px] mx-auto">
                      <span className="block text-left whitespace-nowrap">
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

                  {/* Crypto icons */}
                  <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                    {iconsData.map((icon, index) => {
                      if (isMobile) {
                        // Mobile animation
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
                              x: icon.finalX, // Use finalX for mobile for consistency
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
                                boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)", // shadow toward right-bottom
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

                      // Desktop scroll animation
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

                  {/* --- MODIFICATION START --- */}
                  {/* Arrow */}
                  <div className="relative z-30 flex justify-center mt-20 lg:mt-48">
                  {/* --- MODIFICATION END --- */}
                    <Image
                      src={"/images/crypto/line.png"}
                      height={100}
                      width={10}
                      alt="arrow"
                      className="object-contain h-16 w-auto"
                    />
                  </div>
                  
                  {/* --- MODIFICATION START --- */}
                  {/* Button */}
                  <div className="relative z-50 pointer-events-auto mt-10 lg:mt-12">
                  {/* --- MODIFICATION END --- */}
                    <WaitlistTriggerButton>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        viewport={{ once: false, amount: 0.5 }}
                        onClick={handleButtonClick}
                        className="bg-black cursor-pointer h-[56px] whitespace-nowrap text-white px-4 py-2 lg:px-6 lg:py-3 rounded-full flex items-center justify-center gap-2 text-[12px] font-medium hover:bg-black/90 transition-colors active:scale-95 select-none"
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