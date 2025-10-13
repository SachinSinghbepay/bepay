"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import WaitlistTriggerButton from "../waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService";

const handleStartEarningClick = () => {
  AnalyticsService.sendEvent("'Become a merchant on bepay' button clicked");
};
const steps = [
  {
    id: 1,
    image: "/images/business/s1.svg",
    rightTitle: "Create your account",
    rightSubtitle: "Complete your KYC & business verification",
    rightButtons: null,
  },
  {
    id: 2,
    image: "/images/business/s2.svg",
    rightTitle: "Integrate",
    rightSubtitle: "Use plug-ins, APIs, or quick links",
    rightButtons: null,
  },
  {
    id: 3,
    image: "/images/business/s3.svg",
    rightTitle: "Go Live",
    rightSubtitle: "Accept your first crypto payment in minutes",
    rightButtons: (
      <WaitlistTriggerButton triggerSource="'get started business section' button">
        <motion.button
          onClick={handleStartEarningClick}
          className="flex items-center justify-center gap-2 bg-black text-white px-6 py-4 h-[56px] rounded-full mt-8 hover:bg-gray-800 transition-colors text-xs font-medium md:w-[300px] md:text-[14px]"
        >
          <span>Become a merchant on bepay</span>
          <ArrowUpRight
            className="w-5 h-7 flex-shrink-0"
            strokeWidth={1.5}
          />
        </motion.button>
      </WaitlistTriggerButton>
    ),
  },
];

export default function GetStartedSection() {
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prevScrollYProgress = useRef(0);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("get started business section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest > prevScrollYProgress.current) {
        setDirection(1);
      } else if (latest < prevScrollYProgress.current) {
        setDirection(-1);
      }
      prevScrollYProgress.current = latest;

      const newStepIndex = Math.floor(latest * steps.length);
      setCurrentStepIndex(Math.min(newStepIndex, steps.length - 1));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const currentStepData = steps[currentStepIndex];

  const desktopImageVariants = {
    enter: { y: "100%", opacity: 0 },
    center: {
      y: "0%",
      x: "0%",
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const mobileImageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: "0%",
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const mobileButtonVariants = {
    enter: { x: 150, opacity: 0 },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };


  const contentVariants = {
    enter: { y: 50, opacity: 0 },
    center: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const numberVariants = {
    enter: { opacity: 0, scale: 0.95 },
    center: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[300vh] pt-10 bg-[#F9F9F9]"
    >
      <div
        className={`sticky top-0 h-screen flex flex-col items-center gap-4 px-4 sm:px-6 lg:px-12 overflow-hidden ${
          isMobile ? "justify-between pt-8" : "justify-center py-12"
        }`}
      >
        <div className="text-center">
          <h2 className="font-['Montserrat'] text-[24px] font-medium text-[#C0C0C0] leading-[26px] tracking-[-0.04em] lg:text-[90px] lg:font-normal lg:leading-[140px] lg:tracking-[-0.06em]">
            <span>Get started in</span>
            <br className="lg:hidden" />
            <span className="text-gray-900"> 3 simple steps</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center w-full max-w-7xl mt-4">
          {/* ✅ MODIFIED: Pushed mockup further left on desktop by increasing negative margin */}
          <div className="relative flex justify-center lg:justify-end lg:mr-20 order-2 lg:order-1">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] h-[58vh] sm:h-[70vh] lg:h-[80vh] max-h-[800px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentStepData.id}
                  variants={
                    isMobile ? mobileImageVariants : desktopImageVariants
                  }
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className={`absolute inset-0 flex justify-center ${
                    isMobile ? "items-end" : "items-center"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={currentStepData.image}
                      alt={`Step ${currentStepData.id} mockup`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ✅ MODIFIED: Changed lg:items-start to lg:items-center to center the content block */}
          <div className="relative flex flex-col items-center lg:items-center justify-center order-1 lg:order-2">
            {/* ✅ MODIFIED: Changed lg:text-left to lg:text-center */}
            <div className="relative w-full max-w-lg min-h-[150px] sm:min-h-[200px] text-center lg:text-center">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={`number-${currentStepData.id}`}
                    variants={numberVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="text-[250px] sm:text-[350px] md:text-[400px] lg:text-[500px] xl:text-[600px] font-bold leading-none select-none pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, #f0f0f0 0%, rgba(240, 240, 240, 0.1) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {currentStepData.id}
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`content-${currentStepData.id}`}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  /* ✅ MODIFIED: Changed lg:items-start to lg:items-center to center the title/subtitle flex items */
                  className="w-full z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[40%] lg:-translate-y-[30%] flex flex-col items-center lg:items-center justify-center gap-2"
                >
                  <motion.div variants={contentVariants}>
                    <h3 className={`text-2xl font-medium leading-none tracking-[-0.04em] text-[#333333] sm:text-4xl md:text-5xl lg:text-[44px] lg:text-[#6A6A6A] lg:leading-none mb-6 lg:mb-7 ${currentStepData.id === 1 ? 'lg:whitespace-nowrap' : ''}`}>
                      {currentStepData.rightTitle}
                    </h3>
                    <p className="text-[15px] leading-none tracking-[-0.04em] text-[#6A6A6A] sm:text-lg md:text-[20px] lg:font-medium lg:leading-none">
                      {currentStepData.rightSubtitle}
                    </p>
                  </motion.div>

                  {currentStepData.rightButtons && (
                    <motion.div
                       className={`w-full flex justify-center lg:block -mt-4 lg:mt-4 ${
    currentStepData.id === 3 ? "lg:-translate-y-5  lg:translate-x-25" : ""
  }`}
                      variants={mobileButtonVariants}
                    >
                      {currentStepData.rightButtons}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}