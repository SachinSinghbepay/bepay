"use client";

import {
  IconBrandMedium,
  IconBrandTelegram,
  IconBrandX,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Facebook, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  // Animation variants for content
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <section className="w-full min-h-[600px] lg:min-h-[700px]">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Left Side - White Background */}
        <div className="bg-white flex items-center justify-center px-4 py-16 lg:py-24">
          <motion.div
            className="max-w-lg w-full text-center lg:text-left"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold leading-tight mb-6 lg:mb-8">
              <span style={{ color: "#C0C0C0" }}>Let's </span>
              <span className="text-black">move money</span>
              <br />
              <span className="text-black">freely </span>
              <span style={{ color: "#C0C0C0" }}>together</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-[#666666] mb-8 lg:mb-10">
              Join our community. Connect with{" "}
              <span className="font-semibold text-black">20,000+ users</span>{" "}
              earning daily through crypto rewards.
            </p>

            {/* Telegram Button */}
            <Link href={"https://t.me/officialbepaymoney"}>
              <motion.button
                className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full font-medium text-sm lg:text-base hover:bg-black/90 cursor-pointer transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconBrandTelegram size={20} />
                Telegram community
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side - Gray Background */}
        <div className="bg-[#f9f9f9] flex items-center justify-center px-4 py-16 lg:py-24">
          <motion.div
            className="max-w-lg w-full text-center lg:text-left"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold leading-tight mb-6 lg:mb-8">
              <span className="text-black">Follow</span>
              <br />
              <span style={{ color: "#C0C0C0" }}>our journey</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-[#666666] mb-8 lg:mb-10">
              Get real-time updates on new features, partnerships, and earning
              opportunities
            </p>

            {/* Social Media Icons */}
            <div className="flex justify-center lg:justify-start gap-4">
              <motion.a
                href="https://www.linkedin.com/company/bepaymoney/"
                className="w-12 h-12 lg:w-14 lg:h-14 bg-black rounded-2xl flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>

              <motion.a
                href="https://x.com/bepaymoney"
                className="w-12 h-12 lg:w-14 lg:h-14 bg-black rounded-2xl flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconBrandX size={20} />
              </motion.a>

              <motion.a
                href="https://www.facebook.com/bepaymoney/"
                className="w-12 h-12 lg:w-14 lg:h-14 bg-black rounded-2xl flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook size={20} />
              </motion.a>

              <motion.a
                href="#"
                className="w-12 h-12 lg:w-14 lg:h-14 bg-black rounded-2xl flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconBrandMedium size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
