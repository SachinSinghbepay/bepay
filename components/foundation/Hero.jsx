"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function BepayHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Animate once when 50% in view

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="w-full bg-[#f9f9f9]">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:py-16">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-center md:text-left lg:gap-8"
        >
          <motion.div variants={itemVariants}>
            <Image
              src="/bepayicon.png"
              width={80}
              height={80}
              alt="Bepay Foundation Logo"
              className="h-16 w-16 md:h-24 md:w-24"
            />
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-[#080808] sm:text-3xl md:text-[48px]">
              bepay foundation
            </h1>
            <p className="text-lg italic text-[#080808] md:text-[24px]">
              Where impact meets community
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="w-full">
        <Image
          src="/images/foundation/hero.png"
          width={1920} // Provide a large width for better quality, actual display will be w-full
          height={1080} // Provide a height that maintains aspect ratio with the width
          alt="Students sitting in a circle on a sports field"
          className="w-full h-auto object-cover"
          priority // Load this image with high priority as it's the main hero image
        />
      </div>
    </section>
  );
}
