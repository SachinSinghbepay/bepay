'use client'
import React, { useRef, useEffect, useState } from 'react';
import { AnalyticsService } from '@/services/analyticsService';

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

    return (
        <div 
            className="flex-shrink-0 w-[98%] md:w-[400px] h-[450px] bg-white p-6 flex flex-col justify-end relative overflow-visible transition-all duration-300 cursor-default" 
            style={{
                borderRadius: '40px',
                boxShadow: window.innerWidth < 768 
                    ? '14.75px 14.75px 44.26px 0px rgba(0, 0, 0, 0.06)'
                    : '30px 60px 50px rgba(0, 0, 0, 0.08)',
                zIndex: window.innerWidth < 768 ? 'auto' : 50 - index
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

const PaymentSystemUI = () => {
    const scrollerRef = useRef(null);

    const cardsData = [
        {
            title: <>Multi-currency<br />Bank Accounts</>,
            description: "Look like a local business, anywhere across US, EU, UAE, CHINA, UK & more",
            visual: <img src="/p1.png" alt="Multi-currency visual" className="max-w-full h-auto" /> 
        },
        {
            title: <>Transparent<br />FX rates</>,
            description: "Zero hidden spreads. Always know exactly what you pay.",
            visual: <img src="/p2.png" alt="FX Rate visual" className="max-w-full h-auto" />
        },
        {
            title: <>Near Real-time<br />Settlement</>,
            description: "Achieve near real-time payment in key markets.",
            visual: <img src="/p3.png" alt="Settlement visual" className="max-w-full h-auto" /> 
        },
        {
            title: <>Automated<br />Compliance</>,
            description: "Get instant FIRA/FIRC or digital compliance certificates automatically upon settlement.",
            visual: (
                <img src="/p4.png" alt="Compliance visual" className="max-w-full h-auto" />
            )
        },
        {
            title: <>Smart Global<br />Dashboard</>,
            description: "Track payments, invoices, payouts, FX, treasury, and analytics—all from one powerful interface.",
            visual: (
                <img src="/p5.png" alt="Dashboard visual" className="max-w-full h-auto" />
            )
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
  The Intelligent <span className="text-gray-400">Global Payment System</span>
</h1>

            
            <h2 
                className="text-gray-600 my-3 inline-block md:text-[24px]  text-[14px] "
                style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 500,
                    lineHeight: '24px',
                    letterSpacing: '-2%',
                    background: 'linear-gradient(90deg, #080808 0%, rgba(8, 8, 8, 0.5) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
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
                        fontSize: window.innerWidth < 768 ? '13px' : '20px',
                        lineHeight: '20px',
                        letterSpacing: '-2%',
                    }}
                >
                    <span className="hidden md:block w-2.5 h-2.5 bg-green-500 rounded-full mt-2.5 flex-shrink-0"></span>
                    <span className="max-w-3xl">Connecting your business to the world's most important corridors through a single, Intelligent Payment Network.</span>
                </div>
            </div>

            <div className="w-full flex items-center justify-center py-5 overflow-hidden">
                <div 
                    ref={scrollerRef}
                    className="flex flex-col md:flex-row gap-4 md:overflow-x-auto hide-scrollbar px-5 items-center" 
                    style={{ scrollSnapType: window.innerWidth >= 768 ? 'x mandatory' : 'none' }}
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
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-4 h-[56px] rounded-full mt-8 text-xs font-medium md:w-[180px] md:text-[14px] mx-auto"
            >
            
            <span>Explore IGPS</span>
            {/* Keeping ArrowUpRight from lucide-react for the button icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-7 flex-shrink-0">
                <path d="M7 17l10-10M7 7h10v10"/>
            </svg>
            </button>
        </div>
    );
};

export default PaymentSystemUI;