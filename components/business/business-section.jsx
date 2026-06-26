"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BusinessSection() {
  return (
    <section className="w-full min-h-screen">
      <div className="h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Side */}
          <motion.div
            className="relative h-[50vh] lg:h-screen overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Background Video */}
            <video
              src="https://assets.bepay.money/website_assets/i1.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay animation - Upper image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              viewport={{ once: true }}
              className="absolute bottom-0 transform mb-5 ml-6 sm:mt-16 sm:ml-6 md:mt-39 md:ml-8 lg:mt-120 lg:ml-36"
            >
              <Image
                src="/images/business/bs_1.svg"
                alt="Payment sent notification"
                width={300}
                height={1350}
                className="w-[200px] lg:w-[350px] h-auto drop-shadow-lg"
              />
            </motion.div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            className="relative h-[50vh] lg:h-screen overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Background Video */}
            <video
              src="https://assets.bepay.money/website_assets/i2.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay animation - Lower image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.8,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              viewport={{ once: true }}
              // Adjusted lg:ml-64 to lg:ml-72 (right) and added lg:mb-10 (up)
              className="absolute transform bottom-0 mb-5 ml-36 sm:mt-16 sm:ml-8 md:mt-24 md:ml-16 lg:mb-10 lg:ml-72"
            >
              <Image
                src="/images/business/ia2.svg"
                alt="Payment received notification"
                width={300}
                height={450}
                className="w-[200px] lg:w-[350px] h-auto drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}