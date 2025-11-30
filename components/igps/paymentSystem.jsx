'use client'
import React, { useRef, useEffect, useState } from 'react';
// Import Next.js Image component
import Image from 'next/image'; 
import { AnalyticsService } from '@/services/analyticsService';
import GetStartedPopup from '@/components/popups/getStartedPopup';

// --- Card Component (Optimized) ---
const Card = ({ title, description, visual, index }) => {
    // Determine mobile vs desktop (client-only code)
    const isClient = typeof window !== 'undefined';
    const isMobile = isClient ? window.innerWidth < 768 : false;

    // Styles for the Title (use requested mobile metrics when on mobile)
    const titleStyle = isMobile
        ? {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600, // SemiBold
              fontSize: '28.25px',
              lineHeight: '26.83px',
              letterSpacing: '-0.04em', // -4%
              color: '#333333',
              textAlign: 'left',
          }
        : {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600, // SemiBold
              fontSize: '30px',
              lineHeight: '32px',
              letterSpacing: '-0.04em', // -4%
              color: '#333333',
              textAlign: 'left',
          };

    // Styles for the Description (use requested mobile metrics when on mobile)
    const descriptionStyle = isMobile
        ? {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500, // Medium
              fontSize: '14.12px',
              lineHeight: '16.95px',
              letterSpacing: '-0.02em', // -2%
              color: '#6A6A6A',
              textAlign: 'left',
          }
        : {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500, // Medium
              fontSize: '16px',
              lineHeight: '20px',
              letterSpacing: '-0.02em', // -2%
              color: '#6A6A6A',
              textAlign: 'left',
          };

    // The visual prop now expects a JSX element (the Next/Image component)
    return (
        <div 
            className="flex-shrink-0 w-[98%] md:w-[400px] h-[450px] bg-white p-6 flex flex-col justify-end relative overflow-visible transition-all duration-300 cursor-default" 
            style={{
                borderRadius: '40px',
                // Note: window.innerWidth check is client-side only, wrapped in isClient check
                boxShadow: "60px 20px 30px -20px rgba(0, 0, 0, 0.05), 80px 30px 120px -90px rgba(0, 0, 0, 0.02)",
                zIndex: isClient && window.innerWidth < 768 ? 'auto' : 100 - index
            }}
        >
            <div className="absolute top-6 left-6 opacity-75 w-[200px] h-[200px] flex items-center justify-center">
                {visual}
            </div>
            <div className="z-10">
                <h3 
                    // Keeping minimal Tailwind classes for layout, overriding typography with inline style
                    className="mb-1"
                    style={titleStyle}
                >
                    {title}
                </h3>
                <p 
                    // Keeping minimal Tailwind classes for layout, overriding typography with inline style
                    className="mt-5"
                    style={descriptionStyle}
                >
                    {description}
                </p>
            </div>
        </div>
    );
};
// --- End Card Component ---

// --- PaymentSystemUI Component (Optimized) ---
const PaymentSystemUI = () => {
    const scrollerRef = useRef(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Common props for the visual Image components
    // The parent div size is w-[200px] h-[200px], so using fill or setting width/height near 200px is appropriate.
    const imageProps = {
      width: 200, 
      height: 200,
      className: "max-w-full h-auto",
      // These are likely above the fold, so setting priority is beneficial.
      priority: true 
    };

    const cardsData = [
        {
            title: <>Multi-currency<br />Bank Accounts</>,
            description: "Look like a local business, anywhere across US, EU, UAE, CHINA, UK & more",
            // Corrected: Replaced <img> with <Image />
            visual: <Image src="/p1.png" alt="Multi-currency visual" {...imageProps} /> 
        },
        {
            title: <>Free<br />settlement</>,
            // Corrected: Escaped the apostrophe ('s) -> (&apos;s)
            description: "Send and receive money worldwide without paying any settlement fees.",
            // Corrected: Replaced <img> with <Image />
            visual: <Image src="/p2.png" alt="FX Rate visual" {...imageProps} />
        },
        {
            title: <>Near Real-time<br />Settlement</>,
            description: "Achieve near real-time payment in key markets.",
            // Corrected: Replaced <img> with <Image />
            visual: <Image src="/p3.png" alt="Settlement visual" {...imageProps} /> 
        },
        {
            title: <>Automated<br />Compliance</>,
            description: "Get instant FIRA/FIRC or digital compliance certificates automatically upon settlement.",
            // Corrected: Replaced <img> with <Image />
            visual: <Image src="/p4.png" alt="Compliance visual" {...imageProps} />
        },
        {
            title: <>Smart Global<br />Dashboard</>,
            description: "Track payments, invoices, payouts, FX, treasury, and analytics—all from one powerful interface.",
            // Corrected: Replaced <img> with <Image />
            visual: <Image src="/p5.png" alt="Dashboard visual" {...imageProps} />
        }
    ];

    useEffect(() => {
        // Embed a dedicated <style> tag to ensure the Montserrat font is loaded and to hide the scrollbar
        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap');
            
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            @media (max-height: 1000px) {
                .PaymentSystemUI {
                    min-height: 100vh;
                }
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    useEffect(() => {
        AnalyticsService.sendEvent('IGPS Component View', { component: 'PaymentSystemUI', page: 'igps' });
    }, []);

    return (
        <div className="font-sans py-12 bg-gray-50 text-center flex flex-col justify-center PaymentSystemUI">
            
            <h1
                className="
                    text-gray-900 mb-3 capitalize font-montserrat font-semibold text-center
                    text-[30px] leading-[30px] tracking-[-0.04em]
                    md:text-[54px] md:leading-[100%] md:tracking-[-0.06em]
                "
            >
                The Intelligent <span className="text-[#6A6A6A]">Global Payment System</span>
            </h1>

            
            <h2 
                className="text-gray-600 my-3 inline-block md:text-[24px]  text-[14px] "
                style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 500,
                    lineHeight: '24px',
                    letterSpacing: '-2%',
                    // Note: Removed the linear-gradient background clip/fill color as it renders gray text transparently against a gray background.
                    // This is usually meant to apply a gradient to the text itself. Assuming the text should be black/gray:
                    color: '#080808', 
                }}
            >
                Global Infrastructure. Local Experience.
            </h2>
            
            <div className="w-full px-14">
                <div 
                    className="text-gray-600 md:whitespace-nowrap mt-7 flex md:flex-row flex-col md:items-start items-center gap-2.5 max-w-2xl mx-auto md:mx-0 text-center md:text-left"
                    style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 500,
                        fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '13px' : '20px',
                        lineHeight: '20px',
                        letterSpacing: '-2%',
                    }}
                >
                    <span className="hidden md:block w-2.5 h-2.5 bg-green-500 rounded-full mt-2.5 flex-shrink-0"></span>
                    <span className="max-w-3xl">Connecting your business to the world&apos;s most important corridors through a single, Intelligent Payment Network.</span>
                </div>
            </div>

            <div className="w-full flex items-center justify-center py-5 overflow-hidden">
                <div 
                    ref={scrollerRef}
                    className="flex flex-col md:flex-row gap-4 md:overflow-x-auto hide-scrollbar px-5 items-center" 
                    // Note: window.innerWidth check is client-side only, wrapped in condition
                    style={{ scrollSnapType: typeof window !== 'undefined' && window.innerWidth >= 768 ? 'x mandatory' : 'none' }}
                >
                    {cardsData.map((card, index) => (
                        <div key={index} className={index === 0 ? 'md:ml-11' : index === cardsData.length - 1 ? 'md:mr-11' : ''}>
                            <Card
                                index={index}
                                title={card.title}
                                description={card.description}
                                visual={card.visual}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <p className="md:text-xl text-[16px] font-semibold md:font-medium text-[#080808] mt-8 px-5">
                No more delays. No borders. Just intelligent payments!
            </p>
            <button
                type="button"
                onClick={() => { setIsPopupOpen(true); AnalyticsService.sendEvent('get_started_popup_opened'); }}
                className="flex items-center justify-center gap-2 bg-black text-white px-6 py-4 h-[56px] rounded-full mt-8 text-xs font-medium md:w-[180px] md:text-[14px] mx-auto"
            >
            
            <span>Explore IGPS</span>
            {/* Keeping ArrowUpRight from lucide-react for the button icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-7 flex-shrink-0">
                <path d="M7 17l10-10M7 7h10v10"/>
            </svg>
            </button>
            {/* Render Get Started popup */}
            <GetStartedPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </div>
    );
};

export default PaymentSystemUI;