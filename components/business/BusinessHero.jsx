"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import {
  Zap,
  DollarSign,
  Globe,
  Layers,
  Plug,
  Clock,
  CheckCircle,
} from "lucide-react";
import { addToWaitlist } from "@/lib/firebase";
import { usePathname } from "next/navigation";
import { AnalyticsService } from "@/services/analyticsService";
import WaitlistTriggerButton from "../waitlist-trigger-button";

// --- FONT OPTIMIZATION ---
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap", // Critical for text LCP
});
// -------------------------

const BusinessHero = () => {
  const containerRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(null); // null = not yet determined
  const [screenWidth, setScreenWidth] = useState(0);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  const mobileXValue = useMotionValue(0);
  const mobileYValue = useMotionValue(0);
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("business_page_viewed");
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

  const handleLogoClick = () => {
    AnalyticsService.sendEvent("on_bepay_logo_clicked");
  };

  const [hasFocusedEmail, setHasFocusedEmail] = useState(false);

  const handleEmailFocus = () => {
    if (!hasFocusedEmail) {
      AnalyticsService.sendEvent("on_email_field_focused");
      setHasFocusedEmail(true);
    }
  };

  const handleEmailButtonSubmit = () => {
    AnalyticsService.sendEvent("on_join_waitlist_clicked");
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting || isSuccess) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setSubmitMessage("Please enter a valid email address.");
      setTimeout(() => setSubmitMessage(""), 3000);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const { campaignId: newCampaignId } = await addToWaitlist(
        email,
        pathname
      );
      localStorage.setItem("campaignId", newCampaignId);
      localStorage.setItem("waitlist_submitted_email" + pathname, email);
      AnalyticsService.createWaitlistUser(email, {
        joined_via: "waitlist_form",
      });
      setIsSuccess(true);
      setIsSubmitted(true);
      setSubmitMessage(
        "You're now on our exclusive waitlist. We'll notify you when we're ready!"
      );
      AnalyticsService.sendEvent("waitlist_submission_successful", {
        status: "success",
        email,
      });
    } catch (error) {
      const errorMessage =
        error.message || "Failed to join waitlist. Please try again.";
      setError(errorMessage);
      setSubmitMessage(errorMessage);
      setTimeout(() => setSubmitMessage(""), 3000);
      AnalyticsService.sendEvent("waitlist_submission_failed", {
        status: "failure",
        error_reason: errorMessage || "Unknown error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      // Using 1024px (lg breakpoint) to separate mobile/desktop
      setIsMobile(width < 1024);
      setScreenWidth(width);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- DESKTOP ANIMATION VALUES ---
  const leftCardRotate = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const leftCardX = useTransform(scrollYProgress, [0, 1], [-240, 0]);
  const leftCardY = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const imageX = useTransform(scrollYProgress, [0.5, 1], [0, -200]);
  const imageOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
  const leftCardScale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const imageScale = useTransform(scrollYProgress, [0, 1], [0.9, 0.8]);

  // --- MOBILE ANIMATION VALUES ---
  const mobileMockupY = useTransform(scrollYProgress, [0, 0.5], [0, -1200]);
  const mobileContentY = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);
  const mobileContentOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.6],
    [0, 1]
  );

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 1) {
        setShowContent(true);
      } else if (latest < 0.9) {
        setShowContent(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const contentItems = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "30-second",
      subtitle: "settlements",
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: "Low fees",
      subtitle: "(0.5 - 1.5%)",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Global payments",
      subtitle: "(180+ countries)",
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Multi-currency",
      subtitle: "support",
    },
    {
      icon: <Plug className="w-5 h-5" />,
      title: "Plug & play",
      subtitle: "APIs",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "5 minutes",
      subtitle: "set up",
    },
  ];

  // Prevent flash of desktop content on mobile - wait until screen size is determined
  if (isMobile === null) {
    return (
      <div ref={containerRef} className={`${montserrat.variable} font-sans relative h-[200vh]`}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <section className="bg-[#F9F9F9] h-full flex items-center justify-center">
            {/* Optional: Add a subtle loading indicator or just empty space */}
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`${montserrat.variable} font-sans relative h-[200vh]`}> {/* Applied font variable */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <section className="bg-[#F9F9F9] h-full flex flex-col justify-start pt-6 md:pt-0">
          {isMobile ? (
            // ===================================
            // MOBILE VIEW (LCP Optimized)
            // ===================================
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col relative">
              <div className="text-center mb-4 max-w-[95%] mx-auto">
                {/* LCP Text: Applied Next.js font class */}
                <h1 className={`${montserrat.className} font-medium text-[28px] leading-[32px] tracking-[-0.07em] uppercase mb-4 text-[#333333]`}>
                  <>
                    <span className="text-[#C0C0C0] font-normal">Accept</span>{" "}
                    stablecoins.{" "}
                    <span className="text-[#C0C0C0] font-normal">Grow</span>{" "}
                    globally.
                  </>
                </h1>
                <p className="text-[#6A6A6AE5] text-base text-left mb-4 leading-[20px]">
                  Join{" "}
                  <span className="text-[#080808] font-semibold">
                    1,000+ businesses
                  </span>{" "}
                  using bepay to process crypto payments with{" "}
                  <span className="text-[#080808] font-semibold">
                    30-second settlements
                  </span>{" "}
                  and up to{" "}
                  <span className="text-[#080808] font-semibold">
                    70% lower fees
                  </span>{" "}
                  than traditional processors
                </p>
              </div>
              <div className="relative">
                <motion.div
                  className="absolute inset-x-0 top-0 flex justify-center"
                  style={{ y: mobileMockupY }}
                >
                  <div className="relative w-[85vw] max-w-[380px]">
                    {/* LCP Image: Mockup Frame */}
                    <Image
                      src="/images/business/video_mockup.svg"
                      alt="Bepay video mockup frame"
                      width={380}
                      height={211}
                      className="w-full h-auto"
                      priority // <-- CRITICAL LCP IMAGE
                    />
                    <div
                      className="absolute overflow-hidden shadow-lg"
                      style={{
                        width: "87%",
                        aspectRatio: "16/9",
                        borderRadius: "20px",
                        top: "14%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      {/* Video Optimization */}
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata" // <-- Optimization: Load minimal data first
                        poster="/images/business/video_mockup.svg" // <-- CRITICAL: Efficient static poster for LCP
                      >
                        <source
                          src="/videos/crypto/business_mockup.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </motion.div>
                {/* ... (Rest of Mobile content remains the same) ... */}
                <motion.div
                  className="absolute inset-0 top-0 pt-0 flex flex-col items-center justify-start gap-8 z-10"
                  style={{ y: mobileContentY, opacity: mobileContentOpacity }}
                >
                  <div className="flex flex-col gap-3">
                    {contentItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-black">
                          {item.icon}
                        </div>
                        <div className="whitespace-nowrap leading-6">
                          <span className="font-semibold text-black text-sm">
                            {item.title}
                          </span>
                          <span className="text-gray-500 text-sm ml-1.5">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Waitlist form... (unchanged) */}
                  <div className="w-full max-w-[285px]">
                    {!isSubmitted ? (
                      <form
                        onSubmit={handleEmailSubmit}
                        className="flex flex-col gap-3 w-full"
                      >
                        <div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={handleEmailFocus}
                            placeholder="Enter your email"
                            className="w-full h-[56px] px-6 placeholder:text-sm text-black rounded-full border border-gray-300 text-base focus:outline-none focus:border-gray-500"
                            required
                          />
                          {submitMessage && !isSuccess && (
                            <div className="text-red-500 text-xs text-center mt-2">
                              {submitMessage}
                            </div>
                          )}
                        </div>
                        <WaitlistTriggerButton
                          onClick={handleEmailButtonSubmit}
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-black w-full h-[56px] cursor-pointer text-white whitespace-nowrap px-6 rounded-full font-medium text-xs hover:bg-black/90 transition-colors flex items-center justify-center gap-[10px] disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            "Join the Waitlist"
                          )}
                        </WaitlistTriggerButton>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-bg-gray-100 rounded-3xl shadow-md px-8 py-6 text-center w-[320px] flex flex-col items-center gap-3"
                      >
                        <CheckCircle className="w-8 h-8 text-green-600" />

                        <p className="text-black font-semibold text-lg">
                          Yay! You&apos;re on the waitlist.
                        </p>

                        <p className="text-gray-500 text-sm leading-relaxed">
                          We&apos;ll email you as soon as we launch.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            // ===================================
            // DESKTOP VIEW (LCP Optimized)
            // ===================================
            <div className="h-full">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                <div className="text-center mb-4 max-w-[95%] mx-auto">
                  {/* LCP Text: Applied Next.js font class */}
                  <h1 className={`${montserrat.className} text-l sm:text-4xl lg:text-[70px] xl:text-[80px] 3xl:text-[100px] font-[300] leading-[0.5] mb-1 -mt-14`}>
                    <span className="font-light text-[90px] leading-[80px] tracking-[-0.1em] uppercase text-[#C0C0C0]">
                      ACCEPT
                    </span>
                    <span className="font-normal text-[90px] leading-[80px] tracking-[-0.09em] ml-4 uppercase text-[#333333]">
                      STABLECOINS.
                    </span>
                    <br />
                    <span className="font-light text-[90px] leading-[80px] tracking-[-0.1em] uppercase text-[#C0C0C0]">
                      GROW
                    </span>
                    <span className="font-normal text-[90px] ml-4 leading-[80px] tracking-[-0.09em] uppercase text-[#333333]">
                      GLOBALLY.
                    </span>
                  </h1>
                  <p className="text-[#6A6A6AE5] text-center text-base sm:text-lg md:text-[16px] max-w-[986px] mx-auto leading-relaxed px-4 sm:px-6">
                    Join{" "}
                    <span className="text-[#080808] font-semibold">
                      1,000+ businesses
                    </span>{" "}
                    using bepay to process crypto payments with{" "}
                    <span className="text-[#080808] font-semibold">
                      30-second settlements
                    </span>{" "}
                    and up to <br />{" "}
                    <span className="text-[#080808] font-semibold">
                      70% lower fees
                    </span>{" "}
                    than traditional processors
                  </p>
                </div>

                <div
                  className="relative w-full flex justify-center items-center"
                  style={{ minHeight: "60vh" }}
                >
                  {/* Static landscape phone (bottom layer) */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="relative bg-white rounded-[2.5rem]"
                      style={{
                        border: "6.62px solid rgba(8, 8, 8, 0.2)",
                        boxShadow: "10px 10px 20px 0px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div
                        className="bg-gray-50 rounded-[2rem] overflow-hidden relative"
                        style={{
                          width: "min(805px, 90vw)",
                          height: "min(325px, 41vw)",
                          aspectRatio:
                            "805.1359252929694 / 325.2563781738284",
                        }}
                      >
                        {/* Video Optimization */}
                        <video
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata" // <-- Optimization: Load minimal data first
                          poster="/images/business/video_mockup.svg" // <-- CRITICAL: Efficient static poster for LCP
                        >
                          <source
                            src="/videos/crypto/business_mockup.mp4"
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>

                  {/* Animated portrait phone (top layer) */}
                  <motion.div
                    className="absolute z-10"
                    style={{
                      rotateZ: leftCardRotate,
                      x: leftCardX,
                      y: leftCardY,
                      scale: leftCardScale,
                    }}
                  >
                    <div
                      className="relative bg-white rounded-[2.5rem]"
                      style={{
                        border: "6.62px solid rgba(8, 8, 8, 0.2)",
                        boxShadow: "10px 10px 20px 0px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div
                        className="rounded-[2rem] overflow-hidden relative bg-white"
                        style={{
                          width: "min(325px, 41vw)",
                          height: "min(805px, 90vw)",
                          aspectRatio:
                            "325.2563781738284 / 705.1359252929694",
                        }}
                      >
                        <div
                          onClick={handleLogoClick}
                          className="absolute top-1 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
                        >
                          {/* Non-LCP Image: Logo (No priority) */}
                          <Image
                            src="/bepaybusiness.svg"
                            alt="Bepay Logo"
                            width={200}
                            height={100}
                            className="w-[45px] h-[45px] md:w-[140px] lg:h-[125px] object-contain"
                            loading="lazy" // Added: Not critical for initial view
                          />
                        </div>

                        {/* LCP Image: Mobile Interface Screenshot */}
                        <motion.div
                          style={{ x: imageX, opacity: imageOpacity, scale: imageScale }}
                          className="absolute inset-0 -top-30"
                        >
                          <Image
                            src="/s1_6.png"
                            alt="Bepay Mobile Interface"
                            fill
                            className="object-contain"
                            priority // <-- CRITICAL LCP IMAGE
                          />
                        </motion.div>

                        {/* ... (Rest of Desktop content remains the same) ... */}
                        {showContent && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute inset-0 top-3 rotate-90 bg-white rounded-[2rem] flex flex-row gap-16 justify-center items-center p-8"
                          >
                            <div className="flex flex-col">
                              {contentItems.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-4 py-2"
                                >
                                  <div className="text-black">{item.icon}</div>
                                  <div className="whitespace-nowrap">
                                    <span className="font-semibold text-black text-sm">
                                      {item.title}
                                    </span>
                                    <span className="text-gray-500 text-sm ml-1.5">
                                      {item.subtitle}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="w-full max-w-[280px]">
                              {!isSubmitted ? (
                                <form
                                  onSubmit={handleEmailSubmit}
                                  className="flex flex-col gap-4 w-full"
                                >
                                  <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={handleEmailFocus}
                                    placeholder="Enter your email"
                                    className="w-full h-[48px] px-5 placeholder:text-sm text-black rounded-full border border-gray-300 text-base focus:outline-none focus:border-gray-500"
                                    required
                                  />
                                  <motion.button
                                    onClick={handleEmailButtonSubmit}
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-black w-full h-[48px] cursor-pointer text-white whitespace-nowrap px-6 rounded-full font-medium text-sm hover:bg-black/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                  >
                                    {isSubmitting ? (
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                      <>
                                        Join the Waitlist
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
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                          />
                                        </svg>
                                      </>
                                    )}
                                  </motion.button>
                                  {submitMessage && !isSuccess && (
                                    <div className="text-green-500 text-xs text-center mt-1">
                                      {submitMessage}
                                    </div>
                                  )}
                                </form>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="bg-gray-100 rounded-3xl shadow-md px-8 py-6 text-center w-[320px] flex flex-col items-center gap-3"
                                >
                                  <CheckCircle className="w-8 h-8 text-green-600" />

                                  <p className="text-black font-semibold text-lg">
                                    Yay! You&apos;re on the waitlist.
                                  </p>

                                  <p className="text-gray-500 text-sm leading-relaxed">
                                    We&apos;ll email you as soon as we launch.
                                  </p>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BusinessHero;