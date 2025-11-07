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
          className="w-full px-4 z-10 pt-12 flex flex-col items-center" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h1
              className="text-[24px] font-medium leading-[28px] tracking-[-0.04em] text-center"
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
              className="text-[#6A6A6A] text-[14px] font-medium leading-[19px] tracking-[0%] text-center max-w-xs mx-auto"
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

          <WaitlistTriggerButton triggerSource="become a merchant on bepay button" buttonLocation="merchant_section_business">
            <motion.button
              variants={itemVariants}
              onClick={handleButtonClick}
              className="flex items-center justify-center gap-2 bg-black text-white px-6 h-[56px] rounded-full mt-10 hover:bg-gray-800 transition-colors text-xs font-medium"
            >
              <span>Become a merchant now</span>
              <ArrowUpRight size={20}/>
            </motion.button>
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
            loading="lazy"
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
            <WaitlistTriggerButton triggerSource="become a merchant on bepay button" buttonLocation="merchant_section_business">
  <motion.div
    variants={itemVariants}
    className="flex flex-col sm:flex-row lg:flex-col max-w-[300px] sm:max-w-none lg:max-w-[300px] gap-4"
  >
    <button
      onClick={handleButtonClick}
      className="bg-black w-[250px] h-[56px] text-white text-[14px] font-medium rounded-full flex items-center justify-center gap-2 py-4 px-6 cursor-pointer whitespace-nowrap hover:bg-gray-800 transition-colors"
    >
      Become a merchant
     <ArrowUpRight
      className="w-5 h-7 flex-shrink-0"
      strokeWidth={1.5}
    />
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
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
