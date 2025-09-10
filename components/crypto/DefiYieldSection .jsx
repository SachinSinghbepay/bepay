"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import WaitlistTriggerButton from "../waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service

const DefiYieldSection = () => {
  const sectionRef = useRef(null);
  const depinCardViewedRef = useRef(false); // ANALYTICS: Ref to track if the card has been viewed

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  // ANALYTICS: Track when the main DeFi Yield section is viewed
  useEffect(() => {
    AnalyticsService.sendEvent("DeFi Yield section viewed");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const animationStart = 0.0;
  const animationEnd = 0.1;
  const imageStart = animationEnd;
  const intervalSize = 0.15;

  // ANALYTICS: Track when the 'DePIN Storage & Compute' card becomes visible
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // This range corresponds to when the 6th content item (DePIN) is visible
      if (latest > (imageStart + intervalSize * 4) && !depinCardViewedRef.current) {
        AnalyticsService.sendEvent("'DePIN Storage & Compute' card viewed");
        depinCardViewedRef.current = true; // Set to true so it only fires once
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // ANALYTICS: Handler for the "Start earning" button click
  const handleStartEarningClick = () => {
    AnalyticsService.sendEvent("'Start earning' button clicked");
  };

  // --- All your animation hooks remain unchanged ---
  const containerY = useTransform(scrollYProgress, [animationStart, animationEnd], ["0%", "0%"]);
  const containerOpacity = useTransform(scrollYProgress, [animationStart, animationEnd], [1, 1]);
  const image1Y = useTransform(scrollYProgress, [imageStart, imageStart + intervalSize], ["0%", "-200%"]);
  const image1Rotate = useTransform(scrollYProgress, [imageStart, imageStart + intervalSize], [0, 15]);
  const image1Opacity = useTransform(scrollYProgress, [imageStart, imageStart + intervalSize * 0.5], [1, 0]);
  const image2Y = useTransform(scrollYProgress, [imageStart + intervalSize, imageStart + intervalSize * 2], ["0%", "-200%"]);
  const image2Rotate = useTransform(scrollYProgress, [imageStart + intervalSize, imageStart + intervalSize * 2], [0, 15]);
  const image2Opacity = useTransform(scrollYProgress, [imageStart + intervalSize, imageStart + intervalSize + intervalSize * 0.5], [1, 0]);
  const image3Y = useTransform(scrollYProgress, [imageStart + intervalSize * 2, imageStart + intervalSize * 3], ["0%", "-200%"]);
  const image3Rotate = useTransform(scrollYProgress, [imageStart + intervalSize * 2, imageStart + intervalSize * 3], [0, 15]);
  const image3Opacity = useTransform(scrollYProgress, [imageStart + intervalSize * 2, imageStart + intervalSize * 2 + intervalSize * 0.5], [1, 0]);
  const image4Y = useTransform(scrollYProgress, [imageStart + intervalSize * 3, imageStart + intervalSize * 4], ["0%", "-200%"]);
  const image4Rotate = useTransform(scrollYProgress, [imageStart + intervalSize * 3, imageStart + intervalSize * 4], [0, 15]);
  const image4Opacity = useTransform(scrollYProgress, [imageStart + intervalSize * 3, imageStart + intervalSize * 3 + intervalSize * 0.5], [1, 0]);
  const image5Y = useTransform(scrollYProgress, [imageStart + intervalSize * 4, imageStart + intervalSize * 5], ["0%", "-200%"]);
  const image5Rotate = useTransform(scrollYProgress, [imageStart + intervalSize * 4, imageStart + intervalSize * 5], [0, 15]);
  const image5Opacity = useTransform(scrollYProgress, [imageStart + intervalSize * 4, imageStart + intervalSize * 4 + intervalSize * 0.5], [1, 0]);
  const image6Y = useTransform(scrollYProgress, [imageStart + intervalSize * 5, imageStart + intervalSize * 6], ["0%", "-50%"]);
  const image6Scale = useTransform(scrollYProgress, [imageStart + intervalSize * 5, imageStart + intervalSize * 6], [1, 1.1]);
  const content1Y = useTransform(scrollYProgress, [imageStart, imageStart + intervalSize], ["0%", "-100%"]);
  const content1Opacity = useTransform(scrollYProgress, [imageStart, imageStart + intervalSize], [1, 0]);
  const content2Y = useTransform(scrollYProgress, [imageStart, imageStart + intervalSize, imageStart + intervalSize, imageStart + intervalSize * 2], ["100%", "0%", "0%", "-100%"]);
  const content2Opacity = useTransform(scrollYProgress, [imageStart, imageStart + intervalSize, imageStart + intervalSize, imageStart + intervalSize * 2], [0, 1, 1, 0]);
  const content3Y = useTransform(scrollYProgress, [imageStart + intervalSize, imageStart + intervalSize * 2, imageStart + intervalSize * 2, imageStart + intervalSize * 3], ["100%", "0%", "0%", "-100%"]);
  const content3Opacity = useTransform(scrollYProgress, [imageStart + intervalSize, imageStart + intervalSize * 2, imageStart + intervalSize * 2, imageStart + intervalSize * 3], [0, 1, 1, 0]);
  const content4Y = useTransform(scrollYProgress, [imageStart + intervalSize * 2, imageStart + intervalSize * 3, imageStart + intervalSize * 3, imageStart + intervalSize * 4], ["100%", "0%", "0%", "-100%"]);
  const content4Opacity = useTransform(scrollYProgress, [imageStart + intervalSize * 2, imageStart + intervalSize * 3, imageStart + intervalSize * 3, imageStart + intervalSize * 4], [0, 1, 1, 0]);
  const content5Y = useTransform(scrollYProgress, [imageStart + intervalSize * 3, imageStart + intervalSize * 4, imageStart + intervalSize * 4, imageStart + intervalSize * 5], ["100%", "0%", "0%", "-100%"]);
  const content5Opacity = useTransform(scrollYProgress, [imageStart + intervalSize * 3, imageStart + intervalSize * 4, imageStart + intervalSize * 4, imageStart + intervalSize * 5], [0, 1, 1, 0]);
  const content6Y = useTransform(scrollYProgress, [imageStart + intervalSize * 4, imageStart + intervalSize * 5], ["100%", "0%"]);
  const content6Opacity = useTransform(scrollYProgress, [imageStart + intervalSize * 4, imageStart + intervalSize * 5], [0, 1]);
  // --- End of animation hooks ---

  return (
    <div className="relative">
      <section
        ref={sectionRef}
        className="relative min-h-[600vh]"
        data-detailed-animation
      >
        <div className="sticky top-0 h-screen">
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 md:p-10">
            <motion.div
              style={{ y: containerY, opacity: containerOpacity }}
              className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-10"
            >
              <div className="relative w-full max-w-[642px] h-[250px] md:h-[300px] lg:h-[350px]">
                <div className="relative w-full h-full">
                  <motion.div style={{ y: image1Y, rotate: image1Rotate, opacity: image1Opacity, zIndex: 6 }} className="absolute inset-0 rounded-full overflow-hidden">
                    <Image src="/images/crypto/earning1.png" fill priority alt="Woman looking at phone with excitement" className="object-cover object-center rounded-full" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 642px" />
                  </motion.div>
                  <motion.div style={{ y: image2Y, rotate: image2Rotate, opacity: image2Opacity, zIndex: 5 }} className="absolute inset-0 rounded-full overflow-hidden transform ">
                    <Image src="/images/crypto/earning5.png" fill priority alt="Woman looking at phone with excitement" className="object-cover object-center rounded-full" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 642px" />
                  </motion.div>
                  <motion.div style={{ y: image3Y, rotate: image3Rotate, opacity: image3Opacity, zIndex: 4 }} className="absolute inset-0 rounded-full overflow-hidden transform ">
                    <Image src="/images/crypto/earning2.png" fill priority alt="Woman looking at phone with excitement" className="object-cover object-center rounded-full" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 642px" />
                  </motion.div>
                  <motion.div style={{ y: image4Y, rotate: image4Rotate, opacity: image4Opacity, zIndex: 3 }} className="absolute inset-0 rounded-full overflow-hidden transform ">
                    <Image src="/images/crypto/earning3.png" fill priority alt="Woman looking at phone with excitement" className="object-cover object-center rounded-full" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 642px" />
                  </motion.div>
                  <motion.div style={{ y: image5Y, rotate: image5Rotate, opacity: image5Opacity, zIndex: 2 }} className="absolute inset-0 rounded-full overflow-hidden transform ">
                    <Image src="/images/crypto/earning4.png" fill priority alt="Woman looking at phone with excitement" className="object-cover object-center rounded-full" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 642px" />
                  </motion.div>
                  <motion.div style={{ y: image6Y, scale: image6Scale, zIndex: 1 }} className="absolute inset-0 rounded-full overflow-hidden transform ">
                    <Image src="/images/crypto/earning6.png" fill priority alt="Woman looking at phone with excitement" className="object-cover object-center rounded-full" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 642px" />
                  </motion.div>
                </div>
              </div>
              <div
                className="relative w-full max-w-[642px] h-[250px] md:h-[300px] lg:h-[350px] flex flex-col items-center justify-center text-lg md:text-xl font-medium text-gray-700 bg-gray-50 p-6 rounded-full overflow-hidden"
                style={{ boxShadow: "inset 10px 10px 20px 0px #0000001A, inset -10px -10px 30px 0px #FFFFFF", border: "2px solid transparent", borderImage: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, #F5F5F5 100%) 1" }}
              >
                <motion.div style={{ y: content1Y, opacity: content1Opacity }} className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 space-y-2 md:space-y-3 text-center">
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-gray-800"> DeFi Yield Farming </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed w-full md:w-[70%]"> Earn on your crypto holdings through automated DeFi strategies. </p>
                  <p className="text-xs md:text-sm italic text-gray-800 leading-relaxed w-full md:w-[70%]"> Auto-compounding, no lock-up periods </p>
                </motion.div>
                <motion.div style={{ y: content2Y, opacity: content2Opacity }} className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 space-y-2 md:space-y-3 text-center">
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-gray-800"> Referral Rewards </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed w-full md:w-[70%]"> Earn Bitcoin for every friend you refer to bepay money or bepay business. </p>
                  <p className="text-xs md:text-sm italic text-gray-800 leading-relaxed w-full md:w-[70%]"> *$1000+ worth Bitcoin every month </p>
                </motion.div>
                <motion.div style={{ y: content3Y, opacity: content3Opacity }} className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 space-y-2 md:space-y-3 text-center">
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-gray-800"> Staking Rewards </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed w-full md:w-[70%]"> Stake your crypto and earn passive income with flexible terms </p>
                  <p className="text-xs md:text-sm italic text-gray-800 leading-relaxed w-full md:w-[70%]"> Flexible & fixed staking options </p>
                </motion.div>
                <motion.div style={{ y: content4Y, opacity: content4Opacity }} className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 space-y-2 md:space-y-3 text-center">
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-gray-800"> Restaking </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed w-full md:w-[70%]"> Maximize your rewards through restaking protocols. </p>
                  <p className="text-xs md:text-sm italic text-gray-800 leading-relaxed w-full md:w-[70%]"> Enhanced yields through restaking </p>
                </motion.div>
                <motion.div style={{ y: content5Y, opacity: content5Opacity }} className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 space-y-2 md:space-y-3 text-center">
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-gray-800"> Cashback Rewards </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed w-full md:w-[70%]"> Earn cashback on every card transaction </p>
                  <p className="text-xs md:text-sm italic text-gray-800 leading-relaxed w-full md:w-[70%]"> Instant cashback on purchases </p>
                </motion.div>
                <motion.div style={{ y: content6Y, opacity: content6Opacity }} className="absolute inset-0 flex flex-col items-center justify-center space-y-3 p-4 md:p-6 text-center">
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-gray-800"> DePIN Storage & Compute </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed w-full md:w-[70%]"> Earn by sharing your unused storage and computing power. </p>
                  <p className="text-xs md:text-sm italic text-gray-800 leading-relaxed w-full md:w-[70%]"> Monetize your hardware resources </p>
                  <div className="flex items-center justify-center mt-6">
                    <WaitlistTriggerButton>
                      <motion.button
                        onClick={handleStartEarningClick} // ANALYTICS: Added onClick handler
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-black cursor-pointer whitespace-nowrap text-white px-6 h-[56px] rounded-full flex items-center justify-center gap-2 text-xs font-medium hover:bg-gray-800 transition-colors"
                      >
                        <Image
                          src="/start.svg"
                          alt="Start Icon"
                          width={20}
                          height={20}
                          className="w-5 h-5"
                        />
                        <span>Start earning</span>
                      </motion.button>
                    </WaitlistTriggerButton>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DefiYieldSection;