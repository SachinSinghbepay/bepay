"use client";

import { motion } from "framer-motion";
import { CheckCircle, FileText, Shield } from "lucide-react";

const complianceData = [
  {
    icon: CheckCircle,
    title: "Certified",
    badges: ["ISO 27001", "SOC 2", "PCI DSS", " ISO 20022", "ISO 9001"],
  },
  {
    icon: FileText,
    title: "Licensed",
    badges: ["MSB (USA)", "VASP (EU)", "MiCA (EU)"],
  },

  {
    icon: FileText,
    title: "Compliant",
    badges: ["GDPR", "DORA", "AML/KYC automation", "CFT"],
  },
  {
    icon: Shield,
    title: "Protected",
    badges: ["Multi-sig wallets", "fraud detection", "", ""], // Added empty badges for alignment
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
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
        >
          {complianceData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white rounded-[32px] p-8 lg:p-12 h-auto  min-h-[200px] lg:min-h-[300px] 3xl:min-h-[463px] flex flex-col justify-between"
              style={{
                boxShadow: "50px 50px 100px 0px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="flex items-center gap-4 lg:gap-6 mb-8">
                <div className="flex-shrink-0">
                  <item.icon
                    className="w-8 h-8 lg:w-20 lg:h-20 text-[#6A6A6A]"
                    strokeWidth={1}
                  />
                </div>
                <h3 className="text-2xl lg:text-[60px] 3xl:text-[80px] font-[500] text-[#6A6A6A] leading-tight">
                  {item.title}
                </h3>
              </div>
              <div
                className={`${
                  index === complianceData.length - 1 ? "md:-mt-8" : ""
                }`}
              >
                <div className={`flex flex-wrap  gap-3  `}>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}