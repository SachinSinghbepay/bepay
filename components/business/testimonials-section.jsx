"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonialsData = [
  {
    id: 1,
    avatar: "/images/business/t1.png",
    companyLogo:
      "/images/business/t1l.png",
    quote:
      "Integrating bepay into our store was shockingly simple. In under 10 minutes, we were accepting crypto payments from customers around the world. The dashboard gives us full control and visibility over our sales in real-time.",
    name: "Anya R.",
    role: "Co-founder, GreenFork Organics",
  },
  {
    id: 2,
    avatar: "/images/business/t2.png",
    companyLogo:
      "/images/business/t21.png",
    quote:
      "I've tried other crypto payment solutions, but bepay is by far the smoothest. The onboarding was easy, the QR payment system works like magic, and our international customers love the flexibility.",
    name: "James T.",
    role: "Owner, Print & Pixel Studio",
  },
  {
    id: 3,
    avatar: "/images/business/t3.png",
    companyLogo:
      "/images/business/t21.png",
    quote:
      "What sold me on bepay was the ability to run my entire crypto shop inside one app. I can manage products, view transactions, and even track merchant ratings — all in one sleek dashboard.",
    name: "Sara L.",
    role: "Founder, NFTee Market",
  },
  {
    id: 4,
    avatar: "/images/business/t1.png",
    companyLogo:
      "/images/business/t21.png",
    quote:
      "With bepay, I no longer worry about delayed or failed payments. Funds hit my non-custodial wallet instantly. Plus, the crypto debit card for customers has boosted our sales like never before.",
    name: "Rohan S.",
    role: "CEO, CryptoKart India",
  },
  {
    id: 5,
    avatar: "/images/business/t1.png",
    companyLogo:
      "/images/business/t21.png",
    quote:
      "bepay made accepting crypto at my café effortless. We get paid directly to our wallet with zero middlemen. My team just scans and serves — no technical headaches.",
    name: "Luis M.",
    role: "Café Owner, BrewBlock BCN",
  },
  {
    id: 6,
    avatar: "/images/business/t1.png",
    companyLogo:
      "/images/business/t21.png",
    quote:
      "The analytics dashboard is incredible. Real-time transaction monitoring, customer insights, and seamless integration with our existing systems. bepay transformed how we handle digital payments.",
    name: "Alex K.",
    role: "CTO, TechFlow Solutions",
  },
];

const titleVariants = {
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.8 },
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

export default function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-7xl font-[400] text-[#6A6A6A] leading-tight max-w-4xl"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          What our customers are saying
        </motion.h2>
      </div>

      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        {/* Marquee Container */}
        <div className="flex pb-24 overflow-hidden">
          <motion.div
            className="flex gap-6 lg:gap-8"
            animate={{
              x: [0, -100 * testimonialsData.length],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* First set of cards */}
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={`first-${testimonial.id}`}
                variants={cardVariants}
                className="flex-shrink-0 bg-white rounded-2xl p-6 lg:p-8 w-80 lg:w-96 h-auto lg:h-[471px] flex flex-col justify-between"
                style={{
                  boxShadow: "20px 20px 60px 0px rgba(0, 0, 0, 0.08)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-16 h-16 border-[4px] drop-shadow-xl border-white rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={`${testimonial.name} avatar`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-10 h-10  rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.companyLogo || "/placeholder.svg"}
                        alt="Company logo"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <blockquote className="text-gray-700 text-base lg:text-lg leading-relaxed mb-6">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                </div>

                <div className="text-gray-600 text-sm lg:text-base">
                  — {testimonial.name}, {testimonial.role}
                </div>
              </motion.div>
            ))}

            {/* Duplicate set for seamless loop */}
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={`second-${testimonial.id}`}
                variants={cardVariants}
                className="flex-shrink-0 bg-white rounded-2xl p-6 lg:p-8 w-80 lg:w-96 h-auto lg:h-[471px] flex flex-col justify-between"
                style={{
                  boxShadow: "20px 20px 60px 0px rgba(0, 0, 0, 0.08)",
                }}
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={`${testimonial.name} avatar`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.companyLogo || "/placeholder.svg"}
                        alt="Company logo"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <blockquote className="text-[#333333] text-[14px] leading-relaxed mb-6">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                </div>

                <div className="text-[#333333] text-sm">
                  — {testimonial.name}, {testimonial.role}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
