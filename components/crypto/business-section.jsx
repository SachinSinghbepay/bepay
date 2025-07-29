"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Smartphone } from "lucide-react";
import Image from "next/image";

export const BusinessSection = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-[#f9f9f9] text-black py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col items-start gap-10"
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl font-[400] leading-tight"
          variants={itemVariants}
        >
          <span className="text-gray-400">Are you a</span> business owner
          <br />
          looking to accept crypto
          <br />
          payments?
        </motion.h2>

        <motion.p
          className="max-w-2xl text-base text-gray-600"
          variants={itemVariants}
        >
          We got you covered! Get your business registered on the bepay app in
          few easy steps and start accepting crypto payments from customers
          around the world hassle-free! Low-fee. Instant settlement.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={itemVariants}
        >
          <button className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
            <Smartphone size={18} />
            <span className="text-sm font-medium">Download bepay app</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
            <span className="text-sm font-medium">Checkout all services</span>
            <ArrowUpRight size={18} />
          </button>
        </motion.div>

        <motion.div
          className="w-full mt-10 rounded-2xl overflow-hidden"
          variants={itemVariants}
        >
          <Image
            src="/images/crypto/bimg.png"
            alt="Business owner accepting crypto payment"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
