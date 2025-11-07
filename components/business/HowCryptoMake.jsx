"use client";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import WaitlistTriggerButton from "../waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService";

const stepsData = [
  {
    id: 1,
    image: "/images/business/mocup1.png",
    alt: "Bepay crypto payment interface",
    text: "Customer selects stablecoins/crypto at checkout",
  },
  {
    id: 2,
    image: "/images/business/mocup2.png",
    alt: "Bepay QR code interface",
    text: "bepay generates a QR code & token address",
  },
  {
    id: 3,
    image: "/images/business/mocup3.png",
    alt: "Bepay payment success",
    text: "Customer pays in stablecoin/crypto of your choice",
  },
  {
    id: 4,
    image: "/images/business/mocup4.png",
    alt: "Bepay payment confirmation",
    text: "Crypto auto-credits to your bepay business account",
  },
];

const handleStartEarningClick = () => {
  AnalyticsService.sendEvent("'Become a merchant on bepay' button clicked");
};

export default function HowCryptoWorksSection() {
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prevScrollYProgress = useRef(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("How crypto payments work section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasTrackedView]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: isMobile
      ? ["start start", "end end"]
      : ["start start", "end start"],
  });

  useEffect(() => {
    if (!isMobile) return;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > prevScrollYProgress.current) setDirection(1);
      else setDirection(-1);
      prevScrollYProgress.current = latest;

      const stepFraction = 1 / stepsData.length;
      const newStepIndex = Math.floor(latest / stepFraction);

      setCurrentStepIndex(Math.min(newStepIndex, stepsData.length - 1));
    });
    return () => unsubscribe();
  }, [isMobile, scrollYProgress]);

  // --- MOBILE ANIMATION VALUES ---
  const mobileHeadingY = useTransform(scrollYProgress, [0.7, 0.85], [0, -150]);
  const mobileHeadingOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.75],
    [1, 0]
  );

  const lastMockupY = useTransform(
    scrollYProgress,
    [1 - 1 / stepsData.length, 1],
    [0, -130]
  );

  const finalCtaOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const finalCtaY = useTransform(scrollYProgress, [0.85, 0.95], [50, 0]);

  // --- DESKTOP ANIMATION VALUES ---
  const desktopMockup1Y = useTransform(scrollYProgress, [0, 0.25], [0, -1200]);
  const desktopMockup2Y = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.5],
    [800, 0, -1200]
  );
  const desktopMockup2Opacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.5],
    [0, 1, 1]
  );
  const desktopMockup3Y = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.75],
    [800, 0, -1200]
  );
  const desktopMockup3Opacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.75],
    [0, 1, 1]
  );
  const desktopMockup4Y = useTransform(
    scrollYProgress,
    [0.65, 0.75, 1],
    [800, 0, -800]
  );
  const desktopMockup4Opacity = useTransform(
    scrollYProgress,
    [0.65, 0.75, 1],
    [0, 1, 1]
  );
  const desktopContent1Y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25],
    [200, 0, -200]
  );
  const desktopContent1Opacity = useTransform(
    scrollYProgress,
    [0, 0.25],
    [1, 0]
  );
  const desktopContent2Y = useTransform(
    scrollYProgress,
    [0.15, 0.3, 0.5],
    [200, 0, -200]
  );
  const desktopContent2Opacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.5],
    [0, 1, 0]
  );
  const desktopContent3Y = useTransform(
    scrollYProgress,
    [0.4, 0.55, 0.75],
    [200, 0, -200]
  );
  const desktopContent3Opacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.75],
    [0, 1, 0]
  );
  const desktopContent4Y = useTransform(
    scrollYProgress,
    [0.65, 0.8, 1],
    [200, 0, -200]
  );
  const desktopContent4Opacity = useTransform(
    scrollYProgress,
    [0.65, 0.75],
    [0, 1]
  );
  const desktopFloatingOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.75],
    [0, 1]
  );
  const desktopFloatingElement1Y = useTransform(
    scrollYProgress,
    [0.7, 0.8],
    [50, 0]
  );
  const desktopFloatingElement2Y = useTransform(
    scrollYProgress,
    [0.72, 0.82],
    [50, 0]
  );
  const desktopFloatingElement3Y = useTransform(
    scrollYProgress,
    [0.74, 0.84],
    [50, 0]
  );

  const mobileVariants = {
    enter: (direction) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: {
      x: "0%",
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className={`relative bg-[#F9F9F9] ${
        isMobile ? "h-[400vh]" : "h-[400vh]"
      }`}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {isMobile ? (
          // ===================================
          // MOBILE VIEW
          // ===================================
          <div className="flex flex-col h-full">
            <motion.div
              className="text-center pt-8 px-4 z-10"
              style={{ y: mobileHeadingY, opacity: mobileHeadingOpacity }}
            >
              <h2 className="font-medium text-[25px] leading-[30px] tracking-[-0.01em]">
                <span className="text-[#C0C0C0]">How stablecoin </span>
                <span className="text-[#333333]">payments work with </span>
                <span className="text-[#C0C0C0]">bepay business</span>
              </h2>
            </motion.div>

            <div className="relative flex-1 flex flex-col items-center justify-center -mt-10">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={stepsData[currentStepIndex].id}
                  className="absolute w-full flex flex-col items-center px-4"
                  variants={mobileVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  style={
                    currentStepIndex === stepsData.length - 1
                      ? { y: lastMockupY }
                      : {}
                  }
                >
                  <div className="relative w-[260px] h-[500px] drop-shadow-lg">
                    <Image
                      src={stepsData[currentStepIndex].image}
                      alt={stepsData[currentStepIndex].alt}
                      fill
                      className="object-contain"
                      sizes="80vw"
                    />

                    <AnimatePresence>
                      {currentStepIndex === stepsData.length - 1 && (
                        <div className="absolute inset-x-0 bottom-[19%] z-30 flex justify-center pointer-events-none">
                          <motion.div
                            key="settlements-pill"
                            className="w-auto pointer-events-auto"
                            initial={{ opacity: 0, x: -20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                            transition={{
                              duration: 0.5,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <div
                              className="flex items-center justify-center gap-x-2 py-3 px-5 bg-[#E8E8E8]/60 backdrop-blur-[10px] rounded-full text-black font-montserrat font-medium text-[10px] leading-[17px] tracking-normal"
                              style={{
                                boxShadow:
                                  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                              }}
                            >
                              <span className="whitespace-nowrap">
                                NO VOLATILITY
                              </span>
                              <div className="h-4 w-px bg-gray-400/50"></div>
                              <span className="whitespace-nowrap">
                                NO HASSLE
                              </span>
                              <div className="h-4 w-px bg-gray-400/50"></div>
                              <span className="whitespace-nowrap">
                                NO DELAYS
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="text-center mt-6 px-4 max-w-xs">
                    <p className="text-sm font-medium leading-[17px] tracking-normal text-center text-gray-700">
                      {stepsData[currentStepIndex].text}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <motion.div
                className="absolute bottom-16 w-full flex justify-center"
                style={{ opacity: finalCtaOpacity, y: finalCtaY }}
              >
                <WaitlistTriggerButton triggerSource="become a merchant on bepay button clicked" buttonLocation="how_crypto_make_section">
                  <motion.button
                    onClick={handleStartEarningClick}
                    className="flex items-center justify-center gap-2 bg-black text-white px-6 h-[56px] rounded-full hover:bg-gray-800 transition-colors text-xs font-medium"
                  >
                    <span>Become a merchant</span>
                    <ArrowUpRight size={20} />
                  </motion.button>
                </WaitlistTriggerButton>
              </motion.div>
            </div>
          </div>
        ) : (
          // ===================================
          // DESKTOP VIEW
          // ===================================
          <div className="py-20 relative h-full">
            <motion.div className="text-center relative max-w-[1000px] mx-auto mb-16 sm:mb-24 lg:mb-32 lg:-mt-16">
              <motion.h2 className="font-[400] text-[5.5rem] leading-[1] tracking-tight">
                <motion.div>
                  <span className="text-[#C0C0C0]">How </span>
                  <span className="text-[#333333]">crypto </span>
                  <span className="text-[#C0C0C0]">payments </span>
                </motion.div>
                <motion.div>
                  <span className="text-[#C0C0C0]">work with </span>
                  <span className="text-[#333333]">bepay</span>
                </motion.div>
              </motion.h2>
            </motion.div>
            <motion.div
              className="absolute left-1/2 top-[540px] -translate-y-1/2 -translate-x-1/2 z-10"
              style={{ y: desktopMockup1Y }}
            >
              <div className="relative w-[380px] h-[650px] drop-shadow-[15px_15px_15px_rgba(0,0,0,0.05)]">
                <Image
                  src={stepsData[0].image}
                  alt={stepsData[0].alt}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
            <motion.div
              className="absolute left-1/2 top-[540px] -translate-y-1/2 -translate-x-1/2 z-10"
              style={{ y: desktopMockup2Y, opacity: desktopMockup2Opacity }}
            >
              <div className="relative w-[380px] h-[650px] drop-shadow-[15px_15px_15px_rgba(0,0,0,0.05)]">
                <Image
                  src={stepsData[1].image}
                  alt={stepsData[1].alt}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
            <motion.div
              className="absolute left-1/2 top-[540px] -translate-y-1/2 -translate-x-1/2 z-10"
              style={{ y: desktopMockup3Y, opacity: desktopMockup3Opacity }}
            >
              <div className="relative w-[380px] h-[650px] drop-shadow-[15px_15px_15px_rgba(0,0,0,0.05)]">
                <Image
                  src={stepsData[2].image}
                  alt={stepsData[2].alt}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
            <motion.div
              className="absolute left-1/2 top-[540px] -translate-y-1/2 -translate-x-1/2 z-10"
              style={{ y: desktopMockup4Y, opacity: desktopMockup4Opacity }}
            >
              <div className="relative w-[380px] h-[650px] drop-shadow-[15px_15px_15px_rgba(0,0,0,0.05)]">
                <Image
                  src={stepsData[3].image}
                  alt={stepsData[3].alt}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
            <motion.div
              className="absolute left-[7%] top-[200px] translate-y-1/2 z-20"
              style={{ opacity: desktopContent1Opacity, y: desktopContent1Y }}
            >
              <div className="p-4 max-w-[400px]">
                <p className="font-montserrat font-medium text-[20px] leading-snug tracking-[-0.04em] text-[#080808] whitespace-nowrap">
                  {stepsData[0].text}
                </p>
              </div>
            </motion.div>
            <motion.div
              className="absolute right-[13%] top-[400px] translate-y-1/2 z-20"
              style={{ opacity: desktopContent2Opacity, y: desktopContent2Y }}
            >
              <div className="p-4 max-w-[400px] text-right">
                <p className="font-montserrat font-medium text-[20px] leading-snug tracking-[-0.04em] text-[#080808] whitespace-nowrap">
                  {stepsData[1].text}
                </p>
              </div>
            </motion.div>
            <motion.div
              className="absolute left-[6%] top-[400px] translate-y-1/2 z-20"
              style={{ opacity: desktopContent3Opacity, y: desktopContent3Y }}
            >
              <div className="p-4 max-w-[400px]">
                <p className="font-montserrat font-medium text-[20px] leading-snug whitespace-nowrap tracking-[-0.04em] text-[#080808]">
                  {stepsData[2].text}
                </p>
              </div>
            </motion.div>
            <motion.div
              className="absolute right-[13%] top-[300px] translate-y-1/2 z-20"
              style={{ opacity: desktopContent4Opacity, y: desktopContent4Y }}
            >
              <div className="p-4 max-w-[400px] text-right">
                <p className="font-montserrat font-medium text-[20px] leading-snug tracking-[-0.04em] text-[#080808] mb-8 whitespace-nowrap">
                  {stepsData[3].text}
                </p>
                <WaitlistTriggerButton triggerSource="'become a merchant on bepay clicked" buttonLocation="how_crypto_make_section">
                  <button
                    onClick={handleStartEarningClick}
                    className="h-[56px]  bg-black ml-2 text-white rounded-full flex items-center justify-center gap-2 text-xs font-medium px-4 py-4 hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap md:w-[300px] md:text-[14px]"
                  >
                    <span>Become a merchant on bepay</span>
                    <ArrowUpRight
                      className="w-5 h-7 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                  </button>
                </WaitlistTriggerButton>
              </div>
            </motion.div>

            <motion.div
              className="absolute left-[15%] top-[300px] z-30"
              style={{
                opacity: desktopFloatingOpacity,
                y: desktopFloatingElement1Y,
              }}
            >
              <h3 className="font-montserrat text-[44px] leading-[50px] tracking-[-0.04em]">
                <span className="font-bold text-[#333333]">NO </span>
                <span className="font-medium text-[#C0C0C0]">HASSLE!</span>
              </h3>
            </motion.div>

            <motion.div
              className="absolute left-[15%] top-[340px] z-30"
              style={{
                opacity: desktopFloatingOpacity,
                y: desktopFloatingElement2Y,
              }}
            >
              <h4 className="font-montserrat text-[44px] leading-[50px] tracking-[-0.04em]">
                <span className="font-bold text-[#333333]">NO </span>
                <span className="font-medium text-[#C0C0C0]">VOLATILITY!</span>
              </h4>
            </motion.div>

            <motion.div
              className="absolute left-[15%] top-[380px] z-30"
              style={{
                opacity: desktopFloatingOpacity,
                y: desktopFloatingElement3Y,
              }}
            >
              <h4 className="font-montserrat text-[44px] leading-[50px] tracking-[-0.04em]">
                <span className="font-bold text-[#333333]">NO </span>
                <span className="font-medium text-[#C0C0C0]">DELAYS!</span>
              </h4>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}