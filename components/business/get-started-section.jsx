"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
// MODIFIED: Imported ArrowUpRight
import { Phone, ArrowUpRight } from "lucide-react";
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
    rightSubtitle: "Complete your simple KYC",
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
        <div className="flex flex-col gap-4 mt-8 w-full justify-center mx-auto max-w-[260px] lg:justify-start lg:mx-0 lg:max-w-none">
          <button
            onClick={handleStartEarningClick}
            // MODIFIED: Removed whitespace-nowrap to prevent the icon from being pushed out
            className="bg-black cursor-pointer text-white hover:bg-black/90 transition-colors duration-200 w-[300px] h-[56px] px-6 py-4 rounded-full font-medium text-[14px] flex items-center justify-center gap-2"
          >
            <span>Become a merchant on bepay</span>
            {/* MODIFIED: Added flex-shrink-0 to ensure the icon is always visible */}
            <ArrowUpRight className="w-7 h-7 flex-shrink-0" />
          </button>
        </div>
      </WaitlistTriggerButton>
    ),
  },
];

export default function GetStartedSection() {
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prevScrollYProgress = useRef(0);

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

  const leftImageVariants = {
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
        className="sticky top-0 h-screen flex flex-col items-center justify-center gap-8 md:gap-16 px-6 md:px-8 lg:px-12 py-12"
      >
        {/* Main Title */}
        <div className="text-center ">
          <h2 className="text-5xl md:text-7xl lg:text-[90px] font-light leading-none tracking-tighter">
            <span className="text-gray-400">Get started in </span>
            <span className="text-gray-900 font-normal">3 simple steps</span>
          </h2>
        </div>

        {/* Content for current step */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center w-full max-w-7xl">
          {/* Left Column: Mobile Phone Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              className="relative max-w-[420px] w-full h-[75vh] max-h-[800px]"
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentStepData.id}
                  variants={leftImageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative">
                    <Image
                      src={currentStepData.image}
                      alt={`Step ${currentStepData.id} mockup`}
                      height={700}
                      width={430}
                      className="w-full lg:w-[370px]  h-full object-contain"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Large Number and Content */}
          <div className="relative flex flex-col items-center lg:items-start justify-center lg:min-h-[500px]">
            <div className="relative w-full max-w-lg min-h-[200px] flex flex-col justify-center text-center lg:text-left">
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={`number-${currentStepData.id}`}
                    variants={numberVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="text-[300px] md:text-[500px] lg:text-[600px] xl:text-[700px] font-bold leading-none select-none pointer-events-none"
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
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full relative z-10"
                >
                  <h3 
                    className="text-[60px] whitespace-nowrap font-[400] text-[#6A6A6A] mb-2 leading-tight"
                  >
                    {currentStepData.rightTitle}
                  </h3>
                  <p 
                    className="text-[20px] text-[#6A6A6A] font-medium leading-relaxed mb-8"
                  >
                    {currentStepData.rightSubtitle}
                  </p>
                  {currentStepData.rightButtons}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}