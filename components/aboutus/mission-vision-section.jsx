"use client";

import { motion } from "framer-motion";

export default function MissionVisionSection() {
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
    <section className="w-full bg-[#f9f9f9] py-16 lg:py-24 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Subtitle */}
        <motion.p
          className="text-start mb-6 lg:mb-8"
          style={{
            fontSize: "16px",
            color: "#6A6A6A",
            fontWeight: "400",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          MISSION & VISION
        </motion.p>

        {/* Main Title */}
        <motion.h2
          className="text-start mb-12 max-w-[800px] lg:mb-16 leading-tight text-3xl lg:text-[50px] font-[600] "
          variants={fadeInUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-black">The foundation </span>
          <span style={{ color: "#C0C0C0" }}>
            that drives everything we do:
          </span>
        </motion.h2>

        {/* Cards Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 ">
          {/* Mission Card */}
          <motion.div
            className="w-full max-w-[640px] mx-auto"
            style={{
              height: "auto",
              minHeight: "400px",
              background: "#f9f9f9",
              borderRadius: "100px",
              border: "2px solid",
              borderImageSource:
                "linear-gradient(134.52deg, rgba(255, 255, 255, 0.8) 12.5%, #F5F5F5 88.99%)",
              borderImageSlice: 1,
              boxShadow:
                "inset 10px 10px 20px 0px rgba(0, 0, 0, 0.1), inset -10px -10px 30px 0px #FFFFFF",
            }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="p-8 lg:p-12 h-full flex flex-col justify-center text-center">
              <h3 className="text-xl lg:text-[20px] font-bold text-black mb-6">
                Our Mission:
              </h3>
              <p className="text-base lg:text-[20px] font-[500] leading-relaxed text-[#080808]">
                Empowering individuals and businesses with payment solutions
                that combine the security of blockchain technology with the
                simplicity of traditional banking.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="w-full max-w-[640px] mx-auto"
            style={{
              height: "auto",
              minHeight: "400px",
              background: "#f9f9f9",
              borderRadius: "100px",
              border: "2px solid",
              borderImageSource:
                "linear-gradient(134.52deg, rgba(255, 255, 255, 0.8) 12.5%, #F5F5F5 88.99%)",
              borderImageSlice: 1,
              boxShadow:
                "inset 10px 10px 20px 0px rgba(0, 0, 0, 0.1), inset -10px -10px 30px 0px #FFFFFF",
            }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="p-8 lg:p-12 h-full flex flex-col justify-center text-center">
              <h3 className="text-xl lg:text-[20px] font-bold text-black mb-6">
                Our Vision:
              </h3>
              <p className="text-base lg:text-[20px] font-[500] leading-relaxed text-[#080808]">
                To create a borderless financial ecosystem where value flows
                freely between traditional and decentralized economies.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
