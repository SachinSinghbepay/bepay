"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  // Animation variants for floating icons
  const floatingAnimation = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const floatingAnimationReverse = {
    animate: {
      y: [10, -10, 10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  // Animation variants for content
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
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
    <section className="w-full bg-[#f9f9f9] py-16 lg:py-10 px-4">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Subtitle */}
        <motion.p
          className="mb-6 text-lg lg:text-[24px] lg:mb-3"
          style={{
            color: "#6A6A6A",
            fontWeight: "400",
          }}
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Every transaction is an opportunity.
        </motion.p>
        {/* Main Title */}
        <motion.h1
          className="mb-12 lg:mb-6 leading-tight text-3xl lg:text-[80px] font-semibold"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-black">Earn </span>
          <span style={{ color: "#C0C0C0" }}>while you spend.</span>
        </motion.h1>
        {/* Image Container with Floating Icons */}
        <motion.div
          className="relative mx-auto"
          style={{
            width: "696.8125px",
            height: "464.5983581542969px",
            maxWidth: "100%",
            backgroundColor: "#EBEBEB",
            borderRadius: "16px",
          }}
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Main Hero Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/aboutus/about hero.png"
              alt="Three people looking at mobile phone"
              width={500}
              height={350}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Floating Icons */}
          {/* Bitcoin Icon - Top Left */}
          <motion.div
            className="absolute"
            style={{ bottom: "45%", right: "40%" }}
            variants={floatingAnimation}
            animate="animate"
          >
            <Image
              src={"/images/aboutus/usflag.png"}
              height={30}
              width={30}
              alt="usflag"
              className="object-cover rounded-full"
            />
          </motion.div>

          {/* US Flag Icon - Top Right */}
          <motion.div
            className="absolute"
            style={{ bottom: "40%", right: "50%" }}
            variants={floatingAnimationReverse}
            animate="animate"
          >
            <Image
              src={"/bitcoin.png"}
              height={30}
              alt="bitcoin"
              width={30}
              className="object-cover rounded-full"
            />
          </motion.div>

          {/* Dollar Sign Icon - Bottom Left */}
          <motion.div
            className="absolute"
            style={{ bottom: "25%", right: "50%" }}
            variants={floatingAnimation}
            animate="animate"
          >
            <Image
              src={"/doller.png"}
              height={30}
              alt="doller"
              width={30}
              className="object-cover rounded-full"
            />
          </motion.div>

          {/* Tether Icon - Bottom Right */}
          <motion.div
            className="absolute"
            style={{ bottom: "35%", right: "30%" }}
            variants={floatingAnimationReverse}
            animate="animate"
          >
            <Image
              src={"/usdt.png"}
              height={30}
              width={30}
              alt="usdt"
              className="object-cover rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
