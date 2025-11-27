'use client'
import React, { useRef, useState } from 'react';
import { AnalyticsService } from '@/services/analyticsService';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Reusable component for the scrolling photo item (Desktop)
const PhotoCardItem = ({ imageSrc, altText, index, progress, totalImages }) => {
  const segmentDuration = 1 / totalImages;
  const start = index * segmentDuration;
  const end = start + segmentDuration;

  const travelDistance = 900;
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
      className="absolute inset-0 flex items-center justify-center"
    >
      <img
        src={imageSrc}
        alt={altText}
        loading="lazy"
        className="block h-full w-auto object-contain bg-white"
      />
    </motion.div>
  );
};

// Mobile horizontal card component
const MobileCard = ({ imageSrc, altText }) => {
  return (
    <div className="flex-shrink-0 w-full h-full flex items-center justify-center bg-gray-100">
      <img
        src={imageSrc}
        alt={altText}
        loading="lazy"
        className="block h-full w-auto object-contain"
      />
    </div>
  );
};

const VerticalScrollingSection = () => {
  const containerRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  React.useEffect(() => {
    AnalyticsService.sendEvent('IGPS Component View', { component: 'VerticalScrollingSection', page: 'igps' });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Use the six images from the public/scrollPage folder
  const scrollFilenames = [
    'sp1.png',
    'sp2.png',
    'sp3.png',
    'sp4.png',
    'sp5.png',
    'p6.png',
  ];

  const cardData = scrollFilenames.map((name) => ({
    imageSrc: `/scrollPage/${encodeURIComponent(name)}`,
    altText: name,
  }));

  // Desktop styles
  const staticTextStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: '60px',
    lineHeight: '60px',
    letterSpacing: '-0.06em',
    textTransform: 'capitalize',
  };

  const builtForStyle = {
    ...staticTextStyle,
    color: '#C0C0C0',
    display: 'inline-block',
    padding: '6px 10px',
  };

  const titleStyle = {
    ...staticTextStyle,
    color: '#333333',
    display: 'inline-block',
    padding: '6px 10px',
  };

  // Mobile heading styles
  const mobileHeadingStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: '32px',
    lineHeight: '32px',
    letterSpacing: '-0.06em',
    textAlign: 'center',
    textTransform: 'capitalize',
  };

  const mobileBuiltForStyle = {
    ...mobileHeadingStyle,
    color: '#C0C0C0',
  };

  const mobileTitleStyle = {
    ...mobileHeadingStyle,
    color: '#333333',
  };

  // Calculate the total scroll height: base height + extra scroll for animations
  const scrollHeight = `${(cardData.length + 2) * 100}vh`;

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
      <div ref={containerRef} style={{ height: scrollHeight }} className="hidden md:block">
        <div className="sticky top-0 h-screen grid grid-cols-2">
          {/* 1. Left Side: Static Content */}
          <div className="p-16 flex items-center justify-center bg-white">
            <div className="max-w-lg">
              <p className="mb-2" style={builtForStyle}>
                Built For
              </p>
              <h1 className="leading-tight mt-0" style={titleStyle}>
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

      {/* Mobile View */}
      <div className="md:hidden bg-white">
        {/* Heading Section */}
        <div className="px-6 py-12 text-center">
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
              height: '500px',
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

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-lg p-3 shadow-lg transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-lg p-3 shadow-lg transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {cardData.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-gray-800 w-8' : 'bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default VerticalScrollingSection;