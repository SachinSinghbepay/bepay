"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service

// Mock WaitlistTriggerButton component
const WaitlistTriggerButton = ({ children }) => children;

const servicesData = [
  {
    title: "Bitcoin backed loans",
    points: [
      "Get instant loans using your Bitcoin as collateral.",
      "No credit check required.",
      "Flexible repayment terms.",
    ],
    video: "/videos/crypto/co1.mp4", // Video for first 3
  },
  {
    title: "Savings Products",
    points: [
      "High-yield savings on BTC, ETH, USDT, and USDC.",
      "No minimum balance.",
      "Instant withdrawals.",
    ],
    video: "/videos/crypto/co2.mp4", // Video for first 3
  },
  {
    title: "Insurance Products",
    points: [
      "Protect your assets, income, and life with crypto-powered insurance solutions.",
      "Health, Travel & Life Coverage.",
      "Flexible Plans & Instant Claims.",
    ],
    video: "/videos/crypto/co3.mp4", // Video for first 3
  },
  {
    title: "Cross-Border Payments",
    points: [
      "Fast, cheap international money transfers.",
      "Instant settlements globally.",
      "Lowest fee guarantee.",
    ],
    image: "/images/crypto/co5.png", // Back to image for last 3
  },
  {
    title: "Remittance Services",
    points: [
      "Send money home to family and friends globally.",
      "Competitive exchange rates.",
      "Real-time tracking & Multiple payout options.",
    ],
    image: "/images/crypto/co6.png", // Back to image for last 3
  },
  {
    title: "DeFi Marketplace",
    points: [
      "Access DApps and DeFi protocols directly from your wallet.",
      "One-Click Access to Top Protocols.",
      "Secure & Gas-Optimized Transactions.",
    ],
    image: "/images/crypto/co_last.png", // Back to image for last 3
  },
];

const ServicePanel = ({ service, index, progress, totalServices }) => {
  const videoRef = useRef(null);
  const segmentDuration = 1 / totalServices;
  const start = index * segmentDuration;
  const end = start + segmentDuration;

  const travelDistance = 900;
  const fixedTransformDistance = 0.4;

  let inputRange = [];
  let outputRange = [];

  const isFirst = index === 0;
  const isLast = index === totalServices - 1;

  if (isFirst) {
    inputRange = [ 0, end - segmentDuration * fixedTransformDistance, end + segmentDuration * fixedTransformDistance, ];
    outputRange = [0, 0, -travelDistance];
  } else if (isLast) {
    inputRange = [ start - segmentDuration * fixedTransformDistance, start + segmentDuration * fixedTransformDistance, 1, ];
    outputRange = [travelDistance, 0, 0];
  } else {
    inputRange = [ start - segmentDuration * fixedTransformDistance, start + segmentDuration * fixedTransformDistance, end - segmentDuration * fixedTransformDistance, end + segmentDuration * fixedTransformDistance, ];
    outputRange = [travelDistance, 0, 0, -travelDistance];
  }

  const y = useTransform(progress, inputRange, outputRange);

  // Effect to handle video play/pause based on visibility (only for videos)
  useEffect(() => {
    if (!service.video) return; // Only run for services with videos

    const unsubscribe = progress.on("change", (latest) => {
      const isVisible = latest >= start && latest <= end;
      
      if (videoRef.current) {
        if (isVisible) {
          videoRef.current.play().catch(console.error);
        } else {
          videoRef.current.pause();
        }
      }
    });

    return () => unsubscribe();
  }, [progress, start, end, service.video]);

  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 flex flex-col justify-center p-8 lg:p-12"
    >
      <div className="w-full max-w-[360px] mx-auto">
        <div className="relative w-full aspect-[4/5] overflow-hidden mb-4 lg:mb-5 shadow-lg">
          {service.video ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="none"
              disablePictureInPicture
              controlsList="nodownload"
              onError={(e) => console.error('Video failed to load:', e)}
            >
              <source src={service.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.title}
              fill
              className="object-cover"
              loading="lazy"
            />
          )}
        </div>
        <div className="text-left px-1">
          <h3
            className={`
              font-[Montserrat] 
              font-normal 
              text-lg sm:text-xl 
              lg:text-[40px] 
              lg:leading-[52px] 
              lg:tracking-[-0.06em] 
              text-[#6A6A6A] 
              mb-3
              ${service.title === "Bitcoin backed loans" ? "leading-tight" : ""}
              ${service.title === "Savings Products" || service.title === "Insurance Products" || service.title ==="DeFi Marketplace" || service.title ==="Remittance Services"? "whitespace-nowrap" : ""}
            `}
          >
            {service.title}
          </h3>
          <ul className="space-y-2">
            {service.points.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-1.5 text-xs lg:text-sm text-gray-600 leading-snug"
              >
                <span className="w-3 h-3 rounded-[3px] bg-[#6A6A6A] mt-0.5 flex-shrink-0"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const MobileView = () => {
  const mobileContainerRef = useRef(null);
  const cardWrapperRef = useRef(null);
  const videoRefs = useRef([]);
  const x = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    // Initialize video refs array
    videoRefs.current = new Array(servicesData.length);
    
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const cardWrapper = cardWrapperRef.current;
      if (!cardWrapper) return;
      const scrollWidth = cardWrapper.scrollWidth;
      const containerWidth = cardWrapper.offsetWidth;
      const maxScroll = scrollWidth - containerWidth;
      const easedProgress = latest * latest * (3 - 2 * latest);
      x.set(-easedProgress * maxScroll);

      // Handle video play/pause for mobile (only for videos)
      const totalCards = servicesData.length;
      const currentCardIndex = Math.floor(latest * totalCards);
      
      videoRefs.current.forEach((video, index) => {
        if (video && servicesData[index].video) { // Only control videos, not images
          if (index === currentCardIndex) {
            video.play().catch(console.error);
          } else {
            video.pause();
          }
        }
      });
    });
    return () => unsubscribe();
  }, [scrollYProgress, x]);

  // ANALYTICS: Handler for the mobile button click
  const handleExploreFeaturesClick = () => {
    AnalyticsService.sendEvent("'Explore all features' button clicked");
  };

  return (
    <div
      ref={mobileContainerRef}
      className="md:hidden relative h-[300vh] bg-white py-8 sm:py-12"
    >
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        <motion.div
          className="px-4 sm:px-6 pt-8 sm:pt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 className="text-3xl sm:text-4xl fontWeight:480 leading-[1.7rem]">
            <span className="text-gray-400">COMPLETE</span>
            <br />
            FINANCIAL SERVICES
          </motion.h2>
          <motion.p className="text-[#333333] mt-4 font-medium lg:mt-6 text-sm lg:text-base leading-relaxed">
            <span className="font-semibold block">
              Banking, lending, insurance, and more -
            </span>
            <span className="block">all in one comprehensive platform</span>
          </motion.p>

          <motion.button 
            onClick={handleExploreFeaturesClick} // ANALYTICS: Added onClick handler
            className="flex items-center justify-center gap-2 bg-black text-white px-6 h-[56px] rounded-full mt-6 hover:bg-gray-800 transition-colors text-xs font-medium">
            <span>Explore all features</span>
            <ArrowUpRight size={20} />
          </motion.button>
        </motion.div>

        <div className="mt-8 sm:mt-12 w-full">
          <motion.div
            ref={cardWrapperRef}
            style={{ x }}
            className="flex gap-4 sm:gap-6 px-4 sm:px-6 pb-8"
          >
            {servicesData.map((service, i) => (
              <div key={i} className="w-[75vw] sm:w-[65vw] flex-shrink-0">
                <div className="px-6">
                  <div className="relative w-full aspect-[3/4] overflow-hidden mb-4 sm:mb-6 shadow-md">
                    {service.video ? (
                      <video
                        ref={(el) => {
                          if (el) {
                            videoRefs.current[i] = el;
                          }
                        }}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        preload="none"
                        disablePictureInPicture
                        controlsList="nodownload"
                        onError={(e) => console.error('Video failed to load:', service.video, e)}
                        onLoadStart={() => console.log('Loading video:', service.video)}
                        onCanPlay={() => console.log('Video can play:', service.video)}
                      >
                        <source src={service.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image 
                        src={service.image || "/placeholder.svg"} 
                        alt={service.title} 
                        fill 
                        className="object-cover" 
                        loading="lazy" 
                      />
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="font-[Montserrat] font-semibold sm:font-normal text-lg sm:text-xl lg:text-[60px] leading-[1.3] lg:leading-[52px] tracking-normal lg:tracking-[-0.06em] text-[#6A6A6A] mb-3">
                      {service.title}
                    </h3>
                    <ul className="space-y-2">
                      {service.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                          <span className="w-[10px] h-[10px] sm:w-[15px] sm:h-[15px] rounded-[3px] sm:rounded-[4px] bg-[#6A6A6A] mt-1 flex-shrink-0"></span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const FinancialServicesSection = () => {
  const containerRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("financial services section landed on");
          setHasTrackedView(true);
          observer.unobserve(entry.target); // ✅ Stop observing after first view
        }
      },
      { threshold: 0.1 } // ✅ fires when 30% of section is visible
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect(); // ✅ Cleanup on unmount
  }, [hasTrackedView]);

  // ANALYTICS: Handler for the desktop button click
  const handleExploreFeaturesClick = () => {
    AnalyticsService.sendEvent("'Explore all features' button clicked");
  };

  return (
    <section>
      {/* Desktop View */}
      <div ref={containerRef} className="hidden md:block relative h-[600vh]">
        <div className="sticky top-0 h-screen grid grid-cols-[60%_40%] items-stretch">
          <div className="bg-white flex items-center justify-start px-8 lg:px-16 xl:px-20">
            <motion.div
              className="max-w-md lg:max-w-[406px] text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 className="text-[80px] lg:text-5xl xl:text-6xl font-[400]"style={{ lineHeight: "0.9" }}>
                <span className="text-gray-400">COMPLETE</span>
                <br />
                FINANCIAL
                <br />
                SERVICES
              </motion.h2>
              <motion.p className="text-[#333333] mt-4 font-medium lg:mt-6 text-sm lg:text-base leading-relaxed">
                <span className="font-semibold block">
                  Banking, lending, insurance, and more -
                </span>
                <span className="block">all in one comprehensive platform</span>
              </motion.p>

              <WaitlistTriggerButton triggerSource="'financial service section' button clicked" buttonLocation="Crypto Financial Services Section">
                <motion.button
                  onClick={handleExploreFeaturesClick} // ANALYTICS: Added onClick handler
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    bg-black cursor-pointer whitespace-nowrap text-white 
                    flex items-center justify-center transition-colors 
                    hover:bg-gray-800 rounded-full mt-7

                    /* Mobile (default) */
                    w-[221px] h-[56px] gap-2 text-xs font-normal

                    /* Desktop overrides */
                    md:w-[210px] md:h-[56px] 
                    md:gap-[10px] 
                    md:text-sm md:font-medium 
                    md:rounded-[100px]
                  "
                >
                  Explore all features
                  <ArrowUpRight size={18} className="w-5 h-5 md:w-6 md:h-6" />
                </motion.button>
              </WaitlistTriggerButton>

            </motion.div>
          </div>
          <div className="bg-[#F9F9F9] relative overflow-hidden">
            {servicesData.map((service, i) => (
              <ServicePanel
                key={i}
                index={i}
                service={service}
                progress={scrollYProgress}
                totalServices={servicesData.length}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <MobileView />
    </section>
  );
};