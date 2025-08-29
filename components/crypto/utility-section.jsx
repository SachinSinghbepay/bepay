"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
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

const AnimatedText = () => {
  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="text-4xl md:text-7xl lg:text-[140px] font-[400] tracking-tight text-center lg:tracking-[-0.09em] lg:leading-[130px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <span className="text-[#333333]">Crypto </span>
        <span className="text-[#C0C0C0]">meets</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="text-[#333333]">daily utility</span>
      </motion.div>
    </motion.h2>
  );
};

const Card = ({ cardData }) => (
  <div className="w-[300px] h-[400px] lg:w-[380px] drop-shadow-2xl lg:h-[500px] bg-white shadow-utility-card rounded-[40px] p-8 flex flex-col items-start justify-end text-center relative overflow-hidden">
    <Image
      src={cardData.icon || "/placeholder.svg"}
      alt={cardData.title}
      width={200}
      height={200}
      loading="lazy"
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

const IndividualCard = ({ cardData, index, progress, totalCards, isLastCard }) => {
  const segment = 1 / totalCards;
  const overlap = segment * 0.7; // Increased overlap for consistent gaps
  const start = Math.max(0, index * segment - overlap * 0.5);
  const peak = index * segment + segment * 0.5;
  const end = Math.min(1, (index + 1) * segment + overlap * 0.5);

  // More precise animation timing for consistent gaps
  const y = useTransform(progress, [start, peak, end], ["40%", "0%", "-40%"]);
  const opacity = useTransform(progress, [start, peak, end], [0, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      style={{ y, opacity }}
      transition={{ ease: "easeInOut", duration: 0.6 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative w-full md:w-[800px] h-full md:h-[648px] flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0 px-4 md:px-0">
        <div
          className={`${
            isEven ? "md:absolute md:top-0 md:left-0" : "md:absolute md:bottom-0 md:right-0"
          } relative`}
        >
          <Card cardData={cardData} />

          {/* CTA on last card */}
          {isLastCard && (
            <WaitlistTriggerButton>
              <motion.div
                style={{
                  opacity: useTransform(progress, [end - 0.1, end], [0, 1]),
                  y: useTransform(progress, [end - 0.1, end], [50, 0]),
                }}
                transition={{ ease: "easeOut", duration: 0.6 }}
                className="absolute hidden lg:block top-[calc(100%+20px)] left-1/2 -translate-x-1/2 z-20"
              >
                <button className="flex items-center whitespace-nowrap gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-black/90 transition-colors">
                  Start paying with crypto
                </button>
              </motion.div>
            </WaitlistTriggerButton>
          )}
        </div>
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

  const totalCards = utilityData.length;

  // Button animation at very end
  const buttonOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.85, 0.95], [50, 0]);

  return (
    <section ref={containerRef} className="relative bg-[#f9f9f9] h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background text */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <AnimatedText />
        </div>

        {/* Cards */}
        <div className="relative w-full h-full z-10">
          {utilityData.map((cardData, index) => (
            <IndividualCard
              key={index}
              cardData={cardData}
              index={index}
              progress={scrollYProgress}
              totalCards={totalCards}
              isLastCard={index === totalCards - 1}
            />
          ))}
        </div>

        {/* Final button */}
        <WaitlistTriggerButton>
          <motion.div
            style={{
              opacity: buttonOpacity,
              y: buttonY,
            }}
            transition={{ ease: "easeOut", duration: 0.6 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20"
          >
            <button className="flex items-center whitespace-nowrap gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-black/90 transition-colors">
              Start paying with crypto
            </button>
          </motion.div>
        </WaitlistTriggerButton>
      </div>
    </section>
  );
};