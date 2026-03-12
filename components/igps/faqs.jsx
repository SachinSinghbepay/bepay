"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { AnalyticsService } from "@/services/analyticsService";

// FAQ content — matched and expanded from product copy
const faqData = [
  {
    id: 1,
    question: "What currencies does bepay IGPS support?",
    answer:
      "We support over 30 major global currencies, including USD, EUR, GBP, AED, CNY and INR, plus major stablecoins for instant settlement where permitted.",
  },
  {
    id: 2,
    question: "How do I get started with bepay IGPS?",
    answer:
      "Sign up, complete a quick KYB, add your business details, and activate your preferred corridors. The process typically takes under 5 minutes for standard accounts.",
  },
  {
    id: 3,
    question: "What documents are required for onboarding?",
    answer:
      "Basic KYB documentation is required and varies by business type and region (for example: company registration, proof of address, and ID for authorized signatories).",
  },
  {
    id: 4,
    question: "Can I withdraw funds to my local bank account?",
    answer:
      "Yes, you can withdraw to your domestic bank account in your local currency anytime.",
  },
  {
    id: 5,
    question: "Is bepay IGPS safe & regulated ?",
    answer:
      "Yes, licensed as  RBI’s PA-CB(Payment Aggregator Cross Border), FEMA,  MSB (USA), VASP (EU), and compliant with DORA, MiCA, DPDP & CFT.",
  },
  {
    id: 6,
    question: "Are there any account maintenance or setup fees?",
    answer: "No, creating and maintaining your bepay IGPS global account is free.",
  },
  {
    id: 7,
    question: "What can I do with my multi-currency bank account?",
    answer:
      "Receive global payments, collect marketplace payouts, generate statements, convert currencies, and withdraw to your local bank account.",
  },
  {
    id: 8,
    question: "How do I get my e-FIRA / FIRC documents?",
    answer:
      "We automate this completely, as soon as an inward remittance is settled into your account, a digital FIRA/FIRC is generated instantly and available to download from your dashboard.",
  },
  {
    id: 9,
    question: "Are there any limits on transaction volume?",
    answer:
      "bepay IGPS is built for B2B trade and supports high-value transactions for exporters, importers, and large enterprises. Specific limits/tiering depend on KYB and corridor rules, contact support for custom volume needs.",
  },
  {
    id: 10,
    question: "How do I check the status of my payments?",
    answer:
      "You can track every transaction in real time through your dashboard, including routing, FX, settlements, and compliance documents.",
  },
  {
    id: 11,
    question: "Does bepay IGPS support stablecoin-based rails?",
    answer:
      "Yes, wherever permitted by regulation, stablecoin rails can be used for faster settlement and lower fees, paired with full compliance controls.",
  },
  {
    id: 12,
    question: "Which stablecoins are supported?",
    answer:
      "bepay IGPS supports major stablecoins such as USDC, USDT and USDG where corridors and regulation allow, exact availability depends on region and corridor.",
  },
  {
    id: 13,
    question: "Do you support receiving payments from Amazon?",
    answer:
      "Yes, you can receive your Amazon marketplace payouts directly into your bepay IGPS multi-currency virtual accounts.",
  },
  {
    id: 14,
    question: "Do you provide customer support?",
    answer: "Yes, 24/7 support with priority handling for global merchants.",
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
  const [openItems, setOpenItems] = useState([1]);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("igps_faqs_page_viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  const formatQuestionForEvent = (question) => {
    return question
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[?]/g, "");
  };

  const toggleItem = (faq) => {
    const questionIsCurrentlyOpen = openItems.includes(faq.id);
    const formattedQuestion = formatQuestionForEvent(faq.question);

    if (questionIsCurrentlyOpen) {
      const eventName = `on_faq_${formattedQuestion}_closed`;
      AnalyticsService.sendEvent(eventName, {
        faq_id: faq.id,
        question: faq.question,
      });
    } else {
      const eventName = `on_faq_${formattedQuestion}_opened`;
      AnalyticsService.sendEvent(eventName, {
        faq_id: faq.id,
        question: faq.question,
      });
    }

    setOpenItems((prev) =>
      prev.includes(faq.id)
        ? prev.filter((item) => item !== faq.id)
        : [...prev, faq.id]
    );
  };


  return (
    <section ref={sectionRef} className="pb-16 bg-[#F9F9F9]">
      {/* ✅ ADDED: pt-16 for mobile and md:pt-0 to reset on larger screens */}
      <div className="max-w-7xl mx-auto px-4 pt-8 md:pt-0">
        <motion.h2
          // ✅ REMOVED: margin classes from here
          className="text-4xl md:text-5xl lg:text-[80px] font-[400] text-gray-900 mb-8 lg:mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          FAQ<span className="text-[#C0C0C0]">s</span>
        </motion.h2>

        <motion.div
          className="space-y-4 lg:space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Always render first 7 items */}
          {faqData.slice(0, 7).map((faq) => {
            const isOpen = openItems.includes(faq.id);

            return (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="border-b border-gray-200 pb-4 lg:pb-6"
              >
                <button
                  onClick={() => toggleItem(faq)}
                  className="w-full flex items-center justify-between text-left group focus:outline-none"
                >
                  <h3 className="text-xl md:text-2xl lg:text-[32px] font-medium text-black leading-tight pr-4 group-hover:text-gray-700 transition-colors duration-200">
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

          {/* Render remaining items with animation */}
          <AnimatePresence>
            {showAll && (
              <motion.div
                key="extra-faqs"
                variants={{
                  hidden: { height: 0, opacity: 0 },
                  visible: {
                    height: "auto",
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      ease: "easeInOut",
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-4 lg:space-y-8 overflow-hidden"
              >
                {faqData.slice(7).map((faq) => {
                  const isOpen = openItems.includes(faq.id);

                  return (
                    <motion.div
                      key={faq.id}
                      variants={itemVariants}
                      className="border-b border-gray-200 pb-4 lg:pb-6"
                    >
                      <button
                        onClick={() => toggleItem(faq)}
                        className="w-full flex items-center justify-between text-left group focus:outline-none"
                      >
                        <h3 className="text-xl md:text-2xl lg:text-[32px] font-medium text-black leading-tight pr-4 group-hover:text-gray-700 transition-colors duration-200">
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
            )}
          </AnimatePresence>

          {/* View all / View less toggle */}
          {faqData.length > 7 && (
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => {
                  const willShowAll = !showAll;
                  AnalyticsService.sendEvent(
                    willShowAll
                      ? "igps_faqs_view_all_clicked"
                      : "igps_faqs_view_less_clicked"
                  );
                  setShowAll(willShowAll);
                }}
                className="text-sm md:text-base text-[#080808] hover:underline focus:outline-none"
                aria-expanded={showAll}
              >
                {showAll ? "View less" : "View all"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}