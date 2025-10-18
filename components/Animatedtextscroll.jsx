"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, UserPlus } from "lucide-react";
import { AnalyticsService } from "@/services/analyticsService";
import WaitlistTriggerButton from "./waitlist-trigger-button";

// The sentence is an array for easy mapping and staggered animation.
const sentence = [
  { word: "Maximise" },
  { word: "Your" },
  { word: "Earnings" },
  { word: "With" },
  { word: "bepay", isBrand: true },
];

// Animation for the container to orchestrate the stagger effect.
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Animation for each word.
const wordVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Animation for the mockup (animates from bottom to top).
const mockupVariants = {
  hidden: {
    opacity: 0,
    y: 50, // Start 50px below final position
  },
  visible: {
    opacity: 1,
    y: 0, // End at final position
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: sentence.length * 0.2, // Delay until after the text has animated
    },
  },
};

export default function AnimatedTextScroll() {
  const containerRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // Analytics logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("UPI animated-text-scroll-section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );
    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasTrackedView]);

  const handleCTAClick = () => {
    AnalyticsService.sendEvent("UPI Invite now button clicked");
  };

  return (
    // MODIFIED: Height decreased from 150vh to h-screen (100vh)
    <div ref={containerRef} className="relative h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          // ✅ MODIFIED: Changed `once: true` to `once: false` to enable exit animations
          viewport={{ once: false, amount: 0.5 }}
          className="container mx-auto flex flex-col lg:flex-row items-center justify-center lg:gap-x-20 px-8"
        >
          {/* LEFT SIDE: Animated Text */}
          <motion.h1
            variants={containerVariants}
            className="text-left text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[400] tracking-tighter w-full lg:w-1/2"
          >
            {sentence.map((item, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className={`inline-block mr-3 md:mr-4 ${item.isBrand ? "text-gray-800" : "text-gray-400"}`}
              >
                {item.word}
              </motion.span>
            ))}
          </motion.h1>

          {/* RIGHT SIDE: Animated Mockup */}
          <motion.div
            variants={mockupVariants}
            className="w-full max-w-[350px] mt-12 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-start"
          >
            <div
              style={{
                width: "min(350px, 80vw)",
                aspectRatio: "409 / 868",
              }}
            >
              {/* Full phone mockup JSX with the CTA */}
              <div className="relative w-full h-[85%] mt-15 bg-gradient-to-b from-gray-100 to-gray-300 rounded-[20px] p-2 shadow-2xl">
                <div className="relative w-full h-full bg-white rounded-[18px] overflow-hidden flex flex-col">
                  <div className="relative flex-shrink-0 h-[40%] m-2 bg-black flex items-center justify-center p-4 rounded-t-[16px]">
                    <motion.div
                      className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-b to-black from-gray-900 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                    >
                      <span className="text-gray-300 font-bold text-4xl sm:text-5xl md:text-6xl">₿</span>
                    </motion.div>
                  </div>
                  <div className="flex-grow flex flex-col items-center justify-center p-4 text-center bg-white rounded-b-[16px]">
                    <motion.p>Earn</motion.p>
                    <motion.p>
                      Unlimited Bitcoin bonuses by<br />inviting friends and family
                    </motion.p>
                    <motion.div>
                      <ArrowDown className="w-6 h-6" />
                    </motion.div>
                    <WaitlistTriggerButton triggerSource="invite now button UPI page">
                      <motion.button
                        onClick={handleCTAClick}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium bg-black text-white hover:bg-gray-800 h-10 px-6 py-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <UserPlus className="mr-2 w-4 h-4" />
                        Invite now!
                      </motion.button>
                    </WaitlistTriggerButton>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
    </div>
  );
}