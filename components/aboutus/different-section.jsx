"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const cardData = [
  {
    id: 1,
    image: "/images/aboutus/d1.png",
   
    title: "Earn While You Spend:",
    description:
      "Turn your daily transactions into earning opportunities. From cash-back learning to cashback rewards, every transaction with Sappy puts money back in your pocket.",
  },
  {
    id: 2,
    image: "/images/aboutus/d2.png",
  
    title: "No Compromises:",
    description:
      "Why choose between crypto and fiat when you can have both? Seamlessly switch between fiat and blockchain at your nearest shops.",
  },
  {
    id: 3,
    image: "/images/aboutus/d3.png",
    boxImage: "/images/aboutus/d33.png",
    title: "Your Keys, Your Control:",
    description:
      "Be serious in true ownership. Your money stays in your control with our non-custodial approach — we facilitate, you own.",
  },
  {
    id: 4,
    image: "/images/aboutus/d4.png",

    title: "Built for Everyone:",
    description:
      "Whether you're a crypto-native or just crypto-curious, our intuitive design is your comfort level and grows with your knowledge.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function WhatMakesYouDifferent() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-start mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[600] leading-tight">
            <span className="text-[#C0C0C0]">What makes us </span>
            <span className="text-black">different</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {cardData.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="bg-white rounded-4xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              style={{
                width: "100%",
                maxWidth: "571px",
                height: "auto",
                aspectRatio: "1/1",
              }}
            >
              <div className="h-full flex flex-col">
                {/* Image Section */}
                <div className="relative flex-1 min-h-[250px] md:min-h-[285px] overflow-hidden">
                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 571px"
                  />
                  {/* Overlay Box Image */}
                  {card.boxImage && (
                    <>
                      {" "}
                      <div className="absolute top-4 left-4 md:top-6 md:left-6">
                        <div className="relative w-[200px] h-[150px]">
                          <Image
                            src={card.boxImage || "/placeholder.svg"}
                            alt="Feature icon"
                            fill
                            className="object-contain"
                            sizes="200px"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center bg-gray-50">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
