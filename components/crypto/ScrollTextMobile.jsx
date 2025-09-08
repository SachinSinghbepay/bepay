"use client";
import React from "react";
import { motion } from "framer-motion";

const ScrollTextMobile = () => {
  return (

    <div className="h-auto md:hidden bg-[#f9f9f9] flex overflow-hidden flex-col justify-center items-center px-6 py-12">

      <div className="max-w-md w-full text-center space-y-8">
        {/* Sequential text animation */}
        <div className="space-y-2"> {/* Reduced vertical spacing */}
          {/* First line - "maximize your" */}
          <motion.h1
            className="text-4xl md:text-5xl font-[400] leading-[0.5em]" // Added leading-tight
            initial={{ opacity: 0, y: 50 }}

            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <span className="block text-[#999999]">

              Maximize Your
            </span>
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
          {/* Using arbitrary values for precise 1px size reduction */}
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