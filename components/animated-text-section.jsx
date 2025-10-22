"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { AnalyticsService } from "@/services/analyticsService";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}

export default function StickyHeroSection() {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const areCardsInView = useInView(cardsRef, { once: false, amount: 0.3 });
  const isMobile = useIsMobile();

  const textLineVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  const stage1_Opacity = useTransform(scrollYProgress, [0, 0.05, 0.20, 0.25], [0, 1, 1, 0]);
  const card1Y = useTransform(scrollYProgress, [0, 0.25], [150, -150]);
  const card2Y = useTransform(scrollYProgress, [0, 0.25], [150, -150]);
  const stage1_X = useTransform(scrollYProgress, [0, 0.25], [-150, 150]);

  const stage2_Opacity = useTransform(scrollYProgress, [0.20, 0.25, 0.45, 0.50], [0, 1, 1, 0]);
  const card3Y = useTransform(scrollYProgress, [0.25, 0.5], [150, -150]);
  const card4Y = useTransform(scrollYProgress, [0.25, 0.5], [150, -150]);
  const stage2_X = useTransform(scrollYProgress, [0.25, 0.5], [-150, 150]);

  const stage3_Opacity = useTransform(scrollYProgress, [0.45, 0.50], [0, 1]);
  const card5Y = useTransform(scrollYProgress, [0.5, 0.6], [150, 0]);
  const stage3_X = useTransform(scrollYProgress, [0.5, 0.6], [-150, 0]);

  const lightGray = "text-[#C0C0C0]";
  const darkGray = "text-[#6A6A6A]";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("UPI Trusted-tested-real-section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#F9F9F9]">
      <div className="sticky top-0 h-screen">
        <div
          ref={cardsRef}
          className="relative z-10 flex h-screen items-center justify-center flex-col gap-8 px-4 overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="flex flex-col items-center justify-center text-center">
              <motion.div className={`font-sans font-[400] tracking-[-0.06em] uppercase leading-none text-6xl sm:text-7xl md:text-[200px]`} variants={textLineVariants} initial="hidden" animate={areCardsInView ? "visible" : "hidden"} transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}>
                <span className={lightGray}>TR</span><span className={darkGray}>US</span><span className={lightGray}>TED.</span>
              </motion.div>
              <motion.div className={`font-sans font-[400] tracking-[-0.06em] uppercase leading-none text-6xl sm:text-7xl md:text-[200px]`} variants={textLineVariants} initial="hidden" animate={areCardsInView ? "visible" : "hidden"} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>
                <span className={lightGray}>T</span><span className={darkGray}>E</span><span className={lightGray}>STED.</span>
              </motion.div>
              <motion.div className={`font-sans font-[400] tracking-[-0.06em] uppercase leading-none text-6xl sm:text-7xl md:text-[200px]`} variants={textLineVariants} initial="hidden" animate={areCardsInView ? "visible" : "hidden"} transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}>
                <span className={darkGray}>R</span><span className={lightGray}>EAL.</span>
              </motion.div>
            </div>
          </div>

          {/* Card 1 - Stays at top-[30%] */}
          <motion.div className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:left-[18%] md:top-[10%] md:-translate-y-8" style={{ opacity: stage1_Opacity, y: isMobile ? 0 : card1Y, x: isMobile ? stage1_X : 0, }}>
            <Image
              src="/icons/rupee.png"
              alt="Indian Rupee"
              width={160}
              height={180}
              className="absolute top-[30%] left-6 -translate-y-1/2 opacity-50 object-contain"
            />
            <p className="relative z-10 text-[40px]  font-regular text-[#6A6A6A] tracking-[-0.04em] "><span className="font-medium text-[#333333]">₹2.06 Cr</span> paid back<br />to users this month</p>
          </motion.div>

          {/* Card 2 - Moved to top-[25%] */}
          <motion.div className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:right-[18%] md:top-[10%] md:translate-y-8" style={{ opacity: stage1_Opacity, y: isMobile ? 0 : card2Y, x: isMobile ? stage1_X : 0, }}>
            <Image
              src="/icons/users.png"
              alt="Users"
              width={160}
              height={180}
              className="absolute top-[25%] left-6 -translate-y-1/2 opacity-50 object-contain"
            />
            <p className="relative z-10 text-[40px]  font-regular text-[#6A6A6A] tracking-[-0.04em] "><span className="font-medium text-[#333333]">50,000+</span> daily<br />active earners</p>
          </motion.div>

          {/* Card 3 - Moved to top-[25%] */}
          <motion.div className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:left-[18%] md:top-[10%] md:-translate-y-8" style={{ opacity: stage2_Opacity, y: isMobile ? 0 : card3Y, x: isMobile ? stage2_X : 0, }}>
            <Image
              src="/icons/landmark.png"
              alt="Bank"
              width={160}
              height={180}
              className="absolute top-[25%] left-6 -translate-y-1/2 opacity-50 object-contain"
            />
            <p className="relative z-10 text-[40px]  font-regular text-[#6A6A6A] tracking-[-0.04em]"><span className="font-medium text-[#333333]">Backed by</span> Federal<br />& RBL</p>
          </motion.div>

          {/* Card 4 - Moved to top-[25%] */}
          <motion.div className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:right-[18%] md:top-[10%] md:translate-y-8" style={{ opacity: stage2_Opacity, y: isMobile ? 0 : card4Y, x: isMobile ? stage2_X : 0, }}>
            <Image
              src="/icons/arrow.png"
              alt="Arrow Up Right"
              width={160}
              height={180}
              className="absolute top-[25%] left-6 -translate-y-1/2 opacity-50 object-contain"
            />
            <p className="relative z-10 text-[40px]  font-regular text-[#6A6A6A] tracking-[-0.04em] "><span className="font-medium text-[#333333]">Powered by</span><br />Razorpay/JustPay</p>
          </motion.div>

          {/* Card 5 - Moved to top-[25%] */}
          <motion.div className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2" style={{ opacity: stage3_Opacity, y: isMobile ? 0 : card5Y, x: isMobile ? stage3_X : 0, }}>
            <Image
              src="/icons/lock.png"
              alt="Lock"
              width={160}
              height={180}
              className="absolute top-[25%] left-6 -translate-y-1/2 opacity-50 object-contain"
            />
            <p className="relative z-10 text-[40px] font-regular text-[#6A6A6A] tracking-[-0.04em]"><span className="font-medium text-[#333333]">Fully encrypted</span> &<br />RBI-compliant</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}