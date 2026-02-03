"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  easeOut,
  useMotionValue,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

// Mock AnalyticsService (unchanged)
const AnalyticsService = {
  sendEvent: (eventName) => {
    console.log(`Analytics Event: ${eventName}`);
  },
};

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

// Card data (unchanged)
const cardsData = [
  {
    imageSrc: "/icons/rupee.png",
    imageAlt: "Indian Rupee",
    imageWidth: 140, 
    imageHeight: 150,
    title: "₹2.06 Cr",
    subtitle: "paid back",
    description: "to users this month",
  },
  {
    imageSrc: "/icons/users.png",
    imageAlt: "Users",
    imageWidth: 230,
    imageHeight: 240,
    title: "50,000+",
    subtitle: "daily",
    description: "active earners",
  },
  {
    imageSrc: "/icons/landmark.png",
    imageAlt: "Bank",
    imageWidth: 230,
    imageHeight: 240,
    title: "Backed by",
    subtitle: "Federal",
    description: "& RBL",
  },
  {
    imageSrc: "/icons/arrow.png",
    imageAlt: "Arrow Up Right",
    imageWidth: 230,
    imageHeight: 240,
    title: "Powered by",
    subtitle: "",
    description: "Razorpay/JustPay",
  },
  {
    imageSrc: "/icons/lock.png",
    imageAlt: "Lock",
    imageWidth: 210,
    imageHeight: 220,
    title: "Fully encrypted",
    subtitle: "&",
    description: "RBI-compliant",
  },
];

export default function StickyHeroSection() {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  const cardWrapperRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  
  // This motion value handles the inner horizontal SCROLL (carousel effect)
  const innerX = useMotionValue(0); 

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

  // --- Desktop Animations (unchanged) ---
  const card1_Opacity = useTransform(scrollYProgress, [0, 0.05, 0.26, 0.3], [0, 1, 1, 0]);
  const card1_Y = useTransform(scrollYProgress, [0, 0.12, 0.3], [600, 0, -600], { ease: easeOut });
  const card2_Opacity = useTransform(scrollYProgress, [0.02, 0.07, 0.28, 0.32], [0, 1, 1, 0]);
  const card2_Y = useTransform(scrollYProgress, [0.02, 0.14, 0.32], [500, 0, -500], { ease: easeOut });
  const card3_Opacity = useTransform(scrollYProgress, [0.26, 0.3, 0.56, 0.6], [0, 1, 1, 0]);
  const card3_Y = useTransform(scrollYProgress, [0.3, 0.42, 0.6], [450, 0, -450], { ease: easeOut });
  const card4_Opacity = useTransform(scrollYProgress, [0.28, 0.32, 0.58, 0.62], [0, 1, 1, 0]);
  const card4_Y = useTransform(scrollYProgress, [0.32, 0.44, 0.62], [500, 0, -500], { ease: easeOut });
  const card5_Opacity = useTransform(scrollYProgress, [0.56, 0.6], [0, 1]);
  const card5_Y = useTransform(scrollYProgress, [0.6, 0.75, 0.8], [500, 0, 0], { ease: easeOut });

  const lightGray = "text-[#C0C0C0]";
  const darkGray = "text-[#6A6A6A]";

  // --- Mobile-Only Animations (FIXED LOGIC) ---
  const easeOutCubic = (val) => 1 - Math.pow(1 - val, 3);

  // ⭐️ FIX: Adjusted text fade-out range to happen BEFORE cards slide in
  const textFadeStart = 0.05;
  const textFadeEnd = 0.10;

  // Text Opacity Transform (Fades out the text)
  const textOpacity = useTransform(scrollYProgress, [textFadeStart, textFadeEnd], [1, 0]);
  
  // Text Z-Index Transition (Moves text behind cards)
  const textZIndex = useTransform(scrollYProgress, [textFadeStart, textFadeEnd], [101, 0]);
  
  const backgroundTextStyle = isMobile
  ? { zIndex: 0, opacity: 1 } // ⭐️ FIX: Keep text visible, place it behind cards
  : { zIndex: 0, opacity: 1 };

  // Card Slide-in (starts right after the text fades out)
  const cardsEntranceStart = 0.10;
  const cardsEntranceEnd = 0.18; 

  const xInitial = useTransform(
    scrollYProgress,
    [cardsEntranceStart, cardsEntranceEnd], 
    [typeof window !== 'undefined' ? window.innerWidth : 768, 0] // Screen Width -> 0
  );
  
  // Opacity is static 1 for mobile cards now.

  // 2. innerX (Carousel Scroll): Separated from xInitial to prevent conflict.
  useEffect(() => {
    if (!isMobile) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const cardWrapper = cardWrapperRef.current;
      if (!cardWrapper) return;

      const scrollWidth = cardWrapper.scrollWidth;
      const containerWidth = window.innerWidth;
      const maxScroll = scrollWidth - containerWidth;
      
      // Horizontal scroll logic starts AFTER the initial slide-in is complete.
      const carouselScrollStart = cardsEntranceEnd; 
      
      if (latest > carouselScrollStart) {
        // Map the remaining scroll to the carousel scroll
        const adjustedProgress = Math.max(0, (latest - carouselScrollStart) / (1 - carouselScrollStart));
        const easedProgress = easeOutCubic(adjustedProgress);
        innerX.set(-easedProgress * maxScroll);
      } else {
        // Lock the carousel at the start point (x=0) during the slide-in animation
        innerX.set(0); 
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, innerX, isMobile]);

  // Intersection Observer for analytics (unchanged)
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
  
  // Desktop Text Styling (unchanged)
  const desktopTextStyle = 
    `relative z-10 text-[40px] font-normal text-[#6A6A6A] tracking-[-0.04em] font-sans leading-[48px]`; 

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#F9F9F9]">
      <div className="sticky top-0 h-screen">
        <div
          ref={cardsRef}
          className="relative z-10 flex h-screen items-center justify-center flex-col gap-8 px-4 overflow-hidden"
        >
          {/* Background Text - **FIXED: Fades out earlier** */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={backgroundTextStyle} 
          >
            <div className="flex flex-col items-center justify-center text-center">
              <motion.div
                className="font-sans font-[400] tracking-[-0.06em] uppercase leading-[0.8] text-6xl sm:text-7xl md:text-[200px]"
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
                className="font-sans font-[400] tracking-[-0.06em] uppercase leading-[0.8] text-6xl sm:text-7xl md:text-[200px]"
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
                className="font-sans font-[400] tracking-[-0.06em] uppercase leading-[0.8] text-6xl sm:text-7xl md:text-[200px]"
                variants={textLineVariants}
                initial="hidden"
                animate={areCardsInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              >
                <span className={darkGray}>R</span>
                <span className={lightGray}>EAL.</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Desktop Cards - (UNCHANGED) */}
          {!isMobile && (
            <>
              {/* Card 1 */}
              <motion.div
                className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:left-[18%] md:top-[10%] md:-translate-y-8"
                style={{ opacity: card1_Opacity, y: card1_Y }}
              >
                <div className="absolute top-6 left-6 opacity-75">
                  <Image
                    src="/icons/rupee.png"
                    alt="Indian Rupee"
                    width={140}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <p className={desktopTextStyle}>
                  <span className="font-medium text-[#333333]">₹2.06 Cr</span> paid back<br />to users this month
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:right-[18%] md:top-[10%] md:translate-y-8"
                style={{ opacity: card2_Opacity, y: card2_Y }}
              >
                <div className="absolute top-6 left-6 opacity-75">
                  <Image
                    src="/icons/users.png"
                    alt="Users"
                    width={230}
                    height={240}
                    className="object-contain"
                  />
                </div>
                <p className={desktopTextStyle}>
                  <span className="font-medium text-[#333333]">50,000+</span> daily<br />active earners
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:left-[18%] md:top-[10%] md:-translate-y-8"
                style={{ opacity: card3_Opacity, y: card3_Y }}
              >
                <div className="absolute top-6 left-6 opacity-75">
                  <Image
                    src="/icons/landmark.png"
                    alt="Bank"
                    width={230}
                    height={240}
                    className="object-contain"
                  />
                </div>
                <p className={desktopTextStyle}>
                  <span className="font-medium text-[#333333]">Backed by</span> Federal<br />& RBL
                </p>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:right-[18%] md:top-[10%] md:translate-y-8"
                style={{ opacity: card4_Opacity, y: card4_Y }}
              >
                <div className="absolute top-6 left-6 opacity-75">
                  <Image
                    src="/icons/arrow.png"
                    alt="Arrow Up Right"
                    width={230}
                    height={240}
                    className="object-contain"
                  />
                </div>
                <p className={desktopTextStyle}>
                  <span className="font-medium text-[#333333]">Powered by</span><br />Razorpay/JustPay
                </p>
              </motion.div>

              {/* Card 5 */}
              <motion.div
                className="absolute border-[2px] border-[#EFEFEF] flex h-[400px] w-full max-w-sm flex-col items-start justify-end overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:h-[580px] md:w-[450px] md:max-w-none md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                style={{ opacity: card5_Opacity, y: card5_Y }}
              >
                <div className="absolute top-6 left-6 opacity-75">
                  <Image
                    src="/icons/lock.png"
                    alt="Lock"
                    width={210}
                    height={220}
                    className="object-contain"
                  />
                </div>
                <p className={desktopTextStyle}>
                  <span className="font-medium text-[#333333]">Fully encrypted</span> &<br />RBI-compliant
                </p>
              </motion.div>
            </>
          )}

          {/* Mobile Cards - Horizontal Scroll (Opacity FIXED) */}
          {isMobile && (
            <motion.div 
              className="w-full h-full flex items-center bg-[#F9F9F9]"
              // Outer div handles the fast slide-in (xInitial)
              style={{ x: xInitial, opacity: 1 }}
            >
              <motion.div
                ref={cardWrapperRef}
                className="flex gap-4"
                // Inner div handles the horizontal carousel scroll (innerX)
                style={{ x: innerX }} 
              >
                {cardsData.map((card, index) => (
                  <div
                    key={index}
                    className="h-[390px] w-[315px] bg-white p-6 flex flex-col justify-end relative overflow-hidden flex-shrink-0"
                    style={{ 
                      borderRadius: '26.4px', 
                      borderWidth: '1.2px', 
                      borderColor: '#EFEFEF', 
                      minWidth: '315px',
                      boxShadow: '60px 20px 30px -20px rgba(0, 0, 0, 0.05), 80px 30px 120px -90px rgba(0, 0, 0, 0.02)',
                      zIndex: 100 - index,
                    }}
                  >
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      width={121}
                      height={150}
                      className={`absolute left-[36px] -translate-y-1/2 opacity-75 object-contain ${
                        index === 0 ? "top-[120px]" : "top-[85px]" 
                      }`}
                    />
                    <div className="z-10">
                      <h3 className="text-3xl font-medium text-[#333333] tracking-[-0.04em]">
                        {card.title}
                      </h3>
                      {card.subtitle && (
                        <p className="text-2xl text-[#6A6A6A] tracking-[-0.04em]">
                          {card.subtitle}
                        </p>
                      )}
                      <p className="text-2xl text-[#6A6A6A] mt-1 tracking-[-0.04em]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex-shrink-0 w-8" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}