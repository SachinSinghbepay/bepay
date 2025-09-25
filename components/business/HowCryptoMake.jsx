"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import WaitlistTriggerButton from "../waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service

const HowCryptoMake = () => {
  const containerRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false); // Track if we've already sent the view event
  const [isMobile, setIsMobile] = useState(false);

  // ANALYTICS: Track when the main DeFi Yield section is actually viewed
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("How crypto payments work section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target); // Stop observing after first view
        }
      },
      { threshold: 0.1 } // Trigger when 30% of the component is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const handleStartEarningClick = () => {
      AnalyticsService.sendEvent("'Become a merchant on bepay' button clicked");
    };

  

  // Desktop transform values
  const desktopMockup1Y = useTransform(scrollYProgress, [0, 0.25], [0, -1200]);
  const desktopMockup1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 1]);
  const desktopMockup2Y = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.5],
    [800, 0, -1200]
  );
  const desktopMockup2Opacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.5],
    [0, 1, 1]
  );
  const desktopMockup3Y = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.75],
    [800, 0, -1200]
  );
  const desktopMockup3Opacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.75],
    [0, 1, 1]
  );
  const desktopMockup4Y = useTransform(
    scrollYProgress,
    [0.65, 0.75, 1],
    [800, 0, -800]
  );
  const desktopMockup4Opacity = useTransform(
    scrollYProgress,
    [0.65, 0.75, 1],
    [0, 1, 1]
  );

  const desktopContent1Y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25],
    [200, 0, -200]
  );
  const desktopContent2Y = useTransform(
    scrollYProgress,
    [0.15, 0.3, 0.5],
    [200, 0, -200]
  );
  const desktopContent3Y = useTransform(
    scrollYProgress,
    [0.4, 0.55, 0.75],
    [200, 0, -200]
  );
  const desktopContent4Y = useTransform(
    scrollYProgress,
    [0.65, 0.8, 1],
    [200, 0, -200]
  );
  const desktopContent1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const desktopContent2Opacity = useTransform(

    scrollYProgress,
    [0.15, 0.25, 0.5],
    [0, 1, 0]
  );
  const desktopContent3Opacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.75],
    [0, 1, 0]
  );
  const desktopContent4Opacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const desktopFloatingOpacity = useTransform(scrollYProgress, [0.7, 0.75], [0, 1]);
  const desktopFloatingElement1Y = useTransform(scrollYProgress, [0.7, 0.8], [50, 0]);
  const desktopFloatingElement2Y = useTransform(scrollYProgress, [0.72, 0.82], [50, 0]);
  const desktopFloatingElement3Y = useTransform(scrollYProgress, [0.74, 0.84], [50, 0]);

  // Mobile transform values
  const mobileMockup1Y = useTransform(scrollYProgress, [0, 0.2], [0, -600]);
  const mobileMockup1Opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const mobileMockup2Y = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.45],
    [400, 0, -600]
  );
  const mobileMockup2Opacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.45],
    [0, 1, 0]
  );
  const mobileMockup3Y = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.7],
    [400, 0, -600]
  );
  const mobileMockup3Opacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.7],
    [0, 1, 0]
  );
  const mobileMockup4Y = useTransform(
    scrollYProgress,
    [0.65, 0.75, 1],
    [400, 0, -200]
  );
  const mobileMockup4Opacity = useTransform(
    scrollYProgress,
    [0.65, 0.75, 1],
    [0, 1, 1]
  );

  const mobileContent1Y = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2],
    [50, 0, -50]
  );
  const mobileContent2Y = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.45],
    [50, 0, -50]
  );
  const mobileContent3Y = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.7],
    [50, 0, -50]
  );
  const mobileContent4Y = useTransform(
    scrollYProgress,
    [0.65, 0.75, 1],
    [50, 0, -50]
  );
  const mobileFloatingOpacity = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);
  const mobileFloating1Y = useTransform(scrollYProgress, [0.75, 0.85], [30, 0]);
  const mobileFloating2Y = useTransform(scrollYProgress, [0.77, 0.87], [30, 0]);
  const mobileFloating3Y = useTransform(scrollYProgress, [0.79, 0.89], [30, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const contentData = [
    { text: "Customer selects crypto at checkout", side: "left" },
    { text: "bepay generates a QR code or token address", side: "right" },
    { text: "Customer pays in BTC, ETH, USDT & more", side: "left" },
    { text: "Payment confirmed and business receives funds", side: "right" },
  ];

  return (
    <div ref={containerRef} className="relative bg-[#F9F9F9] h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="py-20 relative h-full">
          <div className="text-center relative max-w-[1000px] mx-auto mb-16 sm:mb-24 lg:mb-32 lg:-mt-16">
            <motion.h2
              className="font-[400] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.5rem] leading-[1] tracking-tight"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <motion.div
                className="inline-block"
                variants={lineVariants}
              >
                <span className="text-[#C0C0C0]">How </span>
                <span className="text-[#333333]">crypto </span>
                <span className="text-[#C0C0C0]">payments </span>
              </motion.div>
              <br />
              <motion.div className="inline-block" variants={lineVariants}>
                <span className="text-[#C0C0C0]">work with </span>
                <span className="text-[#333333]">bepay</span>
              </motion.div>
            </motion.h2>

            {/* Conditionally render desktop or mobile layout */}
            {isMobile ? (
              // Mobile Layout
              <div className="px-4">
                <div className="flex flex-col items-center relative mt-8">
                  <motion.div
                    className="flex flex-col items-center"
                    style={{ y: mobileMockup1Y, opacity: mobileMockup1Opacity }}
                  >
                    <div className="relative w-[220px] h-[380px] drop-shadow-lg mb-4">
                      <Image
                        src="/images/business/mocup1.png"
                        alt="Bepay crypto payment interface"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <motion.div
                      className="w-full max-w-xs"
                      style={{ opacity: mobileMockup1Opacity, y: mobileContent1Y }}
                    >
                      <div className="text-center px-2">
                        <p className="text-sm text-gray-600 font-medium">
                          {contentData[0].text}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="absolute top-0 flex flex-col items-center"
                    style={{ y: mobileMockup2Y, opacity: mobileMockup2Opacity }}
                  >
                    <div className="relative w-[220px] h-[380px] drop-shadow-lg mb-4">
                      <Image
                        src="/images/business/mocup2.png"
                        alt="Bepay QR code interface"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <motion.div
                      className="w-full max-w-xs"
                      style={{ opacity: mobileMockup2Opacity, y: mobileContent2Y }}
                    >
                      <div className="text-center px-2">
                        <p className="text-sm text-gray-600 font-medium">
                          {contentData[1].text}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="absolute top-0 flex flex-col items-center"
                    style={{ y: mobileMockup3Y, opacity: mobileMockup3Opacity }}
                  >
                    <div className="relative w-[220px] h-[380px] drop-shadow-lg mb-4">
                      <Image
                        src="/images/business/mocup3.png"
                        alt="Bepay payment success"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <motion.div
                      className="w-full max-w-xs"
                      style={{ opacity: mobileMockup3Opacity, y: mobileContent3Y }}
                    >
                      <div className="text-center px-2">
                        <p className="text-sm text-gray-600 font-medium">
                          {contentData[2].text}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="absolute top-0 flex flex-col items-center"
                    style={{ y: mobileMockup4Y, opacity: mobileMockup4Opacity }}
                  >
                    <div className="relative w-[220px] h-[380px] drop-shadow-lg mb-4">
                      <Image
                        src="/images/business/mocup4.png"
                        alt="Bepay payment confirmation"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <motion.div
                      className="w-full max-w-xs px-3"
                      style={{ opacity: mobileMockup4Opacity, y: mobileContent4Y }}
                    >
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-600 font-medium mb-4">
                          {contentData[3].text}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <motion.div
                          className="p-3 rounded-lg text-center"
                          style={{
                            border: "1px #ffffff1a",
                            boxShadow: "15px 15px 30px 0px rgba(0, 0, 0, 0.08)",
                            backdropFilter: "blur(20px)",
                            background: "rgba(255, 255, 255, 0.95)",
                            opacity: mobileFloatingOpacity,
                            y: mobileFloating1Y,
                          }}
                        >
                          <h3 className="text-sm font-semibold text-gray-800">
                            NO HASSLE!
                          </h3>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-2">
                          <motion.div
                            className="p-2 rounded-lg text-center"
                            style={{
                              border: "1px #ffffff1a",
                              boxShadow: "10px 10px 20px 0px rgba(0, 0, 0, 0.06)",
                              backdropFilter: "blur(20px)",
                              background: "rgba(255, 255, 255, 0.9)",
                              opacity: mobileFloatingOpacity,
                              y: mobileFloating2Y,
                            }}
                          >
                            <h4 className="font-medium text-gray-800 text-xs">
                              NO VOLATILITY!
                            </h4>
                          </motion.div>

                          <motion.div
                            className="p-2 rounded-lg text-center"
                            style={{
                              border: "1px #ffffff1a",
                              boxShadow: "10px 10px 20px 0px rgba(0, 0, 0, 0.06)",
                              backdropFilter: "blur(20px)",
                              background: "rgba(255, 255, 255, 0.9)",
                              opacity: mobileFloatingOpacity,
                              y: mobileFloating3Y,
                            }}
                          >
                            <h4 className="font-medium text-gray-800 text-xs">
                              NO DELAYS!
                            </h4>
                          </motion.div>
                        </div>

                        <WaitlistTriggerButton triggerSource="'How crypto make section' button">
                          <motion.button
                          onClick={handleStartEarningClick} // ANALYTICS: Added onClick handler
                            className="w-full bg-black rounded-full text-white py-3 px-4 text-sm font-medium hover:bg-black/90 cursor-pointer transition-colors mt-4"
                            style={{
                              opacity: mobileFloatingOpacity,
                              y: mobileFloating3Y,
                            }}
                          >
                            Become a merchant on bepay →
                          </motion.button>
                        </WaitlistTriggerButton>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            ) : (
              // Desktop Layout
              <div className="hidden lg:block">
                <motion.div
                  className="absolute left-1/2 top-[540px] -translate-y-1/2 -translate-x-1/2 z-10"
                  style={{ y: desktopMockup1Y, opacity: desktopMockup1Opacity }}
                >
                  {/* MODIFICATION: Reduced width and height */}
                  <div className="relative w-[380px] h-[650px] drop-shadow-2xl">
                    <Image
                      src="/images/business/mocup1.png"
                      alt="Bepay crypto payment interface"
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute left-1/2 top-[540px] -translate-y-1/2 -translate-x-1/2 z-10"
                  style={{ y: desktopMockup2Y, opacity: desktopMockup2Opacity }}
                >
                  {/* MODIFICATION: Reduced width and height */}
                  <div className="relative w-[380px] h-[650px] drop-shadow-2xl">
                    <Image
                      src="/images/business/mocup2.png"
                      alt="Bepay QR code interface"
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute left-1/2 top-[540px] -translate-y-1/2 -translate-x-1/2 z-10"
                  style={{ y: desktopMockup3Y, opacity: desktopMockup3Opacity }}
                >
                  {/* MODIFICATION: Reduced width and height */}
                  <div className="relative w-[380px] h-[650px] drop-shadow-2xl">
                    <Image
                      src="/images/business/mocup3.png"
                      alt="Bepay payment success"
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute left-1/2 top-[540px] -translate-y-1/2 -translate-x-1/2 z-10"
                  style={{ y: desktopMockup4Y, opacity: desktopMockup4Opacity }}
                >
                  {/* MODIFICATION: Reduced width and height */}
                  <div className="relative w-[380px] h-[650px] drop-shadow-2xl">
                    <Image
                      src="/images/business/mocup4.png"
                      alt="Bepay payment confirmation"
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute left-8 top-[200px] translate-y-1/2 z-20"
                  style={{ opacity: desktopContent1Opacity, y: desktopContent1Y }}
                >
                  <div className="p-4 max-w-[400px]">
                    <p className="text-sm text-gray-600 font-bold">
                      {contentData[0].text}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -right-5 top-[400px] translate-y-1/2 z-20"
                  style={{ opacity: desktopContent2Opacity, y: desktopContent2Y }}
                >
                  <div className="p-4 max-w-[400px] text-right">
                    <p className="text-sm text-gray-600 font-bold">
                      {contentData[1].text}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute left-0 top-[400px] translate-y-1/2 z-20"
                  style={{ opacity: desktopContent3Opacity, y: desktopContent3Y }}
                >
                  <div className="p-4 max-w-[400px]">
                    <p className="text-sm text-gray-600 font-bold">
                      {contentData[2].text}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -right-10 top-[300px] translate-y-1/2 z-20"
                  style={{ opacity: desktopContent4Opacity, y: desktopContent4Y }}
                >
                  <div className="p-4 max-w-[400px] text-right">
                    <p className="text-sm text-gray-600 font-medium mb-8">
                      {contentData[3].text}
                    </p>
                    <WaitlistTriggerButton triggerSource="'how crypto make section' button">
                      <div className="space-y-3">
                        <motion.button
                        onClick={handleStartEarningClick} // ANALYTICS: Added onClick handler
                          className="w-full bg-black text-white py-4 px-6 rounded-full text-sm font-medium hover:bg-black/90 cursor-pointer transition-colors"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9, duration: 0.6 }}
                        >
                          Become a merchant on bepay →
                        </motion.button>
                      </div>
                    </WaitlistTriggerButton>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute left-[30%] shadow-2xl rounded-[20px] top-[250px] z-30"
                  style={{
                    opacity: desktopFloatingOpacity,
                    y: desktopFloatingElement1Y,
                  }}
                >
                  <div
                    className="p-4 rounded-[20px] mx-auto"
                    style={{
                      border: "1px #ffffff1a",
                      boxShadow: "30px 30px 60px 0px rgba(0, 0, 0, 0.05)",
                      backdropFilter: "blur(20px)",
                      background: "rgba(255, 255, 255, 255)",
                    }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      NO HASSLE!
                    </h3>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute left-[23%] shadow-2xl rounded-[20px] top-[450px] z-30"
                  style={{
                    opacity: desktopFloatingOpacity,
                    y: desktopFloatingElement2Y,
                  }}
                >
                  <div
                    className="p-4 border border-white/15 rounded-[20px]"
                    style={{
                      border: "1px #ffffff1a",
                      boxShadow: "30px 30px 60px 0px rgba(0, 0, 0, 0.05)",
                      backdropFilter: "blur(20px)",
                      background: "rgba(255, 255, 255, 255)",
                    }}
                  >
                    <h4 className="font-semibold text-gray-800 text-sm">
                      NO VOLATILITY!
                    </h4>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute shadow-2xl rounded-[20px] left-[60%] top-[200px] z-30"
                  style={{
                    opacity: desktopFloatingOpacity,
                    y: desktopFloatingElement3Y,
                  }}
                >
                  <div
                    className="p-4 rounded-[20px]"
                    style={{
                      border: "1px #ffffff1a",
                      boxShadow: "30px 30px 60px 0px rgba(0, 0, 0, 0.05)",
                      backdropFilter: "blur(20px)",
                      background: "rgba(255, 255, 255, 255)",
                    }}
                  >
                    <h4 className="font-semibold text-gray-800 text-sm">
                      NO DELAYS!
                    </h4>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowCryptoMake;