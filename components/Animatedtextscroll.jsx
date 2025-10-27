"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image"; // ✅ Import Next.js Image
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
          AnalyticsService.sendEvent("UPI - Maximize your earning (BePay) section viewed");
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

  return (
    <div ref={containerRef} className="relative h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          className="container mx-auto flex flex-col lg:flex-row items-center justify-center lg:gap-x-20 px-8"
        >
          {/* LEFT SIDE: Animated Text */}
          <motion.h1
            variants={containerVariants}
            className="text-left text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[400] tracking-[-0.08em] w-full lg:w-1/2"
          >
            {sentence.map((item, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className={`inline-block mr-3 md:mr-4 ${item.isBrand ? "text-[#333333]" : "text-[#C0C0C0]"}`}
              >
                {item.word}
              </motion.span>
            ))}
          </motion.h1>

          {/* RIGHT SIDE: Animated Mockup with Image and CTA */}
          <motion.div
            variants={mockupVariants}
            className="relative w-full max-w-[450px] mt-50  flex justify-center lg:justify-start -translate-y-16" // ✅ MODIFIED: max-w increased, -translate-y-16 added
          >
            <div
              style={{
                width: "min(450px, 90vw)", // ✅ MODIFIED: Increased width
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

              {/* CTA positioned absolutely on top of the image */}
              
            </div>
          </motion.div>
        </motion.div>
    </div>
  );
}