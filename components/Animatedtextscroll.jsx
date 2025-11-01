"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, UserPlus } from "lucide-react";
import { AnalyticsService } from "@/services/analyticsService";

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
          AnalyticsService.sendEvent("UPI - Maximize your earning (BePay) section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 } 
    );
    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasTrackedView]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gray-50 flex items-center justify-center py-16 lg:py-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} 
          className="container mx-auto flex flex-col lg:flex-row items-center justify-center lg:gap-x-20 px-8"
        >
          {/* LEFT SIDE: Animated Text */}
          <motion.h1
            variants={containerVariants}
            className="text-center lg:text-left text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-[400] tracking-[-0.08em] w-full lg:w-1/2 mb-10 lg:mb-0" 
          >
            {sentence.map((item, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className={`inline-block mr-2 md:mr-4 ${item.isBrand ? "text-[#333333]" : "text-[#C0C0C0]"}`} 
              >
                {item.word}
              </motion.span>
            ))}
          </motion.h1>

          {/* RIGHT SIDE: Animated Mockup with Image */}
          <motion.div
            variants={mockupVariants}
            className="relative w-full max-w-[450px] mt-0 flex justify-center lg:justify-start lg:-translate-y-16" 
          >
            <div
              style={{
                width: "min(450px, 90vw)",
                aspectRatio: "409 / 868",
              }}
              className="relative"
            >
              <Image
                src="/phone_a.png"
                alt="Phone Mockup"
                fill={true}
                className="object-contain"
                loading="lazy"
              />

            </div>
            
          </motion.div>

            {/* Scroll indicator for large screens */}
            <div className="absolute bottom-10 hidden lg:block">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown className="w-8 h-8 text-[#333333]" />
            </motion.div>
          </div>
        </motion.div>
    </div>
  );
}