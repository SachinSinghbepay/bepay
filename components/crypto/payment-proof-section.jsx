"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service

export const PaymentProofSection = () => {
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  const notificationVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  // ANALYTICS: Track when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("Payment proof section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target); // Stop observing after first trigger
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full h-[60vh] sm:h-[80vh] md:h-[760px] flex items-center justify-center overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // keep animations independent of analytics
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="https://assets.bepay.money/website_assets/new.mp4" type="video/mp4" />
        
        <Image
          src="/images/crypto/bgimg.jpg"
          alt="Two women looking at a smartphone"
          fill
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
      </video>

      
      <Image
        src="/images/crypto/subset.png"
        alt="Geometric overlay"
        fill
        style={{ objectFit: "cover" }}
        loading="lazy"
        className="z-10"
      />

      {/* Floating Notification */}
      <motion.div
        className="absolute z-20 left-[22%] bottom-1/2 translate-y-[169%] lg:left-[38%] lg:translate-y-[180%] sm:bottom-auto sm:translate-y-0 sm:top-1/2"
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.5 }}
        variants={notificationVariants}
      >
        <div className="rounded-t-2xl rounded-br-2xl p-2 sm:p-3 shadow-lg bg-white/30 backdrop-blur-xl border border-white/20 transform -translate-x-3 translate-y-2">
          <p className="text-[10px] font-semibold text-gray-700 mb-1">
            Paid for groceries!
          </p>
          <div className="flex items-center gap-1 sm:gap-2">
            <Image
              src={"/bitcoin.png"}
              alt="bitcoin"
              height={24}
              width={24}
              loading="lazy"
              className="object-cover"
            />
            <p className="font-semibold text-[12px] sm:text-sm text-black">
              0.0012 BTC{" "}
              <span className="font-semibold text-gray-600 text-[10px]">
                ($102)
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};