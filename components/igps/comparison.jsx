import React from 'react';

// Assuming your image is hosted at a publicly accessible URL 
// OR placed in your project's public folder.
const TABLE_IMAGE_URL = '/table.png'; 

const ImageComparisonTable = () => {
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

        /* Custom style for the H1 heading */
        .h1-style {
          font-weight: 600; /* SemiBold */
          font-size: 54px; 
          line-height: 1; /* 100% */
          letter-spacing: -0.06em; /* -6% */
        }

        /* Custom style for the subheading P tag */
        .subheading-style {
          font-weight: 500; /* Medium */
          font-size: 18px; 
          line-height: 24px; 
          letter-spacing: -0.02em; /* -2% */
        }

        /* Responsive scaling for H1 on mobile */
        @media (max-width: 640px) {
            .h1-style {
                font-size: 38px; 
                letter-spacing: -0.04em;
            }
        }
      `}</style>

      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        
        {/* --- Heading Section --- 
          Applying font-montserrat and h1-style
        */}
        <h1 className="
          font-montserrat 
          h1-style 
          text-gray-800 
          mb-4 sm:mb-2 
          text-center 
          transition-colors duration-300
          text-54px
        ">
          Keep Your Margins. <span className="text-red-600">Stop Paying Hidden FX.</span>
        </h1>
        
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
          Most payment providers hide their fees in the Exchange Rate. We don't. <span classname="text-[#080808]">We offer zero FX Markup rates on major corridors.</span>
        </p>

        {/* --- Image Table Replacement --- */}
        <div className="flex justify-center">
          <img 
            src="/table.png"
            alt="Comparison table of fees for Traditional Banks, Payment Gateways, and bepay IGPS"
            className="w-full max-w-4xl h-auto "
          />
        </div>

      </div>
    </>
  );
};

export default ImageComparisonTable;