"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Phone } from "lucide-react";

const steps = [
  {
    id: 1,
    // Using a placeholder phone mockup image
    image: "/images/business/s1.png",
    rightTitle: "Create your account",
    rightSubtitle: "Complete your simple KYC",
    rightButtons: null,
  },
  {
    id: 2,
    // Using a placeholder phone mockup image
    image: "/images/business/s2.png",
    rightTitle: "Integrate",
    rightSubtitle: "Use plug-ins, APIs, or quick links",
    rightButtons: null,
  },
  {
    id: 3,
    // Using a placeholder phone mockup image
    image: "/images/business/s3.png",
    rightTitle: "Go Live",
    rightSubtitle: "Accept your first crypto payment in minutes",
    rightButtons: (
      <div className="flex flex-col gap-4 mt-8 w-full justify-center mx-auto max-w-[260px]">
        <button className="bg-black cursor-pointer whitespace-nowrap text-white hover:bg-black/90 transition-colors duration-200 px-8 py-4 rounded-full font-medium text-[12px]">
          Become a merchant on bepay ↗
        </button>
        <button className="border-2 items-center flex gap-2 cursor-pointer border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 px-8 py-4 rounded-full font-medium text-[12px] bg-transparent">
          <Phone size={18} /> Know more about us
        </button>
      </div>
    ),
  },
]; 

export default function GetStartedSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prevScrollYProgress = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest > prevScrollYProgress.current) {
        setDirection(1); // Scrolling down
      } else if (latest < prevScrollYProgress.current) {
        setDirection(-1); // Scrolling up
      }
      prevScrollYProgress.current = latest;

      // Determine current step based on scroll progress
      const newStepIndex = Math.floor(latest * steps.length);
      setCurrentStepIndex(Math.min(newStepIndex, steps.length - 1));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const currentStepData = steps[currentStepIndex];

  // Variants for the left image (phone mockup)
  const leftImageVariants = {
    enter: {
      y: "100%",
      opacity: 0,
    },
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

  // Variants for content - smooth bottom to position animation
  const contentVariants = {
    enter: {
      y: 50,
      opacity: 0,
    },
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

  // Variants for background number - keep scale animation
  const numberVariants = {
    enter: {
      opacity: 0,
      scale: 0.95,
    },
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
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 md:px-8 lg:px-12">
        {/* Main Title */}
        <div className="text-center ">
          <h2 className="text-5xl md:text-7xl lg:text-[90px] font-light leading-none tracking-tight">
            <span className="text-gray-400">Get started in </span>
            <span className="text-gray-900 font-normal">3 simple steps</span>
          </h2>
        </div>

        {/* Content for current step */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center w-full max-w-7xl">
          {/* Left Column: Mobile Phone Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative max-w-[420px] w-full h-[300px] lg:h-[640px]">
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
                      className="w-full lg:w-[370px]  h-full object-cover"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Large Number and Content */}
          <div className="relative flex flex-col items-center lg:items-start justify-center lg:min-h-[500px]">
            {/* Large Background Number - Fixed positioning */}
            <div className="absolute top-1/2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 overflow-hidden">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`number-${currentStepData.id}`}
                  variants={numberVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-[300px] md:text-[500px] lg:text-[600px] xl:text-[700px] font-bold leading-none z-0 select-none pointer-events-none"
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

            {/* Content - Fixed container height */}
            <div className="relative z-10 text-center lg:text-center w-full max-w-lg min-h-[200px] flex flex-col justify-center">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`content-${currentStepData.id}`}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <h3 className="text-[30px] md:text-[60px] whitespace-nowrap font-[400] text-[#6A6A6A] mb-6 leading-tight">
                    {currentStepData.rightTitle}
                  </h3>
                  <p className="text-[16px] md:text-[20px] text-[#6A6A6A] font-medium leading-relaxed mb-8">
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
