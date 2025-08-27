"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FTR = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInScale = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <>
      <div className="w-full flex flex-col items-center py-20 bg-black relative overflow-hidden">
        <motion.h2
          className="w-full font-light mb-0 z-1 text-left leading-none flex flex-col gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white text-[1.5rem] text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            Tired of being charged to use your own money?{" "}
          </motion.span>
          <motion.span
            className="text-[#6a6a6a] text-[0.8rem] text-center"
            v
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            It&apos;s time your wallet started working for you.<br></br>
            With bepay, every swipe, scan, and spend puts money back where it
            belongs — in your hands.
          </motion.span>
        </motion.h2>

        {/* Download Buttons */}
        <motion.div
          className="w-full flex flex-col lg:flex-row gap-3 items-center text-left text-[0.8rem] justify-center my-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.button
            className="bg-black lg:w-[13vw] text-[#b5b2b1] px-7 py-5 rounded-full flex items-center gap-2 border border-white/20 justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src="apple.png" alt="" className="h-5" />
            <div className="text-left">
              <div>Download on the</div>
              <div>App Store</div>
            </div>
          </motion.button>
          <motion.button
            className="bg-black lg:w-[13vw] text-[#b5b2b1] px-7 py-5 rounded-full flex items-center gap-2 border border-white/20 justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false, amount: 0.5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src="playstore.png" alt="" className="h-5" />
            <div className="text-left">
              <div>Get the App on</div>
              <div>Google Play</div>
            </div>
          </motion.button>
          <motion.button
            className="bg-black lg:w-[13vw] text-[#b5b2b1] px-7 py-5 rounded-full flex items-center gap-2 border border-white/20 justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: false, amount: 0.5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src="huawei.png" alt="" className="h-5" />
            <div className="text-left">
              <div>Get it on the App</div>
              <div>Gallery!</div>
            </div>
          </motion.button>
        </motion.div>

        <motion.ul
          className="flex gap-4 mt-4 text-[#6a6a6a] font-medium text-xs"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <motion.li
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            PERSONAL
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            BUSINESS
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            CRYPTO CARD
          </motion.li>
        </motion.ul>

        {/* social media icons */}
        <motion.ul
          className="flex gap-4 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.li
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <Image src="linkdin.png" className="h-8" alt="" />
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <Image src="x.png" className="h-8" alt="" />
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <Image src="facebook.png" className="h-8" alt="" />
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <Image src="teligram.png" className="h-8" alt="" />
          </motion.li>
        </motion.ul>

        <motion.div
          className="relative w-full flex justify-center mt-[3rem] ml-0 mr-0"
          variants={fadeInScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <motion.div
            className="card relative w-full h-full z-50"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <Image
              src="/Bepay hover effect.png"
              alt="Bepay Hover Effect"
              className="w-full h-full relative object-contain rounded-3xl shadow-2xl z-5"
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default FTR;
