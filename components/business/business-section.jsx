"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BusinessSection() {
  return (
    <section className="w-full min-h-screen">
      <div className="h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Side */}
          <motion.div
            className="relative h-[50vh] lg:h-screen overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Background Video */}
            <video
              src="/videos/crypto/i1.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay animation - Upper image moved left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
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
              className="absolute 
                                top-[75%] right-[61%] 
                                sm:top-[80%] sm:right-[56%]
                                md:top-[85%] md:right-[51%]
                                lg:top-[85%] lg:right-[56%]
                                xl:top-[80%] xl:right-[61%]
                                2xl:top-[75%] 2xl:right-[66%]
                                transform translate-x-1/2 -translate-y-1/2"
            >
              <Image
                src="/images/business/bs_1.svg"
                alt="Payment sent notification"
                width={100}
                height={450}
                className="w-[120px] h-auto 
                                     sm:w-[140px] 
                                     md:w-[160px] 
                                     lg:w-[180px] 
                                     xl:w-[220px] 
                                     2xl:w-[270px]
                                     drop-shadow-lg"
              />
            </motion.div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            className="relative h-[50vh] lg:h-screen overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Background Video */}
            <video
              src="/videos/crypto/i2.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay animation - Lower image moved right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
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
              className="absolute 
                                top-[75%] left-[61%] 
                                sm:top-[80%] sm:left-[56%]
                                md:top-[85%] md:left-[51%]
                                lg:top-[85%] lg:left-[56%]
                                xl:top-[80%] xl:left-[61%]
                                2xl:top-[75%] 2xl:left-[66%]
                                transform -translate-x-1/2 -translate-y-1/2"
            >
              <Image
                src="/images/business/ia2.svg"
                alt="Payment received notification"
                width={300}
                height={450}
                className="w-[120px] h-auto 
                  sm:w-[140px] 
                  md:w-[160px] 
                  lg:w-[180px] 
                  xl:w-[220px] 
                  2xl:w-[270px]
                  drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
