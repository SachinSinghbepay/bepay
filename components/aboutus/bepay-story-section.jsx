"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Marquee } from "@/components/magicui/marquee";

export default function BepayStorySection() {
  // Animation variants for floating icons
  const floatingAnimation = {
    animate: {
      y: [-15, 15, -15],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const floatingAnimationReverse = {
    animate: {
      y: [15, -15, 15],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  // Animation variants for content
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Images for the diagonal marquee
  const marqueeImages = [
    { src: "/images/aboutus/m1.png", alt: "marquee 1" },
    { src: "/images/aboutus/m2.png", alt: "marquee 2" },
    { src: "/images/aboutus/m3.png", alt: "marquee 3" },
    { src: "/images/aboutus/m4.png", alt: "marquee 4" },
  ];

  const ImageCard = ({ src, alt }) => {
    return (
      <div className="relative w-[300px] h-[400px]">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          loading="lazy"
          fill
          className="object-contain rotate-[30deg] rounded-lg"
        />
      </div>
    );
  };

  return (
    <section className="w-full bg-[#f9f9f9] py-16 lg:py-24 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Section Header */}
        <motion.div className="text-start mb-16 lg:mb-20" variants={fadeInUp}>
          <p
            className="mb-4 text-sm lg:text-base"
            style={{
              color: "#6A6A6A",
              fontWeight: "400",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            THE bepay STORY
          </p>
          <h2 className="text-3xl lg:text-[60px] font-bold leading-tight">
            <span style={{ color: "#C0C0C0" }}>From </span>
            <span className="text-black">Vision to Reality</span>
          </h2>
        </motion.div>

        {/* Two Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          {/* First Card - Mobile Mockup with Floating Icons */}
          <motion.div
            className="relative w-full h-[400px] lg:h-[491px] lg:w-[491px] mx-auto"
            style={{ backgroundColor: "#ECECEC", borderRadius: "20px" }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Main Mobile Mockup */}
            <div className="absolute inset-0 bottom-0 flex items-center justify-center">
              <Image
                src="/images/aboutus/mocup.png"
                alt="bepay mobile app mockup"
                loading="lazy"
                fill
                className="object-contain pt-10 z-10"
              />
            </div>

            {/* Floating Icons - Front Layer (i1, i4) */}
            <motion.div
              className="absolute z-20"
              style={{ top: "20%", left: "15%" }}
              variants={floatingAnimation}
              animate="animate"
            >
              <Image
                src="/images/aboutus/i1.png"
                width={80}
                loading="lazy"
                height={80}
                alt="icon 1"
                className="object-contain"
              />
            </motion.div>

            <motion.div
              className="absolute z-20"
              style={{ bottom: "25%", right: "20%" }}
              variants={floatingAnimationReverse}
              animate="animate"
            >
              <Image
                src="/images/aboutus/i4.png"
                width={80}
                height={80}
                loading="lazy"
                alt="icon 4"
                className="object-contain"
              />
            </motion.div>

            {/* Floating Icons - Back Layer (i2, i3) */}
            <motion.div
              className="absolute z-0"
              style={{ top: "30%", right: "15%" }}
              variants={floatingAnimationReverse}
              animate="animate"
            >
              <Image
                src="/images/aboutus/i2.png"
                width={80}
                height={80}
                loading="lazy"
                alt="icon 2"
                className="object-contain"
              />
            </motion.div>

            <motion.div
              className="absolute z-0"
              style={{ bottom: "20%", left: "20%" }}
              variants={floatingAnimation}
              animate="animate"
            >
              <Image
                src="/images/aboutus/i3.png"
                width={80}
                height={80}
                alt="icon 3"
                loading="lazy"
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Second Card - Text Content */}
          <motion.div
            className="flex flex-col justify-center space-y-6 lg:space-y-8"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-base lg:text-[20px] leading-relaxed text-[#080808] font-medium">
              Started by blockchain pioneers who saw the gap between traditional
              banking and the crypto revolution,{" "}
              <span className="font-semibold">bepay</span> was born from a
              simple question: "Why should you have to choose between the
              convenience of traditional finance and the freedom of digital
              finance?"
            </p>
          </motion.div>
        </div>

        {/* Second Row - Reversed Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-16 lg:mt-20">
          {/* Text Content - Left Side */}
          <motion.div
            className="flex flex-col justify-center space-y-6 lg:space-y-8 order-2 lg:order-1"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-base lg:text-[20px] leading-relaxed text-[#080808] font-medium text-center lg:text-end">
              Today, we're building that answer – a platform where your Bitcoin
              earns yield, your everyday purchases get cashback, and your money
              works harder across multiple blockchains, all while you stay in
              complete control.
            </p>
          </motion.div>

          {/* 3D Diagonal Marquee Card - Right Side */}
          <motion.div
            className="relative w-full h-[400px] lg:h-[491px] lg:w-[491px] mx-auto overflow-hidden order-1 lg:order-2"
            style={{ backgroundColor: "#ECECEC", borderRadius: "20px" }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative flex h-full w-full flex-row items-center justify-center  overflow-hidden [perspective:300px]">
              <div
                className="flex flex-row items-center justify-center"
                style={{
                  transform:
                    "translateX(-50px) translateY(0px) translateZ(-50px) rotateX(15deg) rotateY(-8deg) rotateZ(30deg)",
                }}
              >
                <Marquee pauseOnHover vertical className="[--duration:25s]">
                  {marqueeImages.map((image, index) => (
                    <ImageCard key={`col1-${index}`} {...image} />
                  ))}
                </Marquee>
                <Marquee
                  reverse
                  pauseOnHover
                  className="[--duration:25s]"
                  vertical
                >
                  {marqueeImages.map((image, index) => (
                    <ImageCard key={`col2-${index}`} {...image} />
                  ))}
                </Marquee>
                <Marquee pauseOnHover className="[--duration:25s]" vertical>
                  {marqueeImages.map((image, index) => (
                    <ImageCard key={`col3-${index}`} {...image} />
                  ))}
                </Marquee>
                <Marquee
                  reverse
                  pauseOnHover
                  className="[--duration:25s]"
                  vertical
                >
                  {marqueeImages.map((image, index) => (
                    <ImageCard key={`col4-${index}`} {...image} />
                  ))}
                </Marquee>
              </div>

              {/* Gradient overlays for fade effect */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#ECECEC]"></div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#ECECEC]"></div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#ECECEC]"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#ECECEC]"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
