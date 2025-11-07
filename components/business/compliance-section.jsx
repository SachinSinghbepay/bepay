"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AnalyticsService } from "@/services/analyticsService";
import { useRef, useState, useEffect } from "react";

const complianceData = [
  {
    icon: "/images/business/certified.svg",
    title: "Certified",
    badges: ["ISO 27001", "SOC 2", "PCI DSS", "ISO 20022", "ISO 9001"],
  },
  {
    icon: "/images/business/licensed.svg",
    title: "Licensed",
    badges: ["MSB (USA)", "VASP (EU)", "FIU (India)", "MiCA (EU)"],
  },
  {
    icon: "/images/business/compliant.svg",
    title: "Compliant",
    badges: ["GDPR", "DORA", "DPDP", "AML/KYC automation", "CFT"],
  },
  {
    icon: "/images/business/protected.svg",
    title: "Protected",
    badges: ["Multi-sig wallets", "fraud detection", "", ""],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
};

export default function ComplianceSection() {
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("Compliance section viewed");
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
    <section ref={sectionRef} className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
        >
          {complianceData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white rounded-[32px] p-8 lg:p-12 h-auto min-h-[200px] lg:min-h-[55vh] flex flex-col justify-between relative"
              style={{
                boxShadow: "50px 50px 100px 0px rgba(0, 0, 0, 0.1)",
                zIndex: complianceData.length - index,
              }}
            >
              {/* This parent div is now relative to position the mobile flag */}
              <div className="flex items-center gap-4 lg:gap-6 mb-8 relative">
                <div className="flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt={`${item.title} icon`}
                    width={80}
                    height={80}
                    className="w-8 h-8 lg:w-[60px] lg:h-[60px] 3xl:w-[80px] 3xl:h-[80px]"
                    loading="lazy" // <-- ADDED
                  />
                </div>
                <h3 className="text-3xl lg:text-[60px] 3xl:text-[80px] font-[500] text-[#6A6A6A] leading-tight">
                  {item.title}
                </h3>
                {/* Mobile-only flag image */}
                {item.title === "Licensed" && (
                  <Image
                    src="/flags.png"
                    alt="Flag"
                    width={45}
                    height={40}
                    className="absolute top-[29%] right-[5%] pointer-events-none lg:hidden"
                    loading="lazy" // <-- ADDED
                  />
                )}
              </div>
              <div
                className={`${
                  index === complianceData.length - 1 ? "md:-mt-8" : ""
                }`}
              >
                <div className="flex flex-wrap gap-3">
                  {item.badges.map((badge, badgeIndex) => (
                    <span
                      key={badgeIndex}
                      className={`px-6 py-3 border text-[#080808] text-sm lg:text-[16px] 3xl:text-[20px] rounded-[24px] font-medium ${
                        badge === "" ? "invisible" : ""
                      }`}
                    >
                      {badge || "placeholder"}
                    </span>
                  ))}
                </div>
              </div>

              {/* Desktop-only flag image */}
              {item.title === "Licensed" && (
                <Image
                  src="/flags.png"
                  alt="Flag"
                  width={70}
                  height={63}
                  className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 pointer-events-none hidden lg:block"
                  loading="lazy" // <-- ADDED
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}