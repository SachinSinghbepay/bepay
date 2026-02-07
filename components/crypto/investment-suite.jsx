"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import WaitlistTriggerButton from "../waitlist-trigger-button";
import Image from "next/image";
import { AnalyticsService } from "@/services/analyticsService";
import { useAppDownload } from "@/hooks/useAppDownload"
import { AppDownloadPopups } from "@/components/AppDownloadPopups"


const investmentData = [
  {
    id: 1,
    image: "/images/crypto/invest1.png",
    video: "/videos/crypto/invest1.mp4",
    title: "Tokenized Real Estate",
    description:
      "Invest in premium real estate properties with fractional ownership using crypto",
    details: "Starting from $100 minimum investment",
    category: "Real Estate",
  },
  {
    id: 2,
    image: "/images/crypto/invest2.png",
    // No video for this card - it will show only the image
    title: "Tokenized Gold",
    description: "Own physical gold through blockchain-backed tokens",
    details: "Backed by physical gold reserves",
    category: "Gold",
  },
  {
    id: 3,
    image: "/images/crypto/invest3.png",
    video: "/videos/crypto/invest3.mp4",
    title: "Tokenized Equity",
    description: "Invest in company shares through tokenized equity platforms",
    details: "Access to global equity markets",
    category: "Equity",
  },
  {
    id: 4,
    image: "/images/crypto/invest4.png",
    video: "/videos/crypto/invest4.mp4",
    title: "Tokenized Bonds",
    description:
      "Diversify with government and corporate bonds as digital tokens",
    details: "Fixed income opportunities",
    category: "Bonds",
  },
  {
    id: 5,
    image: "/images/crypto/invest5.png",
    video: "/videos/crypto/invest5.mp4",
    title: "Tokenized Energy",
    description: "Invest in renewable energy projects and green initiatives",
    details: "Sustainable investment options",
    category: "Energy",
  },
];

const VideoCard = ({ item, isInView, index }) => {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playError, setPlayError] = useState(false);
  const videoRef = useRef(null);


  // 1. Create a ref for the card itself
  const cardRef = useRef(null);

  // 2. Use a new useInView hook to track the card's visibility
  const isCardInView = useInView(cardRef, {
    margin: "0px 100px -50px 100px",
  });

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    console.log(`Video ${item.id} loaded successfully`);
  };

  const handleVideoError = (e) => {
    console.error(`Video ${item.id} error:`, e.target?.error);
    setVideoError(true);
  };

  // 3. This useEffect now controls playback based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !item.video || videoError || playError) return;

    if (isCardInView) {
      // Card is in view, attempt to play
      console.log(`Video ${item.id} is in view, attempting to play.`);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name !== "AbortError") {
            console.error(`Video ${item.id} play failed:`, error);
            setPlayError(true); // Prevent further attempts
          }
        });
      }
    } else {
      // Card is out of view, pause
      console.log(`Video ${item.id} is out of view, pausing.`);
      video.pause();
    }
  }, [isCardInView, item.video, videoError, playError, item.id]);

  // Debugging useEffect (optional)
  useEffect(() => {
    const video = videoRef.current;
    if (video && item.video) {
      const handleLoadStart = () =>
        console.log(`Video ${item.id} started loading`);
      const handleLoadedData = () =>
        console.log(`Video ${item.id} data loaded`);
      const handlePlay = () => console.log(`Video ${item.id} started playing`);
      const handlePause = () => console.log(`Video ${item.id} paused`);

      video.addEventListener("loadstart", handleLoadStart);
      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      return () => {
        video.removeEventListener("loadstart", handleLoadStart);
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
      };
    }
  }, [item.id, item.video]);

  
  return (
    <motion.div
      ref={cardRef} // 4. Attach the ref to the motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
      }
      transition={{
        duration: 0.8,
        delay: 0.5 + index * 0.2,
        ease: "easeOut",
      }}
      className="mt-3 flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[30vw] flex flex-col justify-between bg-[#0E0E0E] rounded-3xl p-4 group cursor-pointer h-[400px] md:h-[420px] lg:h-[440px]"
      style={{
        boxShadow: "120px 120px 120px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="relative overflow-hidden rounded-2xl mb-6">
        {item.video && !videoError ? (
          <>
            <video
              ref={videoRef}
              poster={item.image || "/placeholder.svg"}
              width={400}
              height={220}
              className="w-full h-[220px] md:h-[200px] lg:h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={handleVideoLoad}
              // 5. Removed the problematic onCanPlay handler
              onError={handleVideoError}
              style={{ display: videoError ? "none" : "block" }}
            >
              <source src={item.video} type="video/mp4" />
              <source
                src={item.video.replace(".mp4", ".webm")}
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
            {/* Fallback image if video fails */}
            {videoError && (
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={400}
                height={220}
                loading="lazy"
                className="w-full h-[220px] md:h-[200px] lg:h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </>
        ) : (
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            width={400}
            height={220}
            loading="lazy"
            className="w-full h-[220px] md:h-[200px] lg:h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="lg:p-9">
        <div className="space-y-3 md:space-y-4 max-w-[327px]">
          <div className="flex items-center gap-2">
            <span className="text-[#6A6A6A] text-base md:text-lg font-semibold">
              Tokenized
            </span>
            <span className="text-white font-extrabold md:font-bold">
              {item.category}
            </span>
          </div>
          <p className="text-[#6A6A6A] text-[14px] md:text-[16px] leading-relaxed">
            {item.description}
          </p>
          <p className="text-[#6A6A6A] text-[14px] md:text-[16px] italic">
            {item.details}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function InvestmentSuite() {
  
    const {
      handleDownloadClick,
      isOSPopupOpen,
      setIsOSPopupOpen,
      isQRPopupOpen,
      setIsQRPopupOpen,
      selectedOS,
      setSelectedOS,
    } = useAppDownload()
  
    
  const targetRef = useRef(null);
  const isInView = useInView(targetRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const xMobile = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const xDesktop = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  useEffect(() => {
    if (isInView) {
      AnalyticsService.sendEvent("Investment Suite section viewed");
    }
  }, [isInView]);

  const handleStartInvestingClick = () => {
    AnalyticsService.sendEvent("'Start investing' button clicked");
  };

  // Debug: Log video paths
  useEffect(() => {
    console.log(
      "Investment data with videos:",
      investmentData.map((item) => ({
        id: item.id,
        video: item.video,
        hasVideo: !!item.video,
      }))
    );
  }, []);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex flex-col h-screen overflow-hidden">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 md:pt-16 pb-4 md:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-start justify-between lg:-ml-55"
          >
            <div className="text-left md:text-center mr-0">
              <h2 className="md:ml-50 text-4xl sm:text-6xl lg:text-[72px] font-medium text-white mb-3 md:mb-4 text-left md:text-center">
                Investment suite
              </h2>
              <p className="text-[#C0C0C0] text-base md:text-lg max-w-lg text-left md:ml-50 leading-snug md:leading-normal mb-2 md:mb-0">
                Diversify your portfolio with{" "}
                <br className="block md:hidden" />
                <span className="text-white font-medium">
                  tokenized real-world assets
                </span>{" "}
                and traditional investments
              </p>
            </div>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleStartInvestingClick();
                handleDownloadClick()
              }}
              className="
                  flex items-center justify-center cursor-pointer whitespace-nowrap 
                  bg-white text-black transition-colors hover:bg-gray-100 
                  rounded-full mt-4 md:mt-0
                  px-6 h-[48px] md:h-[56px] gap-2 text-sm font-medium
                "
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path
                  d="M8.62591 5.09984C8.53039 4.82843 8.353 4.59336 8.11822 4.42705C7.88343 4.26073 7.60283 4.17137 7.3151 4.17129H6.23782C5.93221 4.17215 5.63766 4.28571 5.41058 4.49024C5.1835 4.69477 5.03984 4.97588 5.00713 5.27973C4.97442 5.58359 5.05496 5.88883 5.23331 6.137C5.41166 6.38517 5.67529 6.55883 5.97372 6.62471L7.61118 6.98334C7.94624 7.05647 8.24243 7.25087 8.44282 7.52918C8.64321 7.80749 8.73365 8.15005 8.69674 8.491C8.65983 8.83195 8.49819 9.14722 8.24289 9.3762C7.98759 9.60518 7.65666 9.73171 7.31371 9.73145H6.38656C6.09917 9.73157 5.81881 9.64261 5.58407 9.47682C5.34932 9.31103 5.17174 9.07656 5.07575 8.80568M6.85222 4.17129V2.78125M6.85222 11.1215V9.73145M9.50303 18.7208V11.4231C9.50303 10.9623 9.68609 10.5203 10.0119 10.1945C10.3378 9.86864 10.7797 9.68557 11.2406 9.68557C11.7014 9.68557 12.1434 9.86864 12.4692 10.1945C12.7951 10.5203 12.9781 10.9623 12.9781 11.4231V15.2457H15.7582C16.4955 15.2457 17.2026 15.5386 17.724 16.06C18.2454 16.5814 18.5383 17.2885 18.5383 18.0258V18.7208"
                  stroke="#080808"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.85209 13.2528C5.56961 13.2526 4.31775 12.8609 3.26387 12.1301C2.21 11.3993 1.40434 10.3641 0.95462 9.1631C0.5049 7.96205 0.43255 6.65234 0.747243 5.40907C1.06194 4.16579 1.74867 3.04822 2.71564 2.20576C3.6826 1.3633 4.88371 0.836108 6.15837 0.694673C7.43303 0.553238 8.72049 0.804299 9.84861 1.41429C10.9767 2.02428 11.8918 2.96412 12.4714 4.10817C13.0509 5.25221 13.2675 6.54593 13.092 7.81635"
                  stroke="#080808"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Start Investing</span>
            </motion.button>

          </motion.div>
        </div>

        {/* Cards Section */}
        <div className="flex-1 flex items-center overflow-hidden">
          {/* Mobile Cards */}
          <motion.div
            style={{ x: xMobile }}
            className="flex gap-8 pl-4 sm:pl-6 lg:pl-8 md:hidden"
          >
            {investmentData.map((item, index) => (
              <VideoCard
                key={item.id}
                item={item}
                isInView={isInView}
                index={index}
              />
            ))}
          </motion.div>

          {/* Desktop Cards */}
          <motion.div
            style={{ x: xDesktop }}
            className="hidden md:flex gap-8 pl-4 sm:pl-6 lg:pl-8"
          >
            {investmentData.map((item, index) => (
              <VideoCard
                key={item.id}
                item={item}
                isInView={isInView}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
         <AppDownloadPopups
              isOSPopupOpen={isOSPopupOpen}
              setIsOSPopupOpen={setIsOSPopupOpen}
              isQRPopupOpen={isQRPopupOpen}
              setIsQRPopupOpen={setIsQRPopupOpen}
              selectedOS={selectedOS}
              setSelectedOS={setSelectedOS}
            />
    </section>
  );
}