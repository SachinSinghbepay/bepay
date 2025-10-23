"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Wallet } from "lucide-react";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service
import WaitlistTriggerButton from "./waitlist-trigger-button";

/* ───────────────────────────────────────── */

export default function FdSection() {
  /* big wrapper we pin against */
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false); // Track if we've already sent the view event

  /* scroll progress from 0-1 while we're inside the section */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    /* the section is 200 vh tall and its content is sticky,
            so progress runs while the user scrolls through that space */
    offset: ["start start", "end start"],
  });

  // ✅ CORRECTED: Remove the 'spring' helper function and call useSpring directly
  const item2OpacityTransform = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const item2Opacity = useSpring(item2OpacityTransform, { stiffness: 120, damping: 20 });

  const item3OpacityTransform = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const item3Opacity = useSpring(item3OpacityTransform, { stiffness: 120, damping: 20 });

  const item4OpacityTransform = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const item4Opacity = useSpring(item4OpacityTransform, { stiffness: 120, damping: 20 });

  const buttonOpacityTransform = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const buttonOpacity = useSpring(buttonOpacityTransform, { stiffness: 120, damping: 20 });

  // Container upward movement as content appears
  /* ▼▼▼ CHANGED THIS ▼▼▼ */
  const containerYTransform = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.5, 0.65],
    // Start even lower (80px below center) and move up to 0 (center)
    [80, 60, 40, 20, 0]
  );
  /* ▲▲▲ CHANGED THIS ▲▲▲ */
  const containerY = useSpring(containerYTransform, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("UPI FD-section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target); // Stop observing after first view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  // ANALYTICS: Handler for the CTA button click
  const handleCTAClick = () => {
    AnalyticsService.sendEvent("UPI FD-section CTA clicked");
  };

  return (
    /* 200 vh of space so the user has room to scroll;
        the sticky child stays fixed during that time        */
    <section ref={sectionRef} className="relative min-h-[300vh]">
      {/* sticky "card" that sits in the viewport while the user scrolls */}
      <motion.div
        className="sticky top-0 flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 md:p-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* ─────────── Top text block ─────────── */}
        <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 lg:gap-40 gap-8 mb-14">
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-6 mb-7">
              <p className="text-[14px] text-semibold font-[600] text-[#6A6A6A] whitespace-nowrap">
                Your FD Just Got upgraded
              </p>
              <div className="hidden lg:block h-[1px] w-full bg-gradient-to-r from-[#E1E1E1] to-transparent" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-[400] leading-[60px]">
              <span className="text-[#333333] tracking-[-0.08em]">FDs</span>{" "}
              <span className="text-[#C0C0C0] tracking-[-0.08em]">that actually</span>
              <br />
              <span className="text-[#C0C0C0] tracking-[-0.08em]">pay</span>
            </h1>
          </div>
          <div className="text-center lg:text-left text-[#6A6A6A] text-[20px] leading-relaxed lg:mt-12">
            While others offer 4‑6%,{" "}
            <span className="font-bold text-[#333333]"> we give you 9%*</span>
            <br />
            Just{" "}
            <span className="font-bold text-[#333333]">
              safe & secure
            </span>{" "}
            returns.
            <br />
            <span className="font-bold text-[#333333]">
              Compound interest
            </span>{" "}
            that grows monthly.
          </div>
        </div>

        {/* ─────────── Bottom block ─────────── */}
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-10">
          {/* left image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[642px] h-[250px] md:h-[300px] lg:h-[350px] rounded-full overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src="/fdimg.png"
              fill
              priority
              alt="Woman looking at phone with excitement"
              className="object-cover object-center rounded-[50px]"
            />
          </motion.div>

          {/* right rounded box */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-[642px] h-[250px] md:h-[300px] lg:h-[350px] flex flex-col items-center justify-center text-lg md:text-xl font-medium text-[#6A6A6A] bg-gray-50 p-6 rounded-full overflow-hidden"
            style={{
              boxShadow:
                "inset 10px 10px 20px 0px #0000001A, inset -10px -10px 30px 0px #FFFFFF",
              border: "2px solid transparent",
              borderImage:
                "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, #F5F5F5 100%) 1",
            }}
          >
            <motion.div
              className="flex flex-col items-center"
              style={{
                y: containerY,
              }}
            >
              <p className="mb-2"> {/* Removed mt-50, added mb-2 */}
                Invest <span className="font-bold text-[#333333]"> ₹1,00,000 today</span>{" "}
              </p>

              {/* sequential reveals driven by scroll progress */}
              <motion.p
                className="mb-2"
                style={{ opacity: item2Opacity }}
              >
                Earn <span className="font-bold text-[#333333]">₹9,000</span> annually
              </motion.p>

              <motion.p
                className="mb-2"
                style={{ opacity: item3Opacity }}
              >
                That&apos;s <span className="font-bold text-[#333333]">₹750</span> extra every month!
              </motion.p>

              <motion.p
                className="mb-4"
                style={{ opacity: item4Opacity }}
              >
                Just for <span className="font-bold text-[#333333]">parking your money</span>
              </motion.p>
              <WaitlistTriggerButton triggerSource="UPI FD section">
                <motion.button
                  onClick={handleCTAClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    opacity: buttonOpacity,
                  }}
                  className="flex items-center justify-center gap-2 w-[250px] h-[56px] rounded-full bg-black text-white text-[14px] font-medium px-6 py-4 hover:bg-black/90 transition-colors"
                >
                  <Wallet className="w-4 h-4" />
                  Start earning 9%* today
                </motion.button>
              </WaitlistTriggerButton>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}