"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnalyticsService } from "@/services/analyticsService";

const BepayComparison = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("Bepay comparison section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  const comparisonData = [
    {
      id: "transaction-fees",
      label: "Transaction fees",
      bepay: "As low as 0.5%",
      traditional: "2-5%",
    },
    {
      id: "chargebacks",
      label: "Chargebacks",
      bepay: "None",
      traditional: "High risk",
    },
    {
      id: "settlement-times",
      label: "Settlement times",
      bepay: "Instant",
      traditional: "2-5 business days",
    },
    {
      id: "fraud-protection",
      label: "Fraud protection",
      bepay: "Blockchain",
      traditional: "Prone to fraud",
    },
    {
      id: "international-sales",
      label: "International sales",
      bepay: "Borderless",
      traditional: "High forex fees",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-4 md:p-8 pb-16"
    >
      <div className="w-full mx-auto max-w-7xl">
        {/* Title */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="font-['Montserrat'] text-3xl md:text-[44px] font-normal text-[#6A6A6A] leading-[100%] tracking-[-0.04em]">
            How <span className="font-semibold text-black">bepay benefits</span>{" "}
            business owners
            <br />
            over traditional payments
          </h1>
        </div>

        {/* Mobile Layout */}
        <div
          className="lg:hidden bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden"
          style={{
            width: "100%",
            maxWidth: "700px",
            height: "auto",
            minHeight: "587px",
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div className="px-6 py-8 border-b bg-[#f9f9f9] border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              {/* Bepay Column */}
              <div className="text-center flex justify-center items-center">
                <div className="flex items-center gap-2">
                  <Image
                    src="/bepaylogo1.svg"
                    height={36}
                    width={90}
                    alt="BePay Logo"
                    className="object-contain h-10 w-auto"
                    priority
                  />
                  <span className="font-['Montserrat'] font-semibold text-l leading-none tracking-[-0.04em] text-gray-800">
                    bepay business
                  </span>
                </div>
              </div>
              {/* Traditional Column */}
              <div className="text-center flex justify-center items-center">
                <span className="font-['Montserrat'] font-semibold text-l leading-none tracking-[-0.04em] text-gray-600">
                  Traditional payments
                </span>
              </div>
            </div>
          </div>

          {/* Comparison Items */}
          <div className="px-6 py-2">
            {comparisonData.map((item, index) => (
              <div key={item.id} className="relative">
                <motion.div
                  className="py-4 cursor-pointer relative"
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* ✅ CHANGE: Item Label is now hidden in mobile view */}
                  <div className="mb-4 hidden">
                    <span className="text-black font-medium text-lg whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                  {/* Values Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Bepay Value */}
                    <div className="text-center">
                      <motion.div
                        className="inline-block px-6 py-3 rounded-full text-base font-medium transition-all duration-300"
                        animate={{
                          backgroundColor:
                            hoveredItem === item.id ? "#000000" : "transparent",
                          color:
                            hoveredItem === item.id ? "#ffffff" : "#333333",
                          boxShadow:
                            hoveredItem === item.id
                              ? "0 12px 35px -5px rgba(0, 0, 0, 0.3)"
                              : "0 0 0 0 transparent",
                          scale: hoveredItem === item.id ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.bepay}
                      </motion.div>
                    </div>
                    {/* Traditional Value */}
                    <div className="text-center">
                      <motion.div
                        className="inline-block px-6 py-3 rounded-full text-base font-medium transition-all duration-300"
                        animate={{
                          backgroundColor:
                            hoveredItem === item.id ? "#f3f4f6" : "transparent",
                          color: "#333333",
                          scale: hoveredItem === item.id ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.traditional}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                {/* Separator Line */}
                {index < comparisonData.length - 1 && (
                  <div className="h-px bg-gray-200 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Labels on Left with Two Cards */}
        <div className="hidden lg:block">
          <div className="flex justify-center items-start">
            {/* Labels Column */}
            <div className="w-96 pt-40 pr-8">
              {comparisonData.map((item) => (
                <div key={`label-${item.id}`} className="relative">
                  <motion.div
                    className="py-6.5 flex items-center cursor-pointer group"
                    onClick={() =>
                      setHoveredItem(hoveredItem === item.id ? null : item.id)
                    }
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-black font-medium text-xl flex-1 whitespace-nowrap">
                      {item.label}
                    </span>
                    <div className="flex-1 ml-4">
                      <motion.div
                        className="h-px"
                        animate={{
                          backgroundImage:
                            hoveredItem === item.id
                              ? "linear-gradient(to right, #000000, #000000)"
                              : "linear-gradient(to right, #808080, white)",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Cards Container */}
            <div className="flex gap-3">
              {/* BePay Card */}
              <div
                className="rounded-4xl p-8"
                style={{
                  width: "400px",
                  height: "587px",
                  background: "#F9F9F9",
                  boxShadow:
                    "20px 20px 20px 0px #0000000D, -20px -20px 20px 0px #FFFFFFE5",
                }}
              >
                {/* BePay Header */}
                <div className="text-center mb-8 border-b border-gray-200 h-24 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/bepaylogo1.svg"
                      height={46}
                      width={110}
                      alt="BePay Logo"
                      className="object-cover h-12 w-auto"
                      priority
                    />
                    <span className="font-['Montserrat'] font-semibold text-xl leading-none tracking-[-0.04em] text-gray-800">
                      bepay business
                    </span>
                  </div>
                </div>

                {/* BePay Content */}
                <div className="space-y-0">
                  {comparisonData.map((item) => (
                    <div key={`bepay-${item.id}`} className="relative">
                      <motion.div
                        className="py-2.5 cursor-pointer flex items-center justify-center"
                        onClick={() =>
                          setHoveredItem(
                            hoveredItem === item.id ? null : item.id
                          )
                        }
                        onHoverStart={() => setHoveredItem(item.id)}
                        onHoverEnd={() => setHoveredItem(null)}
                      >
                        <motion.div
                          className="inline-flex  px-8 py-2 text-[20px] rounded-full w-[280px] items-center justify-center h-[60px]"
                          animate={{
                            backgroundColor:
                              hoveredItem === item.id
                                ? "#000000"
                                : "transparent",
                            color:
                              hoveredItem === item.id ? "#ffffff" : "#080808",
                            boxShadow:
                              hoveredItem === item.id
                                ? "0 15px 40px -5px rgba(0, 0, 0, 0.3)"
                                : "0 0 0 0 transparent",
                            scale: hoveredItem === item.id ? 1.25 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.span
                            animate={{
                              scale: hoveredItem === item.id ? 1 / 1.25 : 1,
                            }}
                          >
                            {item.bepay}
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traditional Payments Card */}
              <div
                className="rounded-4xl p-8"
                style={{
                  width: "400px",
                  height: "587px",
                  border: "1.16px solid #D7D7D7",
                }}
              >
                {/* Traditional Header */}
                <div className="text-center mb-8 border-b border-gray-200 h-24 flex items-center justify-center">
                  <span className="font-['Montserrat'] font-semibold text-xl leading-none tracking-[-0.04em] text-gray-600">
                    Traditional payments
                  </span>
                </div>

                {/* Traditional Content */}
                <div className="space-y-0">
                  {comparisonData.map((item) => (
                    <div key={`traditional-${item.id}`} className="relative">
                      <motion.div
                        className="py-2.5 cursor-pointer flex items-center justify-center"
                        onClick={() =>
                          setHoveredItem(
                            hoveredItem === item.id ? null : item.id
                          )
                        }
                        onHoverStart={() => setHoveredItem(item.id)}
                        onHoverEnd={() => setHoveredItem(null)}
                      >
                        <motion.div
                          className="inline-flex  px-8 py-2 text-[20px] rounded-full w-[280px] items-center justify-center h-[60px]"
                          animate={{
                            backgroundColor:
                              hoveredItem === item.id
                                ? "#E0E0E0"
                                : "transparent",
                            color: "#080808",
                            scale: hoveredItem === item.id ? 1.25 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.span
                            animate={{
                              scale: hoveredItem === item.id ? 1 / 1.25 : 1,
                            }}
                          >
                            {item.traditional}
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BepayComparison;
