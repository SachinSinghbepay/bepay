"use client";
import React from "react";
import { motion } from "framer-motion";

const ScrollTextMobile = () => {
  return (
    <div className="h-auto md:hidden bg-[#f9f9f9] overflow-hidden flex flex-col justify-center items-center px-6 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Sequential text animation */}
        <div className="space-y-4">
          {/* First line - "maximize your" */}
          <motion.h1
            className="text-4xl md:text-5xl font-[400]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <span className="block text-[#999999]">Maximize Your</span>
          </motion.h1>

          {/* Wrap earning potential + subtitle */}
          <div className="space-y-3">
            {/* Second line - "earning potential" */}
            <motion.h1
              className="text-4xl md:text-5xl font-[400]"
              initial={{ opacity: 0, x: 80, y: 60 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <span className="block bg-gradient-to-r from-[#333333] to-[#999999] bg-clip-text text-transparent">
                earning potential
              </span>
            </motion.h1>

            {/* Subtitle (fast slide up + fade) */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-[#666666] font-light leading-relaxed"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.4, ease: "easeOut" }} // Adjusted duration
              viewport={{ once: false, amount: 0.2 }}
            >
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
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollTextMobile;
