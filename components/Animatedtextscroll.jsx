"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, UserPlus } from "lucide-react";

export default function AnimatedTextScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Define scroll progress points for different animation phases
  const textSequenceStart = 0.1; // Text sequence starts

  // Animation timing - sequential word appearance
  const wordAppearDuration = 0.06; // How long word takes to appear (reduced)
  const wordStayDuration = 0.09; // How long word stays at center (significantly reduced)
  const wordExitDuration = 3; // How long word takes to exit left (reduced)
  const totalWordDuration =
    wordAppearDuration + wordStayDuration + wordExitDuration; // 0.06 total (reduced)

  // Recalculated text sequence end and mockup timing based on faster word animation
  const textSequenceEnd = textSequenceStart + 5 * totalWordDuration; // Approx 0.1 + (5 * 0.06) = 0.4
  const stuckContentStart = 0.7; // Content gets stuck at 80% scroll progress
  const mockupAppearStart = stuckContentStart; // Start mockup at the same time as stuck content
  const mockupAppearEnd = stuckContentStart + 0.05; // Mockup fully appeared very quickly

  // --- Text Animation Sequence ---
  // Each word: appear -> stay at center -> exit left -> next word appears
  // "Maximise" - word 1
  const maximiseStart = textSequenceStart;
  const maximiseOpacity = useTransform(
    scrollYProgress,
    [
      maximiseStart,
      maximiseStart + wordAppearDuration,
      maximiseStart + wordAppearDuration + wordStayDuration,
      maximiseStart + totalWordDuration,
    ],
    [0, 1, 1, 1]
  );
  const maximiseX = useTransform(
    scrollYProgress,
    [
      maximiseStart,
      maximiseStart + wordAppearDuration + wordStayDuration,
      maximiseStart + totalWordDuration,
    ],
    ["200%", "0%", "-400%"]
  );
  const maximiseY = useTransform(
    scrollYProgress,
    [maximiseStart, maximiseStart + wordAppearDuration],
    [100, 0]
  );


  // --- Mockup Animation - SMOOTH ---
  const mockupY = useTransform(
    scrollYProgress,
    [mockupAppearStart, mockupAppearEnd],
    ["100%", "0%"]
  );
  const mockupOpacity = useTransform(
    scrollYProgress,
    [mockupAppearStart, mockupAppearEnd],
    [0, 1]
  );

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-gray-50">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Text Container - Words positioned individually with proper spacing */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* "Maximise" */}
          <motion.span
            className="absolute text-gray-300 font-[400] leading-none text-[50px] sm:text-[80px] md:text-[120px] lg:text-[180px] xl:text-[250px] whitespace-nowrap will-change-transform"
            style={{
              opacity: maximiseOpacity,
              x: maximiseX,
              y: maximiseY,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Maximise Your Earnings With{" "}
            <span className="text-gray-800">bepay</span>
          </motion.span>
        </div>

       

        {/* Mockup Container */}
        <motion.div
          className="absolute left-[30%] lg:left-[50%]"
          style={{
            y: mockupY,
            opacity: mockupOpacity,
            // left: "50%",
            bottom: "10%",
            transform: "translateX(-50%)",
            width: "min(300px, 60vw)",
            height: "min(600px, 80vh)",
            aspectRatio: "409 / 868",
          }}
        >
          <div className="relative w-full h-full bg-gradient-to-b from-gray-100 to-gray-300 rounded-[20px] p-2 shadow-2xl">
            {/* Phone Screen */}
            <div className="relative w-full h-full bg-white rounded-[18px] overflow-hidden flex flex-col">
              {/* Top Section - Dark */}
              <div className="relative flex-shrink-0  h-[40%] m-2 bg-black flex items-center justify-center p-4 rounded-t-[16px]">
                {/* Bitcoin Icon */}
                <motion.div
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-b to-black from-gray-900 rounded-full flex items-center justify-center shadow-inner-custom"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  style={{
                    boxShadow:
                      "inset 0 2px 4px rgba(0,0,0,0.6), inset 0 -2px 4px rgba(255,255,255,0.1), 0 4px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  <span
                    className="text-gray-300 font-bold text-4xl sm:text-5xl md:text-6xl"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                  >
                    ₿
                  </span>
                </motion.div>
              </div>

              {/* Bottom Section - White */}
              <div className="flex-grow flex flex-col items-center justify-center p-4 text-center bg-white rounded-b-[16px]">
                {/* Earn Text */}
                <motion.p
                  className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  Earn
                </motion.p>
                {/* Subtitle */}
                <motion.p
                  className="text-sm sm:text-base text-gray-500 mb-4 px-4 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  Unlimited Bitcoin bonuses by
                  <br />
                  inviting friends and family
                </motion.p>
                {/* Arrow Icon */}
                <motion.div
                  className="mb-6 text-gray-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <ArrowDown className="w-6 h-6" />
                </motion.div>
                {/* Button */}
                <motion.button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium bg-black text-white hover:bg-gray-800 transition-all duration-200 h-10 px-6 py-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserPlus className="mr-2 w-4 h-4" />
                  Invite now!
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
