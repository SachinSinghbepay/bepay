"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Wallet } from "lucide-react";
import WaitlistTriggerButton from "../waitlist-trigger-button";

const utilityData = [
  {
    icon: "/images/crypto/i1.png",
    title: "Bill Payments",
    description:
      "Pay utilities, mobile recharge, data plans and other bills instantly",
  },
  {
    icon: "/images/crypto/i2.png",
    title: "Travel Bookings",
    description: "Book flights & hotels with Travala",
  },
  {
    icon: "/images/crypto/i3.png",
    title: "Train tickets",
    description: "Book train tickets across the world using crypto",
  },
  {
    icon: "/images/crypto/i4.png",
    title: "Movie Tickets",
    description:
      "Book your favourite movie tickets and other entertainment events",
  },
  {
    icon: "/images/crypto/i6.png",
    title: "E-commerce shopping",
    description: "Shop online with crypto payments",
  },
  {
    icon: "/images/crypto/i5.png",
    title: "Gift Cards",
    description:
      "Buy gift cards for popular retailers like Amazon, Uber eats, Starbucks and many more",
  },
];

const cardPairs = utilityData.reduce((acc, _, i) => {
  if (i % 2 === 0) {
    acc.push(utilityData.slice(i, i + 2));
  }
  return acc;
}, []);

const AnimatedText = () => {
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smoother animation
      },
    },
  };

  return (
    <motion.h2
      variants={textContainerVariants}
      viewport={{ once: true, amount: 0.3 }}
      initial="hidden"
      whileInView="visible"
      className="text-4xl md:text-7xl lg:text-[160px] font-[400] text-center leading-tight"
    >
      <motion.div
        initial={{ opacity: 1, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <span className="text-[#333333]">Crypto </span>
        <span className="text-[#C0C0C0]">meets</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 1, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <span className="text-[#333333]">daily utility</span>
      </motion.div>
    </motion.h2>
  );
};

const Card = ({ cardData }) => (
  <div className="w-[300px] h-[400px] md:w-[350px] md:h-[450px] bg-white shadow-utility-card rounded-3xl p-8 flex flex-col items-start justify-end text-center relative overflow-hidden">
    <Image
      src={cardData.icon || "/placeholder.svg"}
      alt={cardData.title}
      width={200}
      height={200}
      className="opacity-100 absolute top-4 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 w-[150px] h-[150px] md:w-[200px] md:h-[200px] z-0"
    />
    <div className="relative mb-5 z-10">
      <h3 className="text-xl md:text-2xl lg:text-[32px] text-start font-[500] text-[#6A6A6A]">
        {cardData.title}
      </h3>
      <p className="text-gray-600 mt-2 text-start text-sm">
        {cardData.description}
      </p>
    </div>
  </div>
);

const CardPair = ({ pair, progress, range }) => {
  const y = useTransform(progress, range, ["80%", "-100%"]);

  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative w-full md:w-[800px] h-full md:h-[648px] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 px-4 md:px-0">
        {/* For mobile: stack them with proper spacing. For desktop: use absolute positioning for overlap */}
        <div className="md:absolute md:top-0 md:left-0">
          <Card cardData={pair[0]} />
        </div>
        {pair[1] && (
          <div className="md:absolute md:bottom-0 md:right-0">
            <Card cardData={pair[1]} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const UtilitySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalPairs = cardPairs.length;
  const scrollSegment = 1 / (totalPairs + 0.5); // Allocate space for pairs + button

  return (
    <section ref={containerRef} className="relative bg-[#f9f9f9] h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <AnimatedText />
        </div>

        <div className="relative w-full h-full z-10">
          {cardPairs.map((pair, i) => {
            const start = i * scrollSegment;
            const end = start + scrollSegment;
            return (
              <CardPair
                key={i}
                pair={pair}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </div>
  <WaitlistTriggerButton>
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.95, 1], [0, 1]),
            y: useTransform(scrollYProgress, [0.95, 1], [50, 0]),
          }}
          className="absolute bottom-40 lg:bottom-16 left-1/2  -translate-x-1/2 z-20"
        >
          <button className="flex items-center whitespace-nowrap gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
            <Wallet size={18} />
            Start paying with crypto
          </button>
        </motion.div>
        </WaitlistTriggerButton>
      </div>
    </section>
  );
};