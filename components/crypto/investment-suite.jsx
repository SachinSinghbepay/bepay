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
import WaitlistTriggerButton from "../waitlist-trigger-button";
import Image from "next/image";

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
      className="bg-black py-20 px-4 sm:px-6 lg:px-0 overflow-hidden"
    >
      <div >
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-start md:items-center justify-start lg:justify-items-center-safe md:gap-24 mb-4"
        >
          <h2 className="text-4xl sm:text-5xl  lg:text-[100px] font-[400] text-white mb-4 sm:mb-4">
            Investment suite
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#C0C0C0] md:hidden text-lg sm:text-xl mb-16 max-w-2xl"
          >
            Diversify your portfolio with{" "}
            <span className="text-white font-medium">
              tokenized real-world assets
            </span>{" "}
            and traditional investments
          </motion.p>
          <WaitlistTriggerButton>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 -mt-6 md:mt-0 bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors self-start"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.62591 5.09984C8.53039 4.82843 8.353 4.59336 8.11822 4.42705C7.88343 4.26073 7.60283 4.17137 7.3151 4.17129H6.23782C5.93221 4.17215 5.63766 4.28571 5.41058 4.49024C5.1835 4.69477 5.03984 4.97588 5.00713 5.27973C4.97442 5.58359 5.05496 5.88883 5.23331 6.137C5.41166 6.38517 5.67529 6.55883 5.97372 6.62471L7.61118 6.98334C7.94624 7.05647 8.24243 7.25087 8.44282 7.52918C8.64321 7.80749 8.73365 8.15005 8.69674 8.491C8.65983 8.83195 8.49819 9.14722 8.24289 9.3762C7.98759 9.60518 7.65666 9.73171 7.31371 9.73145H6.38656C6.09917 9.73157 5.81881 9.64261 5.58407 9.47682C5.34932 9.31103 5.17174 9.07656 5.07575 8.80568M6.85222 4.17129V2.78125M6.85222 11.1215V9.73145M9.50303 18.7208V11.4231C9.50303 10.9623 9.68609 10.5203 10.0119 10.1945C10.3378 9.86864 10.7797 9.68557 11.2406 9.68557C11.7014 9.68557 12.1434 9.86864 12.4692 10.1945C12.7951 10.5203 12.9781 10.9623 12.9781 11.4231V15.2457H15.7582C16.4955 15.2457 17.2026 15.5386 17.724 16.06C18.2454 16.5814 18.5383 17.2885 18.5383 18.0258V18.7208"
                  stroke="#080808"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.85209 13.2528C5.56961 13.2526 4.31775 12.8609 3.26387 12.1301C2.21 11.3993 1.40434 10.3641 0.95462 9.1631C0.5049 7.96205 0.43255 6.65234 0.747243 5.40907C1.06194 4.16579 1.74867 3.04822 2.71564 2.20576C3.6826 1.3633 4.88371 0.836108 6.15837 0.694673C7.43303 0.553238 8.72049 0.804299 9.84861 1.41429C10.9767 2.02428 11.8918 2.96412 12.4714 4.10817C13.0509 5.25221 13.2675 6.54593 13.092 7.81635"
                  stroke="#080808"
                  stroke-linecap="round"
                />
              </svg>
              Start Investing
            </motion.button>
          </WaitlistTriggerButton>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[#C0C0C0] hidden md:block text-[16px] mb-16 max-w-5xl"
        >
          Diversify your portfolio with{" "}
          <span className="text-white font-medium">
            tokenized real-world assets
          </span>{" "}
          and traditional investments
        </motion.p>
        </div>

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
          className="w-full "
        >
          <CarouselContent className="lg:ml-0 xl:ml-0 2xl:ml-16">
            {investmentData.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="pl-6 basis-[90%] md:basis-[45%] lg:basis-[38%]" // Mobile: 1 card + 10%, Desktop: ~2.2 cards
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
                  className="flex flex-col justify-between bg-[#0E0E0E] rounded-3xl p-4 group cursor-pointer h-full"
                  style={{
                    boxShadow: "120px 120px 120px 0px rgba(0, 0, 0, 0.05)",
                    minHeight: "568px",
                  }}
                >
                  {/* Card Image */}
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={400}
                      loading="lazy"
                      height={400}
                      className="w-full h-[268px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="lg:p-9">
                  <div className="space-y-4 max-w-[327px] ">
                    <div className="flex items-center gap-2">
                      <span className="text-[#6A6A6A] text-lg">Tokenized</span>
                      <span className="text-white font-medium ">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-[#6A6A6A] text-[16px] leading-relaxed">
                      {item.description}
                    </p>

                    <p className="text-[#6A6A6A] text-[16px]">{item.details}</p>
                  </div>
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
