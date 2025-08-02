"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"

export default function PartnershipSection() {
  // Animation variants for content
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  return (
    <section className="w-full bg-[#f9f9f9] py-16 lg:py-24 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="space-y-8 lg:space-y-16">
          {/* Partnership Inquiries Card */}
          <motion.div className="w-full" variants={fadeInUp} transition={{ duration: 0.8, ease: "easeOut" }}>
            {/* Mobile Layout */}
            <div
              className="lg:hidden relative w-full max-w-[938px] h-[300px] mx-auto p-8 flex flex-col justify-center items-center text-center"
              style={{
                background: "#FFFFFF",
                borderRadius: "50px",
                boxShadow: "120px 120px 140px 0px rgba(0, 0, 0, 0.04)",
              }}
            >
              {/* Number Background - Mobile */}
              <div
                className="absolute top-4 right-4 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-gray-400"
                style={{
                  background: "linear-gradient(171.01deg, #EDEDED 12.69%, rgba(237, 237, 237, 0.1) 92.76%)",
                }}
              >
                1
              </div>

              <div className="space-y-4 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">Partnership inquiries</h2>
                <p className="text-base md:text-lg text-[#666666] leading-relaxed">
                  Drop us an email:{" "}
                  <a
                    href="mailto:info@bepaymoney.com"
                    className="font-semibold text-black hover:text-gray-700 transition-colors duration-300"
                  >
                    info@bepaymoney.com
                  </a>
                </p>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8 lg:items-center">
              {/* Card Content - 3 columns */}
              <div
                className="col-span-3 p-12 flex flex-col justify-center items-center text-center h-[377px]"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "50px",
                  boxShadow: "120px 120px 140px 0px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="space-y-6 max-w-2xl">
                  <h2 className="text-[48px] font-bold text-black leading-tight">Partnership inquiries</h2>
                  <p className="text-xl text-[#666666] leading-relaxed">
                    Drop us an email:{" "}
                    <a
                      href="mailto:info@bepaymoney.com"
                      className="font-semibold text-black hover:text-gray-700 transition-colors duration-300"
                    >
                      info@bepaymoney.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Number - 1 column on right */}
              <div className="col-span-1 flex justify-center">
                <div
                  className="  text-[450px] bg-gradient-to-t from-[#EDEDED] to-[#EDEDED1A] bg-clip-text text-transparent font-bold "
                 
                >
                  1
                </div>
              </div>
            </div>
          </motion.div>

          {/* Media & Press Card */}
          <motion.div className="w-full lg:-mt-60" variants={fadeInUp} transition={{ duration: 0.8, ease: "easeOut" }}>
            {/* Mobile Layout */}
            <div
              className="lg:hidden relative w-full max-w-[938px] h-auto mx-auto p-8 flex flex-col justify-center items-center text-center"
              style={{
                background: "#FFFFFF",
                borderRadius: "50px",
                boxShadow: "120px 120px 140px 0px rgba(0, 0, 0, 0.04)",
              }}
            >
              {/* Number Background - Mobile */}
              <div
                className="absolute top-4 right-4 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-gray-400"
                style={{
                  background: "linear-gradient(171.01deg, #EDEDED 12.69%, rgba(237, 237, 237, 0.1) 92.76%)",
                }}
              >
                2
              </div>

              <div className="space-y-6 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">Media & press</h2>
                <p className="text-base md:text-lg text-[#666666] leading-relaxed">
                  For press inquiries, interviews, and media resources
                </p>

                <motion.button
                  className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} />
                  Download media kit
                </motion.button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8 lg:items-center">
              {/* Number - 1 column on left */}
              <div className="col-span-1 flex justify-center">
                <div
                  className="text-[450px] bg-gradient-to-b from-[#EDEDED] to-[#EDEDED1A] bg-clip-text text-transparent font-bold"
                  
                >
                  2
                </div>
              </div>

              {/* Card Content - 3 columns */}
              <div
                className="col-span-3 p-12 flex flex-col justify-center items-center text-center h-[377px]"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "50px",
                  boxShadow: "120px 120px 140px 0px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="space-y-8 max-w-2xl">
                  <h2 className="text-[48px] font-bold text-black leading-tight">Media & press</h2>
                  <p className="text-xl text-[#666666] leading-relaxed">
                    For press inquiries, interviews, and media resources
                  </p>

                  <motion.button
                    className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-medium text-base hover:bg-gray-800 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={20} />
                    Download media kit
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
