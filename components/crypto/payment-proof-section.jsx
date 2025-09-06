"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
        loading="lazy"
        className="z-0"
      />

      {/* Overlay Image */}
      <Image
        src="/images/crypto/subset.png"
        alt="Geometric overlay"
        layout="fill"
        objectFit="cover"
        loading="lazy"
        className="z-10"
      />

      {/* Floating Notification */}
      <motion.div
  className="absolute z-20 left-[22%] bottom-1/2 translate-y-[169%] lg:left-[38%] lg:translate-y-[180%] sm:bottom-auto sm:translate-y-0 sm:top-1/2"
  initial="hidden"
  whileInView="visible"
  exit="hidden"
  viewport={{ once: false, amount: 0.5 }}
  variants={notificationVariants}
>
  <div className="rounded-t-2xl rounded-br-2xl p-2 sm:p-3 shadow-lg bg-white/30 backdrop-blur-xl border border-white/20 transform -translate-x-3 translate-y-2">
  <p className="text-[10px] font-semibold text-gray-700 mb-1">Paid for groceries!</p>
  <div className="flex items-center gap-1 sm:gap-2">
    <Image
      src={"/bitcoin.png"}
      alt="bitcoin"
      height={24}
      width={24}
      loading="lazy"
      className="object-cover"
    />
    <p className="font-semibold text-[12px] sm:text-sm text-black">
      0.0012 BTC{" "}
      <span className="font-semibold text-gray-600 text-[10px]">($102)</span>
    </p>
  </div>
</div>
</motion.div>


    </section>
  );
};
