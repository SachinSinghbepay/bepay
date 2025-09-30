"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import WaitlistTriggerButton from "../waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService";

export default function MerchantSection() {
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Tailwind's 'lg' breakpoint
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("Merchant section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasTrackedView]);

  const handleButtonClick = () => {
    AnalyticsService.sendEvent("Become a merchant on bepay Clicked");
  };

  if (isMobile) {
    // =================================================================
    // MOBILE VIEW
    // =================================================================
    return (
      <section
        ref={sectionRef}
        className="relative w-full min-h-screen bg-[#F9F9F9] overflow-hidden flex flex-col items-center"
      >
        <motion.div
          className="w-full px-4 text-center z-10 pt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h1
              className="text-[24px] font-medium leading-[26px] tracking-[-0.04em] text-center"
              style={{ fontFamily: "Montserrat", fontWeight: 500 }}
            >
              <span className="text-[#C0C0C0]">Become a merchant</span>
              <br />
              <span className="text-[#C0C0C0]">on </span>
              <span className="text-[#333333] font-medium">
                bepay business today!
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6">
            <p
              className="text-[#6A6A6A] text-[12px] font-medium leading-[16px] tracking-[0%] text-center max-w-xs mx-auto"
              style={{ fontFamily: "Montserrat", fontWeight: 500 }}
            >
              <span className="text-[#6A6A6A]">
                Experience the power of receiving
              </span>{" "}
              <span className="font-semibold text-gray-900">
                lightning fast global payments
              </span>{" "}
              <span className="text-[#6A6A6A]">for your business!</span>
            </p>
          </motion.div>

          <WaitlistTriggerButton triggerSource="'Merchant section' button">
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center mt-10"
            >
              <button
                onClick={handleButtonClick}
                className="bg-black cursor-pointer text-white hover:bg-black/90 transition-colors duration-200 flex items-center justify-center rounded-full gap-[10px] 
                           font-semibold text-[12px] font-600 leading-none tracking-normal"
                style={{
                  width: "230px",
                  height: "56px",
                  padding: "16px 24px",
                  fontFamily: "Open Sans",
                }}
              >
                Become a merchant now
                {/* ✅ ADDED strokeWidth PROP */}
                <ArrowUpRight
                  className="w-5 h-7 flex-shrink-0"
                  strokeWidth={1.5}
                />
              </button>
            </motion.div>
          </WaitlistTriggerButton>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[280px] z-0"
          initial={{ y: "40%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <Image
            src="/images/business/mocup.png"
            alt="Bepay merchant mobile app interface"
            width={280}
            height={650}
            className="w-full h-auto"
            priority
            style={{
              filter:
                "drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.1)) drop-shadow(-10px -10px 20px #FFFFFF)",
            }}
          />
        </motion.div>
      </section>
    );
  }

  // =================================================================
  // DESKTOP VIEW
  // =================================================================
  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-[#F9F9F9] py-12 md:py-20 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="space-y-6 lg:space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-[60px] font-montserrat-heading-light leading-tight lg:leading-[60px] tracking-tighter">
                <span className="text-[#C0C0C0] lg:whitespace-nowrap">
                  Become a{" "}
                </span>
                <span className="font-montserrat-heading-dark test-[#333333]">
                  merchant
                </span>
                <br />
                on{" "}
                <span className="text-[#333333] font-montserrat-heading-dark">
                  bepay business
                </span>{" "}
                <span className="text-[#333333]">today!</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-md">
                Experience the power of receiving{" "}
                <span className="font-semibold text-gray-900">
                  lightning fast global payments for your business!
                </span>{" "}
              </p>
            </motion.div>
            <WaitlistTriggerButton triggerSource="'Merchant section' button">
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row lg:flex-col max-w-[300px] sm:max-w-none lg:max-w-[300px] gap-4"
              >
                <button
                  onClick={handleButtonClick}
                  className="bg-black w-[210px] cursor-pointer whitespace-nowrap text-white text-[12px] font-medium hover:bg-black/90 transition-colors duration-200 flex items-center justify-center h-[56px] rounded-[100px] gap-[10px] py-4 px-6"
                >
                  Become a merchant
                  {/* ✅ ADDED strokeWidth PROP */}
                  <ArrowUpRight
                    className="w-7 h-7 flex-shrink-0"
                    strokeWidth={2}
                  />
                </button>
                <button className="w-[210px] border-2 cursor-pointer border-gray-300 text-gray-700 text-[12px] font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center h-[56px] rounded-[100px] gap-[10px] py-4 px-6">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Talk to us
                </button>
              </motion.div>
            </WaitlistTriggerButton>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
              <Image
                src="/images/business/mocup.png"
                alt="Bepay merchant mobile app interface"
                width={400}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
