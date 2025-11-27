"use client"
import React from 'react';
import { useEffect } from 'react';
import { AnalyticsService } from '@/services/analyticsService';
// Removed unused imports: Globe, Route, Percent, FileCheck, ArrowUpRight

// Assuming c1.png, c2.png, c3.png, and c4.png are accessible via the public folder
// If these are locally imported files (e.g., import c1 from './c1.png'), you would need to adjust the import statements.

export default function BepayLanding() {
  useEffect(() => {
    AnalyticsService.sendEvent('IGPS Component View', { component: 'BepayLanding', page: 'igps' });
  }, []);
  // Utility component to render the image tile
  const FeatureImage = ({ src }) => (
    <div className="flex justify-center mb-6">
      {/* Increased size for better visibility */}
      <div className="w-21 h-21 flex items-center justify-center overflow-hidden">
        <img
          src={src}
          alt="Feature Icon"
          className="w-25 h-25 object-contain" // Adjusted size and object-fit for the image
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-11">
        <h1
  className="
    text-[30px] leading-[30px] font-semibold text-[#C0C0C0]
    tracking-[-0.04em] text-center md:whitespace-nowrap
    md:text-[54px] md:leading-[54px] md:tracking-[-0.06em]
    font-montserrat
  "
>
  Why Businesses Choose <span className="text-[#080808]">bepay IGPS</span>
</h1>

          <p className="text-[#080808] text-[14px] md:text-[24px] mt-5" style={{
            fontFamily: 'Montserrat',
            fontWeight: 500,
           
            lineHeight: '100%',
            letterSpacing: '-2%',
            textAlign: 'center',
          }}>
            The Operating System for Borderless Business
          </p>
        </div>

        {/* Subtitle */}
        <div>
          <p className="text-[#6A6A6A] text-[13px] md:text-[18px]" style={{
            fontFamily: 'Montserrat',
            fontWeight: 500,
            lineHeight: '20px',
            letterSpacing: '-2%',
            textAlign: 'center',
          }}>
            A single platform that bridges traditional banking with intelligent stablecoin rails, delivering near real-time
            settlements, cost savings, and seamless compliance for global enterprises.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-15 mx-auto" style={{ maxWidth: '1000px' }}>
          
          {/* Faster Global Settlements (c1.png) */}
          <div className="bg-[#F1F1F1] p-8 flex flex-col justify-center mx-auto" style={{ width: '100%', maxWidth: '480px', height: '393px', borderRadius: '54px' }}>
            <FeatureImage src="/c1.png" />
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
              Faster Global Settlements
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Move money across borders with modern rails designed for speed.
            </p>
          </div>

          {/* Intelligent Smart Routing (c2.png) */}
          <div className="bg-[#F1F1F1] p-8 flex flex-col justify-center mx-auto" style={{ width: '100%', maxWidth: '480px', height: '393px', borderRadius: '54px' }}>
            <FeatureImage src="/c2.png" />
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
              Intelligent Smart Routing
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Let our intelligent engine choose the fastest and cheapest multi-away lane.
            </p>
          </div>

          {/* Up to 50% Cost Reduction (c3.png) */}
          <div className="bg-[#F1F1F1] p-8 flex flex-col justify-center mx-auto" style={{ width: '100%', maxWidth: '480px', height: '393px', borderRadius: '54px' }}>
            <FeatureImage src="/c3.png" />
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
              Up to 50% Cost Reduction
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Cut down the middlemen, not your margins.
            </p>
          </div>

          {/* Compliance-First Architecture (c4.png) */}
          <div className="bg-[#F1F1F1] p-8 flex flex-col justify-center mx-auto" style={{ width: '100%', maxWidth: '480px', height: '393px', borderRadius: '54px' }}>
            <FeatureImage src="/c4.png" />
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
              Compliance-First Architecture
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Built from day one with regulatory requirements in mind.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-[24px] font-semibold text-[#080808] mb-8 mt-10">
            Ready to Receive International Payments?
          </h2>
          <button
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-4 h-[56px] rounded-full mt-8 text-xs font-medium md:w-[180px] md:text-[14px] mx-auto"
          >
            
            <span>Get Started</span>
            {/* Keeping ArrowUpRight from lucide-react for the button icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-7 flex-shrink-0">
              <path d="M7 17l10-10M7 7h10v10"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}