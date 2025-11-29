"use client"
import { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnalyticsService } from "@/services/analyticsService";
import GetStartedPopup from "@/components/popups/getStartedPopup";

const IgpsHero = () => {
  useEffect(() => {
    AnalyticsService.sendEvent("IGPS Component View", { component: "IgpsHero", page: "igps" });
  }, []);
  const [popup, setPopup] = useState(null);
  const pillRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    function adjustWidth() {
      if (!popup) return;
      if (!pillRef.current || !textRef.current || !iconRef.current) return;
      // On small screens, prefer CSS-controlled width (90vw) so it fits viewport
      if (window.innerWidth <= 480) {
        pillRef.current.style.width = '';
        return;
      }
      const textW = Math.ceil(textRef.current.getBoundingClientRect().width || 0);
      const iconW = Math.ceil(iconRef.current.getBoundingClientRect().width || 0);
      const gap = 12; // visual gap between text and icon
      const contentW = textW + iconW + gap;

      // include horizontal padding from computed styles so final width includes paddings
      const cs = window.getComputedStyle(pillRef.current);
      const padLeft = parseFloat(cs.paddingLeft) || 0;
      const padRight = parseFloat(cs.paddingRight) || 0;

      let totalTarget = Math.ceil(contentW * 1.2 + padLeft + padRight); // 20% extra + paddings

      const vw90 = Math.floor(window.innerWidth * 0.9);
      // keep some padding from modal edges
      const maxAllowed = Math.max(vw90 - 40, 200);
      if (totalTarget > maxAllowed) totalTarget = maxAllowed;

      pillRef.current.style.width = `${totalTarget}px`;
    }

    if (popup) {
      // wait a frame for DOM to render
      requestAnimationFrame(adjustWidth);
      window.addEventListener('resize', adjustWidth);
    }
    return () => window.removeEventListener('resize', adjustWidth);
  }, [popup]);
  return (
    // 1. Mobile BG is white (bg-white), Desktop BG is the original gray (lg:bg-[#F9F9F9])
    <section className="bg-white lg:bg-[#F9F9F9] text-black py-20 md:py-20"> 
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center -mt-10 lg:-mt-20 mb-8 md:mb-16">
          <h1 className="text-gray-800 lg:-mt-15 text-[26px] md:text-[44px]" style={{ fontFamily: 'Montserrat', fontWeight: 500, lineHeight: '100%', letterSpacing: '-0.1em', textTransform: 'uppercase' }}>
            <span style={{ color: '#C0C0C0' }}>MOVE</span>
            <span style={{ color: '#6A6A6A' }}> MONEY</span>
            <span style={{ color: '#333333' }}> GLOBALLY</span>
          </h1>
          <p className="text-gray-600 mt-2 text-center igps-subheading" style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '13px', lineHeight: '15px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
           ACCEPT INTERNATIONAL PAYMENTS WITH ZERO FEES
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          {/* Image Container Block */}
          <div className="lg:w-1/2 w-full flex justify-center -mx-4 lg:mx-0 mt-0 lg:-mt-10"> 
            {/* Removed aspect ratio on mobile to let image determine height, full bleed with negative margin */}
            <div className="relative w-full max-w-none lg:max-w-[35rem] lg:aspect-square">
              <Image
                src="/hero1.png"
                alt="IGPS Hero Image"
                width={800}
                height={600}
                className="lg:hidden w-full h-auto"
              />
              <Image
                src="/hero.png"
                alt="IGPS Hero Image"
                fill
                className="rounded-lg object-contain hidden lg:block"
              />
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full lg:pl-8">
            {/* 2. Removed -mt-10 on mobile. Added lg:-mt-10 to keep desktop style. */}
            <div className="space-y-0 mt-0 lg:-mt-10"> 
              
              {/* Intro text (placed before pointers) - left aligned with pointer texts */}
              <div className="w-full mb-6">

                <p className="igps-intro text-left">
                  India’s first platform offering free <br/>international settlements for businesses
                </p>
          

              
              {/* Checkmark List (Hidden on Mobile, block on Desktop) */}
              <div className="mt-7 space-y-4 lg:space-y-0 lg:block lg:divide-y lg:divide-gray-200">
                <div className="flex items-center justify-between lg:py-4">
                  <div className="flex items-center flex-1">
                    <Image src="/icons/h1.png" alt="globe icon" width={20} height={20} />
                    <p className="igps-check-text ml-3 w-full">Free International Settlement</p>
                  </div>
                  <svg className="hidden lg:block" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>

                <div className="flex items-center justify-between lg:py-4">
                  <div className="flex items-center flex-1">
                    <Image src="/icons/h2.png" alt="currency icon" width={20} height={20} />
                    <p className="igps-check-text ml-3 w-full">USD, EUR, GBP, AED, CNY &amp; 40+ Major Currencies accepted!</p>
                  </div>
                  <svg className="hidden lg:block" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>

                <div className="flex items-center justify-between lg:py-4">
                  <div className="flex items-center flex-1">
                    <Image src="/icons/h3.png" alt="countries icon" width={20} height={20} />
                    <p className="igps-check-text ml-3 w-full">US, UK, Europe, China, UAE, Canada, &amp; 100+ Countries supported!</p>
                  </div>
                  <svg className="hidden lg:block" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>

                <div className="flex items-center justify-between lg:py-4">
                  <div className="flex items-center flex-1">
                    <Image src="/icons/h4.png" alt="fira icon" width={20} height={20} />
                    <p className="igps-check-text ml-3 w-full">Instant e-FIRA &amp; e-BRC</p>
                  </div>
                  <svg className="hidden lg:block" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>

                <div className="flex items-center justify-between lg:py-4">
                  <div className="flex items-center flex-1">
                    <Image src="/icons/h5.png" alt="bank icon" width={20} height={20} />
                    <p className="igps-check-text ml-3 w-full">Multi-currency Bank Account</p>
                  </div>
                  <svg className="hidden lg:block" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>

                <div className="flex items-center justify-between lg:py-4">
                  <div className="flex items-center flex-1">
                    <Image src="/icons/h6.png" alt="kyb icon" width={20} height={20} />
                    <p className="igps-check-text ml-3 w-full">Quick KYB Approval</p>
                  </div>
                  <svg className="hidden lg:block" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>

                <div className="flex items-center justify-between lg:py-4">
                  <div className="flex items-center flex-1">
                    <Image src="/icons/h7.png" alt="support icon" width={20} height={20} />
                    <p className="igps-check-text ml-3 w-full">24/7 Merchant Support</p>
                  </div>
                  <svg className="hidden lg:block" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              </div>
              
              {/* Compliance Text (Original spacing kept, except for overall flow) */}
              <div className="mt-6 pl-3 border-l-4 border-black">
                <p className="text-[11px] mt-13 md:text-sm text-gray-500" style={{ fontFamily: 'Montserrat', fontWeight: 600, lineHeight: '100%', letterSpacing: '0%', textTransform: 'uppercase' }}>
                100% SAFE AND COMPLIANT • POWERED BY LEADING BANKS •
                <span className="hidden lg:inline"> <br/></span> RBI APPROVED • PA-CB AUTHORISED • MADE IN INDIA
                </p>
              </div>
              
              {/* Buttons Block (Adjusted size for mobile) */}
              <div className="flex items-center mt-8 space-x-[10px]">
                
                {/* Get Started Button */}
                <button
                  onClick={() => setPopup('getstarted')}
                  // Reduced height and padding for mobile
                  className="flex items-center justify-center gap-2 bg-black text-[#F9F9F9] px-6 py-4 h-[56px] rounded-[100px] text-xs font-medium md:w-[180px] md:text-[14px] md:h-[66px]"
                >
                  <span>Get Started</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:h-7 flex-shrink-0">
                    <path d="M7 17l10-10M7 7h10v10"/>
                  </svg>
                </button>

                {/* Telegram/WhatsApp Button (56x56 on mobile, 66x66 on md) */}
                <Button 
                  variant="outline" 
                  onClick={() => setPopup('whatsapp')}
                  // Reduced size and padding for mobile
                  className="rounded-full w-[56px] h-[56px] p-3 md:w-[66px] md:h-[66px] md:p-[20px] border border-gray-300"
                  style={{ borderColor: 'rgba(192, 192, 192, 0.4)' }} 
                >
                  <Image
                    src="/icons/wp.png"
                    alt="whatsapp icon"
                    width={26}
                    height={26}
                  />
                </Button>
                
                {/* Call Button (56x56 on mobile, 66x66 on md) */}
                <Button 
                  variant="outline" 
                   // Reduced size and padding for mobile
                  onClick={() => setPopup('call')}
                  className="rounded-full w-[56px] h-[56px] p-3 md:w-[66px] md:h-[66px] md:p-[20px] border border-gray-300"
                  style={{ borderColor: 'rgba(192, 192, 192, 0.4)' }} 
                >
                  <Image
                    src="/icons/phone.png"
                    alt="phone icon"
                    width={26}
                    height={26}
                  />
                </Button>
                
                {/* Mail Button (56x56 on mobile, 66x66 on md) */}
                <Button 
                  variant="outline" 
                   // Reduced size and padding for mobile
                  onClick={() => setPopup('email')}
                  className="rounded-full w-[56px] h-[56px] p-3 md:w-[66px] md:h-[66px] md:p-[20px] border border-gray-300"
                  style={{ borderColor: 'rgba(192, 192, 192, 0.4)' }} 
                >
                  <Image
                    src="/icons/mail.png"
                    alt="mail icon"
                    width={26}
                    height={26}
                  />
                </Button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      {popup && popup !== 'getstarted' && (
        <div className="igps-popup-overlay" onClick={() => setPopup(null)}>
          <div className="igps-popup" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="igps-popup-close" onClick={() => setPopup(null)} aria-label="Close popup">×</button>
            <div className="igps-popup-content">
              <h3 className="igps-popup-title">
                {popup === 'whatsapp' && 'Leave us a message on whatsapp on this number\nand we\'ll get back to you within 24 hours'}
                {popup === 'call' && 'Give us a call on this number if you\nhave any query'}
                {popup === 'email' && 'Leave us a message on email and we\'ll get back\nto you within 24 hours'}
              </h3>

              <div className="igps-popup-contact">
                <div className="igps-contact-pill" ref={pillRef}>
                  <span className="igps-contact-text" ref={textRef}>{popup === 'email' ? 'info@bepay.money' : '+918-200-000-000'}</span>
                  <button className="igps-pill-copy" ref={iconRef} onClick={() => {
                    const text = popup === 'email' ? 'info@bepay.money' : '+918-200-000-000';
                    if (navigator && navigator.clipboard) navigator.clipboard.writeText(text);
                  }} aria-label="Copy contact">
                    <svg width="17.35" height="19.66" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                      <rect x="3" y="2" width="11" height="12" rx="2" fill="none" stroke="#6A6A6A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.32" />
                      <rect x="6" y="6" width="11" height="12" rx="2" fill="none" stroke="#6A6A6A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {popup !== 'call' && (
                <button className="igps-action-btn" onClick={() => {
                  if (popup === 'whatsapp') window.open('https://wa.me/919820000000', '_blank');
                  if (popup === 'email') window.location.href = 'mailto:info@bepay.money';
                }}>
                  {popup === 'whatsapp' ? 'Open whatsapp' : 'Open email'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {popup === 'getstarted' && (
        <GetStartedPopup isOpen={true} onClose={() => setPopup(null)} />
      )}
      <style jsx>{`
        @media (max-width: 1023px) {
          .igps-pointer-text {
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            /* 'SemiBold' represented by 600 weight */
            font-style: normal;
            font-size: 12px;
            /* leading-trim is an experimental property; include as requested */
            leading-trim: cap-height;
            line-height: 16px;
            letter-spacing: -2%;
            /* increase gap between icon and text on mobile */
            margin-left: 1.25rem;
          }
          .igps-subheading {
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            /* SemiBold mapped to 600 */
            font-style: normal;
            font-size: 14px;
            /* leading-trim is experimental but included as requested */
            leading-trim: cap-height;
            line-height: 16px;
            /* 8% approx -> 0.08em */
            letter-spacing: 0.08em;
            text-align: center;
            text-transform: uppercase;
            color: #080808;
          }
          /* mobile checklist text size */
          .igps-check-text {
            font-size: 14px;
            line-height: 16px;
          }
        }
        .igps-check-text {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-style: normal;
          color: #080808;
          /* leading-trim is experimental */
          leading-trim: cap-height;
          line-height: 20px;
          letter-spacing: -0.02em; /* approx -2% */
          text-align: left;
        }
        .igps-intro {
          color: #6A6A6A;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-style: normal;
          font-size: 18px;
          /* leading-trim is experimental */
          leading-trim: cap-height;
          line-height: 22px;
        }
        @media (min-width: 1024px) {
          .igps-intro {
            font-size: 28px;
            line-height: 32px;
            letter-spacing: -0.04em; /* approx -4% */
          }
        }
        /* Popup styles */
        .igps-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 60;
          padding: 24px;
        }
        .igps-popup {
          background: #fff;
          border-radius: 16px;
          width: 90vw;
          max-width: 768px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
          position: relative;
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .igps-popup-close {
          position: absolute;
          right: 18px;
          top: 14px;
          background: transparent;
          border: none;
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
        }
        .igps-popup-content { 
          text-align: center; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          gap: 18px;
          width: 100%;
          box-sizing: border-box;
        }
        .igps-popup-title {
          white-space: pre-line;
          color: #333333;
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-style: normal;
          font-size: 20px;
          leading-trim: cap-height;
          line-height: 28px;
          letter-spacing: -4%;
          text-align: center;
          margin: 0;
        }
        .igps-popup-contact { display:flex; align-items:center; justify-content:center; gap:12px; }
        .igps-contact-pill {
          background:#F5F5F5;
          padding:14px 44px; /* generous left/right padding to create 3-4 spaces */
          border-radius:12px;
          color: #333333;
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-size: 20px;
          leading-trim: cap-height;
          line-height: 28px;
          letter-spacing: -4%;
          position: relative;
          display: inline-block;
          box-sizing: border-box;
          max-width: 92%;
        }
        .igps-contact-text { display:block; width:100%; text-align: center; }
        .igps-pill-copy { background: transparent; border: none; cursor: pointer; font-size: 18px; padding: 6px; position: absolute; right: 12px; top: 50%; transform: translateY(-50%); }

        /* Smaller devices: slightly reduce padding so pill fits viewport */
        @media (max-width: 480px) {
          .igps-contact-pill { padding: 12px 28px; min-width: 0; width: 90vw; }
          .igps-pill-copy { right: 10px; }
          .igps-contact-pill { border-radius: 10px; }
          .igps-popup-title { font-size: 16px; line-height: 22px; }
          .igps-contact-pill { font-size: 16px; line-height: 22px; }
          .igps-popup { min-height: 320px; }
        }
        /* Desktop width is now handled dynamically via JS measurement; no fixed min-width here */
        .igps-action-btn { background:#000; color:#fff; border:none; padding:14px 26px; border-radius:999px; display:inline-block; cursor:pointer; }

        @media (min-width: 1024px) {
          .igps-popup { width: 768px; height: 370px; border-radius: 32px; }
          .igps-popup-close { top: 20px; right: 22px; }
        }
      `}</style>
    </section>
  );
};

export default IgpsHero;

