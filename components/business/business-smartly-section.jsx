"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { IconCircleCheckFilled } from "@tabler/icons-react";

// FeatureCard component (no changes needed here)
function FeatureCard({ title, image, features }) {
  return (
    <div className="flex-col w-full max-w-[670px] h-full md:h-[607px] bg-white rounded-[30px] shadow-lg border border-gray-100">
      <div className="relative w-full h-[225px] overflow-hidden rounded-[30px]">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={650}
          height={225}
          className="object-cover p-2 rounded-[30px] w-full h-full"
        />
      </div>
      <div className="p-8 flex flex-col justify-between h-[calc(100%-225px)]">
        <div>
          <h3 className="text-xl md:text-[20px] font-bold mb-6 text-black uppercase">
            {title}
          </h3>
          <ul className="space-y-4 lg:space-y-8">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-[14px] md:text-[16px] font-[500] text-gray-700"
              >
                <IconCircleCheckFilled className="w-5 h-5 text-[#0D8D37] flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function BusinessSmartlySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  // Transform scroll progress to animate the Y position of the heading
  const y1 = useTransform(scrollYProgress, [0, 1], [50, 0]); // Moves from 50px to 0px
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 0]); // Moves from -50px to 0px

  const cardsData = [
    {
      id: "1",
      title: "SEAMLESS PAYMENTS",
      image: "/images/business/b1.png",
      features: [
        "Accept stablecoins & major cryptos",
        "Real-time instant settlement",
        "QR & NFC-enabled payments",
        "Tap-to-pay/scan & pay options for customers",
      ],
    },
    {
      id: "2",
      title: "UNIVERSAL PLATFORM INTEGRATION",
      image: "/images/business/b2.png",
      features: [
        "Shopify, WooCommerce, Magento plug-ins",
        "REST APIs, SDKs, and custom checkout links",
        "Generate invoices with crypto QR codes",
      ],
    },
    {
      id: "3",
      title: "MULTI-CURRENCY BUSINESS BANKING",
      image: "/images/business/b3.png",
      features: [
        "Dedicated virtual IBANs (EUR, USD, GBP) & crypto debit cards",
        "Mass payouts to contractors, freelancers, vendors",
        "Integrated with Xero, QuickBooks, Sage",
      ],
    },
    {
      id: "4",
      title: "ADVANCED TREASURY MANAGEMENT",
      image: "/images/business/b4.png",
      features: [
        "Yield generation on operational funds through DeFi",
        "Multi-signature wallets for enhanced security",
        "Real-time reporting and analytics dashboard",
        "Automated tax reports, balance analytics, and forecasting",
      ],
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F9F9F9] overflow-hidden dark:bg-gray-950">
      <div>
        <div
          ref={ref}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl 3xl:text-[90px] font-[400] tracking-tight leading-tight text-[#C0C0C0] dark:text-[#333333]"
            style={{ y: y1 }}
          >
            Everything you need
          </motion.h2>
          <motion.h2
            className="text-4xl sm:text-5xl -mt-4 md:text-6xl 3xl:text-[90px] font-[400] leading-tight tracking-tight text-black dark:text-white"
            style={{ y: y2 }}
          >
            to run business smartly
          </motion.h2>
        </div>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="lg:ml-20">
          {cardsData.map((card) => (
            <CarouselItem
              key={card.id}
              className="pb-5 basis-[95%] md:basis-1/2 lg:basis-[35.6%]"
            >
              <FeatureCard {...card} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}