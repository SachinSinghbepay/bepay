"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function ContactHeroSection() {
  // Animation variants for content
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  return (
    <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/aboutus/bgcontact.png"
          alt="Contact us - Coffee shop payment scene"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlays */}
        <div
          className="absolute top-0 left-0 right-0 h-32 lg:h-40"
          style={{
            background: "linear-gradient(to bottom, #f9f9f9 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 lg:h-40"
          style={{
            background: "linear-gradient(to top, #f9f9f9 0%, transparent 100%)",
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-start px-4 lg:px-16"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="max-w-5xl">
          {/* Main Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-[80px] xl:text-[90px] font-bold leading-tight text-black mb-4"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Got questions?
          </motion.h1>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-[80px] xl:text-[90px] font-bold leading-tight text-black"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            Get in touch
          </motion.h2>
        </div>
      </motion.div>
    </section>
  )
}
