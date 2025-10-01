"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function JoinImpactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="w-full bg-[#F1F1F1] py-16 md:py-20 lg:py-24 flex flex-col items-center justify-center text-center px-4"
    >
      <div className="mb-8">
        <Image
          src="/images/foundation/user.png"
          width={200}
          height={200}
          alt="User group icon"
          className="mx-auto "
        />
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-[#080808] sm:text-4xl md:text-[36px] mb-4">
        Join us in building impact
      </h2>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl">
        Rooted in Responsibility. Committed to Communities.
      </p>
      <p className="text-xl lg:text-2xl font-semibold text-gray-900">
        Reach out:{" "}
        <a
          href="mailto:info@bepay.money"
          className="text-blue-600 hover:underline"
        >
          info@bepay.money
        </a>
      </p>
    </motion.section>
  );
}
