"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AnalyticsService } from "@/services/analyticsService";
import { useRef, useState, useEffect } from "react";

// const complianceData = [
//   {
//     icon: "/images/business/certified.svg",
//     title: "Certified",
//     badges: ["ISO 27001", "SOC 2", "PCI DSS", "ISO 20022", "ISO 9001"],
//   },
//   {
//     icon: "/images/business/licensed.svg",
//     title: "Licensed",
//     badges: ["MSB (USA)", "MSB (CANADA)", "PSP (CANADA)", "VASP (EU)", ""],
//   },
//   {
//     icon: "/images/business/compliant.svg",
//     title: "Compliant",
//     badges: ["DORA", "DPDP", "CFT", "MiCA (EU)"],
//   },
//   {
//     icon: "/images/business/protected.svg",
//     title: "Protected",
//     badges: ["GDPR", "Multi-Factor Authentication", "24/7 Monitoring", "End-to-End Encryption", "Real-time Fraud Detection"],
//   },
// ];
const complianceData = [
  {
    icon: "/images/business/certified.svg",
    title: "Certified",
    badges: [
      { name: "ISO 27001", logo: "/icons/ISO-27001.svg" },
      { name: "SOC 2", logo: "/icons/SOC-2.svg" },
      { name: "PCI DSS", logo: "/icons/PCI-DSS.svg" },
      { name: "ISO 20022", logo: "/icons/ISO-20022.svg" },
      { name: "ISO 9001", logo: "/icons/ISO-9001.svg" },
    ],
  },
  {
    icon: "/images/business/licensed.svg",
    title: "Licensed",
    badges: [
      { name: "MSB (USA)", logo: "/icons/MSB-(USA).svg" },
      { name: "MSB (Canada)", },
      { name: "PSP (Canada)" },
      { name: "VASP (EU)", logo: "/icons/VASP-(EU).svg" },
    ],
  },
  {
    icon: "/images/business/compliant.svg",
    title: "Compliant",
    badges: [
      { name: "DORA" },
      { name: "DPDP", logo: "/icons/DPDP.svg" },
      { name: "MiCA (EU)" },
      { name: "CFT" },
    ],
  },
  {
    icon: "/images/business/protected.svg",
    title: "Protected",
    badges: [
      { name: "GDPR", logo: "/icons/GDPR.svg" },
      { name: "Multi-Factor Authentication", logo: "/icons/security-icon.svg" },
      { name: "24/7 Monitoring" },
      { name: "End-to-End Encryption" },
      { name: "Real-time Fraud Detection", logo: "/icons/fraud.svg" },
    ],
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
          className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-3"
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
                    src="/igps_flag.png"
                    alt="Flag"
                    width={45}
                    height={40}
                    className="absolute top-[29%] right-[5%] pointer-events-none lg:hidden"
                    loading="lazy" // <-- ADDED
                  />
                )}
              </div>
              <div
                className={`${index === complianceData.length - 1 ? "md:-mt-8" : ""
                  }`}
              >
                <div className="flex flex-wrap gap-3">
                  {item.badges.map((badge, badgeIndex) => (
                    <div
                      key={badgeIndex}
                      className="flex items-center gap-3 px-5 py-3 border rounded-[18px] bg-white"
                    >
                      {badge.logo && (
                        <Image
                          src={badge.logo}
                          alt={badge.name}
                          width={38}
                          height={38}
                          className="object-contain"
                        />
                      )}

                      <span className="text-[#080808] text-sm lg:text-[16px] font-medium whitespace-nowrap">
                        {badge.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop-only flag image */}
              {item.title === "Licensed" && (
                <Image
                  src="/igps_flag.png"
                  alt="Flag"
                  width={70}
                  height={63}
                  className="absolute bottom-8 right-12 lg:bottom-12 lg:right-12 pointer-events-none hidden lg:block"
                  loading="lazy"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}