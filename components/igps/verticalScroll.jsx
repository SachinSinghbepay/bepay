"use client"
import React, { useRef, useState } from 'react';
import { AnalyticsService } from '@/services/analyticsService';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-is-mobile';

// Reusable component for the scrolling photo item (Desktop)
const PhotoCardItem = ({ imageSrc, altText, index, progress, totalImages }) => {
  const segmentDuration = 1 / totalImages;
  const start = index * segmentDuration;
  const end = start + segmentDuration;

  // Use viewport height so images move exactly one screen height (no vertical gaps)
  const travelDistance = typeof window !== 'undefined' && window.innerHeight ? window.innerHeight : 900;
  const fixedTransformDistance = 0.4;

  let inputRange = [];
  let outputRange = [];

  const isFirst = index === 0;
  const isLast = index === totalImages - 1;

  if (isFirst) {
    inputRange = [
      0,
      end - segmentDuration * fixedTransformDistance,
      end + segmentDuration * fixedTransformDistance,
    ];
    outputRange = [0, 0, -travelDistance];
  } else if (isLast) {
    inputRange = [
      start - segmentDuration * fixedTransformDistance,
      start + segmentDuration * fixedTransformDistance,
      1,
    ];
    outputRange = [travelDistance, 0, 0];
  } else {
    inputRange = [
      start - segmentDuration * fixedTransformDistance,
      start + segmentDuration * fixedTransformDistance,
      end - segmentDuration * fixedTransformDistance,
      end + segmentDuration * fixedTransformDistance,
    ];
    outputRange = [travelDistance, 0, 0, -travelDistance];
  }

  const y = useTransform(progress, inputRange, outputRange);

  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 flex items-center justify-end pr-0"
    >
      <img
        src={imageSrc}
        alt={altText}
        loading="lazy"
        className="block h-full w-[70%] object-cover"
        style={{ maxWidth: '70%', height: '100%', margin: 0, padding: 0 }}
      />
    </motion.div>
  );
};

// Mobile horizontal card component (image only; overlays removed)
const MobileCard = ({ imageSrc, altText }) => {
  return (
    <div className="flex-shrink-0 w-full h-[500px] relative">
      <img
        src={imageSrc}
        alt={altText}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

const VerticalScrollingSection = () => {
  const containerRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    AnalyticsService.sendEvent('IGPS Component View', { component: 'VerticalScrollingSection', page: 'igps' });
  }, []);

  // Only attach the scroll target for desktop (isMobile === false).
  // When `isMobile` is `null` (initial client-detection phase) or `true`,
  // pass `undefined` to avoid `framer-motion` complaining about a non-hydrated ref.
  const { scrollYProgress } = useScroll({
    target: isMobile === false ? containerRef : undefined,
    offset: ["start start", "end end"],
  });

  // Use the six images from the public/scrollPage folder
  const scrollFilenames = [
    'sp1.png',
    'sp2.png',
    'sp3.png',
    'sp4.png',
    'sp5.png',
    'sp6.png',
  ];

  const cardData = scrollFilenames.map((name) => ({
    imageSrc: `/scrollPage/${encodeURIComponent(name)}`,
    altText: name,
  }));

  // Desktop styles
  const staticTextStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: '50px',
    lineHeight: '45px',
    letterSpacing: '-0.02em',
    wordSpacing: '0em',
    textTransform: 'capitalize',
  };

  const builtForStyle = {
    ...staticTextStyle,
    color: '#C0C0C0',
    display: 'inline',
    padding: 0,
    wordSpacing: '-0.12em',
  };

  const titleStyle = {
    ...staticTextStyle,
    color: '#333333',
    display: 'block',
    padding: '6px 10px',
    maxWidth: '480px',
  };

  // Mobile heading styles
  const mobileHeadingStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: '32px',
    lineHeight: '24px',
    letterSpacing: '-0.02em',
    wordSpacing: '0em',
    textAlign: 'center',
    textTransform: 'capitalize',
  };

  const mobileBuiltForStyle = {
    ...mobileHeadingStyle,
    color: '#C0C0C0',
    padding: 0,
    wordSpacing: '-0.06em',
  };

  const mobileTitleStyle = {
    ...mobileHeadingStyle,
    color: '#333333',
    lineHeight: '35px',
  };

  // Calculate the total scroll height: base height + extra scroll for animations
  const scrollHeight = `${(cardData.length + 2) * 100}vh`;

  // Avoid rendering until we know client viewport size (prevents flash of wrong layout)
  if (isMobile === null) {
    // Render an empty spacer preserving height so layout doesn't jump.
    return <div style={{ height: scrollHeight }} />;
  }

  // Mobile scroll functions
  const scrollToSlide = (index) => {
    if (mobileScrollRef.current) {
      const scrollWidth = mobileScrollRef.current.scrollWidth;
      const clientWidth = mobileScrollRef.current.clientWidth;
      const scrollPosition = (scrollWidth / cardData.length) * index;
      mobileScrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
      setCurrentSlide(index);
    }
  };

  const handlePrevSlide = () => {
    const newIndex = currentSlide > 0 ? currentSlide - 1 : cardData.length - 1;
    scrollToSlide(newIndex);
  };

  const handleNextSlide = () => {
    const newIndex = currentSlide < cardData.length - 1 ? currentSlide + 1 : 0;
    scrollToSlide(newIndex);
  };

  return (
    <>
      {/* Desktop View */}
      {!isMobile && (
        <div ref={containerRef} style={{ height: scrollHeight }} className="block">
        <div className="sticky top-0 h-screen grid grid-cols-2">
          {/* 1. Left Side: Static Content */}
          <div className="p-16 flex items-center justify-center bg-white">
            <div className="max-w-lg">
              <p className="mb-2" style={builtForStyle}>
                Built For
              </p>
              <h1 className="leading-tight mt-0 desktop-heading" style={{...titleStyle, lineClamp: 3, WebkitLineClamp: 3}}>
                Global Businesses & Merchants
              </h1>
            </div>
          </div>

          {/* 2. Right Side: Animated Content */}
          <div className="relative overflow-hidden">
            {cardData.map((card, index) => (
              <PhotoCardItem
                key={index}
                imageSrc={card.imageSrc}
                altText={card.altText}
                index={index}
                progress={scrollYProgress}
                totalImages={cardData.length}
              />
            ))}
          </div>
          </div>
        </div>
      )}

      {/* Mobile View */}
      {isMobile && (
        <div className="block bg-white">
        {/* Heading Section (mobile) */}
        <div className="px-6 py-6 text-center bg-white">
          <p className="mb-2" style={mobileBuiltForStyle}>
            Built For
          </p>
          <h1 className="mt-0" style={mobileTitleStyle}>
            Global Businesses & Merchants
          </h1>
        </div>

        {/* Horizontal Scrolling Cards Section */}
        <div className="relative">
          {/* Scrollable Container */}
          <div
            ref={mobileScrollRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {cardData.map((card, index) => (
              <MobileCard
                key={index}
                imageSrc={card.imageSrc}
                altText={card.altText}
              />
            ))}
          </div>

          {/* Top-right Navigation Arrows (vertical stack, 56x56, 14px radius, 10% white) */}
          <div className="absolute right-4 top-6">
            <div className="flex flex-col-2 items-center" style={{ gap: '5px' }}>
              <button
                onClick={handlePrevSlide}
                className="flex items-center justify-center w-14 h-14 rounded-[14px] bg-transparent bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-shadow shadow-md"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>

              <button
                onClick={handleNextSlide}
                className="flex items-center justify-center w-14 h-14 rounded-[14px] bg-transparent bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-shadow shadow-md"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Hide the old dot indicators (keep for accessibility only) */}
          <div className="sr-only">
            {cardData.map((_, index) => (
              <button key={index} onClick={() => scrollToSlide(index)} />
            ))}
          </div>
        </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        /* Desktop-only 3-line clamp for the heading */
        .desktop-heading {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          /* Force exactly 3 lines using line-height from staticTextStyle (60px) */
          max-height: 180px;
          line-height: 60px !important;
          word-break: normal;
          hyphens: none;
        }
      `}</style>
    </>
  );
};

export default VerticalScrollingSection;