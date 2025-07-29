"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  { id: 1, src: "/images/business/l1.png", alt: "Barry's" },
  { id: 2, src: "/images/business/l2.png", alt: "Lyca Mobile" },
  { id: 3, src: "/images/business/l3.png", alt: "USDCoin" },
  { id: 4, src: "/images/business/l4.png", alt: "Deel" },
  { id: 5, src: "/images/business/l5.png", alt: "Aer Lingus" },
];

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.3,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1,
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function TrustedBySection() {
  return (
    <section className="bg-[#333333] drop-shadow-2xl py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title with decorative lines */}
        <div className="flex items-center justify-center mb-12 lg:mb-16">
          {/* Left line */}
          <motion.div
            className="flex-1 h-px max-w-xs lg:max-w-md mr-6 lg:mr-8 origin-right"
            style={{
              background:
                "linear-gradient(90deg, #5F5F5F 0%, rgba(95, 95, 95, 0.15) 100%)",
            }}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          />

          {/* Title */}
          <motion.h2
            className="text-[#F9F9F9] uppercase text-lg lg:text-xl font-medium tracking-wide lg:whitespace-nowrap text-center"
            style={{ fontSize: "20px" }}
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            Aggregated & supported by industry-leading brands
          </motion.h2>

          {/* Right line */}
          <motion.div
            className="flex-1 h-px max-w-xs lg:max-w-md ml-6 lg:ml-8 origin-left"
            style={{
              background:
                "linear-gradient(90deg, rgba(95, 95, 95, 0.15) 0%, #5F5F5F 100%)",
            }}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          />
        </div>

        {/* Logos */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 xl:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {logos.map((logo) => (
            <motion.div
              key={logo.id}
              variants={logoVariants}
              className="flex items-center justify-center"
            >
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                width={120}
                height={60}
                className="h-8 lg:h-10 xl:h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
