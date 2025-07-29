"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, X } from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "How quickly can I start?",
    answer:
      "Within 24 hours post-verification. Most plugins are live in 15-30 minutes.",
  },
  {
    id: 2,
    question: "Do I need to understand crypto?",
    answer:
      "Not at all! Our platform handles all the technical complexity. You just need to set up your account and start accepting payments. We provide simple guides and 24/7 support to help you get started.",
  },
  {
    id: 3,
    question: "Is there a monthly fee?",
    answer:
      "No monthly fees! We only charge a small transaction fee when you receive payments. There are no setup costs, monthly subscriptions, or hidden charges.",
  },
  {
    id: 4,
    question: "Which cryptos are supported?",
    answer:
      "We support all major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), USDC, USDT, and many more. Our platform automatically handles conversions and settlements.",
  },
  {
    id: 5,
    question: "Do you offer customer support?",
    answer:
      "Yes! We provide 24/7 customer support through live chat, email, and phone. Our team of experts is always ready to help you with any questions or issues.",
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
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function FAQSection() {
  const [openItems, setOpenItems] = useState([1]); // First item open by default

  const toggleItem = (id) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="pb-16 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-[80px] font-[400] text-gray-900 mb-12 lg:mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          FAQ<span className="text-gray-400">s</span>
        </motion.h2>

        <motion.div
          className="space-y-4 lg:space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqData.map((faq) => {
            const isOpen = openItems.includes(faq.id);

            return (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="border-b border-gray-200 pb-4 lg:pb-6"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between text-left group focus:outline-none"
                >
                  <h3 className="text-xl md:text-2xl lg:text-[32px] font-medium text-gray-900 leading-tight pr-4 group-hover:text-gray-700 transition-colors duration-200">
                    {faq.question}
                  </h3>

                  <motion.div
                    className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {isOpen ? (
                      <X
                        className="w-6 h-6 rotate-45  lg:w-[64px] lg:h-[64px] text-[#6A6A6A]"
                        strokeWidth={1}
                      />
                    ) : (
                      <Plus
                        className="w-6 h-6 lg:w-[64px] lg:h-[64px] text-[#C0C0C0]"
                        strokeWidth={1}
                      />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 lg:pt-6 pr-12 lg:pr-16">
                        <p className="text-sm md:text-base lg:text-[16px] text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
