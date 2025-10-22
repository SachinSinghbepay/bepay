"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Eye, Snowflake, Clock, Settings } from "lucide-react";
import { AnalyticsService } from "@/services/analyticsService";

// NOTE: Please adjust these import paths to match your project structure
import { Button } from "@/components/ui/button";
import WaitlistTriggerButton from "./waitlist-trigger-button";

export default function CreditCardSection() {
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);

  const handleStartClick = () => {
    console.log("CTA button clicked!");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("UPI credit-card-section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Phases 1 & 2
  const cardRotate = useTransform(scrollYProgress, [0.1, 0.5], [0, isMobile ? -90 : -90]);
  const cardScale = useTransform(scrollYProgress, [0.1, 0.5], [1, 0.4]);
  const cardX = useTransform(scrollYProgress, [0.1, 0.5], [isMobile ? "-100%" : "0%", "41%"]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "-45%"]);
  const mockupOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const mockupY = useTransform(scrollYProgress, [0.2, 0.6], ["-100%", "0%"]);
  const mockupX = useTransform(scrollYProgress, [0.2, 0.6], [isMobile ? "0%" : "-100%", "0%"]);
  const line1X = useTransform(scrollYProgress, [0.6, 0.65], ["0%", "-100%"]);
  const line1Opacity = useTransform(scrollYProgress, [0.6, 0.65], [1, 0]);
  const line2X = useTransform(scrollYProgress, [0.62, 0.67], ["0%", "-100%"]);
  const line2Opacity = useTransform(scrollYProgress, [0.62, 0.67], [1, 0]);
  const line3X = useTransform(scrollYProgress, [0.64, 0.69], ["0%", "-100%"]);
  const line3Opacity = useTransform(scrollYProgress, [0.64, 0.69], [1, 0]);
  const line4X = useTransform(scrollYProgress, [0.66, 0.71], ["0%", "-100%"]);
  const line4Opacity = useTransform(scrollYProgress, [0.66, 0.71], [1, 0]);

  // Phase 3: Card stack animation - FIXED: Removed stackContainer Y transform
  const stackOpacity = useTransform(scrollYProgress, [0.7, 0.75], [0, 1]);
  const card1Y = useTransform(scrollYProgress, [0.75, 0.8], ["0%", "-200%"]);
  const card1Rotate = useTransform(scrollYProgress, [0.75, 0.8], [0, 15]);
  const card1Opacity = useTransform(scrollYProgress, [0.75, 0.8], [1, 0]);
  const card2Y = useTransform(scrollYProgress, [0.8, 0.85], ["0%", "-200%"]);
  const card2Rotate = useTransform(scrollYProgress, [0.8, 0.85], [0, -10]);
  const card2Opacity = useTransform(scrollYProgress, [0.8, 0.85], [1, 0]);
  const card3Y = useTransform(scrollYProgress, [0.85, 0.9], ["0%", "-200%"]);
  const card3Rotate = useTransform(scrollYProgress, [0.85, 0.9], [0, 20]);
  const card3Opacity = useTransform(scrollYProgress, [0.85, 0.9], [1, 0]);
  const card4Y = useTransform(scrollYProgress, [0.9, 0.95], ["0%", "-200%"]);
  const card4Rotate = useTransform(scrollYProgress, [0.9, 0.95], [0, -15]);
  const card4Opacity = useTransform(scrollYProgress, [0.9, 0.95], [1, 0]);
  const card5Scale = useTransform(scrollYProgress, [0.95, 1.0], [1, 1.1]);

  // Phase 4: CTA Button animation
  const ctaOpacity = useTransform(scrollYProgress, [0.95, 1.0], [0, 1]);
  const ctaScale = useTransform(scrollYProgress, [0.95, 1.0], [0.8, 1]);

  return (
    <div className="relative bg-[#F9F9F9]">
      <section ref={sectionRef} className="relative min-h-[1000vh] max-w-[1500px] mx-auto">
        <div className="sticky top-0 h-[130vh] w-full flex flex-col overflow-hidden">
          {/* Title */}
          <div className="absolute top-0 left-0 right-0 z-10">
            <div className="flex flex-col items-start justify-center px-4 text-start md:px-6 w-full">
              <h1 className="relative z-10 font-[400] leading-none tracking-tight">
                <motion.span
                  initial={{ opacity: 0, y: 50 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.8, delay: 0.2 }} 
                  viewport={{ once: false, amount: 0.5 }}
                  className="block font-regular text-[60px] text-[#C0C0C0] tracking-[-0.08em] sm:text-[80px] md:text-[120px] 3xl:text-[160px]"
                >
                  The only <span className="text-[#333333]">card</span> you&apos;ll
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.8, delay: 0.4 }} 
                  viewport={{ once: false, amount: 0.5 }}
                  className="block text-[60px] text-[#C0C0C0] text-regular tracking-[-0.08em] sm:text-[80px] md:text-[120px] 3xl:text-[160px]"
                >
                  ever need!
                </motion.span>
              </h1>
            </div>
          </div>

          {/* Main Content */}
          <div className="absolute top-48 left-0 mt-28 right-0 z-20 flex flex-col md:flex-row items-center md:items-center justify-between w-full px-4 md:px-6 h-1/2">
            {/* Left side content */}
            <div className="relative md:w-1/2 lg:w-2/5 text-lg text-[#666666] space-y-0 h-full">
              {/* Original content */}
              <motion.p style={{ x: line1X, opacity: line1Opacity }}>
                Meet the <span className="font-semibold text-[#333333]">bepay RuPay Credit</span>
              </motion.p>
              <motion.p style={{ x: line2X, opacity: line2Opacity }}>
                <span className="font-semibold text-[#333333]">Card — designed for rewards,</span>
              </motion.p>
              <motion.p style={{ x: line3X, opacity: line3Opacity }}>
                <span className="font-semibold text-[#333333]">lifestyle, zero</span> and
              </motion.p>
              <motion.p style={{ x: line4X, opacity: line4Opacity }}>
                <span className="font-semibold text-[#333333]">compromise.</span>
              </motion.p>

              {/* FIXED: Container for both Cards and CTA - Removed stackContainer Y transform */}
              <motion.div
                style={{ opacity: stackOpacity }}
                className="absolute inset-0 flex flex-col items-center justify-center md:-mt-24"
              >
                {/* Card Stack */}
                <div className="relative w-full max-w-[400px] aspect-square">
                  <motion.div 
                    style={{ y: card1Y, rotate: card1Rotate, opacity: card1Opacity, zIndex: 5 }} 
                    className="absolute inset-0 transform"
                  >
                    <Image 
                      src="/cardupi.png" 
                      alt="Card 1" 
                      fill 
                      priority 
                      sizes="400px" 
                      style={{ objectFit: "contain" }} 
                    />
                  </motion.div>
                  <motion.div 
                    style={{ y: card2Y, rotate: card2Rotate, opacity: card2Opacity, zIndex: 4 }} 
                    className="absolute inset-0 transform"
                  >
                    <Image 
                      src="/cardupi2.png" 
                      alt="Card 2" 
                      fill 
                      priority 
                      sizes="400px" 
                      style={{ objectFit: "contain" }} 
                    />
                  </motion.div>
                  <motion.div 
                    style={{ y: card3Y, rotate: card3Rotate, opacity: card3Opacity, zIndex: 3 }} 
                    className="absolute inset-0 transform"
                  >
                    <Image 
                      src="/cardupi3.png" 
                      alt="Card 3" 
                      fill 
                      priority 
                      sizes="400px" 
                      style={{ objectFit: "contain" }} 
                    />
                  </motion.div>
                  <motion.div 
                    style={{ y: card4Y, rotate: card4Rotate, opacity: card4Opacity, zIndex: 2 }} 
                    className="absolute inset-0 transform"
                  >
                    <Image 
                      src="/cardupi4.png" 
                      alt="Card 4" 
                      fill 
                      priority 
                      sizes="400px" 
                      style={{ objectFit: "contain" }} 
                    />
                  </motion.div>
                  <motion.div 
                    style={{ scale: card5Scale, zIndex: 1 }} 
                    className="absolute inset-0 transform"
                  >
                    <Image 
                      src="/cardupi5.png" 
                      alt="Card 5" 
                      fill 
                      priority 
                      sizes="400px" 
                      style={{ objectFit: "contain" }} 
                    />
                  </motion.div>
                   <motion.div 
                    style={{ scale: card5Scale, zIndex: 1 }} 
                    className="absolute inset-0 transform"
                  >
                    <Image 
                      src="/cardupi6.png" 
                      alt="Card 6" 
                      fill 
                      priority 
                      sizes="400px" 
                      style={{ objectFit: "contain" }} 
                    />
                  </motion.div>
                  
                </div>
                
                {/* FIXED: CTA is now properly visible */}
                <motion.div 
                  style={{ opacity: ctaOpacity, scale: ctaScale }} 
                  className="mt-8"
                >
                  <WaitlistTriggerButton triggerSource="UPI Saving section button">
                    <Button
                      className="bg-black cursor-pointer text-white rounded-full px-5 py-8 text-base font-medium flex items-center gap-2 hover:bg-black/90 transition-colors"
                      onClick={handleStartClick}
                    >
                      <Image src="/wal2.png" alt="Wallet icon" width={20} height={20} />
                      Get your bepay card now
                    </Button>
                  </WaitlistTriggerButton>
                </motion.div>
              </motion.div>
            </div>

            {/* Right side: Mobile Mockup and Credit Card */}
            <div className="relative md:w-1/2 lg:w-1/2 flex items-center justify-center">
              <motion.div 
                style={{ opacity: mockupOpacity, y: mockupY, x: mockupX }} 
                className="max-w-[360px] w-full h-[660px] border-[7px] border-gray-200 rounded-[40px] bg-white shadow-xl flex flex-col items-center p-4 overflow-hidden"
              >
                <div className="flex w-full border rounded-full justify-between mb-4">
                  <div className="px-4 py-3 w-1/2 bg-black text-white rounded-full text-sm">
                    Card
                  </div>
                  <div className="px-8 py-3 w-1/2 whitespace-nowrap text-gray-600 rounded-full text-sm">
                    Bank account
                  </div>
                </div>
                <div className="relative w-full h-[180px] bg-white rounded-xl"></div>
                <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                  <div className="flex flex-col items-center text-gray-500 text-xs">
                    <div className="p-3 rounded-full border border-gray-200 mb-1">
                      <Eye className="w-5 h-5" />
                    </div>
                    View
                  </div>
                  <div className="flex flex-col items-center text-gray-500 text-xs">
                    <div className="p-3 rounded-full border border-gray-200 mb-1">
                      <Snowflake className="w-5 h-5" />
                    </div>
                    Freeze
                  </div>
                  <div className="flex flex-col items-center text-gray-500 text-xs">
                    <div className="p-3 rounded-full border border-gray-200 mb-1">
                      <Clock className="w-5 h-5" />
                    </div>
                    Limit
                  </div>
                  <div className="flex flex-col items-center text-gray-500 text-xs">
                    <div className="p-3 rounded-full border border-gray-200 mb-1">
                      <Settings className="w-5 h-5" />
                    </div>
                    Settings
                  </div>
                </div>
                <div className="mt-auto w-full space-y-3">
                  <button className="w-full py-3 bg-gray-100 rounded-full text-gray-800 font-medium">
                    Apply virtual card
                  </button>
                  <button className="w-full py-3 bg-gray-100 rounded-full text-gray-800 font-medium">
                    Apply physical card
                  </button>
                </div>
              </motion.div>
              <motion.div 
                style={{ 
                  rotate: cardRotate, 
                  scale: cardScale, 
                  x: cardX, 
                  y: cardY, 
                  position: "absolute", 
                  top: "20%", 
                  right: "40%", 
                  width: "clamp(500px, 50vw, 900px)", 
                  aspectRatio: "1/1" 
                }} 
                className="z-50"
              >
                <Image 
                  src="/creditcard.png" 
                  alt="Credit card mockup" 
                  fill 
                  className="absolute z-50 p-2" 
                  priority 
                  sizes="(max-width: 768px) 40vw, 60vw" 
                  style={{ objectFit: "contain" }} 
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}