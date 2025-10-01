"use client"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { AnalyticsService } from "@/services/analyticsService"

const cardData = [
  {
    id: 1,
    image: "/images/business/m4.svg",
    alt: "Crypto payment interface mockup showing various cryptocurrencies and transaction details.",
  },
  {
    id: 2,
    image: "/images/business/m2.svg",
    alt: "Payment settlement details mockup showing received amount, order value, settlement time, and conversion fees.",
  },
  {
    id: 3,
    image: "/images/business/m3.svg",
    alt: "Global scaling illustration mockup with abstract bar charts and currency symbols.",
  },
]

export default function BepayFeatures() {
  const ref = useRef(null)
  const [hasTrackedView, setHasTrackedView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // For MOBILE: Horizontal scroll transform
  const x = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.65, 0.8, 1],
    ["0vw", "0vw", "-100vw", "-100vw", "-200vw", "-200vw"]
  )

  // For DESKTOP: Vertical parallax transforms
  const scrollY1 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const scrollY2 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scrollY3 = useTransform(scrollYProgress, [0, 1], [120, -120])
  const scrollYTransforms = [scrollY1, scrollY2, scrollY3]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("bepay features section viewed")
          setHasTrackedView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasTrackedView])

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const isInView = useInView(ref, {
    amount: isMobile ? 0.15 : 0.25,
    once: false,
  })

  useEffect(() => {
    if (isInView) {
      setAnimationStep(1)
      setTimeout(() => setAnimationStep(2), 300)
      setTimeout(() => setAnimationStep(3), 800)
    } else {
      setAnimationStep(0)
    }
  }, [isInView])

  const titleVariants = {
    hidden: { opacity: 0, y: 50, transition: { duration: 0.5, ease: "easeIn" } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const getNumberVariants = (index) => ({
    hidden: { opacity: 0, scale: 0.3, y: 100, transition: { duration: 0.4, delay: (2 - index) * 0.1, ease: "easeIn" } },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2, ease: "easeOut", type: "spring", damping: 18, stiffness: 120 } },
  })

  const getImageVariants = (index) => ({
    hidden: { opacity: 0, y: 500, scale: 0.8, transition: { duration: 0.4, delay: (2 - index) * 0.1, ease: "easeIn" } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: index * 0.15, ease: "easeOut", type: "spring", damping: 22, stiffness: 100 } },
  })

  return (
    <section
      ref={ref}
      className={`w-full bg-[#F9F9F9] ${
        isMobile
          ? "relative h-[300vh]"
          : "pt-8 sm:pt-12 md:pt-24 lg:pt-32 pb-8 sm:pb-12 md:pb-16 overflow-hidden"
      }`}
    >
      {isMobile ? (
        // --- MOBILE LAYOUT ---
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col pt-5">
          <h2 className="font-['Montserrat'] text-center font-medium text-[28px] leading-tight tracking-[-0.06em] px-4 flex-shrink-0">
            <span className="text-[#C0C0C0]">Why businesses <br/> choose </span>
            <span className="text-[#333333] ">bepay</span>
          </h2>

          <div className="w-full flex-grow">
            <motion.div style={{ x }} className="flex h-full">
              {cardData.map((card) => (
                // ✅ CHANGE: Reduced bottom padding to push content lower
                <div
                  key={card.id}
                  className="w-screen flex-shrink-0 px-6 flex flex-col items-center justify-end pb-0"
                >
                  {/* ✅ CHANGE: Increased negative margin to account for larger mockup */}
                  <div className="bg-gradient-to-t from-[#ECECEC05] to-[#ECECEC] bg-clip-text text-transparent text-[200px] font-bold leading-none select-none -mb-14">
                    {card.id}
                  </div>
                  {/* ✅ CHANGE: Increased max-width to make mockup taller */}
                  <div className="relative z-10 w-full max-w-[320px] h-auto rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt={card.alt}
                      width={500}
                      height={500}
                      className="object-contain w-full h-full rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      ) : (
        // --- DESKTOP LAYOUT ---
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.h2
            className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[60px] font-[400] leading-tight mb-8 sm:mb-12 md:mb-16 px-2"
            variants={titleVariants}
            initial="hidden"
            animate={animationStep >= 1 ? "visible" : "hidden"}
          >
            <span className="text-[#C0C0C0]">Why businesses choose </span>
            <span className="text-[#333333]">bepay</span>
          </motion.h2>
          <div className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-14 grid-cols-1 md:grid-cols-3">
            {cardData.map((card, index) => (
              <motion.div
                key={card.id}
                className="relative overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-32 xl:pt-36 flex flex-col items-center text-center min-h-[400px]"
                style={{ y: scrollYTransforms[index] }}
              >
                <motion.div
                  className="absolute bg-gradient-to-t from-[#ECECEC05] to-[#ECECEC] bg-clip-text text-transparent -top-2 sm:-top-4 md:-top-8 lg:-top-10 left-1/2 transform -translate-x-1/2 text-[100px] sm:text-[120px] md:text-[160px] lg:text-[200px] xl:text-[240px] font-bold leading-none select-none"
                  variants={getNumberVariants(index)}
                  initial="hidden"
                  animate={animationStep >= 2 ? "visible" : "hidden"}
                >
                  {card.id}
                </motion.div>
                <motion.div
                  className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] h-auto rounded-lg overflow-hidden mt-auto relative z-10 shadow-lg"
                  variants={getImageVariants(index)}
                  initial="hidden"
                  animate={animationStep >= 3 ? "visible" : "hidden"}
                >
                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt={card.alt}
                    width={500}
                    height={500}
                    className="object-contain w-full h-full rounded-lg"
                    priority={index === 0}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}