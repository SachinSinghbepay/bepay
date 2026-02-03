"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function CoreValuesSection() {
  // Animation variants for content
  const slideInLeft = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  }

  const slideInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const coreValues = [
    {
      title: "Decentralization First:",
      subtitle: "Upholding trustless infrastructure and user sovereignty.",
    },
    {
      title: "Compliance-Driven Innovation:",
      subtitle: "Building in harmony with evolving global regulations.",
    },
    {
      title: "Borderless Inclusion:",
      subtitle: "Enabling access to financial tools without boundaries.",
    },
    {
      title: "Ownership & Privacy:",
      subtitle: "Championing self-custody and encrypted data control.",
    },
    {
      title: "Composable Finance:",
      subtitle: "Creating plug-and-play Web3 infrastructure for scalable innovation.",
    },
    {
      title: "Ethical & Sustainable Growth:",
      subtitle: "Balancing technology with responsible impact.",
    },
  ]

  return (
    <section className="w-full bg-[#f9f9f9] py-16 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.p
          className="mb-12 lg:mb-16"
          style={{
            fontSize: "16px",
            color: "#6A6A6A",
            fontWeight: "400",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          CORE VALUES
        </motion.p>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            className="space-y-8  lg:space-y-10 lg:col-span-2"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="space-y-2 border-b-[2px] border-[#C0C0C080]"
                variants={slideInLeft}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h3 className="font-bold leading-tight text-2xl lg:text-[30px]" style={{ color: "#333333" }}>
                  {value.title}
                </h3>
                <p className="leading-relaxed mb-6 lg:mb-10 text-lg lg:text-[20px]" style={{ color: "#6A6A6A" }}>
                  {value.subtitle}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            className="flex justify-center col-span-1 lg:justify-end order-last"
            variants={slideInRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative w-full h-[500px] lg:h-auto lg:max-w-none overflow-hidden">
              <Image
                src="/images/aboutus/coreimage.png"
                alt="Core Values - Hand reaching for globe representing global financial inclusion"
                width={365}
                height={1035}
                className="absolute inset-0 w-full h-full object-contain rotate-90 lg:rotate-0 lg:relative lg:w-[365px] lg:h-[900px]"
                  loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
