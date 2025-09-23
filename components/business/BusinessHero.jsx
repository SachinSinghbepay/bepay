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
import { AnalyticsService } from "@/services/analyticsService";

const BusinessHero = () => {
  const containerRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  const mobileXValue = useMotionValue(0);
  const mobileYValue = useMotionValue(0);

  const [email, setEmail] = useState("");
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
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      await addToWaitlist(email);
      setIsSubmitted(true);
      setSubmitMessage(
        "You're now on our exclusive waitlist. We'll notify you when we're ready!"
      );
      setEmail("");
      AnalyticsService.sendEvent("waitlist_submission_success", { email });
    } catch (error) {
      setSubmitMessage("Email already exists!");
      setTimeout(() => setSubmitMessage(""), 3000);
      AnalyticsService.sendEvent("waitlist_submission_failed", {
        email,
        error: error.message || "Email already exists",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
      setScreenWidth(width);
      const xValue = getMobileXValue(width);
      const yValue = getMobileYValue(width);
      mobileXValue.set(xValue);
      mobileYValue.set(yValue);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileXValue, mobileYValue]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const leftCardRotate = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const leftCardX = useTransform(scrollYProgress, [0, 1], [0, 445]);
  const leftCardY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const leftCardRotateMobile = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const getMobileXValue = (width) => {
    if (width <= 320) return 0;
    if (width <= 375) return 0;
    if (width <= 414) return 0;
    if (width <= 480) return 0;
    if (width <= 640) return 0;
    if (width <= 768) return 0;
    if (width <= 1024) return 0;
    if (width <= 1200) return 0;
    if (width <= 1300) return 200;
    return 0;
  };
  const getMobileYValue = (width) => {
    if (width <= 320) return -200;
    if (width <= 375) return -70;
    if (width <= 414) return -100;
    if (width <= 480) return -110;
    if (width <= 640) return -100;
    if (width <= 768) return -130;
    if (width <= 1024) return -140;
    if (width <= 1200) return -150;
    return -100;
  };

  const leftCardXMobile = useTransform(
    scrollYProgress,
    [0, 1],
    [0, getMobileXValue(screenWidth)]
  );
  const leftCardYMobile = useTransform(
    scrollYProgress,
    [0, 1],
    [0, getMobileYValue(screenWidth)]
  );

  const imageX = useTransform(scrollYProgress, [0.5, 1], [0, -200]);
  const imageOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

  const leftCardScale = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const leftCardScaleMobile = useTransform(scrollYProgress, [0, 1], [1, 1]);

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
      icon: <Zap className="w-4 md:w-6 h-4 md:h-6" />,
      title: "30-second",
      subtitle: "settlements",
    },
    {
      icon: <DollarSign className="w-4 md:w-6 h-4 md:h-6" />,
      title: "Low fees",
      subtitle: "(0.5 - 1.5%)",
    },
    {
      icon: <Globe className="w-4 md:w-6 h-4 md:h-6" />,
      title: "Global payments",
    },
    {
      icon: <Layers className="w-4 md:w-6 h-4 md:h-6" />,
      title: "Multi-currency",
      subtitle: "support",
    },
    {
      icon: <Plug className="w-4 md:w-6 h-4 md:h-6" />,
      title: "Plug & play",
      subtitle: "APIs",
    },
    {
      icon: <Clock className="w-4 md:w-6 h-4 md:h-6" />,
      title: " 5-minutes ",
      subtitle: "setup time",
    },
  ];

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-[104vh] md:h-[120vh] lg:h-[104vh] overflow-hidden">
        <section className="bg-[#F9F9F9] h-full flex flex-col justify-start ">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 max-w-[95%] mx-auto">
              <h1 className="text-2xl sm:text-4xl lg:text-[70px] xl:text-[80px] 3xl:text-[100px] font-[300] leading-[1.1] sm:leading-none mb-6 sm:mb-8">
                <span className="text-[#C0C0C0]">THE </span>
                <span className="text-[#333333] font-[400]">
                  STABLECOIN PAYMENTbvvgbv
                </span>
                <br />
                <span className="text-[#333333] font-[400]">
                  INFRASTRUCTURE{" "}
                </span>{" "}
                <span className="text-[#C0C0C0]">FOR</span>
                <br />
                <span className="text-[#C0C0C0] font-[300]">
                  MODERN BUSINESSES
                </span>
              </h1>
              <p className="text-[#6A6A6AE5] text-left text-base sm:text-lg md:text-[16px] max-w-[986px] mx-auto leading-relaxed px-4 sm:px-6">
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
            <div className="flex flex-col xl:flex-row relative items-center justify-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20 max-w-[95%] mx-auto">
              <motion.div
                style={{
                  rotateZ: isMobile ? leftCardRotateMobile : leftCardRotate,
                  x: isMobile ? leftCardXMobile : leftCardX,
                  y: isMobile ? leftCardYMobile : leftCardY,
                  duration: 1.8,
                  scale: isMobile ? leftCardScaleMobile : leftCardScale,
                }}
                className={`absolute z-20 ${
                  isMobile
                    ? "left-1/2 -translate-x-1/2 top-40"
                    : "-left-40 xl:-left-10 2xl:left-20 -top-10"
                } flex-shrink-0`}
              >
                <div
                  className="relative bg-white rounded-[2.5rem]"
                  style={{
                    border: "6.62px solid rgba(8, 8, 8, 0.2)",
                    boxShadow:
                      "10px 10px 20px 0px rgba(0, 0, 0, 0.1), -10px -10px 20px 0px #FFFFFF",
                  }}
                >
                  <div
                    className="rounded-[2rem] overflow-hidden relative bg-white"
                    style={{
                      width: "min(325px, 41vw)",
                      height: "min(805px, 90vw)",
                      aspectRatio: "325.2563781738284 / 705.1359252929694",
                    }}
                  >
                    <div
                      onClick={handleLogoClick}
                      className="absolute top-4 md:top-9 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
                    >
                      <Image
                        src="/bepaybusiness.svg"
                        alt="Bepay Logo"
                        width={200}
                        height={100}
                        className="w-[40px] h-[40px] md:w-[120px] lg:h-[100px] object-contain"
                      />
                    </div>

                    {/* REVERTED: Restored the original animated image */}
                    <motion.div
                      style={{ x: imageX, opacity: imageOpacity }}
                      className="absolute inset-0 top-12 sm:top-16"
                    >
                      <Image
                        src="/business_s1_1.png"
                        alt="Bepay Mobile Interface"
                        fill
                        className="object-cover object-top"
                      />
                    </motion.div>

                    {showContent && (
                      <div className="absolute inset-0 top-3 rotate-90 bg-white rounded-[2rem] flex flex-row gap-7 justify-center items-center p-4">
                        <div className="flex flex-col mb-1 md:mb-6 w-full max-w-[500px]">
                          {contentItems.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.1,
                                duration: 0.4,
                                ease: "easeOut",
                              }}
                              className="flex items-center gap-1 md:gap-3 md:py-2"
                            >
                              <div className="text-black hidden md:block text-[10px] md:text-[12px]">
                                {item.icon}
                              </div>
                              <div className="whitespace-nowrap">
                                <span className="font-semibold text-black text-[8px] md:text-[12px]">
                                  {item.title}
                                </span>
                                <span className="text-gray-500 text-[8px] md:text-[12px] ml-1">
                                  {item.subtitle}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: contentItems.length * 0.1 + 0.2,
                            duration: 0.4,
                            ease: "easeOut",
                          }}
                          className="flex flex-col lg:-mt-9 md:flex-row gap-3 w-full max-w-[600px]"
                        >
                          {!isSubmitted ? (
                            <form
                              onSubmit={handleEmailSubmit}
                              className="flex flex-col gap-3 w-full"
                            >
                              <div className="flex-1">
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  onFocus={handleEmailFocus}
                                  placeholder="Enter your email"
                                  className=" w-[130px] sm:w-[180px] px-2 md:px-4 py-3 lg:w-[200px] flex justify-center placeholder:text-[10px] text-black font-semibold items-center rounded-full border border-gray-300 text-[12px] md:text-[12px] focus:outline-none focus:border-gray-500"
                                  required
                                />
                                {submitMessage && !isSubmitted && (
                                  <div className="text-red-500 text-[6px] md:text-[10px] mt-1">
                                    {submitMessage}
                                  </div>
                                )}
                              </div>
                              <motion.button
                                onClick={handleEmailButtonSubmit}
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-black w-[130px] sm:w-[180px] md:w-full cursor-pointer text-white whitespace-nowrap px-2 md:px-6 py-3 rounded-full font-medium text-[10px] md:text-[12px] hover:bg-black/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                              >
                                {isSubmitting ? (
                                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
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
                            </form>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.5,
                                ease: "easeOut",
                              }}
                              className="flex flex-row items-center gap-1 justify-center w-full"
                            >
                              <div>
                                <CheckCircle className="w-4 h-4 mt-2 text-green-600 mb-2" />
                              </div>
                              <div className="text-green-600 lg:whitespace-nowrap text-[6px] md:text-[10px] leading-relaxed">
                                {submitMessage}
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              <div className="relative lg:ml-0 flex-shrink-0">
                <div
                  className="relative bg-white rounded-[2.5rem]"
                  style={{
                    border: "6.62px solid rgba(8, 8, 8, 0.2)",
                    boxShadow:
                      "10px 10px 20px 0px rgba(0, 0, 0, 0.1), -10px -10px 20px 0px #FFFFFF",
                  }}
                >
                  <div
                    className="bg-gray-50 rounded-[2rem] overflow-hidden relative"
                    style={{
                      width: "min(805px, 90vw)",
                      height: "min(325px, 41vw)",
                      aspectRatio: "805.1359252929694 / 325.2563781738284",
                    }}
                  >
                    {/* CHANGED: Replaced the static image with a video */}
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="/path/to/your/horizontal_poster.jpg"
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
            </div>
          </div>
        </section>
      </div>

      <div className="h-[40vh] lg:h-0" />
    </div>
  );
};

export default BusinessHero;