"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const InvestmentSuitePage = () => {
  const investmentCards = [
    {
      id: 1,
      title: "Tokenized Real Estate",
      description:
        "Invest in premium real estate properties with fractional ownership using crypto.",
      subtitle: "Starting from $100 minimum investment",
      image: "/businessnew/img_8814189_uhd_3840_2160_25fps.png",
    },
    {
      id: 2,
      title: "Tokenized Gold",
      description: "Own physical gold through blockchain-backed tokens",
      subtitle: "Backed by physical gold reserves",
      image: "/businessnew/img_freepik_closeu.png",
    },
    {
      id: 3,
      title: "Tokenized Equity",
      description:
        "Invest in company shares through tokenized equity platforms",
      subtitle: "Access to global equity markets",
      image: "/businessnew/img_3209211_uhd_3840_2160_25fps.png",
    },
    {
      id: 4,
      title: "Tokenized Bonds",
      description: "Stable returns through tokenized bond investments",
      subtitle: "Fixed income opportunities",
      image: "/businessnew/img_6563941_hd_1920_1080_25fps.png",
    },
    {
      id: 5,
      title: "Tokenized Art & Collectibles",
      description:
        "Invest in fine art and rare collectibles through tokenization",
      subtitle: "Fractional art ownership",
      image: "/businessnew/img_art_1.png",
    },
    {
      id: 6,
      title: "Tokenized Energy",
      description: "Invest in renewable energy projects and green initiatives",
      subtitle: "Sustainable investment options",
      image: "/businessnew/img_4485536_hd_1920_1080_30fps.png",
    },
  ];

  const handleStartInvesting = () => {
    console.log("Start investing clicked");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full min-h-screen bg-black">
      {/* Main Content Container */}
      <div className="w-full bg-black pb-14">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            className="flex flex-col justify-start items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 pt-8 sm:pt-12 md:pt-16 lg:pt-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Header Content */}
            <div className="flex flex-col sm:flex-row items-center w-full gap-8 sm:gap-16">
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 justify-start items-center sm:items-start w-full sm:w-auto">
                {/* Main Title */}
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-tight text-center sm:text-left text-[#c0c0c0] font-[Montserrat]"
                  variants={titleVariants}
                >
                  Investment suite
                </motion.h1>
                {/* Subtitle */}
                <motion.div
                  className="w-full sm:w-auto"
                  variants={subtitleVariants}
                >
                  <p className="text-sm sm:text-base md:text-lg font-normal leading-relaxed text-center sm:text-left text-[#c0c0c0] font-[Montserrat] ">
                    <span className="text-[#c0c0c0]">
                      Diversify your portfolio with{" "}
                    </span>
                    <span className="text-[#f9f9f9] font-medium">
                      tokenized real-world assets
                    </span>
                    <span className="text-[#c0c0c0]">
                      {" "}
                      and traditional investments
                    </span>
                  </p>
                </motion.div>
              </div>

              {/* Start Investing Button */}
              <motion.div className="flex-shrink-0" variants={buttonVariants}>
                <motion.button
                  className="bg-[#f9f9f9] flex gap-2 items-center justify-center rounded-full px-6 py-3 hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src="/businessnew/img_invest_icon.svg"
                    alt="Invest Icon"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-black text-xs font-semibold leading-tight font-[Open_Sans]">
                    Start investing
                  </span>
                </motion.button>
              </motion.div>
            </div>

            {/* Investment Cards Section */}
            <motion.div className="w-full" variants={cardContainerVariants}>
              {/* Desktop/Tablet: Horizontal scroll with hidden scrollbar */}
              <div className="">
                <div
                  className="flex gap-6 overflow-x-auto pb-4"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <style jsx>{`
                    div::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  {investmentCards.map((card) => (
                    <motion.div
                      key={card.id}
                      className="flex flex-col gap-8 justify-start items-center w-80 md:w-96 flex-shrink-0 rounded-[23.22px] bg-[#0e0e0e] p-3 shadow-lg"
                      variants={cardVariants}
                      whileHover={{
                        y: -10,
                        transition: { duration: 0.3 },
                      }}
                    >
                      {/* Card Image */}
                      <div className="w-full rounded-[16.77] bg-gray-800 overflow-hidden">
                        <Image
                          src={card.image}
                          alt={card.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover rounded-xl"
                        />
                      </div>
                      {/* Card Content */}
                      <div className="flex flex-col justify-end gap-4 px-7 pb-7 pt-16 w-full">
                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-normal leading-7 font-[Montserrat]">
                          <span className="text-[#6a6a6a]">Tokenized </span>
                          <span className="text-[#c0c0c0] font-semibold">
                            {card.title.replace("Tokenized ", "")}
                          </span>
                        </h3>
                        {/* Description and Subtitle */}
                        <div className="flex flex-col gap-2">
                          <p className="text-[12px] font-normal leading-relaxed text-[#6a6a6a] font-[Montserrat]">
                            {card.description}
                          </p>
                          <p className="text-[10px] font-normal italic leading-relaxed font-[Montserrat]">
                            <span className="text-[#6a6a6a]">
                              {card.subtitle}
                            </span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSuitePage;
