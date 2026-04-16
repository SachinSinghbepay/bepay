"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
// 1. Next.js Image component imported
import Image from "next/image";
import { AnalyticsService } from "@/services/analyticsService";
import GetStartedPopup from "@/components/popups/getStartedPopup";

export default function BepayLanding() {
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          try {
            AnalyticsService.sendEvent("BepayLanding IGPS viewed");
          } catch (e) { }
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasTrackedView]);

  // Utility component to render the image tile
  // 2. Modified FeatureImage to use <Image /> component
  const FeatureImage = ({ src }) => (
    <div className="flex justify-center mb-6">
      <div className="w-21 h-21 flex items-center justify-center overflow-hidden">
        <Image
          src={src}
          alt="Feature Icon"
          width={100}
          height={100}
          className="w-25 h-25 object-contain"
          priority={true}
        />
      </div>
    </div>
  );

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#F9F9F9] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-11">
          <h1
            className="
            text-[30px] leading-[30px] font-semibold text-[#C0C0C0]
            tracking-[-0.04em] text-center md:whitespace-nowrap
            md:text-[54px] md:leading-[54px] md:tracking-[-0.06em]
            font-montserrat
          "
          >
            Why Businesses Choose{" "}
            <span className="text-[#080808]">bepay IGPS</span>
          </h1>

          <p
            className="text-[#080808] text-[14px] md:text-[24px] mt-5"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 500,

              lineHeight: "100%",
              letterSpacing: "-2%",
              textAlign: "center",
            }}
          >
            The Operating System for Borderless Business
          </p>
        </div>

        {/* Subtitle */}
        <div>
          <p
            className="text-[#6A6A6A] text-[13px] md:text-[18px]"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 500,
              lineHeight: "20px",
              letterSpacing: "-2%",
              textAlign: "center",
            }}
          >
            A single platform that bridges traditional banking with intelligent
            stablecoin rails, delivering near real-time settlements, cost savings,
            and easy compliance for global enterprises.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-15 mx-auto"
          style={{ maxWidth: "1000px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Faster Global Settlements (c1.png) */}
          <motion.div
            className="bg-[#F1F1F1] p-8 flex flex-col justify-center mx-auto"
            style={{
              width: "100%",
              maxWidth: "480px",
              height: "293px",
              borderRadius: "54px",
            }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            <FeatureImage src="/c1.png" />
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
              Faster Global Settlements
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Move money across borders with modern rails designed for speed.
            </p>
          </motion.div>

          {/* Intelligent Smart Routing (c2.png) */}
          <motion.div
            className="bg-[#F1F1F1] p-8 flex flex-col justify-center mx-auto"
            style={{
              width: "100%",
              maxWidth: "480px",
              height: "293px",
              borderRadius: "54px",
            }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            <FeatureImage src="/c2.png" />
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
              Intelligent Smart Routing
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Let our intelligent engine choose the fastest and cheapest
              multi-away lane.
            </p>
          </motion.div>

          {/* Up to 50% Cost Reduction (c3.png) */}
          <motion.div
            className="bg-[#F1F1F1] p-8 flex flex-col justify-center mx-auto"
            style={{
              width: "100%",
              maxWidth: "480px",
              height: "293px",
              borderRadius: "54px",
            }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            <FeatureImage src="/c3.png" />
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
              Up to 50% Cost Reduction
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Cut down the middlemen, not your margins.
            </p>
          </motion.div>

          {/* Compliance-First Architecture (c4.png) */}
          <motion.div
            className="bg-[#F1F1F1] p-8 flex flex-col justify-center mx-auto"
            style={{
              width: "100%",
              maxWidth: "480px",
              height: "293px",
              borderRadius: "54px",
            }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            <FeatureImage src="/c4.png" />
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
              Compliance-First Architecture
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Built from day one with regulatory requirements in mind.
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <div className="text-center">
          <h2
            className="
            font-semibold text-[#080808] mb-8 mt-10
            md:text-[24px] md:font-semibold   /* Desktop stays same */
            text-center                       /* Mobile: center */
            text-[16px] leading-[24px]        /* Mobile: font-size + line-height */
            tracking-[-0.02em]                /* Mobile: letter-spacing -2% */
            font-[600]                        /* Mobile: font-weight 600 */
          "
            style={{
              fontFamily: "Montserrat",
            }}
          >
            Ready to Receive International Payments?
          </h2>

          <button
            onClick={() => {
              try {
                AnalyticsService.sendEvent("BepayLanding Get Started Clicked");
              } catch (e) { }
              window.location.href = process.env.NEXT_PUBLIC_IGPS_URL;
            }}
            className="cursor-pointer flex items-center justify-center gap-2 bg-black text-white px-6 py-4 h-[56px] rounded-full mt-8 text-xs font-medium md:w-[180px] md:text-[14px] mx-auto"
          >
            <span>Get Started</span>
            {/* Keeping ArrowUpRight icon as inline SVG for simplicity */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-7 flex-shrink-0"
            >
              <path d="M7 17l10-10M7 7h10v10" />
            </svg>
          </button>
        </div>
        {/* Get Started popup */}
        {typeof window !== "undefined" && (
          // lazy render popup only on client
          <GetStartedPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
