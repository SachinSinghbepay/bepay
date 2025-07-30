"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const BepayComparison = () => {
  const [hoveredItem, setHoveredItem] = useState(null)

  const comparisonData = [
    {
      id: "transaction-fees",
      label: "Transaction fees",
      bepay: "As low as 0.5%",
      traditional: " Higher Fees 2-5%",
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
  ]

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-4 md:p-8 pb-16">
      <div className="w-full mx-auto max-w-7xl">
        {/* Title */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-800 leading-tight">
            How <span className="font-semibold text-black">bepay benefits</span> business owners
            <br />
            <span className="text-gray-500">over traditional payments</span>
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
                <Image
                  src="/bepaylogo1.png"
                  height={46}
                  width={110}
                  alt="BePay Logo"
                  className="object-cover h-12 w-auto"
                  priority
                />
              </div>
              {/* Traditional Column */}
              <div className="text-center">
                <div className="rounded-full px-4 py-2 inline-block">
                  <span className="font-medium text-gray-600 text-sm">Traditional payments</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Items */}
          <div className="px-6 py-2">
            {comparisonData.map((item, index) => (
              <div key={item.id} className="relative">
                <motion.div
                  className="py-6 cursor-pointer relative"
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Item Label */}
                  <div className="mb-4">
                    <span className="text-gray-700 font-medium text-sm">{item.label}</span>
                  </div>
                  {/* Values Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Bepay Value */}
                    <div className="text-center">
                      <motion.div
                        className="inline-block px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                        animate={{
                          backgroundColor: hoveredItem === item.id ? "#000000" : "transparent",
                          color: hoveredItem === item.id ? "#ffffff" : "#374151",
                          boxShadow:
                            hoveredItem === item.id ? "0 8px 25px -5px rgba(0, 0, 0, 0.2)" : "0 0 0 0 transparent",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.bepay}
                      </motion.div>
                    </div>
                    {/* Traditional Value */}
                    <div className="text-center">
                      <motion.div
                        className="inline-block px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                        animate={{
                          backgroundColor: hoveredItem === item.id ? "#f3f4f6" : "transparent",
                          color: "#6b7280",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.traditional}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                {/* Separator Line */}
                {index < comparisonData.length - 1 && <div className="h-px bg-gray-200 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Labels on Left with Two Cards */}
        <div className="hidden lg:block">
          <div className="flex justify-center">
            {/* Labels Column */}
            <div className="w-96 pt-44 pr-8">
              {comparisonData.map((item, index) => (
                <div key={`label-${item.id}`} className="relative">
                  <motion.div
                    className="py-6 flex items-center cursor-pointer group"
                    onClick={() => setHoveredItem(hoveredItem === item.id ? null : item.id)}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-gray-700 font-medium flex-1">{item.label}</span>
                    {/* Line extending to the right */}
                    <div className="flex-1 ml-4">
                      <motion.div
                        className="h-px bg-gray-200"
                        animate={{
                          backgroundColor: hoveredItem === item.id ? "#000000" : "#e5e7eb",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Cards Container */}
            <div className="flex gap-8">
              {/* BePay Card */}
              <div
                className="rounded-4xl p-8"
                style={{
                  width: "400px",
                  height: "587px",
                  background: "#F9F9F9",
                  boxShadow: "20px 20px 20px 0px #0000000D, -20px -20px 20px 0px #FFFFFFE5",
                }}
              >
                {/* BePay Header */}
                <div className="text-center mb-8 pb-6 border-b border-gray-200">
                  <Image
                    src="/bepaylogo1.png"
                    height={46}
                    width={110}
                    alt="BePay Logo"
                    className="object-cover h-12 w-auto mx-auto"
                    priority
                  />
                </div>

                {/* BePay Content */}
                <div className="space-y-0">
                  {comparisonData.map((item, index) => (
                    <div key={`bepay-${item.id}`} className="relative">
                      <motion.div
                        className="py-6 cursor-pointer"
                        onClick={() => setHoveredItem(hoveredItem === item.id ? null : item.id)}
                        onHoverStart={() => setHoveredItem(item.id)}
                        onHoverEnd={() => setHoveredItem(null)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* BePay Value - Aligned to left */}
                        <div className="text-center">
                          <motion.div
                            className="inline-block px-6 py-1 rounded-full transition-all duration-300"
                            animate={{
                              backgroundColor: hoveredItem === item.id ? "#000000" : "transparent",
                              color: hoveredItem === item.id ? "#ffffff" : "#374151",
                              boxShadow:
                                hoveredItem === item.id ? "0 10px 25px -5px rgba(0, 0, 0, 0.2)" : "0 0 0 0 transparent",
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className="font-medium">{item.bepay}</span>
                          </motion.div>
                        </div>
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
                <div className="text-center mb-8 pb-6 border-b border-gray-200">
                  <div className=" rounded-full px-6 py-3 inline-block">
                    <span className="font-medium text-gray-600">Traditional payments</span>
                  </div>
                </div>

                {/* Traditional Content */}
                <div className="space-y-0">
                  {comparisonData.map((item, index) => (
                    <div key={`traditional-${item.id}`} className="relative">
                      <motion.div
                        className="py-6 cursor-pointer"
                        onClick={() => setHoveredItem(hoveredItem === item.id ? null : item.id)}
                        onHoverStart={() => setHoveredItem(item.id)}
                        onHoverEnd={() => setHoveredItem(null)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Traditional Value - Aligned to left */}
                        <div className="text-center">
                          <motion.div
                            className="inline-block px-6 py-1 rounded-full transition-all duration-300"
                            animate={{
                              backgroundColor: hoveredItem === item.id ? "#f3f4f6" : "transparent",
                              color: "#6b7280",
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className="font-medium">{item.traditional}</span>
                          </motion.div>
                        </div>
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
  )
}

export default BepayComparison
