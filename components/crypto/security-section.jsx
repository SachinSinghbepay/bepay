"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const securityData = {
  certifications: {
    icon: "/images/crypto/icon1.png",
    title: "Security Certifications",
    items: [
      "ISO 27001 Information Security Management",
      "SOC 2 Type II Security Controls",
      "PCI DSS Payment Security Standards",
      "GDPR Privacy Protection Compliance",
    ],
  },
  monitoring: {
    icon: "/images/crypto/icon3.png",
    title: "24/7 Monitoring",
    description: "Real-time fraud detection and transaction monitoring",
  },
  mfa: {
    icon: "/images/crypto/icon2.png",
    title: "Multi-Factor Authentication",
    description:
      "Biometric login, SMS codes, and hardware security keys",
  },
  compliance: {
    icon: "/images/crypto/icon4.png",
    title: "Regulatory Compliance",
    description: "Licensed by FCA (UK), VASP (EU), and MSB (USA)",
  },
  encryption: {
    // icon: "/images/crypto/icon5.png",
    title: "End-to-End Encryption",
    description:
      "All data is encrypted with AES-256 encryption, both at rest and in transit",
  },
};

const SecurityCard = ({ icon, title, description, items, className = "" }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={`bg-[#0E0E0E] rounded-3xl p-8 relative overflow-hidden shadow-security-card flex flex-col ${className}`}
      variants={cardVariants}
    >
      {icon && (
        <Image
          src={icon || "/placeholder.svg"}
          alt=""
          width={128}
          height={128}
          className=" w-28 h-28"
        />
      )}

      <div className="relative z-10 mt-3 lg:mt-8  flex flex-col h-full">
        <h3 className="text-xl font-medium text-white mb-4">{title}</h3>
        {description && (
          <div className="flex gap-1 items-start">
            {" "}
            <span className="block w-[2px] h-10 bg-green-400 mr-3 mt-0.5 shrink-0 rounded-full" />
            <p className="text-[#6A6A6A] text-[14px] lg:text-[16px]">
              {description}
            </p>
          </div>
        )}
        {items && (
          <ul className="space-y-3 md:space-y-7 mt-2">
            {items.map((item) => (
              <li key={item} className="flex items-start">
                <span className="block w-[1px] h-6 bg-green-400 mr-3 mt-0.5 shrink-0 rounded-full" />
                <span className="text-[#6A6A6A]  text-[14px] lg:text-[16px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export const SecuritySection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-black text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-[40px] text-[#C0C0C0] font-medium text-center"
          variants={textVariants}
        >
          Bank-Grade Security & Compliance
        </motion.h2>
        <motion.p
        className="text-[#C0C0C0] text-center text-[16px] max-w-7xl mx-auto mt-4 mb-16"
          variants={textVariants}
        >
          Your security is our priority. We employ the highest standards of
          protection and comply with global financial regulations.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start"
          variants={containerVariants}
        >
          {/* Column 1 */}
          <motion.div variants={containerVariants}>
            <SecurityCard
              {...securityData.certifications}
              className="md:h-[610px]"
            />
          </motion.div>

          {/* Column 2 */}
          <motion.div
            className="flex flex-col gap-2"
            variants={containerVariants}
          >
            <SecurityCard {...securityData.monitoring} className="md:h-[300px]" />
            <SecurityCard {...securityData.mfa} className="md:h-[300px]" />
          </motion.div>

          {/* Column 3 */}
          <motion.div
            className="flex flex-col gap-2"
            variants={containerVariants}
          >
            <SecurityCard {...securityData.compliance} className="md:h-[400px]" />
            <SecurityCard {...securityData.encryption} className="md:h-[200px]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
