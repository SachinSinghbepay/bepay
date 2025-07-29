"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const BitcoinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="12" fill="#F7931A" />
    <path
      d="M17.432 14.24C17.012 15.8 15.682 16.83 14.032 17.43C12.952 17.81 11.932 17.9 11.002 17.9C10.922 17.9 10.842 17.9 10.762 17.9V20.6C10.762 20.82 10.582 21 10.362 21H8.60203C8.38203 21 8.20203 20.82 8.20203 20.6V17.9C8.12203 17.9 8.05203 17.9 7.98203 17.89C6.33203 17.6 5.00203 16.57 4.58203 15.01C4.21203 13.64 4.60203 12.23 5.60203 11.23L7.74203 9.09C7.90203 8.93 8.00203 8.72 8.00203 8.5V6.5C8.00203 6.28 8.18203 6.1 8.40203 6.1H10.162C10.382 6.1 10.562 6.28 10.562 6.5V8.49C10.562 8.57 10.592 8.64 10.642 8.7L11.002 9.06C11.542 8.86 12.162 8.79 12.762 8.89L12.752 6.5C12.752 6.28 12.932 6.1 13.152 6.1H14.912C15.132 6.1 15.312 6.28 15.312 6.5V8.89C16.402 9.08 17.242 9.73 17.692 10.69C18.282 11.97 18.032 13.25 17.432 14.24ZM13.312 15.01C13.822 14.5 14.012 13.51 13.662 12.76C13.232 11.84 12.262 11.4 11.252 11.6V14.8C11.832 14.69 12.352 14.5 12.752 14.17C12.932 14.03 13.122 13.85 13.312 13.66V15.01ZM10.762 11.4C10.012 11.59 9.31203 12.2 9.12203 12.95C8.93203 13.7 9.23203 14.61 9.98203 15.01C10.162 15.12 10.362 15.2 10.562 15.25V11.6C10.632 11.55 10.702 11.48 10.762 11.4Z"
      fill="white"
    />
  </svg>
);

export const PaymentProofSection = () => {
  const notificationVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  return (
    <section className="relative w-full h-[60vh] sm:h-[80vh] md:h-[760px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/crypto/bgimg.png"
        alt="Two women looking at a smartphone"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      {/* Overlay Image */}
      <Image
        src="/images/crypto/subset.png"
        alt="Geometric overlay"
        layout="fill"
        objectFit="cover"
        className="z-10"
      />

      {/* Floating Notification */}
      <motion.div
        className="absolute z-20 left-4 sm:left-8 md:left-16 lg:left-24 bottom-1/2 translate-y-1/2 sm:bottom-auto sm:translate-y-0 sm:top-1/2"
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.5 }}
        variants={notificationVariants}
      >
        <div className="rounded-t-2xl rounded-bl-2xl p-4 shadow-lg bg-white/60 backdrop-blur-xl border border-white/20">
          <p className="text-xs text-gray-700 mb-1">Paid for groceries!</p>
          <div className="flex items-center gap-2">
            <BitcoinIcon />
            <p className="font-semibold text-sm text-black">
              0.0012 BTC{" "}
              <span className="font-normal text-gray-600">($102)</span>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
