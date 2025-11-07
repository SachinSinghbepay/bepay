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
            {/* FIX: Added width={20} and height={20} to match the 'h-5' Tailwind class (1.25rem = 20px).
              Also added a descriptive alt tag.
            */}
            <Image
              src="https://placehold.co/20x20/ffffff/000000?text=A&font=sans"
              alt="Apple App Store"
              width={20}
              height={20}
              className="h-5 w-auto"
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/20x20/ffffff/000000?text=A&font=sans')}
            />
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
            {/* FIX: Added width={20} and height={20} to match 'h-5'.
            */}
            <Image
              src="https://placehold.co/20x20/ffffff/000000?text=P&font=sans"
              alt="Google Play Store"
              width={20}
              height={20}
              className="h-5 w-auto"
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/20x20/ffffff/000000?text=P&font=sans')}
            />
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
            {/* FIX: Added width={20} and height={20} to match 'h-5'.
            */}
            <Image
              src="https://placehold.co/20x20/ffffff/000000?text=H&font=sans"
              alt="Huawei App Gallery"
              width={20}
              height={20}
              className="h-5 w-auto"
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/20x20/ffffff/000000?text=H&font=sans')}
            />
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
            {/* FIX: Added width={32} and height={32} to match 'h-8' (2rem = 32px).
            */}
            <Image
              src="https://placehold.co/32x32/ffffff/000000?text=Li&font=sans"
              alt="LinkedIn"
              width={32}
              height={32}
              className="h-8 w-auto"
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/32x32/ffffff/000000?text=Li&font=sans')}
            />
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            {/* FIX: Added width={32} and height={32} to match 'h-8'.
            */}
            <Image
              src="https://placehold.co/32x32/ffffff/000000?text=X&font=sans"
              alt="X (formerly Twitter)"
              width={32}
              height={32}
              className="h-8 w-auto"
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/32x32/ffffff/000000?text=X&font=sans')}
            />
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            {/* FIX: Added width={32} and height={32} to match 'h-8'.
            */}
            <Image
              src="https://placehold.co/32x32/ffffff/000000?text=F&font=sans"
              alt="Facebook"
              width={32}
              height={32}
              className="h-8 w-auto"
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/32x32/ffffff/000000?text=F&font=sans')}
            />
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            {/* FIX: Added width={32} and height={32} to match 'h-8'.
            */}
            <Image
              src="https://placehold.co/32x32/ffffff/000000?text=T&font=sans"
              alt="Telegram"
              width={32}
              height={32}
              className="h-8 w-auto"
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/32x32/ffffff/000000?text=T&font=sans')}
            />
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
            {/* FIX: For responsive images meant to fill a container, use the 'fill' prop.
              This tells Next.js to fill the parent element ('motion.div' with 'card').
              Removed 'w-full' and 'h-full' from this className as 'fill' handles it.
              The 'object-contain' class will still work as expected.
              I've also used a placeholder for this large image.
            */}
            <Image
              src="https://placehold.co/1200x600/333333/ffffff?text=Bepay+Card"
              alt="Bepay Hover Effect"
              fill
              className="relative object-contain rounded-3xl shadow-2xl z-5"
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/1200x600/333333/ffffff?text=Bepay+Card')}
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default FTR;
