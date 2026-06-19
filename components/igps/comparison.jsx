"use client"
import React, { useEffect, useRef, useState } from 'react';
// 1. Import the Next.js Image component
import Image from 'next/image'; 
import { AnalyticsService } from '@/services/analyticsService';

// Assuming your image is hosted at a publicly accessible URL 
const TABLE_IMAGE_URL = '/table.png'; 

const ImageComparisonTable = () => {
  const sectionRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // track view with IntersectionObserver (matches merchant-section pattern)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          try {
            AnalyticsService.sendEvent('Image Comparison viewed');
          } catch (e) {}
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasTrackedView]);
  return (
    <>
      {/* 1. Import Montserrat font from Google Fonts.
          2. Define custom CSS classes to achieve the exact styling requested 
            (especially for precise pixel sizes, line height, and letter spacing).
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap');

        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }

        /* Primary title: "Improve Your Margins on Every International Settlement" */
        .title-primary {
          font-weight: 600;
          font-size: 54px;
          line-height: 1; /* 100% */
          leading-trim: cap-height;
          letter-spacing: -0.06em; /* -6% */
          text-align: center;
          color: #333333;
          margin: 0;
        }

        /* Highlight color (Green for "Improve Your Margins") */
        .title-green { color: #0E7630; }
        .title-black { color: #333333; }
        
        /* Desktop-only forced line break helper: inline on mobile, block on desktop */
        .desktop-break { display: inline; }

        /* Subheading */
        .subheading-style {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-style: normal;
          font-size: 18px;
          leading-trim: cap-height;
          line-height: 24px;
          letter-spacing: -0.02em; /* -2% */
          text-align: center; /* center on desktop */
          max-width: 1024px;
          margin-left: auto;
          margin-right: auto;
          white-space: normal;
        }

        /* Mobile styles */
        @media (max-width: 640px) {
          .title-primary {
            font-size: 25px;
            line-height: 30px;
            leading-trim: cap-height;
            letter-spacing: -0.06em;
            text-align: center;
            text-transform: capitalize;
          }

          /* Subheading mobile overrides per design */
          .subheading-style {
            font-weight: 500;
            font-size: 14px;
            leading-trim: cap-height;
            line-height: 20px;
            letter-spacing: -0.02em; /* -2% */
            text-align: center;
          }
        }

        /* Scroll wrapper for wide images on small screens */
        .image-scroll {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x proximity;
        }

        /* default inner wrapper that Next/Image will fill
           NOTE: when using  with the parent must have an
           explicit height (or aspect ratio). Without it the parent collapses
           to 0 height and the image becomes invisible on desktop. */
        .image-inner {
          position: relative;
          display: block;
          width: 100%;
          max-width: 1224px; /* keep desktop responsive and contained */
          height: 700px; /* explicit desktop height so a sizing context */
          aspect-ratio: 16/9; /* hint for modern browsers (keeps proportions) */
        }

        @media (max-width: 640px) {
          /* Make the image slightly wider than the viewport so users can pan horizontally
             but not excessively large — this matches the alignment in the screenshot. */
          .image-scroll {
            padding-left: 16px;
            padding-right: 16px;
          }

          /* Move the image up on mobile so it's closer to the headings */
          .image-scroll {
            margin-top: -40px; /* adjust this value if you want more/less overlap */
          }

          /* Increase image size on mobile so users can pan horizontally. */
          /* Note: When using Next.js Image with fixed w/h for the image, the surrounding div handles overflow. */
          /* On mobile, make the inner wrapper wider than viewport to enable horizontal panning */
          .image-inner {
            min-width: 900px !important; 
            height: 630px !important; 
            max-width: none !important;
            display: block !important;
          }
        }

        /* Desktop: center the image container and keep subheading centered */
        @media (min-width: 641px) {
          .subheading-style {
            /* Reinforce desktop-specific typography */
            font-family: 'Montserrat', sans-serif;
            font-weight: 500;
            font-style: normal;
            font-size: 16px;
            leading-trim: cap-height;
            line-height: 24px;
            letter-spacing: -0.02em; /* -2% */
            text-align: center;
            white-space: normal;
            max-width: 1024px;
            margin-left: auto;
            margin-right: auto;
            margin-top: 20px; /* push subheading down on desktop */
          }

          .image-scroll {
            max-width: 1024px; /* keep image contained on desktop */
            margin-left: auto;
            margin-right: auto;
            padding-left: 0;
            padding-right: 0;
          }

          .image-scroll > span {
            width: 100% !important;
            height: auto !important;
            margin-left: auto;
            margin-right: auto;
            display: block;
          }
        }
        
        /* Larger desktop adjustments: push content further down for spacious layout */
        @media (min-width: 1024px) {
          .hero-section {
            padding-top: 6rem; /* increase top spacing on desktop */
          }

          .title-wrapper {
            margin-top: 1.5rem; /* extra spacing above the headings */
          }

          .subheading-style {
            margin-top: 32px; /* more space between title and subheading on desktop */
            font-size: 18px; /* slightly larger subheading on larger screens */
          }
          .desktop-break { display: block; }
        }
      `}</style>

      <div className="py-10 bg-[#F9F9F9] px-4 sm:px-6 lg:px-8 hero-section">
        
        {/* --- Heading Section --- 
          Applying font-montserrat and h1-style
        */}
        <div className="flex flex-col items-center justify-center mb-4 sm:mb-2 title-wrapper">
          <h1 className="font-montserrat title-primary transition-colors duration-300">
            <span className="title-green">Improve Your Margins</span>
            <span className="title-black"> on</span>{" "}
            <span className="desktop-break title-black">Every International Settlement</span>
          </h1>
        </div>
        
        {/* --- Subheading Section --- 
          Applying font-montserrat and subheading-style
        */}
        <p className="
          font-montserrat 
          subheading-style 
          text-[#6A6A6A] 
          mb-10 sm:mb-8 
          text-center 
          max-w-3xl 
          mx-auto
        ">
          Businesses lose time and money to complex cross-border processes. bepay IGPS simplifies it, offering <span className="text-[#080808]">low cost international settlements, faster transfers, and a reliable experience built for modern trade.</span>
        </p>

        {/* --- Image Table Replacement --- */}
        <div ref={sectionRef} className="flex justify-center w-full">
          <div className="image-scroll w-full" onClick={() => { try { AnalyticsService.sendEvent('Comparison Table Clicked'); } catch (e) {} }} style={{ }}>
            {/* Wrap Image in an explicit container and use `fill` so the container controls size */}
            <div className="image-inner">
              <Image
                src={TABLE_IMAGE_URL}
                alt="Comparison table of fees for Traditional Banks, Payment Gateways, and bepay IGPS"
                fill={true}
                priority={true}
                className="object-contain"
              />
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ImageComparisonTable;