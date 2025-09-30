"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { AnalyticsService } from "@/services/analyticsService";

const logos = [
  { id: 1, src: "/images/business/l1.svg", alt: "MasterCard" },
  { id: 2, src: "/images/business/l2.svg", alt: "Binance" },
  { id: 3, src: "/images/business/l3.svg", alt: "USDCoin" },
  { id: 4, src: "/images/business/l4.svg", alt: "Fiat 24" },
  { id: 5, src: "/images/business/l5.svg", alt: "Travala" },
  { id: 6, src: "/images/business/l6.svg", alt: "Digital ocean" },
  { id: 7, src: "/images/business/l7.svg", alt: "Google" },
  { id: 8, src: "/images/business/l8.svg", alt: "Solana" },
  { id: 9, src: "/images/business/l9.svg", alt: "Solana" },
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
      staggerChildren: 0.1,
      delayChildren: 0.5,
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
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("TrustedBy section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [hasTrackedView]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#333333] drop-shadow-2xl pt-12 pb-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-9 lg:mb-16">
          <motion.div
            className="hidden lg:block flex-1 h-px max-w-md mr-8 origin-right"
            style={{
              background:
                "linear-gradient(90deg, #5F5F5F 0%, rgba(95, 95, 95, 0.15) 100%)",
            }}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
          <motion.h2
            className="text-[#F9F9F9] uppercase text-base lg:text-xl font-medium tracking-wide text-center"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Aggregated & supported by industry-leading brands
          </motion.h2>
          <motion.div
            className="hidden lg:block flex-1 h-px max-w-md ml-8 origin-left"
            style={{
              background:
                "linear-gradient(90deg, rgba(95, 95, 95, 0.15) 0%, #5F5F5F 100%)",
            }}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </div>

        {/* --- Mobile Layout with Larger Images --- */}
        <motion.div
          className="flex flex-wrap justify-center items-center md:hidden -mr-2 ml-7 -mb-15 gap-y-0 "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {logos.map((logo) => (
            <motion.div
              key={logo.id}
              variants={logoVariants}
              className="w-1/2 flex justify-center p-0"
            >
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                width={280}
                height={90}
                className="w-full h-auto object-contain opacity-80"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* --- Desktop Logo Layout (Unchanged) --- */}
        <motion.div
          className="hidden md:grid md:grid-cols-4 place-items-center gap-y-5 gap-x-8 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
                width={160}
                height={80}
                className="h-12 md:h-14 lg:h-16 xl:h-18 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}