"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import WaitlistTriggerButton from "../waitlist-trigger-button";

const HowCryptoMake = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values for mockup transitions
  const mockup1Y = useTransform(scrollYProgress, [0, 0.25], [0, -1200]);
  const mockup1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 1]);

  const mockup2Y = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.5],
    [800, 0, -1200]
  );
  const mockup2Opacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.5],
    [0, 1, 1]
  );

  const mockup3Y = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.75],
    [800, 0, -1200]
  );
  const mockup3Opacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.75],
    [0, 1, 1]
  );

  const mockup4Y = useTransform(
    scrollYProgress,
    [0.65, 0.75, 1],
    [800, 0, -800]
  );
  const mockup4Opacity = useTransform(
    scrollYProgress,
    [0.65, 0.75, 1],
    [0, 1, 1]
  );

  const content1Y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25],
    [200, 0, -200]
  );
  const content2Y = useTransform(
    scrollYProgress,
    [0.15, 0.3, 0.5],
    [200, 0, -200]
  );
  const content3Y = useTransform(
    scrollYProgress,
    [0.4, 0.55, 0.75],
    [200, 0, -200]
  );
  const content4Y = useTransform(
    scrollYProgress,
    [0.65, 0.8, 1],
    [200, 0, -200]
  );

  // Content animations
  const content1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const content2Opacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.5],
    [0, 1, 0]
  );
  const content3Opacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.75],
    [0, 1, 0]
  );
  const content4Opacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);

  // Fixed: Floating elements opacity - only show when last mockup is visible
  const floatingElementsOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.75],
    [0, 1]
  );

  // Fixed: Floating elements Y position - animate from bottom
  const floatingElement1Y = useTransform(scrollYProgress, [0.7, 0.8], [50, 0]);
  const floatingElement2Y = useTransform(
    scrollYProgress,
    [0.72, 0.82],
    [50, 0]
  );
  const floatingElement3Y = useTransform(
    scrollYProgress,
    [0.74, 0.84],
    [50, 0]
  );

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
    {
      text: "Customer selects crypto at checkout",
      side: "left",
    },
    {
      text: "bepay generates a QR code or token address",
      side: "right",
    },
    {
      text: "Customer pays in BTC, ETH, USDT & more",
      side: "left",
    },
    {
      text: "Payment confirmed and business receives funds",
      side: "right",
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-[#F9F9F9] h-[500vh]">
      {/* Sticky Header */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="py-20 relative h-full">
          {/* Sticky Title */}
          <div className="text-center relative max-w-[1000px] mx-auto mb-16 sm:mb-24 lg:mb-32">
            <motion.h2
              className="font-[400] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.5rem] leading-[1.1] tracking-tight"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <motion.div
                className="inline-block mb-2 sm:mb-4"
                variants={lineVariants}
              >
                <span className="text-[#C0C0C0] font-light">How </span>
                <span className="text-[#333333]">crypto </span>
                <span className="text-[#C0C0C0] font-light">payments </span>
              </motion.div>
              <br />
              <motion.div className="inline-block" variants={lineVariants}>
                <span className="text-[#C0C0C0] font-light">work with </span>
                <span className="text-[#333333]">bepay</span>
              </motion.div>
            </motion.h2>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              {/* Mockup 1 */}
              <motion.div
                className="absolute left-1/2 top-[540px] -translate-y-1/2 -translate-x-1/2 z-10"
                style={{
                  y: mockup1Y,
                  opacity: mockup1Opacity,
                }}
              >
                <div className="relative w-[400px] h-[700px] drop-shadow-2xl">
                  <Image
                    src="/images/business/mocup1.png"
                    alt="Bepay crypto payment interface"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* Mockup 2 */}
              <motion.div
                className="absolute left-1/2 top-[540px] -translate-y-1/2 -translate-x-1/2 z-10"
                style={{
                  y: mockup2Y,
                  opacity: mockup2Opacity,
                }}
              >
                <div className="relative w-[400px] h-[700px] drop-shadow-2xl">
                  <Image
                    src="/images/business/mocup2.png"
                    alt="Bepay QR code interface"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* Mockup 3 */}
              <motion.div
                className="absolute left-1/2 top-[540px] -translate-y-1/2 -translate-x-1/2 z-10"
                style={{
                  y: mockup3Y,
                  opacity: mockup3Opacity,
                }}
              >
                <div className="relative w-[400px] h-[700px] drop-shadow-2xl">
                  <Image
                    src="/images/business/mocup3.png"
                    alt="Bepay payment success"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* Mockup 4 */}
              <motion.div
                className="absolute left-1/2 top-[540px] -translate-y-1/2 -translate-x-1/2 z-10"
                style={{
                  y: mockup4Y,
                  opacity: mockup4Opacity,
                }}
              >
                <div className="relative w-[400px] h-[700px] drop-shadow-2xl">
                  <Image
                    src="/images/business/mocup4.png"
                    alt="Bepay payment confirmation"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* Content 1 - Left */}
              <motion.div
                className="absolute left-8 top-[200px] translate-y-1/2 z-20"
                style={{ opacity: content1Opacity, y: content1Y }}
              >
                <div className="p-4 max-w-[400px]">
                  <p className="text-sm  text-gray-600 font-bold">
                    {contentData[0].text}
                  </p>
                </div>
              </motion.div>

              {/* Content 2 - Right */}
              <motion.div
                className="absolute -right-5 top-[400px] translate-y-1/2 z-20"
                style={{ opacity: content2Opacity, y: content2Y }}
              >
                <div className="p-4 max-w-[400px] text-right">
                  <p className="text-sm text-gray-600 font-bold">
                    {contentData[1].text}
                  </p>
                </div>
              </motion.div>

              {/* Content 3 - Left */}
              <motion.div
                className="absolute left-0 top-[400px] translate-y-1/2 z-20"
                style={{ opacity: content3Opacity, y: content3Y }}
              >
                <div className="p-4 max-w-[400px]">
                  <p className="text-sm text-gray-600 font-bold">
                    {contentData[2].text}
                  </p>
                </div>
              </motion.div>

              {/* Content 4 - Right with Action Buttons */}
              <motion.div
                className="absolute -right-10 top-[300px] translate-y-1/2 z-20"
                style={{ opacity: content4Opacity, y: content4Y }}
              >
                <div className="p-4 max-w-[400px] text-right">
                  <p className="text-sm text-gray-600 font-medium mb-8">
                    {contentData[3].text}
                  </p>

                  {/* Action Buttons */}
                  <WaitlistTriggerButton>
                    <div className="space-y-3">
                      <motion.button
                        className="w-full  bg-black text-white py-4 px-6 rounded-full text-sm font-medium hover:bg-black/90 cursor-pointer transition-colors"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                      >
                        Become a merchant on bepay →
                      </motion.button>

                      {/* <motion.button
                      className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-full cursor-pointer  text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1, duration: 0.6 }}
                    >
                      <Phone /> Quick chat with sales
                    </motion.button> */}
                    </div>
                  </WaitlistTriggerButton>
                </div>
              </motion.div>

              {/* Fixed: Floating Elements on top of Mockup 4 */}
              {/* NO HASSLE Element */}
              <motion.div
                className="absolute left-[30%] shadow-2xl rounded-[20px] top-[250px] z-30"
                style={{
                  opacity: floatingElementsOpacity,
                  y: floatingElement1Y,
                }}
              >
                <div
                  className="p-4 rounded-[20px] mx-auto "
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

              {/* NO VOLATILITY Element */}
              <motion.div
                className="absolute left-[23%]  shadow-2xl rounded-[20px] top-[450px] z-30"
                style={{
                  opacity: floatingElementsOpacity,
                  y: floatingElement2Y,
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

              {/* NO DELAYS Element */}
              <motion.div
                className="absolute shadow-2xl  rounded-[20px] left-[60%] top-[200px] z-30"
                style={{
                  opacity: floatingElementsOpacity,
                  y: floatingElement3Y,
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

            {/* Mobile Layout */}
            <div className="lg:hidden px-4">
              <div className="flex flex-col items-center space-y-8 relative mt-12">
                {/* Mobile Container 1 */}
                <motion.div
                  className="flex flex-col items-center"
                  style={{
                    y: mockup1Y,
                    opacity: mockup1Opacity,
                  }}
                >
                  <div className="relative w-[240px] h-[420px] drop-shadow-xl mb-6">
                    <Image
                      src="/images/business/mocup1.png"
                      alt="Bepay crypto payment interface"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <motion.div
                    className="w-full max-w-sm"
                    style={{ opacity: content1Opacity, y: content1Y }}
                  >
                    <div className="text-center">
                      <p className="text-base text-gray-600 font-medium">
                        {contentData[0].text}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Mobile Container 2 */}
                <motion.div
                  className="absolute flex flex-col items-center"
                  style={{
                    y: mockup2Y,
                    opacity: mockup2Opacity,
                  }}
                >
                  <div className="relative w-[240px] h-[420px] drop-shadow-xl mb-6">
                    <Image
                      src="/images/business/mocup2.png"
                      alt="Bepay QR code interface"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <motion.div
                    className="w-full max-w-sm"
                    style={{ opacity: content2Opacity, y: content2Y }}
                  >
                    <div className="text-center">
                      <p className="text-base text-gray-600 font-medium">
                        {contentData[1].text}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Mobile Container 3 */}
                <motion.div
                  className="absolute flex flex-col items-center"
                  style={{
                    y: mockup3Y,
                    opacity: mockup3Opacity,
                  }}
                >
                  <div className="relative w-[240px] h-[420px] drop-shadow-xl mb-6">
                    <Image
                      src="/images/business/mocup3.png"
                      alt="Bepay payment success"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <motion.div
                    className="w-full max-w-sm"
                    style={{ opacity: content3Opacity, y: content3Y }}
                  >
                    <div className="text-center">
                      <p className="text-base text-gray-600 font-medium">
                        {contentData[2].text}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Mobile Container 4 */}
                <motion.div
                  className="absolute flex flex-col items-center"
                  style={{
                    y: mockup4Y,
                    opacity: mockup4Opacity,
                  }}
                >
                  <div className="relative w-[240px] h-[420px] drop-shadow-xl mb-6">
                    <Image
                      src="/images/business/mocup4.png"
                      alt="Bepay payment confirmation"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <motion.div
                    className="w-full max-w-sm px-4"
                    style={{ opacity: content4Opacity, y: content4Y }}
                  >
                    <div className="text-center mb-6">
                      <p className="text-base text-gray-600 font-medium mb-6">
                        {contentData[3].text}
                      </p>
                    </div>

                    {/* Fixed: Mobile Interactive Elements with proper timing */}
                    <div className="space-y-4">
                      {/* Main Content Card - NO HASSLE */}
                      <motion.div
                        className="p-4 rounded-lg"
                        style={{
                          border: "1px #ffffff1a",
                          boxShadow: "30px 30px 60px 0px rgba(0, 0, 0, 0.05)",
                          backdropFilter: "blur(20px)",
                          background: "rgba(255, 255, 255, 255)",
                          opacity: floatingElementsOpacity,
                          y: floatingElement1Y,
                        }}
                      >
                        <h3 className="text-base font-semibold text-gray-800 mb-2">
                          NO HASSLE!
                        </h3>
                      </motion.div>

                      {/* Feature Cards */}
                      <div className="grid grid-cols-2 gap-3">
                        <motion.div
                          className="p-3 rounded-lg text-center"
                          style={{
                            border: "1px #ffffff1a",
                            boxShadow: "30px 30px 60px 0px rgba(0, 0, 0, 0.05)",
                            backdropFilter: "blur(20px)",
                            background: "rgba(255, 255, 255, 255)",
                            opacity: floatingElementsOpacity,
                            y: floatingElement2Y,
                          }}
                        >
                          <h4 className="font-medium text-gray-800 text-xs">
                            NO VOLATILITY!
                          </h4>
                        </motion.div>

                        <motion.div
                          className="p-3 rounded-lg text-center"
                          style={{
                            border: "1px #ffffff1a",
                            boxShadow: "30px 30px 60px 0px rgba(0, 0, 0, 0.05)",
                            backdropFilter: "blur(20px)",
                            background: "rgba(255, 255, 255, 255)",
                            opacity: floatingElementsOpacity,
                            y: floatingElement3Y,
                          }}
                        >
                          <h4 className="font-medium text-gray-800 text-xs">
                            NO DELAYS!
                          </h4>
                        </motion.div>
                      </div>

                      {/* Action Buttons */}
                      <WaitlistTriggerButton>
                        <div className="space-y-3 mt-6">
                          <motion.button
                            className="w-full bg-black rounded-full text-white py-4 px-4  text-sm font-medium hover:bg-black/90 cursor-pointer transition-colors"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                          >
                            Become a merchant on bepay →
                          </motion.button>

                          {/* <motion.button
                          className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1, duration: 0.6 }}
                        >
                          <Phone /> Quick chat with sales
                        </motion.button> */}
                        </div>
                      </WaitlistTriggerButton>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowCryptoMake;
