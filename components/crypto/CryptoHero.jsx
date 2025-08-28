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
    src: "/eth.png",
    alt: "ETH",
    initialX: "-800vw",
    initialY: "-500vh",
    finalX: "-0px",
    finalY: "-20px",
  },
  {
    src: "/usdt.png",
    alt: "USDT",
    initialX: "800vw",
    initialY: "-500vh",
    finalX: "-25px",
    finalY: "-20px",
  },
  {
    src: "/doller.png",
    alt: "Doller",
    initialX: "-800vw",
    initialY: "500vh",
    finalX: "-55px",
    finalY: "-20px",
  },
  {
    src: "/bitcoin.png",
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
    // For example: navigate to download page, open modal, etc.
  };

  return (
    // Make the container taller to allow for scroll
    <div
      ref={containerRef}
      className="h-[160vh] lg:h-[300vh] bg-[#F9F9F9] relative"
    >
      {/* Sticky background content */}
      <div className="sticky top-0 h-screen flex-col items-center justify-center px-4 py-8 overflow-hidden">
        {/* Background text that stays sticky - positioned absolutely to stay in place */}
        <div className=" flex items-center justify-center z-10">
          <div className="text-center">
            <div>
              <div className="text-[#B7B7B7] text-4xl lg:-tracking-[7px] sm:text-6xl lg:text-[64px]  font-[600] leading-[100%]">
                SPEND
              </div>
              <div className="text-[#6F6F6F] text-5xl lg:-mt-6 9 lg:tracking-tighter sm:text-8xl lg:text-[120px] font-semibold leading-none">
                CRYPTO
              </div>
              <div className="text-[#B7B7B7] text-6xl sm:text-8xl lg:-mt-11 2xl:-mt-11 lg:text-[200px] font-[100] leading-none">
                <span style={{ letterSpacing: "-0.11em" }}>L</span>
                <span style={{ letterSpacing: "-0.24em" }}>I</span>
                <span style={{ letterSpacing: "-0.12em" }}>KE</span>
                {/* <span style={{ letterSpacing: "-0.07em" }}></span> */}
                <span className="text-[#404040] font-semibold">
                  <span style={{ letterSpacing: "-0.10em" }}>C</span>
                  <span style={{ letterSpacing: "-0.10em" }}>A</span>
                  <span style={{ letterSpacing: "-0.10em" }}>S</span>
                  <span style={{ letterSpacing: "-0.11em" }}>H</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Phone mockup with scroll animations - higher z-index to appear above text */}
        <div className="relative z-20 max-w-7xl lg:-mt-10 mx-auto w-full flex items-center justify-center">
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
                  <div className="text-center mb-6 lg:mb-4">
                    <p className="text-xs 3xl:text-sm text-gray-800 leading-relaxed max-w-[200px] lg:max-w-[280px]">
                      <span className="font-semibold text-black">
                        Web3 Powered Super App
                      </span>{" "}
                      <br />
                      for lifestyle, finance and freedom!
                    </p>
                  </div>
                  <div className="mb-8 lg:mb-4 h-8 lg:h-10 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentWord}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                        className="text-md 3xl:text-xl font-[400] text-gray-800"
                      >
                        {words[currentWord]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div>
                    <p className="text-xs 3xl:text-sm text-center text-gray-800 leading-relaxed max-w-[200px] lg:max-w-[280px]">
                      Take control of your financial future with{" "}
                      <span className="text-black font-semibold">
                        self-custody wallets, earning opportunities, and
                        seamless spending solutions.
                      </span>
                    </p>
                  </div>

                  {/* Crypto icons with conditional animations - lowered z-index */}
                  <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                    {iconsData.map((icon, index) => {
                      // Mobile: Simple bottom-up animation with delays
                      if (isMobile) {
                        return (
                          <motion.div
                            key={index}
                            initial={{
                              opacity: 0,
                              y: 100,
                              x: index * -25, // Stagger horizontally
                            }}
                            animate={{
                              opacity: 1,
                              y: -20,
                              x: index * -25,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: index * 0.2, // Stagger the animations
                              ease: "easeOut",
                            }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            className="absolute top-[56%] lg:top-[67%] left-1/2 translate-x-1/2"
                          >
                            <Image
                              src={icon.src || "/placeholder.svg"}
                              alt={icon.alt}
                              width={80}
                              height={80}
                              className="w-10 h-10"
                            />
                          </motion.div>
                        );
                      }

                      // Desktop: Original scroll-based animation
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
                          <Image
                            src={icon.src || "/placeholder.svg"}
                            alt={icon.alt}
                            width={80}
                            height={80}
                            className="w-10 h-10"
                          />
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="my-4 mt-10 lg:mt-32 relative z-10">
                    <Image
                      src={"/images/crypto/line.png"}
                      height={100}
                      width={10}
                      alt="arrow"
                      className="object-contain h-16 w-auto"
                    />
                  </div>

                  {/* Fixed clickable button with proper z-index and pointer events */}
                  <div className="relative z-50 pointer-events-auto">
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
