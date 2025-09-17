"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnalyticsService } from "@/services/analyticsService";

const ScrollTextMobile = () => {
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // ANALYTICS: Track when user sees this mobile section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("Scroll text mobile viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  return (
    <div
      ref={sectionRef}
      className="mt-16 h-auto md:hidden bg-[#f9f9f9] flex overflow-hidden flex-col justify-center items-center px-6 py-24"
    >
      <div className="max-w-md w-full text-center space-y-4">
        {/* Sequential text animation */}
        <div>
          {/* First line - "maximize your" */}
          <motion.h1
            className="text-4xl md:text-5xl font-normal  leading-tight" 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <span className="block text-[#999999]">Maximize Your</span>
          </motion.h1>

          {/* Second line - "earning potential" */}
          <motion.h1
            className="text-4xl md:text-5xl font-[400] leading-tight" // Added leading-tight
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <span className="block bg-gradient-to-r from-[#333333] to-[#999999] bg-clip-text text-transparent">
              earning potential
            </span>
          </motion.h1>
        </div>

        {/* Subtitle with delayed animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <p className="text-[17px] sm:text-[19px] md:text-[23px] text-[#999999] font-normal leading-normal">
            Multiple ways to grow your wealth with{" "}
            <motion.span
              className="font-medium text-[#333333]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              industry-leading returns
            </motion.span>{" "}
            and{" "}
            <motion.span
              className="font-medium text-[#333333]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              innovative earning opportunities
            </motion.span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollTextMobile;
