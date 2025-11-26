'use client'
import React, { useRef, useEffect, useState } from 'react';

const Card = ({ title, description, visual, index }) => {
    // Styles for the Title
    const titleStyle = {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600, // SemiBold
        fontSize: '30px',
        lineHeight: '32px',
        letterSpacing: '-0.04em', // -4%
        color: '#333333',
        textAlign: 'left', // Left align
        // Note: leading-trim: CAP_HEIGHT is a modern CSS feature and is best applied via a global CSS file for broader browser support
    };

    // Styles for the Description
    const descriptionStyle = {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 500, // Medium
        fontSize: '16px',
        lineHeight: '20px',
        letterSpacing: '-0.02em', // -2%
        color: '#6A6A6A',
        textAlign: 'left', // Left align
        // Note: leading-trim: CAP_HEIGHT is a modern CSS feature and is best applied via a global CSS file for broader browser support
    };

    return (
        <div 
            className="flex-shrink-0 w-[400px] h-[450px] bg-white p-6 flex flex-col justify-end relative overflow-visible transition-all duration-300 cursor-default" 
            style={{
                borderRadius: '40px',
                boxShadow: '30px 60px 50px rgba(0, 0, 0, 0.08)',
                zIndex: 50 - index
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

    return (
        <div className="font-sans py-12 bg-gray-50 text-center flex flex-col justify-center PaymentSystemUI">
            
            <h1 
                className="text-gray-900 mb-3 capitalize"
                style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 600,
                    fontSize: '54px',
                    lineHeight: '100%',
                    letterSpacing: '-6%',
                }}
            >
                The Intelligent <span className="text-gray-400">Global Payment System</span>
            </h1>
            
            <h2 
                className="text-gray-600 my-3 inline-block"
                style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 500,
                    fontSize: '24px',
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
                    className="text-gray-600 whitespace-nowrap text-left mt-15 flex items-start gap-2.5 max-w-2xl"
                    style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 500,
                        fontSize: '20px',
                        lineHeight: '28px',
                        letterSpacing: '-2%',
                    }}
                >
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full mt-2.5 flex-shrink-0"></span>
                    <span>Connecting your business to the world's most important corridors through a single, Intelligent Payment Network.</span>
                </div>
            </div>

            <div className="w-full flex items-center justify-center py-5 overflow-hidden">
                <div 
                    ref={scrollerRef}
                    className="flex gap-4 overflow-x-auto hide-scrollbar px-5" 
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {cardsData.map((card, index) => (
                        <div key={index} className={index === 0 ? 'ml-11' : index === cardsData.length - 1 ? 'mr-11' : ''}>
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

            <p className="text-xl font-medium text-gray-800 mt-8 px-5">
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