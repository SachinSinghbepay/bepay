"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Wallet } from "lucide-react";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service

/* ───────────────────────────────────────── */

export default function FdSection() {
  /* big wrapper we pin against */
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false); // Track if we've already sent the view event

  /* scroll progress from 0-1 while we’re inside the section */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    /* the section is 200 vh tall and its content is sticky,
           so progress runs while the user scrolls through that space */
    offset: ["start start", "end start"],
  });

  // ✅ CORRECTED: Remove the 'spring' helper function and call useSpring directly
  const item2OpacityTransform = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const item2YTransform = useTransform(scrollYProgress, [0.05, 0.2], [40, 0]);
  const item2Opacity = useSpring(item2OpacityTransform, { stiffness: 120, damping: 20 });
  const item2Y = useSpring(item2YTransform, { stiffness: 120, damping: 20 });

  const item3OpacityTransform = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const item3YTransform = useTransform(scrollYProgress, [0.2, 0.35], [40, 0]);
  const item3Opacity = useSpring(item3OpacityTransform, { stiffness: 120, damping: 20 });
  const item3Y = useSpring(item3YTransform, { stiffness: 120, damping: 20 });

  const item4OpacityTransform = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const item4YTransform = useTransform(scrollYProgress, [0.35, 0.5], [40, 0]);
  const item4Opacity = useSpring(item4OpacityTransform, { stiffness: 120, damping: 20 });
  const item4Y = useSpring(item4YTransform, { stiffness: 120, damping: 20 });

  const buttonOpacityTransform = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const buttonYTransform = useTransform(scrollYProgress, [0.5, 0.65], [40, 0]);
  const buttonOpacity = useSpring(buttonOpacityTransform, { stiffness: 120, damping: 20 });
  const buttonY = useSpring(buttonYTransform, { stiffness: 120, damping: 20 });

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

  return (
    /* 200 vh of space so the user has room to scroll;
        the sticky child stays fixed during that time              */
    <section ref={sectionRef} className="relative min-h-[300vh]">
      {/* sticky “card” that sits in the viewport while the user scrolls */}
      <motion.div
        className="sticky top-0 flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 md:p-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* ─────────── Top text block ─────────── */}
        <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 lg:gap-40 gap-8 mb-14">
          <div className="text-center lg:text-left">
            <p className="text-sm text-gray-500 mb-2">
              Your FD Just Got Upgraded
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-[400] leading-tight">
              <span className="text-gray-800">FDs</span>{" "}
              <span className="text-gray-400">that actually</span>
              <br />
              <span className="text-gray-400">pay</span>
            </h1>
          </div>
          <div className="text-center lg:text-left text-gray-700 leading-relaxed lg:mt-16">
            While others offer 4‑6%, we give you{" "}
            <span className="font-bold text-gray-800">9%*</span>
            <br />
            Just{" "}
            <span className="font-bold text-gray-800">
              safe&secure
            </span>{" "}
            returns.
            <br />
            <span className="font-bold text-gray-800">
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
            className="relative w-full max-w-[642px] h-[250px] md:h-[300px] lg:h-[350px] flex flex-col items-center justify-center text-lg md:text-xl font-medium text-gray-700 bg-gray-50 p-6 rounded-full"
            style={{
              boxShadow:
                "inset 10px 10px 20px 0px #0000001A, inset -10px -10px 30px 0px #FFFFFF",
              border: "2px solid transparent",
              borderImage:
                "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, #F5F5F5 100%) 1",
            }}
          >
            <p className="mb-2">
              Invest <span className="font-bold"> ₹1,00,000 today</span>{" "}
            </p>

            {/* sequential reveals driven by scroll progress */}
            <motion.p
              className="mb-2"
              style={{ opacity: item2Opacity, y: item2Y }}
            >
              Earn <span className="font-bold">₹9,000</span> annually
            </motion.p>

            <motion.p
              className="mb-2"
              style={{ opacity: item3Opacity, y: item3Y }}
            >
              That&apos;s <span className="font-bold">₹750</span> extra every month!
            </motion.p>

            <motion.p
              className="mb-4"
              style={{ opacity: item4Opacity, y: item4Y }}
            >
              Just for parking your money
            </motion.p>

            <motion.button
              style={{ opacity: buttonOpacity, y: buttonY }}
              className="inline-flex items-center rounded-full px-4 py-2 h-10 bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Start earning 9%* today
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}