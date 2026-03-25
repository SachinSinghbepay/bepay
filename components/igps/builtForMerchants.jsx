'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import GetStartedPopup from '@/components/popups/getStartedPopup';

const cards = [
  {
    id: 1,
    title: 'Exporters & Importers',
    description:
      'Get paid faster for your international trade. Receive payments from global buyers without long settlement delays or extra charges.',
    image: '/businessnew/exporters.jpg',
    fallbackBg: 'linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 100%)',
  },
  {
    id: 2,
    title: 'SMEs & Enterprises',
    description:
      'Collect payments from clients across borders easily. Manage all your international receivables from one dashboard.',
    image: '/businessnew/enterprises.jpg',
    fallbackBg: 'linear-gradient(135deg, #1e1e2e 0%, #3a3a5c 100%)',
  },
  {
    id: 3,
    title: 'Service Providers',
    description:
      'Receive overseas client payments in any currency quickly, securely, and without heavy bank fees.',
    image: '/businessnew/service.jpg',
    fallbackBg: 'linear-gradient(135deg, #1a2a1a 0%, #2a4a3a 100%)',
  },
  {
    id: 4,
    title: 'Marketplace Sellers',
    description:
      'Collect payouts from platforms like Amazon or Shopify directly into your account. Withdraw anytime with full visibility.',
    image: '/scrollPage/sp4.webp',
    fallbackBg: 'linear-gradient(135deg, #2a1a1a 0%, #4a2a2a 100%)',
  },
  {
    id: 5,
    title: 'Global Payroll & Workforce Payments',
    description:
      'Pay your international employees, contractors, and remote teams with faster, compliant settlements',
    image: '/businessnew/global-payroll.jpg',
    fallbackBg: 'linear-gradient(135deg, #1a1a2a 0%, #2a2a4a 100%)',
  },
  {
    id: 6,
    title: 'Freelancers & Agencies',
    description:
      'Get paid from clients on platforms like Upwork, Fiverr, and global marketplaces with faster settlements and no hidden deductions.',
    image: '/businessnew/freelance.jpg',
    fallbackBg: 'linear-gradient(135deg, #1a1a2a 0%, #2a2a4a 100%)',
  },
];

const infiniteCards = [...cards, ...cards];

export default function BuiltForMerchants() {
  const scrollRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const isPaused = useRef(false);
  const intervalRef = useRef(null);

  const scrollByOneCard = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-card]')?.offsetWidth ?? 420;
    el.scrollBy({ left: dir === 'left' ? -(cardWidth + 20) : cardWidth + 20, behavior: 'smooth' });
    // Seamless loop reset after smooth scroll settles
    setTimeout(() => {
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft -= el.scrollWidth / 2;
      else if (el.scrollLeft <= 0) el.scrollLeft += el.scrollWidth / 2;
    }, 500);
  };

  // Auto-advance one card every 3s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isPaused.current) scrollByOneCard('right');
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section
      className="w-full bg-[#F9F9F9] py-14 md:py-20 overflow-hidden"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header row */}
      <div className="max-w-[1550px] mx-auto px-6 md:px-10 mb-10 flex items-center justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[28px] md:text-[42px] lg:text-[56px] font-bold leading-tight tracking-tight"
          style={{ color: '#333' }}
        >
          <span style={{ color: '#C0C0C0' }}>Built For </span>
          Global Businesses &amp; Merchants
        </motion.h2>

        {/* Navigation arrows */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0 ml-6">
          <button
            onClick={() => scrollByOneCard('left')}
            aria-label="Scroll left"
            className="w-12 h-12 rounded-xl border border-[#D0D0D0] bg-white flex items-center justify-center transition-all hover:bg-[#F0F0F0]"
          >
            <ChevronLeft size={20} color="#333" strokeWidth={1.8} />
          </button>
          <button
            onClick={() => scrollByOneCard('right')}
            aria-label="Scroll right"
            className="w-12 h-12 rounded-xl border border-[#D0D0D0] bg-white flex items-center justify-center transition-all hover:bg-[#F0F0F0]"
          >
            <ChevronRight size={20} color="#333" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Cards track — card-by-card auto-slide + manual arrows */}
      <div
        ref={scrollRef}
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; }}
        onTouchStart={() => { isPaused.current = true; }}
        onTouchEnd={() => { isPaused.current = false; }}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingLeft: 'max(24px, calc((100vw - 1550px) / 2 + 40px))',
          paddingRight: '40px',
        }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {infiniteCards.map((card, i) => (
          <div
            key={i}
            data-card
            className="relative flex-shrink-0 overflow-hidden cursor-pointer group"
            style={{
              width: 'clamp(260px, 30vw, 420px)',
              height: 'clamp(340px, 42vw, 580px)',
              background: card.fallbackBg,
            }}
          >
            {/* Background image with overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${card.image})` }}
            />
            {/* Dark gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.82) 100%)',
              }}
            />

            {/* Text content at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
              <h3
                className="text-white font-bold text-[20px] md:text-[24px] leading-tight mb-3"
                style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.02em' }}
              >
                {card.title}
              </h3>
              <p
                className="text-white/80 text-[13px] md:text-[14px] leading-relaxed"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile arrows */}
      <div className="flex md:hidden items-center justify-center gap-4 mt-6">
        <button
          onClick={() => scrollByOneCard('left')}
          aria-label="Scroll left"
          className="w-11 h-11 rounded-full border border-[#D0D0D0] bg-white flex items-center justify-center"
        >
          <ChevronLeft size={18} color="#333" strokeWidth={1.8} />
        </button>
        <button
          onClick={() => scrollByOneCard('right')}
          aria-label="Scroll right"
          className="w-11 h-11 rounded-full border border-[#D0D0D0] bg-white flex items-center justify-center"
        >
          <ChevronRight size={18} color="#333" strokeWidth={1.8} />
        </button>
      </div>

      {/* CTA button */}
      <div className="flex justify-center mt-12">
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 bg-[#1A1A1A] text-white text-[14px] font-medium px-8 h-[56px] rounded-full hover:bg-black transition-colors"
          style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.01em', cursor: 'pointer' }}
          onClick={() => setShowPopup(true)}
        >
          Find your solution
          <ArrowUpRight size={18} strokeWidth={1.8} />
        </motion.button>
      </div>

      {showPopup && <GetStartedPopup isOpen={true} onClose={() => setShowPopup(false)} />}
    </section>
  );
}
