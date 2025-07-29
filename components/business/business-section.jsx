"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function BusinessSection() {
  return (
    <section className="w-full min-h-screen">
      <div className="h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Side */}
          <motion.div
            className="relative h-[50vh] lg:h-screen"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image src="/images/business/i1.png" alt="Customer making payment" fill className="object-cover" />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              viewport={{ once: true }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Image
                src="/images/business/ia1.png"
                alt="Payment sent notification"
                width={400}
                height={400}
                className="w-[250px] h-auto lg:w-[300px]"
              />
            </motion.div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            className="relative h-[50vh] lg:h-screen"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image src="/images/business/i2.png" alt="Business owner receiving payment" fill className="object-cover" />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.8,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              viewport={{ once: true }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Image
                src="/images/business/ia2.png"
                alt="Payment received notification"
                width={400}
                height={400}
                className="w-[250px] h-auto lg:w-[300px]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
