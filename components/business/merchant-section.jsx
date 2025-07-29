"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function MerchantSection() {
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
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full min-h-screen bg-[#F9F9F9] py-12 md:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Left Side - Content */}
          <div className="space-y-6 lg:space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-[60px] font-[400] leading-tight">
                <span className="lg:whitespace-nowrap">
                Become a{" "}
                <span className="font-[400] text-gray-900">merchant</span></span>
                <br />
                on{" "}
                <span className="font-[400] text-gray-900">
                  bepay business
                </span>{" "}
                <span className="text-gray-400">Now!</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-md">
                Experience the power of receiving{" "}
                <span className="font-semibold text-gray-900">
                   lightning fast global payments
                </span>{" "}
                for your business!
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col max-w-[300px] gap-4"
            >
              <button className="bg-black cursor-pointer whitespace-nowrap text-white px-8 py-4 rounded-full text-[12px] font-medium hover:bg-black/90 transition-colors duration-200 flex items-center justify-center gap-2">
                Become a merchant
                <ArrowUpRight size={18} />
              </button>

              <button className="border-2 cursor-pointer border-gray-300 text-gray-700 px-8 py-4 rounded-full text-[12px] font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Talk to us
              </button>
            </motion.div>
          </div>

          {/* Right Side - Mobile Mockup */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
              <Image
                src="/images/business/mocup.png"
                alt="Bepay merchant mobile app interface"
                width={400}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
