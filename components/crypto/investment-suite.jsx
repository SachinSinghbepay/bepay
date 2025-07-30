"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HandCoins, Search } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const investmentData = [
  {
    id: 1,
    image: "/images/crypto/invest1.png",
    title: "Tokenized Real Estate",
    description:
      "Invest in premium real estate properties with fractional ownership using crypto",
    details: "Starting from $100 minimum investment",
    category: "Real Estate",
  },
  {
    id: 2,
    image: "/images/crypto/invest2.png",
    title: "Tokenized Gold",
    description: "Own physical gold through blockchain-backed tokens",
    details: "Backed by physical gold reserves",
    category: "Gold",
  },
  {
    id: 3,
    image: "/images/crypto/invest3.png",
    title: "Tokenized Equity",
    description: "Invest in company shares through tokenized equity platforms",
    details: "Access to global equity markets",
    category: "Equity",
  },
  {
    id: 4,
    image: "/images/crypto/invest4.png",
    title: "Tokenized Bonds",
    description:
      "Diversify with government and corporate bonds as digital tokens",
    details: "Fixed income opportunities",
    category: "Bonds",
  },
  {
    id: 5,
    image: "/images/crypto/invest5.png",
    title: "Tokenized Energy",
    description: "Invest in renewable energy projects and green initiatives",
    details: "Sustainable investment options",
    category: "Energy",
  },
];

export default function InvestmentSuite() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-start md:items-center justify-start lg:justify-between md:gap-24 mb-4"
        >
          <h2 className="text-4xl sm:text-5xl  lg:text-6xl font-light text-white mb-4 sm:mb-4">
            Investment suite
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 md:hidden text-lg sm:text-xl mb-16 max-w-2xl"
          >
            Diversify your portfolio with{" "}
            <span className="text-white font-medium">
              tokenized real-world assets
            </span>{" "}
            and traditional investments
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 -mt-6 md:mt-0 bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors self-start"
          >
            <HandCoins size={20} />
            Start Investing
          </motion.button>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-400 hidden md:block text-lg sm:text-xl mb-16 max-w-2xl"
        >
          Diversify your portfolio with{" "}
          <span className="text-white font-medium">
            tokenized real-world assets
          </span>{" "}
          and traditional investments
        </motion.p>

        {/* Cards Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: false,
            dragFree: true, // Enable free dragging
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {investmentData.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="pl-6 basis-[90%] md:basis-[45%] lg:basis-[42%]" // Mobile: 1 card + 10%, Desktop: ~2.2 cards
              >
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + index * 0.2,
                    ease: "easeOut",
                  }}
                  className="flex-shrink-0 bg-[#0E0E0E] rounded-3xl p-4 group cursor-pointer h-full"
                  style={{
                    boxShadow: "120px 120px 120px 0px rgba(0, 0, 0, 0.05)",
                    minHeight: "568px",
                  }}
                >
                  {/* Card Image */}
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-[252px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-lg">Tokenized</span>
                      <span className="text-white font-medium ">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-gray-400 text-base leading-relaxed">
                      {item.description}
                    </p>

                    <p className="text-gray-500 text-sm">{item.details}</p>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
