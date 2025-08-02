"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import WaitlistTriggerButton from "../waitlist-trigger-button";

const DefiYieldSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Faster animation for mobile, slower for desktop
  const animationStart = isMobile ? 0.0 : 0.0;
  const animationEnd = isMobile ? 0.2 : 0.2; // Faster on mobile

  // Both sections animate from bottom together - faster on mobile
  const containerY = useTransform(
    scrollYProgress,
    [animationStart, animationEnd],
    [isMobile ? "100%" : "100%", "0%"]
  );

  const containerOpacity = useTransform(
    scrollYProgress,
    [animationStart, animationEnd],
    [0, 1]
  );

  // Individual image exit animations (adjusted for mobile)
  const imageStart = animationEnd;

  // Image 1 (bottom) - exits first
  const image1Y = useTransform(
    scrollYProgress,
    [imageStart, imageStart + 0.1],
    ["0%", "-200%"]
  );
  const image1Rotate = useTransform(
    scrollYProgress,
    [imageStart, imageStart + 0.1],
    [0, 15]
  );
  const image1Opacity = useTransform(
    scrollYProgress,
    [imageStart, imageStart + 0],
    [1, 0]
  );

  // Image 2 - exits second
  const image2Y = useTransform(
    scrollYProgress,
    [imageStart + 0.1, imageStart + 0.2],
    ["0%", "-200%"]
  );
  const image2Rotate = useTransform(
    scrollYProgress,
    [imageStart + 0.1, imageStart + 0.2],
    [0, 15]
  );
  const image2Opacity = useTransform(
    scrollYProgress,
    [imageStart + 0.1, imageStart + 0.2],
    [1, 0]
  );

  // Image 3 - exits third
  const image3Y = useTransform(
    scrollYProgress,
    [imageStart + 0.2, imageStart + 0.3],
    ["0%", "-200%"]
  );
  const image3Rotate = useTransform(
    scrollYProgress,
    [imageStart + 0.2, imageStart + 0.3],
    [0, 15]
  );
  const image3Opacity = useTransform(
    scrollYProgress,
    [imageStart + 0.2, imageStart + 0.3],
    [1, 0]
  );

  // Image 4 - exits fourth
  const image4Y = useTransform(
    scrollYProgress,
    [imageStart + 0.3, imageStart + 0.4],
    ["0%", "-200%"]
  );
  const image4Rotate = useTransform(
    scrollYProgress,
    [imageStart + 0.3, imageStart + 0.4],
    [0, 15]
  );
  const image4Opacity = useTransform(
    scrollYProgress,
    [imageStart + 0.3, imageStart + 0.4],
    [1, 0]
  );

  // Image 5 - exits fifth
  const image5Y = useTransform(
    scrollYProgress,
    [imageStart + 0.4, imageStart + 0.5],
    ["0%", "-200%"]
  );
  const image5Rotate = useTransform(
    scrollYProgress,
    [imageStart + 0.4, imageStart + 0.5],
    [0, 15]
  );
  const image5Opacity = useTransform(
    scrollYProgress,
    [imageStart + 0.4, imageStart + 0.5],
    [1, 0]
  );

  // Image 6 (top) - moves up and scales
  const image6Y = useTransform(
    scrollYProgress,
    [imageStart + 0.5, imageStart + 0.65],
    ["0%", "-50%"]
  );
  const image6Scale = useTransform(
    scrollYProgress,
    [imageStart + 0.5, imageStart + 0.65],
    [1, 1.1]
  );

  // Right side content animations - synchronized with image exits
  // Content 1 - exits when image 1 exits
  const content1Y = useTransform(
    scrollYProgress,
    [imageStart, imageStart + 0.1],
    ["0%", "-100%"]
  );
  const content1Opacity = useTransform(
    scrollYProgress,
    [imageStart, imageStart + 0.1],
    [1, 0]
  );

  // Content 2 - appears when image 1 exits, exits when image 2 exits
  const content2Y = useTransform(
    scrollYProgress,
    [imageStart, imageStart + 0.1, imageStart + 0.1, imageStart + 0.2],
    ["100%", "0%", "0%", "-100%"]
  );
  const content2Opacity = useTransform(
    scrollYProgress,
    [imageStart, imageStart + 0.1, imageStart + 0.1, imageStart + 0.2],
    [0, 1, 1, 0]
  );

  // Content 3 - appears when image 2 exits, exits when image 3 exits
  const content3Y = useTransform(
    scrollYProgress,
    [imageStart + 0.1, imageStart + 0.2, imageStart + 0.2, imageStart + 0.3],
    ["100%", "0%", "0%", "-100%"]
  );
  const content3Opacity = useTransform(
    scrollYProgress,
    [imageStart + 0.1, imageStart + 0.2, imageStart + 0.2, imageStart + 0.3],
    [0, 1, 1, 0]
  );

  // Content 4 - appears when image 3 exits, exits when image 4 exits
  const content4Y = useTransform(
    scrollYProgress,
    [imageStart + 0.2, imageStart + 0.3, imageStart + 0.3, imageStart + 0.4],
    ["100%", "0%", "0%", "-100%"]
  );
  const content4Opacity = useTransform(
    scrollYProgress,
    [imageStart + 0.2, imageStart + 0.3, imageStart + 0.3, imageStart + 0.4],
    [0, 1, 1, 0]
  );

  // Content 5 - appears when image 4 exits, exits when image 5 exits
  const content5Y = useTransform(
    scrollYProgress,
    [imageStart + 0.3, imageStart + 0.4, imageStart + 0.4, imageStart + 0.5],
    ["100%", "0%", "0%", "-100%"]
  );
  const content5Opacity = useTransform(
    scrollYProgress,
    [imageStart + 0.3, imageStart + 0.4, imageStart + 0.4, imageStart + 0.5],
    [0, 1, 1, 0]
  );

  // Content 6 - appears when image 5 exits, remains when image 6 moves up
  const content6Y = useTransform(
    scrollYProgress,
    [imageStart + 0.4, imageStart + 0.5],
    ["100%", "0%"]
  );
  const content6Opacity = useTransform(
    scrollYProgress,
    [imageStart + 0.4, imageStart + 0.5],
    [0, 1]
  );

  return (
    <div className="relative">
      <section
        ref={sectionRef}
        className="relative min-h-[600vh]"
        data-detailed-animation
      >
        <div className="sticky top-0 h-screen">
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 md:p-10">
            {/* Main content container - Both sections animate together */}
            <motion.div
              style={{
                y: containerY,
                opacity: containerOpacity,
              }}
              className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-10"
            >
              {/* Left side - Stacked Images with Animation */}
              <div className="relative w-full max-w-[642px] h-[250px] md:h-[300px] lg:h-[350px]">
                <div className="relative w-full h-full">
                  {/* Image 1 - Bottom layer */}
                  <motion.div
                    style={{
                      y: image1Y,
                      rotate: image1Rotate,
                      zIndex: 6,
                    }}
                    className="absolute inset-0 rounded-full overflow-hidden"
                  >
                    <Image
                      src="/images/crypto/earning1.png"
                      fill
                      priority
                      alt="Woman looking at phone with excitement"
                      className="object-cover object-center rounded-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 642px"
                    />
                  </motion.div>
                  {/* Image 2 - Second layer */}
                  <motion.div
                    style={{
                      y: image2Y,
                      rotate: image2Rotate,
                      zIndex: 5,
                    }}
                    className="absolute inset-0 rounded-full overflow-hidden transform "
                  >
                    <Image
                      src="/images/crypto/earning2.png"
                      fill
                      priority
                      alt="Woman looking at phone with excitement"
                      className="object-cover object-center rounded-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 642px"
                    />
                  </motion.div>
                  {/* Image 3 - Third layer */}
                  <motion.div
                    style={{
                      y: image3Y,
                      rotate: image3Rotate,
                      zIndex: 4,
                    }}
                    className="absolute inset-0 rounded-full overflow-hidden transform "
                  >
                    <Image
                      src="/images/crypto/earning3.png"
                      fill
                      priority
                      alt="Woman looking at phone with excitement"
                      className="object-cover object-center rounded-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 642px"
                    />
                  </motion.div>
                  {/* Image 4 - Fourth layer */}
                  <motion.div
                    style={{
                      y: image4Y,
                      rotate: image4Rotate,
                      zIndex: 3,
                    }}
                    className="absolute inset-0 rounded-full overflow-hidden transform "
                  >
                    <Image
                      src="/images/crypto/earning4.png"
                      fill
                      priority
                      alt="Woman looking at phone with excitement"
                      className="object-cover object-center rounded-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 642px"
                    />
                  </motion.div>
                  {/* Image 5 - Fifth layer */}
                  <motion.div
                    style={{
                      y: image5Y,
                      rotate: image5Rotate,
                      zIndex: 2,
                    }}
                    className="absolute inset-0 rounded-full overflow-hidden transform "
                  >
                    <Image
                      src="/images/crypto/earning5.png"
                      fill
                      priority
                      alt="Woman looking at phone with excitement"
                      className="object-cover object-center rounded-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 642px"
                    />
                  </motion.div>
                  {/* Image 6 - Top layer (remains) */}
                  <motion.div
                    style={{
                      zIndex: 1,
                    }}
                    className="absolute inset-0 rounded-full overflow-hidden transform "
                  >
                    <Image
                      src="/images/crypto/earning6.png"
                      fill
                      priority
                      alt="Woman looking at phone with excitement"
                      className="object-cover object-center rounded-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 642px"
                    />
                  </motion.div>
                </div>
              </div>
              {/* Right side - Animated Content box */}
              <div
                className="relative w-full max-w-[642px] h-[250px] md:h-[300px] lg:h-[350px] flex flex-col items-center justify-center text-lg md:text-xl font-medium text-gray-700 bg-gray-50 p-6 rounded-full overflow-hidden"
                style={{
                  boxShadow:
                    "inset 10px 10px 20px 0px #0000001A, inset -10px -10px 30px 0px #FFFFFF",
                  border: "2px solid transparent",
                  borderImage:
                    "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, #F5F5F5 100%) 1",
                }}
              >
                {/* Content 1 - DeFi Yield Farming */}
                <motion.div
                  style={{
                    y: content1Y,
                  }}
                  className="absolute opacity-80  inset-0 flex flex-col items-center justify-center p-6 space-y-3 text-center"
                >
                  <h3 className="text-lg md:text-lg font-bold mb-3 text-gray-800">
                    DeFi Yield Farming
                  </h3>
                  <p className="text-sm md:text-sm text-gray-600 leading-relaxed w-[70%]">
                    Earn on your crypto holdings through automated DeFi
                    strategies.
                  </p>
                  <p className="text-sm md:text-sm italic text-gray-800 leading-relaxed w-[70%]">
                    Auto-compounding, no lock-up periods
                  </p>
                </motion.div>
                {/* Content 2 - Cashback Rewards */}
                <motion.div
                  style={{
                    y: content2Y,
                  }}
                  className="absolute inset-0 opacity-80 flex flex-col items-center justify-center p-6 space-y-3 text-center"
                >
                  <h3 className="text-lg md:text-lg font-bold mb-3 text-gray-800">
                    Cashback Rewards
                  </h3>
                  <p className="text-sm md:text-sm text-gray-600 leading-relaxed w-[70%]">
                    Earn cashback on every card transaction.
                  </p>
                  <p className="text-sm md:text-sm italic text-gray-800 leading-relaxed w-[70%]">
                    Instant cashback on purchases
                  </p>
                </motion.div>
                {/* Content 3 - Restaking */}
                <motion.div
                  style={{
                    y: content3Y,
                  }}
                  className="absolute inset-0 flex opacity-80  flex-col items-center justify-center p-6 space-y-3 text-center"
                >
                  <h3 className="text-lg md:text-lg font-bold mb-3 text-gray-800">
                    Restaking
                  </h3>
                  <p className="text-sm md:text-sm text-gray-600 leading-relaxed w-[70%]">
                    Maximize your rewards through restaking protocols.
                  </p>
                  <p className="text-sm md:text-sm italic text-gray-800 leading-relaxed w-[70%]">
                    Enhanced yields through restaking
                  </p>
                </motion.div>
                {/* Content 4 - Referral Rewards */}
                <motion.div
                  style={{
                    y: content4Y,
                  }}
                  className="absolute inset-0 flex opacity-80  flex-col items-center justify-center space-y-3 p-6 text-center"
                >
                  <h3 className="text-lg md:text-lg font-bold mb-3 text-gray-800">
                    Referral Rewards
                  </h3>
                  <p className="text-sm md:text-sm text-gray-600 leading-relaxed w-[70%]">
                    Earn Bitcoin for every friend you refer to bepay money or
                    bepay business.
                  </p>
                  <p className="text-sm md:text-sm italic text-gray-800 leading-relaxed w-[70%]">
                    *$1000+ worth Bitcoin every month
                  </p>
                </motion.div>
                {/* Content 5 - DePIN Storage & Compute */}
                <motion.div
                  style={{
                    y: content5Y,
                  }}
                  className="absolute inset-0 flex opacity-80  flex-col items-center justify-center space-y-3 p-6 text-center"
                >
                  <h3 className="text-lg md:text-lg font-bold mb-3 text-gray-800">
                    DePIN Storage & Compute
                  </h3>
                  <p className="text-sm md:text-sm text-gray-600 leading-relaxed w-[70%]">
                    Earn by sharing your unused storage and computing power.
                  </p>
                  <p className="text-sm md:text-sm italic text-gray-800 leading-relaxed w-[70%]">
                    Monetize your hardware resources
                  </p>
                </motion.div>
                {/* Content 6 - Final Content */}
                <motion.div
                  style={{
                    y: content6Y,
                  }}
                  className="absolute inset-0 opacity-80  flex flex-col items-center justify-center space-y-3 p-6 text-center"
                >
                  <h3 className="text-lg md:text-lg font-bold mb-3 text-gray-800">
                    Multi-Chain Rewards
                  </h3>
                  <p className="text-sm md:text-sm text-gray-600 mb-4 leading-relaxed w-[70%]">
                    Access rewards across multiple blockchain networks.
                  </p>
                  <p className="text-sm md:text-sm italic text-gray-800 leading-relaxed w-[70%]">
                    Diversify your earning strategies.
                  </p>
                  <WaitlistTriggerButton>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-black cursor-pointer   whitespace-nowrap text-white px-4 py-2 lg:px-6 lg:py-2 rounded-full flex items-center justify-center gap-2 text-[12px] font-medium hover:bg-gray-800 transition-colors"
                    >
                      Start Earning{" "}
                      <ArrowUpRight className="w-3 h-3 -mt-[1px] lg:w-4 lg:h-8" />
                    </motion.button>
                  </WaitlistTriggerButton>
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
