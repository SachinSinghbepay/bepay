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
    offset: ["start start", "end start"],
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
                      src="/images/crypto/earning5.png"
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
                      src="/images/crypto/earning2.png"
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
                      src="/images/crypto/earning3.png"
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
                      src="/images/crypto/earning4.png"
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
                {/* Content 3 - Restaking */}
                <motion.div
                  style={{
                    y: content3Y,
                  }}
                  className="absolute inset-0 flex opacity-80  flex-col items-center justify-center p-6 space-y-3 text-center"
                >
                  <h3 className="text-lg md:text-lg font-bold mb-3 text-gray-800">
                    Staking Rewards
                  </h3>
                  <p className="text-sm md:text-sm text-gray-600 leading-relaxed w-[70%]">
                    Stake your crypto and earn passive income with flexible
                    terms
                  </p>
                  <p className="text-sm md:text-sm italic text-gray-800 leading-relaxed w-[70%]">
                    Flexible & fixed staking options
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
                    Restaking
                  </h3>
                  <p className="text-sm md:text-sm text-gray-600 leading-relaxed w-[70%]">
                    Maximize your rewards through restaking protocols.
                  </p>
                  <p className="text-sm md:text-sm italic text-gray-800 leading-relaxed w-[70%]">
                    Enhanced yields through restaking
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
                    Cashback Rewards
                  </h3>
                  <p className="text-sm md:text-sm text-gray-600 leading-relaxed w-[70%]">
                    Earn cashback on every card transaction
                  </p>
                  <p className="text-sm md:text-sm italic text-gray-800 leading-relaxed w-[70%]">
                    Instant cashback on purchases
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
                    DePIN Storage & Compute
                  </h3>
                  <p className="text-sm md:text-sm text-gray-600 leading-relaxed w-[70%]">
                    Earn by sharing your unused storage and computing power.
                  </p>
                  <p className="text-sm md:text-sm italic text-gray-800 leading-relaxed w-[70%]">
                    Monetize your hardware resources
                  </p>
                  <WaitlistTriggerButton>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-black cursor-pointer   whitespace-nowrap text-white px-4 py-2 lg:px-6 lg:py-2 rounded-full flex items-center justify-center gap-2 text-[12px] font-medium hover:bg-gray-800 transition-colors"
                    >
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.87318 9.47184L13.5646 4.21036C13.8717 3.77265 14.4754 3.66657 14.9133 3.97337L18.2824 6.33367C18.7203 6.64045 18.8268 7.24401 18.5203 7.68214L17.5578 9.05838C17.3765 9.3175 17.0802 9.47184 16.764 9.47184H9.87318ZM9.87318 9.47184H6.69107C5.90694 9.47184 5.44778 8.58874 5.89817 7.94686L8.5197 4.21079C8.82695 3.77291 9.43098 3.66699 9.86888 3.9742L11.6632 5.23294C12.101 5.54014 12.207 6.14414 11.8999 6.58207L9.87318 9.47184Z"
                          stroke="#F9F9F9"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M20.0825 9.46875H3.9385C3.38155 9.46875 2.92969 9.92061 2.92969 10.4776V20.5677C2.92969 21.1246 3.38155 21.5765 3.9385 21.5765H20.0825C20.6394 21.5765 21.0913 21.1246 21.0913 20.5677V10.4776C21.0913 9.92061 20.6394 9.46875 20.0825 9.46875Z"
                          stroke="#F9F9F9"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <circle
                          cx="17.0482"
                          cy="15.4779"
                          r="0.4935"
                          fill="#F9F9F9"
                        />
                      </svg>
                      Start earning with bepay{" "}
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
