"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  // Animation variants for floating icons
  const floatingAnimation = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const floatingAnimationReverse = {
    animate: {
      y: [10, -10, 10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  // Animation variants for content
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <section className="w-full bg-[#f9f9f9] py-16 lg:py-10 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Subtitle */}
        <motion.p
          className="text-sm md:text-base lg:text-lg text-gray-500 uppercase tracking-wider mb-8 lg:mb-12"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          WHO WE ARE
        </motion.p>

        {/* Main Content */}
        <div className="space-y-6 lg:space-y-8">
          {/* First Paragraph */}
          <motion.p
            className="text-base md:text-lg lg:text-[32px] lg:leading-relaxed font-[500]"
            style={{ color: "#080808" }}
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="font-semibold">
              bepay is the next-generation payment infrastructure, enabling
              users, merchants, and institutions to transact seamlessly across
              fiat and crypto.
            </span>{" "}
            We're the bridge between the financial world, you know, and the
            decentralized future you're stepping into.
          </motion.p>

          {/* Second Paragraph */}
          <motion.p
            className="text-base md:text-lg lg:text-[32px] lg:leading-relaxed font-[500]"
            style={{ color: "#080808" }}
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            At <span className="font-semibold">bepay</span>, we believe money
            should move as freely as ideas without borders, without barriers,
            and without compromising your control.{" "}
            <span className="font-semibold">
              {" "}
              We're building the financial infrastructure that makes money work
              for you, whether you're earning yield on your morning coffee
              purchase or sending Bitcoin to family across the globe.
            </span>
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
