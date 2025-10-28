"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  easeOut,
} from "framer-motion";
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

  // --- Card 1 ---
  const card1_Opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.26, 0.3],
    [0, 1, 1, 0]
  );
  const card1_Y = useTransform(scrollYProgress, [0, 0.12, 0.3], [600, 0, -600], {
    ease: easeOut,
  });
  const card1_X_mobile = useTransform(scrollYProgress, [0, 0.3], [-150, 150], {
    ease: easeOut,
  });

  // --- Card 2 (Offset) ---
  const card2_Opacity = useTransform(
    scrollYProgress,
    [0.02, 0.07, 0.28, 0.32],
    [0, 1, 1, 0]
  );
  const card2_Y = useTransform(
    scrollYProgress,
    [0.02, 0.14, 0.32],
    [500, 0, -500],
    {
      ease: easeOut,
    }
  );
  const card2_X_mobile = useTransform(
    scrollYProgress,
    [0.02, 0.32],
    [-150, 150],
    {
      ease: easeOut,
    }
  );

  // --- Card 3 ---
  const card3_Opacity = useTransform(
    scrollYProgress,
    [0.26, 0.3, 0.56, 0.6],
    [0, 1, 1, 0]
  );
  const card3_Y = useTransform(
    scrollYProgress,
    [0.3, 0.42, 0.6],
    [600, 0, -600],
    {
      ease: easeOut,
    }
  );
  const card3_X_mobile = useTransform(
    scrollYProgress,
    [0.3, 0.6],
    [-150, 150],
    {
      ease: easeOut,
    }
  );

  // --- Card 4 (Offset) ---
  const card4_Opacity = useTransform(
    scrollYProgress,
    [0.28, 0.32, 0.58, 0.62],
    [0, 1, 1, 0]
  );
  const card4_Y = useTransform(
    scrollYProgress,
    [0.32, 0.44, 0.62],
    [500, 0, -500],
    {
      ease: easeOut,
    }
  );
  const card4_X_mobile = useTransform(
    scrollYProgress,
    [0.32, 0.62],
    [-150, 150],
    {
      ease: easeOut,
    }
  );

  // --- Card 5 ---
  const card5_Opacity = useTransform(scrollYProgress, [0.56, 0.6], [0, 1]);
  const card5_Y = useTransform(
    scrollYProgress,
    [0.6, 0.75, 0.8],
    [500, 0, 0],
    {
      ease: easeOut,
    }
  );
  const card5_X_mobile = useTransform(
    scrollYProgress,
    [0.6, 0.8],
    [-150, 0],
    {
      ease: easeOut,
    }
  );

  const lightGray = "text-[#C0C0C0]";
  const darkGray = "text-[#6A6A6A]";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("UPI - Trusted-Tested-Real section viewed");
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
              <motion.div
                className={`font-sans font-[400] tracking-[-0.06em] uppercase leading-[0.8] text-6xl sm:text-7xl md:text-[200px]`}
                variants={textLineVariants}
                initial="hidden"
                animate={areCardsInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}
              >
                <span className={lightGray}>TR</span>
                <span className={darkGray}>US</span>
                <span className={lightGray}>TED.</span>
              </motion.div>
              <motion.div
                className={`font-sans font-[400] tracking-[-0.06em] uppercase leading-[0.8] text-6xl sm:text-7xl md:text-[200px]`}
                variants={textLineVariants}
                initial="hidden"
                animate={areCardsInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <span className={lightGray}>T</span>
                <span className={darkGray}>E</span>
                <span className={lightGray}>STED.</span>
              </motion.div>
              <motion.div
                className={`font-sans font-[400] tracking-[-0.06em] uppercase leading-[0.8] text-6xl sm:text-7xl md:text-[200px]`}
                variants={textLineVariants}
                initial="hidden"
                animate={areCardsInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              >
                <span className={darkGray}>R</span>
                <span className={lightGray}>EAL.</span>
              </motion.div>
            </div>
          </div>

          {/* Card 1 */}
          <motion.div
            className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:left-[18%] md:top-[10%] md:-translate-y-8"
            style={{
              opacity: card1_Opacity,
              y: isMobile ? 0 : card1_Y,
              x: isMobile ? card1_X_mobile : 0,
            }}
          >
            <Image
              src="/icons/rupee.png"
              alt="Indian Rupee"
              width={140}
              height={150}
              className="absolute top-[30%] left-6 -translate-y-1/2 opacity-75 object-contain"
            />
            <p className="relative z-10 text-[40px]  font-regular text-[#6A6A6A] tracking-[-0.04em] ">
              <span className="font-medium text-[#333333]">₹2.06 Cr</span> paid
              back
              <br />
              to users this month
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:right-[18%] md:top-[10%] md:translate-y-8"
            style={{
              opacity: card2_Opacity,
              y: isMobile ? 0 : card2_Y,
              x: isMobile ? card2_X_mobile : 0,
            }}
          >
            <Image
              src="/icons/users.png"
              alt="Users"
              width={230}
              height={240}
              className="absolute top-[30%] left-6 -translate-y-1/2 opacity-75 object-contain"
            />
            <p className="relative z-10 text-[40px]  font-regular text-[#6A6A6A] tracking-[-0.04em] ">
              <span className="font-medium text-[#333333]">50,000+</span> daily
              <br />
              active earners
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:left-[18%] md:top-[10%] md:-translate-y-8"
            style={{
              opacity: card3_Opacity,
              y: isMobile ? 0 : card3_Y,
              x: isMobile ? card3_X_mobile : 0,
            }}
          >
            <Image
              src="/icons/landmark.png"
              alt="Bank"
              width={230}
              height={240}
              className="absolute top-[25%] left-6 -translate-y-1/2 opacity-75 object-contain"
            />
            <p className="relative z-10 text-[4to users this month/40px]  font-regular text-[#6A6A6A] tracking-[-0.04em]">
              <span className="font-medium text-[#333333]">Backed by</span>{" "}
              Federal
              <br />& RBL
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:right-[18%] md:top-[10%] md:translate-y-8"
            style={{
              opacity: card4_Opacity,
              y: isMobile ? 0 : card4_Y,
              x: isMobile ? card4_X_mobile : 0,
            }}
          >
            <Image
              src="/icons/arrow.png"
              alt="Arrow Up Right"
              width={230}
              height={240}
              className="absolute top-[25%] left-6 -translate-y-1/2 opacity-75 object-contain"
            />
            <p className="relative z-10 text-[40px]  font-regular text-[#6A6A6A] tracking-[-0.04em] ">
              <span className="font-medium text-[#333333]">Powered by</span>
              <br />
              Razorpay/JustPay
            </p>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
            style={{
              opacity: card5_Opacity,
              y: isMobile ? 0 : card5_Y,
              x: isMobile ? card5_X_mobile : 0,
            }}
          >
            <Image
              src="/icons/lock.png"
              alt="Lock"
              width={210}
              height={220}
              className="absolute top-[30%] left-6 -translate-y-1/2 opacity-75 object-contain"
            />
            <p className="relative z-10 text-[40px] font-regular text-[#6A6A6A] tracking-[-0.04em]">
              <span className="font-medium text-[#333333]">
                Fully encrypted
              </span>{" "}
              &
              <br />
              RBI-compliant
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}