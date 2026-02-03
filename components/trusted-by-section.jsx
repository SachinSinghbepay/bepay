"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { AnalyticsService } from "@/services/analyticsService";

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
      {/* This parent has horizontal padding (px-4, sm:px-6) that we need to cancel out */}
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

        {/* --- MODIFIED: Mobile Layout with Full-Width Image --- */}
        <motion.div
          // 👇 Added negative margins to counteract the parent padding
          className="-mx-4 sm:-mx-6 md:hidden"
          variants={logoVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src="/trusted_p.png"
            alt="A collage of industry-leading brands"
            width={500} // width/height props are for aspect ratio, not final size
            height={300}
            // 👇 Removed max-w-sm to allow the image to fill the container
            className="h-auto w-full object-contain opacity-90"
            loading="lazy"
          />
        </motion.div>

        {/* --- Desktop Logo Layout (Unchanged) --- */}
        <motion.div
          className="hidden md:flex justify-center items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={logoVariants} className="w-full max-w-7xl">
            <Image
              src="/trusted.png"
              alt="A collage of industry-leading brands supported by bepay"
              width={1100}
              height={100}
              className="h-auto w-full object-contain opacity-90 -mb-20"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}