"use client";

// Add useScroll and useTransform imports
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { IndianRupee, Users, Landmark, ArrowUpRight, Lock } from "lucide-react";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service

// Custom hook to detect if the screen is mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint
    };
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}

export default function StickyHeroSection() {
  const containerRef = useRef(null); // Ref for the main scroll container
  const cardsRef = useRef(null); // Used to reference the cards section DOM node
  const [hasTrackedView, setHasTrackedView] = useState(false); // Track if we've already sent the view event


  // Track scroll progress of the main container - this tracks the section in the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Trigger text animation when 50% of the cards section is in view
  const areCardsInView = useInView(cardsRef, { once: false, amount: 0.3 });
  const isMobile = useIsMobile(); // Client-side hook for responsiveness

  // Variants for the text animation (from bottom to position)
  const textLineVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  // Stage 1: Cards 1 & 2 (IndianRupee, Users) - Show initially when section enters viewport
  const stage1_Opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45],
    [0, 1, 1, 0] // Start hidden, appear when section enters, stay visible, then fade out
  );
  const card1Y = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45], [-150, 0, 0, 150]); // Desktop Y for Card 1 - animate in from top, exit to bottom
  const card2Y = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45], [-150, 0, 0, 150]); // Desktop Y for Card 2 - animate in from top, exit to bottom
  const stage1_X = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45], [-150, 0, 0, 150]); // Mobile X for Stage 1 - animate in, exit

  // Stage 2: Cards 3 & 4 (Landmark, ArrowUpRight) - Appear after stage 1 fades out
  const stage2_Opacity = useTransform(
    scrollYProgress,
    [0.3, 0.45, 0.6, 0.75],
    [0, 1, 1, 0] // Hidden initially, appear when stage1 fades, then fade out
  );
  const card3Y = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.75], [-150, 0, 0, 150]); // Desktop Y for Card 3 - animate in from top, exit to bottom
  const card4Y = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.75], [-150, 0, 0, 150]); // Desktop Y for Card 4 - animate in from top, exit to bottom
  const stage2_X = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.75], [-150, 0, 0, 150]); // Mobile X for Stage 2 - animate in, exit

  // Stage 3: Card 5 (Lock) - Final card appears after stage 2 fades
  const stage3_Opacity = useTransform(
    scrollYProgress,
    [0.6, 0.75, 1],
    [0, 1, 1] // Hidden initially, appear when stage2 fades, stay visible
  );
  const card5Y = useTransform(scrollYProgress, [0.6, 0.75], [-150, 0]); // Desktop Y for Card 5 - animate in from top
  const stage3_X = useTransform(scrollYProgress, [0.6, 0.75], [-150, 0]); // Mobile X for Stage 3 - animate in

  // Tailwind CSS classes for text colors (fixed, no fading)
  const lightGray = "text-gray-300";
  const darkGray = "text-gray-600";

  useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !hasTrackedView) {
              AnalyticsService.sendEvent("UPI Trusted-tested-real-section viewed");
              setHasTrackedView(true);
              observer.unobserve(entry.target); // Stop observing after first view
            }
          },
          { threshold: 0.1 } // Trigger when 10% of the component is visible
        );
    
        if (containerRef.current) {
          observer.observe(containerRef.current);
        }
    
        return () => observer.disconnect();
      }, [hasTrackedView]);

  return (
    <div
      ref={containerRef}
      className="relative h-[400vh] bg-[#F9F9F9]"
    >
      {/* Sticky Cards Container - This will stick to the viewport */}
      <div className="sticky top-0 h-screen">
        {/* Cards Layer (Scrollable, contains both text and cards) */}
        <div
          ref={cardsRef}
          className="relative z-10 flex h-screen items-center justify-center flex-col gap-8 px-4"
        >
          {/* Text Layer (Now absolute within the cards section, scrolls with it) */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="flex flex-col items-center justify-center text-center">
              {/* TRUSTED. */}
              <motion.div
                className={`font-sans font-[400] uppercase leading-none text-6xl sm:text-7xl md:text-[200px]`}
                variants={textLineVariants}
                initial="hidden"
                animate={areCardsInView ? "visible" : "hidden"} // Animate when cards section is in view
                transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}
              >
                <span className={lightGray}>TRU</span>
                <span className={darkGray}>US</span>
                <span className={lightGray}>TED.</span>
              </motion.div>
              {/* TESTED. */}
              <motion.div
                className={`font-sans font-[400] uppercase leading-none text-6xl sm:text-7xl md:text-[200px]`}
                variants={textLineVariants}
                initial="hidden"
                animate={areCardsInView ? "visible" : "hidden"} // Animate when cards section is in view
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <span className={lightGray}>T</span>
                <span className={darkGray}>E</span>
                <span className={lightGray}>STED.</span>
              </motion.div>
              {/* REAL. */}
              <motion.div
                className={`font-sans font-[400] uppercase leading-none text-6xl sm:text-7xl md:text-[200px]`}
                variants={textLineVariants}
                initial="hidden"
                animate={areCardsInView ? "visible" : "hidden"} // Animate when cards section is in view
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              >
                <span className={darkGray}>R</span>
                <span className={lightGray}>EAL.</span>
              </motion.div>
            </div>
          </div>

          {/* STAGE 1 CARDS - Initially visible */}
          {/* Card 1 */}
          <motion.div
            className="relative z-10 border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg
                     md:absolute md:h-[650px] md:w-[525px] md:max-w-none
                     md:left-[10%] md:top-[10%] md:-translate-y-8" // Desktop positioning
            style={{
              opacity: stage1_Opacity,
              y: isMobile ? 0 : card1Y,
              x: isMobile ? stage1_X : 0,
            }}
          >
            <IndianRupee
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-200 opacity-50"
              size={300} // Large size for background icon
              strokeWidth={2}
            />
            <p className="relative z-10 text-lg font-medium text-gray-800 md:text-xl">
              <span className="font-bold">₹2.06 Cr</span> paid back
              <br />
              to users this month
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="relative z-10 border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg
                     md:absolute md:h-[650px] md:w-[525px] md:max-w-none
                     md:right-[10%] md:top-[10%] md:translate-y-8" // Desktop positioning
            style={{
              opacity: stage1_Opacity,
              y: isMobile ? 0 : card2Y,
              x: isMobile ? stage1_X : 0,
            }}
          >
            <Users
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-200 opacity-50"
              size={300} // Large size for background icon
              strokeWidth={2}
            />
            <p className="relative z-10 text-lg font-medium text-gray-800 md:text-xl">
              <span className="font-bold">50,000+</span> daily
              <br />
              active earners
            </p>
          </motion.div>

          {/* STAGE 2 CARDS - Appear after stage 1 fades */}
          {/* Card 3 */}
          <motion.div
            className="relative z-10 border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg
                     md:absolute md:h-[650px] md:w-[525px] md:max-w-none
                     md:left-[10%] md:top-[10%] md:-translate-y-8" // Desktop positioning - Same as Card 1
            style={{
              opacity: stage2_Opacity,
              y: isMobile ? 0 : card3Y,
              x: isMobile ? stage2_X : 0,
            }}
          >
            <Landmark
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-200 opacity-50"
              size={300} // Large size for background icon
              strokeWidth={2}
            />
            <p className="relative z-10 text-lg font-medium text-gray-800 md:text-xl">
              <span className="font-bold">Backed by</span> Federal
              <br />& RBL
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            className="relative z-10 border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg
                     md:absolute md:h-[650px] md:w-[525px] md:max-w-none
                     md:right-[10%] md:top-[10%] md:translate-y-8" // Desktop positioning - Same as Card 2
            style={{
              opacity: stage2_Opacity,
              y: isMobile ? 0 : card4Y,
              x: isMobile ? stage2_X : 0,
            }}
          >
            <ArrowUpRight
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-200 opacity-50"
              size={300} // Large size for background icon
              strokeWidth={2}
            />
            <p className="relative z-10 text-lg font-medium text-gray-800 md:text-xl">
              <span className="font-bold">Powered by</span>
              <br />
              Razorpay/JustPay
            </p>
          </motion.div>

          {/* STAGE 3 CARD - Final card appears after stage 2 fades */}
          {/* Card 5 */}
          <motion.div
            className="relative z-10 border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg
                     md:absolute md:h-[650px] md:w-[525px] md:max-w-none
                     md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2" // Center positioning
            style={{
              opacity: stage3_Opacity,
              y: isMobile ? 0 : card5Y,
              x: isMobile ? stage3_X : 0,
            }}
          >
            <Lock
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-200 opacity-50"
              size={300} // Large size for background icon
              strokeWidth={2}
            />
            <p className="relative z-10 text-lg font-medium text-gray-800 md:text-xl">
              <span className="font-bold">Fully encrypted</span> &
              <br />
              RBI-compliant
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}