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
      className="text-4xl md:text-7xl lg:text-[140px] font-[400] text-center lg:leading-tight lg:tracking-tighter"
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
        className="lg:-mt-9"
      >
        <span className="text-[#333333] ">daily utility</span>
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

const CardPair = ({ pair, progress, range, isLastPair }) => {
  const y = useTransform(progress, range, ["90%", "-100%"]);
  const buttonOpacity = useTransform(
    progress,
    [range[1] - 0.05, range[1]],
    [1, 1]
  );
  const buttonY = useTransform(progress, [range[1] - 0.05, range[1]], [50, 0]);

  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative w-full md:w-[800px] h-full md:h-[648px] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 px-4 md:px-0">
        {/* For mobile: stack them with proper spacing. For desktop: use absolute positioning for overlap */}
        <div className="md:absolute md:top-0 md:left-0 relative">
          <Card cardData={pair[0]} />
          {isLastPair && (
            <WaitlistTriggerButton>
              <motion.div
                style={{
                  opacity: buttonOpacity,
                  y: buttonY,
                }}
                className="absolute hidden lg:block  top-[calc(100%+20px)] left-1/2 -translate-x-1/2 lg:left-[50%] z-20"
              >
                <button className="flex items-center whitespace-nowrap gap-2 cursor-pointer bg-black text-white px-6 py-3 rounded-full hover:bg-black/90 transition-colors">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.48438 6.01172H11.6768"
                      stroke="#F9F9F9"
                      stroke-linecap="round"
                    />
                    <path
                      d="M6.48438 8.0625H13.8085"
                      stroke="#F9F9F9"
                      stroke-linecap="round"
                    />
                    <path
                      d="M6.48438 10.1133H11.6768"
                      stroke="#F9F9F9"
                      stroke-linecap="round"
                    />
                    <path
                      d="M6.48438 18.7148H10.3833"
                      stroke="#F9F9F9"
                      stroke-linecap="round"
                    />
                    <path
                      d="M12.6875 2.76953C13.8358 2.76953 14.41 2.76969 14.8486 2.99316C15.2344 3.18972 15.5485 3.50294 15.7451 3.88867C15.9686 4.32723 15.9678 4.90169 15.9678 6.0498V7.95703H14.9678V6.0498C14.9678 5.4595 14.9672 5.07681 14.9434 4.78516C14.9205 4.5051 14.8815 4.3976 14.8535 4.34277C14.7528 4.14527 14.5921 3.98444 14.3945 3.88379C14.3397 3.85587 14.2326 3.8168 13.9531 3.79395C13.6614 3.77011 13.2782 3.76953 12.6875 3.76953H7.24121C6.65093 3.76953 6.26821 3.77014 5.97656 3.79395C5.6965 3.81683 5.58901 3.85585 5.53418 3.88379C5.33663 3.98447 5.17588 4.14523 5.0752 4.34277C5.04726 4.3976 5.00823 4.5051 4.98535 4.78516C4.97345 4.93102 4.96704 5.09967 4.96387 5.30566L4.96094 6.0498V17.9424C4.96094 18.5327 4.96155 18.9154 4.98535 19.207C5.00823 19.4871 5.04726 19.5946 5.0752 19.6494C5.17588 19.847 5.33663 20.0077 5.53418 20.1084C5.58901 20.1363 5.6965 20.1754 5.97656 20.1982C6.26821 20.222 6.65093 20.2227 7.24121 20.2227H12.6875C12.8018 20.2227 12.9082 20.2209 13.0078 20.2207V21.2207C12.9062 21.2209 12.7996 21.2227 12.6875 21.2227H7.24121C6.0931 21.2227 5.51864 21.2225 5.08008 20.999C4.74263 20.827 4.46061 20.5652 4.26367 20.2441L4.18457 20.1035C4.01693 19.7745 3.97531 19.3688 3.96484 18.7021L3.96094 17.9424V6.0498C3.96094 5.04517 3.96063 4.47993 4.11035 4.06055L4.18457 3.88867C4.35659 3.55123 4.61835 3.2692 4.93945 3.07227L5.08008 2.99316C5.51864 2.76971 6.0931 2.76953 7.24121 2.76953H12.6875Z"
                      fill="#F9F9F9"
                    />
                    <path
                      d="M18.1138 19.0366L14.4351 19.0366C14.1912 19.0366 13.9572 18.9397 13.7848 18.7672C13.6123 18.5948 13.5154 18.3608 13.5154 18.1169L13.5154 10.7595C13.5154 10.5156 13.6123 10.2817 13.7848 10.1092C13.9572 9.93674 14.1912 9.83984 14.4351 9.83984L19.0334 9.83984C19.2774 9.83984 19.5113 9.93674 19.6838 10.1092C19.8562 10.2817 19.9531 10.5156 19.9531 10.7595L19.9531 18.1169C19.9531 18.3608 19.8562 18.5948 19.6838 18.7672C19.5113 18.9397 19.2774 19.0366 19.0334 19.0366L18.1138 19.0366ZM18.1138 19.0366L18.1138 11.6792"
                      stroke="#F9F9F9"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Start paying with crypto
                </button>
              </motion.div>
            </WaitlistTriggerButton>
          )}
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
  const scrollSegment = 1 / totalPairs; // Allocate space for pairs + button

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
                isLastPair={i === totalPairs - 1}
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
            className="absolute lg:hidden bottom-40 lg:bottom-16 left-1/2  -translate-x-1/2 z-20"
          >
            <button className="flex items-center whitespace-nowrap gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-black/90 transition-colors">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.48438 6.01172H11.6768"
                  stroke="#F9F9F9"
                  stroke-linecap="round"
                />
                <path
                  d="M6.48438 8.0625H13.8085"
                  stroke="#F9F9F9"
                  stroke-linecap="round"
                />
                <path
                  d="M6.48438 10.1133H11.6768"
                  stroke="#F9F9F9"
                  stroke-linecap="round"
                />
                <path
                  d="M6.48438 18.7148H10.3833"
                  stroke="#F9F9F9"
                  stroke-linecap="round"
                />
                <path
                  d="M12.6875 2.76953C13.8358 2.76953 14.41 2.76969 14.8486 2.99316C15.2344 3.18972 15.5485 3.50294 15.7451 3.88867C15.9686 4.32723 15.9678 4.90169 15.9678 6.0498V7.95703H14.9678V6.0498C14.9678 5.4595 14.9672 5.07681 14.9434 4.78516C14.9205 4.5051 14.8815 4.3976 14.8535 4.34277C14.7528 4.14527 14.5921 3.98444 14.3945 3.88379C14.3397 3.85587 14.2326 3.8168 13.9531 3.79395C13.6614 3.77011 13.2782 3.76953 12.6875 3.76953H7.24121C6.65093 3.76953 6.26821 3.77014 5.97656 3.79395C5.6965 3.81683 5.58901 3.85585 5.53418 3.88379C5.33663 3.98447 5.17588 4.14523 5.0752 4.34277C5.04726 4.3976 5.00823 4.5051 4.98535 4.78516C4.97345 4.93102 4.96704 5.09967 4.96387 5.30566L4.96094 6.0498V17.9424C4.96094 18.5327 4.96155 18.9154 4.98535 19.207C5.00823 19.4871 5.04726 19.5946 5.0752 19.6494C5.17588 19.847 5.33663 20.0077 5.53418 20.1084C5.58901 20.1363 5.6965 20.1754 5.97656 20.1982C6.26821 20.222 6.65093 20.2227 7.24121 20.2227H12.6875C12.8018 20.2227 12.9082 20.2209 13.0078 20.2207V21.2207C12.9062 21.2209 12.7996 21.2227 12.6875 21.2227H7.24121C6.0931 21.2227 5.51864 21.2225 5.08008 20.999C4.74263 20.827 4.46061 20.5652 4.26367 20.2441L4.18457 20.1035C4.01693 19.7745 3.97531 19.3688 3.96484 18.7021L3.96094 17.9424V6.0498C3.96094 5.04517 3.96063 4.47993 4.11035 4.06055L4.18457 3.88867C4.35659 3.55123 4.61835 3.2692 4.93945 3.07227L5.08008 2.99316C5.51864 2.76971 6.0931 2.76953 7.24121 2.76953H12.6875Z"
                  fill="#F9F9F9"
                />
                <path
                  d="M18.1138 19.0366L14.4351 19.0366C14.1912 19.0366 13.9572 18.9397 13.7848 18.7672C13.6123 18.5948 13.5154 18.3608 13.5154 18.1169L13.5154 10.7595C13.5154 10.5156 13.6123 10.2817 13.7848 10.1092C13.9572 9.93674 14.1912 9.83984 14.4351 9.83984L19.0334 9.83984C19.2774 9.83984 19.5113 9.93674 19.6838 10.1092C19.8562 10.2817 19.9531 10.5156 19.9531 10.7595L19.9531 18.1169C19.9531 18.3608 19.8562 18.5948 19.6838 18.7672C19.5113 18.9397 19.2774 19.0366 19.0334 19.0366L18.1138 19.0366ZM18.1138 19.0366L18.1138 11.6792"
                  stroke="#F9F9F9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Start paying with crypto
            </button>
          </motion.div>
        </WaitlistTriggerButton>
      </div>
    </section>
  );
};
