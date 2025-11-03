"use client";
import Image from "next/image";
import { useRef, useState, useEffect, forwardRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Wallet } from "lucide-react";
import { AnalyticsService } from "@/services/analyticsService";
import WaitlistTriggerButton from "./waitlist-trigger-button";

/* ───────────────────────────────────────── */

// 🔑 FIX: Wrap component in forwardRef to accept external ref
const FdSection = forwardRef(function FdSection(props, ref) {
  // 🔑 FIX: Use the forwarded ref (ref) if available, otherwise use a local one
  const internalRef = useRef(null);
  const sectionRef = ref || internalRef;
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // --- Mobile Viewport Detection ---
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
    const media =
      typeof window !== "undefined"
        ? window.matchMedia("(max-width: 1023px)")
        : null;
    const listener = () => setIsMobile(media ? media.matches : false);

    if (media) {
      listener();
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
    return () => {}; // Cleanup function for safety
  }, []);

  // --- Scroll Progress ---
  const [scrollTarget, setScrollTarget] = useState(undefined);

  useEffect(() => {
    // We set the target ref *after* mount to ensure .current is hydrated
    // This avoids the framer-motion "ref not hydrated" error
    setScrollTarget(sectionRef);
  }, [sectionRef]); // Depend on sectionRef

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start start", "end end"],
  });

  // --- Animation Definitions ---

  // 1. DESKTOP ANIMATIONS
  const desktopItem1Opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 0.65], [1, 1, 1]),
    { stiffness: 120, damping: 20 }
  );
  const desktopItem2Opacity = useSpring(
    useTransform(scrollYProgress, [0.05, 0.2, 0.5, 0.65], [0, 1, 1, 1]),
    { stiffness: 120, damping: 20 }
  );
  const desktopItem3Opacity = useSpring(
    useTransform(scrollYProgress, [0.2, 0.35, 0.5, 0.65], [0, 1, 1, 1]),
    { stiffness: 120, damping: 20 }
  );
  const desktopItem4Opacity = useSpring(
    useTransform(scrollYProgress, [0.35, 0.5, 0.5, 0.65], [0, 1, 1, 1]),
    { stiffness: 120, damping: 20 }
  );
  const desktopButtonOpacity = useSpring(
    useTransform(scrollYProgress, [0.5, 0.65], [0, 1]),
    { stiffness: 120, damping: 20 }
  );

  // 2. MOBILE ANIMATIONS
  const mobileTextGroupOpacity = useSpring(
    useTransform(scrollYProgress, [0.5, 0.65], [1, 0]),
    { stiffness: 120, damping: 20 }
  );
  const mobileTextGroupY = useSpring(
    useTransform(scrollYProgress, [0.5, 0.65], [0, -30]),
    { stiffness: 120, damping: 20 }
  );

  const mobileButtonOpacity = useSpring(
    useTransform(scrollYProgress, [0.5, 0.65], [0, 1]),
    { stiffness: 120, damping: 20 }
  );
  const mobileButtonY = useSpring(
    useTransform(scrollYProgress, [0.5, 0.65], [30, 0]),
    { stiffness: 120, damping: 20 }
  );

  // 3. SHARED ANIMATION
  const containerYTransform = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.5, 0.65],
    [80, 60, 40, 20, 0]
  );
  const containerY = useSpring(containerYTransform, {
    stiffness: 120,
    damping: 20,
  });

  // --- Analytics Tracking ---
  useEffect(() => {
    // Only run observer if the ref is valid
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("UPI FD-section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current; // Capture ref.current
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasTrackedView, sectionRef]); // Re-run if ref or state changes

  const handleCTAClick = () => {
    AnalyticsService.sendEvent("start_earining_button_clicked");
  };

  // This check is now safe because useScroll target is set in useEffect
  if (isMobile === undefined) {
    return null;
  }

  return (
    // 🔑 FIX: Attach the sectionRef
    <section ref={sectionRef} className="relative min-h-[300vh]">
      <motion.div
        className="sticky top-0 flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 md:p-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* ─────────── Mobile-only text block ─────────── */}
        <div className="block lg:hidden text-left mt-2 w-full max-w-md">
          <h1 className="text-[44.63px] md:text-5xl font-[400] leading-[38px] mb-5">
            <span className="text-[#333333] tracking-[-0.08em]">FDs</span>{" "}
            <span className="text-[#C0C0C0] tracking-[-0.08em]">
              that <br /> actually pay
            </span>
            <br />
          </h1>
          <div className="text-left text-[#6A6A6A] text-[14px] leading-relaxed">
            While others offer 4-6%,{" "}
            <span className="font-bold text-[#333333]">we provide upto 9%*</span>
            <br />{" "}
            <span className="font-bold text-[#333333]">Safe & secure</span>{" "}
            returns and{" "}
            <span className="font-bold text-[#333333]">compound interest</span>{" "}
            that grows monthly.
          </div>
        </div>

        {/* ─────────── Desktop-Only text block ─────────── */}
        <div className="hidden lg:grid max-w-7xl grid-cols-1 lg:grid-cols-2 lg:gap-40 gap-8 mb-14">
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-6 mb-7">
              <p className="text-[14px] text-semibold font-[600] text-[#6A6A6A] whitespace-nowrap">
                Your FD Just Got upgraded
              </p>
              <div className="hidden lg:block h-[1px] w-full bg-gradient-to-r from-[#E1E1E1] to-transparent" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-[400] leading-[60px]">
              <span className="text-[#333333] tracking-[-0.08em]">FDs</span>{" "}
              <span className="text-[#C0C0C0] tracking-[-0.08em]">
                that actually
              </span>
              <br />
              <span className="text-[#C0C0C0] tracking-[-0.08em]">pay</span>
            </h1>
          </div>
          <div className="text-center lg:text-left text-[#6A6A6A] text-[20px] leading-relaxed lg:mt-12">
            While others offer 4‑6%,{" "}
            <span className="font-bold text-[#333333]"> we provide upto 9%*</span>
            <br />
            Just <span className="font-bold text-[#333333]">
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
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-10 mt-7">
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
              loading="lazy"
              alt="Woman looking at phone with excitement"
              className="object-cover object-center rounded-[50px]"
            />
          </motion.div>

          {/* right rounded box */}
          <motion.div
            initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-[642px] h-[250px] md:h-[300px] lg:h-[350px] flex flex-col items-center justify-center text-[12px] md:text-xl font-medium text-[#6A6A6A] bg-gray-50 p-6 rounded-full overflow-hidden"
            style={{
              boxShadow:
                "inset 10px 10px 20px 0px #0000001A, inset -10px -10px 30px 0px #FFFFFF",
              border: "2px solid transparent",
              borderImage:
                "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, #F5F5F5 100%) 1",
            }}
          >
            {/* The absolute positioning wrapper */}
            <motion.div
              className={
                isMobile
                  ? "relative w-full h-full flex items-center justify-center"
                  : "flex flex-col items-center"
              }
              style={{
                y: isMobile ? 0 : containerY, // Only apply Y transform on desktop
              }}
            >
              {/* TEXT GROUP WRAPPER */}
              <motion.div
                className={
                  isMobile
                    ? "absolute inset-0 flex flex-col items-center justify-center"
                    : "flex flex-col items-center"
                }
                style={{
                  opacity: isMobile ? mobileTextGroupOpacity : 1,
                  y: isMobile ? mobileTextGroupY : 0,
                }}
              >
                <motion.p
                  className="mb-2"
                  style={{
                    opacity: isMobile ? 1 : desktopItem1Opacity,
                  }}
                >
                  Invest{" "}
                  <span className="font-bold text-[#333333]">
                    {" "}
                    ₹1,00,000 today
                  </span>{" "}
                </motion.p>
                <motion.p
                  className="mb-2"
                  style={{
                    opacity: isMobile ? 1 : desktopItem2Opacity,
                  }}
                >
                  Earn <span className="font-bold text-[#333333]">₹9,000</span>{" "}
                  annually
                </motion.p>
                <motion.p
                  className="mb-2"
                  style={{
                    opacity: isMobile ? 1 : desktopItem3Opacity,
                  }}
                >
                  That&apos;s{" "}
                  <span className="font-bold text-[#333333]">₹750</span> extra
                  every month!
                </motion.p>
                <motion.p
                  className="mb-4"
                  style={{
                    opacity: isMobile ? 1 : desktopItem4Opacity,
                  }}
                >
                  Just for{" "}
                  <span className="font-bold text-[#333333]">
                    parking your money
                  </span>
                </motion.p>
              </motion.div>

              {/* BUTTON WRAPPER */}
              <motion.div
                className={
                  isMobile
                    ? "absolute inset-0 flex items-center justify-center"
                    : "relative"
                }
                style={{
                  opacity: isMobile
                    ? mobileButtonOpacity
                    : desktopButtonOpacity,
                  y: isMobile ? mobileButtonY : 0,
                }}
              >
              <WaitlistTriggerButton
  triggerSource="'Start Earning' button"
  buttonLocation="fd_section"
>
  <motion.button
    onClick={handleCTAClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="
      mx-auto flex items-center justify-center gap-2
      rounded-full bg-black text-white font-medium 
      transition-colors
      text-[12px] px-6 h-[48px]   /* 📱 mobile-optimized dimensions */
      sm:text-[14px] sm:px-6 sm:h-[56px]  /* 💻 keep desktop same */
    "
  >
    <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />
    <span className="whitespace-nowrap">
      Start earning 9%* today
    </span>
  </motion.button>
</WaitlistTriggerButton>

              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

// 🔑 FIX: Export the forwardRef-wrapped component
export default FdSection;
