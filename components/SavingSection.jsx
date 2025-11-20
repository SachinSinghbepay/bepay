"use client"; // This component uses client-side hooks for animation

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { QRCodePopup } from "@/components/popups/qr-code-popup"; // Import popups
import { OSSelectionPopup } from "@/components/popups/os-selection-popup"; // Import popups
import { Button } from "@/components/ui/button"; // Import Button for the new CTA
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service
import WaitlistTriggerButton from "./waitlist-trigger-button";

const STEPS = [
  { number: "1", imageSrc: "/ss1.png" },
  { number: "2", imageSrc: "/ss2.png" },
  { number: "3", "imageSrc": "/ss3.png" },
  { number: "4", imageSrc: "/ss4.png" },
  { number: "Total", imageSrc: "/ss5.png" },
];

const SavingSection = () => {
  const containerRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view (less than 1024px, the 'lg' breakpoint)
  useEffect(() => {
    const handleResize = () => {
      // We'll use the screen width to determine the view mode
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set minimum height based on view mode
  // Mobile: STEPS.length * 100vh to ensure enough scroll for horizontal transition
  // Desktop: 100vh (the scroll is handled inside the container ref, but the full 900vh is needed inside the return block)
  const mobileMinHeight = `${STEPS.length * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Mobile Horizontal Scroll Logic (Active only when isMobile is true) ---
  // Transforms vertical scroll progress (0 to 1) into a horizontal translation value (0vw to -400vw)
  const mobileX = useTransform(
    scrollYProgress,
    // [Hold S1, Trans S2, Hold S2, Trans S3, Hold S3, Trans S4, Hold S4, Trans S5, Hold S5, Hold S5]
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [
      "0vw",
      "0vw",
      "-100vw",
      "-100vw",
      "-200vw",
      "-200vw",
      "-300vw",
      "-300vw",
      "-400vw",
      "-400vw",
      "-400vw",
    ]
  );

  // --- Desktop Scroll Logic (Active only when isMobile is false) ---
  const inputRange = STEPS.map((_, i) => i / (STEPS.length - 1));
  const outputRange = STEPS.map((_, i) => i);
  // Maps scroll progress to the current step index (0 to 4)
  const stepIndexMotionValue = useTransform(
    scrollYProgress,
    inputRange,
    outputRange
  );

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: initial, 1: down, -1: up

  // Updates the step index for desktop animation variants
  useMotionValueEvent(stepIndexMotionValue, "change", (latest) => {
    if (!isMobile) {
      const newIndex = Math.round(latest);
      if (newIndex !== currentStepIndex) {
        setDirection(newIndex > currentStepIndex ? 1 : -1);
        setCurrentStepIndex(newIndex);
      }
    } else {
      // Optional: Update index for mobile tracking if needed, though mobileX handles the visual scroll
      setCurrentStepIndex(Math.round(latest));
    }
  });

  const currentStep = STEPS[currentStepIndex];

  // --- Popup Visibility State (Unchanged) ---
  const [showOSPopup, setShowOSPopup] = useState(false);
  const [showQrPopup, setShowQrPopup] = useState(false);

  const handleCloseOSPopup = () => {
    setShowOSPopup(false);
  };

  const handleOSSelected = () => {
    setShowOSPopup(false); // Close OS popup
    setShowQrPopup(true); // Open QR popup
  };

  const handleCloseQrPopup = () => {
    setShowQrPopup(false);
  };

  // --- Animation Variants (Used for Desktop Only) ---
  const numberVariants = {
    enter: (direction) => ({
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      zIndex: 1,
    }),
    center: {
      y: "0%",
      opacity: 1,
      zIndex: 1,
      transition: { duration: 0.4, ease: "easeOut", delay: 0 },
    },
    exit: (direction) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      zIndex: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  const imageVariants = {
    enter: (direction) => ({
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      zIndex: 1,
    }),
    center: {
      y: "0%",
      opacity: 1,
      zIndex: 1,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.15 },
    },
    exit: (direction) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      zIndex: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  const textLineVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const leftContentContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const ctaButtonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: "easeIn" } },
  };

  // --- Analytics Tracking (Unchanged) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("UPI saving-section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  const handleStartClick = () => {
    AnalyticsService.sendEvent("start_your_saving_journey_button_clicked");
  };

  return (
    <div
      ref={containerRef}
      // Apply conditional minHeight
      style={{ minHeight: isMobile ? mobileMinHeight : "900vh" }}
      className="relative"
    >
      {isMobile ? (
        // --- MOBILE VIEW: STATIC HEADER + HORIZONTAL SCROLL ---
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="h-full flex flex-col">
            {/* 1. Static Header Content */}
            <motion.div
              className="w-full pt-8 pb-4 px-4 sm:px-6 bg-[#F9F9F9]" 
              initial="hidden"
              animate="visible"
              variants={leftContentContainerVariants}
            >
              {/* Mobile-optimized left-aligned heading */}
              <div className="text-left">
                <motion.h1
                  className="text-[48px] xs:text-[52px] sm:text-[56px] md:text-[60px] font-[400] text-[#C0C0C0] tracking-tighter leading-[1.1] -mt-2"
                  variants={textLineVariants}
                >
                  Real <span className="text-[#333333] font-normal">use.</span>
                </motion.h1>
                <motion.h2
                  className="text-[48px] xs:text-[52px] sm:text-[56px] md:text-[60px] font-[400] text-[#C0C0C0] tracking-tighter leading-[1.1]"
                  variants={textLineVariants}
                >
                  Real{" "}
                  <span className="text-[#333333] font-normal">savings.</span>
                </motion.h2>
                <motion.div
                  className="pt-4 sm:pt-6 space-y-0"
                  variants={leftContentContainerVariants}
                >
                  <motion.p
                    className="text-[16px] xs:text-[17px] sm:text-[18px] md:text-[20px] text-[#6A6A6A] font-regular font-[400] leading-snug"
                    variants={textLineVariants}
                  >
                    Your Life Already Costs Money.
                  </motion.p>
                  <motion.p
                    className="text-[16px] xs:text-[17px] sm:text-[18px] md:text-[20px] text-[#6A6A6A] font-regular font-[400] leading-snug"
                    variants={textLineVariants}
                  >
                    We Just{" "}
                    <span className="font-semibold text-[#333333]">
                      Pay You Back.
                    </span>
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>

            {/* 2. Horizontal Scroller (takes remaining height) */}
            <div className="flex-grow relative overflow-hidden bg-[#F9F9F9]">
              <motion.div style={{ x: mobileX }} className="flex h-full">
                {STEPS.map((step, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-start pt-2 px-2 pb-0"
                  >
                    <div 
                      className={`text-center flex items-start justify-center ${
                        step.number === "Total" 
                          ? "h-[180px]" 
                          : "h-[200px]"
                      }`}
                    >
                      <span
                        className={`bg-gradient-to-t from-[#ECECEC05] to-[#ECECEC] bg-clip-text text-transparent leading-none select-none font-montserrat ${
                          step.number === "Total"
                            ? "text-[120px] sm:text-[140px] md:text-[165px] font-semibold mt-[-20px] sm:mt-[-25px] md:mt-[-30px]"
                            : "text-[200px] sm:text-[225px] md:text-[250px] font-bold mt-[-40px]"
                        }`}
                      >
                        {step.number}
                      </span>
                    </div>
                    <div className={`relative w-11/12 flex-grow flex flex-col mb-0 ${
                      step.number === "Total" ? "-mt-12" : "-mt-16"
                    }`}>
                      <Image
                        src={step.imageSrc}
                        alt={`Step ${step.number}`}
                        width={400}
                        height={900}
                        className="w-full h-full object-cover object-bottom"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        // --- DESKTOP VIEW (Preserved as requested) ---
        <div className="sticky top-0 grid grid-cols-1 lg:grid-cols-5 items-center w-full h-screen">
          {/* Left Content */}
          <motion.div
            className="bg-[#F4F4F4] flex justify-center items-center lg:col-span-3 h-full p-6 sm:p-8 md:p-12 lg:p-16 order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            variants={leftContentContainerVariants}
          >
            <div className="space-y-3 sm:space-y-4">
              <motion.h1
                className="text-[100px] font-[400] text-[#C0C0C0] tracking-[-0.08em] leading-[10px]"
                variants={textLineVariants}
              >
                Real <span className="text-[#333333] font-normal">use.</span>
              </motion.h1>
              <motion.h2
                className="text-[100px] font-[400] text-[#C0C0C0] tracking-[-0.08em]"
                variants={textLineVariants}
              >
                Real{" "}
                <span className="text-[#333333] font-normal">savings.</span>
              </motion.h2>
              <motion.div
                className="pt-4 sm:pt-6 space-y-1 sm:space-y-2"
                variants={leftContentContainerVariants}
              >
                <motion.p
                  className="text-[32px] tracking-[-0.02em] text-[#6A6A6A] font-regular font-[400] leading-[10px]"
                  variants={textLineVariants}
                >
                  Your Life Already Costs Money.
                </motion.p>
                <motion.p
                  className="text-[32px] tracking-[-0.02em] text-[#6A6A6A] font-regular font-[400]"
                  variants={textLineVariants}
                >
                  We Just{" "}
                  <span className="font-semibold text-[#333333]">
                    Pay You Back.
                  </span>
                </motion.p>
              </motion.div>
              {/* "Start your savings journey" Button */}
              <AnimatePresence>
                {currentStepIndex === STEPS.length - 1 && (
                  <motion.div
                    className="pt-8"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={ctaButtonVariants}
                  >
                   <WaitlistTriggerButton
  triggerSource="Start Your Saving Journey button"
  buttonLocation="saving_section"
>
  <Button
    onClick={handleStartClick}
    className="relative z-20 bg-black cursor-pointer whitespace-nowrap text-white 
               w-[250px] h-[56px] rounded-full flex items-center justify-center gap-2 
               text-[14px] font-medium px-6 py-4 
               hover:bg-gray-800 transition-colors"
  >
    <Image
      src="/wal.png"
      alt="Savings icon"
      width={24}
      height={24}
      className="w-6 h-6"
    />
    Start your savings journey
  </Button>
</WaitlistTriggerButton>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          {/* Right Content - Dynamic with Animations */}
          <div
            className={cn(
              "relative h-full lg:col-span-2 order-1 lg:order-2 overflow-hidden",
              currentStepIndex === 1 || currentStepIndex === 3
                ? "bg-[#F4F4F4]"
                : "bg-white"
            )}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              {/* Dynamic Number */}
              <motion.div
                key={currentStep.number + "-number"}
                className={cn(
                  "absolute inset-0 flex items-center justify-start pointer-events-none",
                  currentStep.number === "Total" ? "pl-3" : "pl-25" // Adjust pl-25 to your desired default/other steps' padding
                )}
                // ADJUSTMENT 4: Increased padding to push the number up, which visually pushes the image down relative to the viewport center.
                // pb-[60vh] sm:pb-[50vh] -> pb-[65vh] sm:pb-[55vh]
                style={{ paddingBottom: isMobile ? undefined : "70vh" }} // Use style prop for more control or pb-[65vh] if using Tailwind
                variants={numberVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction}
              >
                <span
                  className="font-[400] pl-2 bg-gradient-to-b from-gray-300 to-gray-100 text-transparent bg-clip-text select-none leading-none"
                  style={{
                    fontSize: "clamp(120px, 25vw, 200px)",
                  }}
                >
                  {currentStep.number}
                </span>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="popLayout" custom={direction}>
              {/* Dynamic Phone Mockup */}
              <motion.div
                key={currentStep.imageSrc + "-image"}
                // ADJUSTMENT 5: Added translate-y-20 (80px down) to push the image down
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-40 w-[70%]  h-[90%] z-10"
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={currentStep.imageSrc || "/placeholder.svg"}
                    alt={`Phone mockup showing step ${currentStep.number}`}
                    width={600}
                    height={600}
                    className="w-full h-auto object-top object-contain"
                    priority={currentStepIndex === 0}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
      {/* Popups rendered on top of the sticky section */}
      <OSSelectionPopup
        isVisible={showOSPopup}
        onClose={handleCloseOSPopup}
        onOSSelected={handleOSSelected}
      />
      <QRCodePopup isVisible={showQrPopup} onClose={handleCloseQrPopup} />
    </div>
  );
};

export default SavingSection;