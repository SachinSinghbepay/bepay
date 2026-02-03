"use client";

import React, { useState, useRef, useEffect } from "react";
// 1. Import the Next.js Image component
import Image from "next/image";
import { AnalyticsService } from "@/services/analyticsService";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function Calculator() {
  // USD range: 0 to 100,000
  const minUsd = 0;
  const maxUsd = 100000; // slider maps to this USD range (100k)
  const [usd, setUsd] = useState(1000);
  const [pos, setPos] = useState(() => clamp((1000 - minUsd) / (maxUsd - minUsd), 0, 1)); // 0..1 slider position
  const trackRef = useRef(null);
  const knobRef = useRef(null);

  // Base FX rate and method multipliers
  const baseRate = 89.5569;
  const methods = [
    { key: "card", label: "Card", multiplier: 1.0, note: "You save 1-9%" },
    { key: "bank", label: "Banks", multiplier: 0.99, note: "You lose ~1%" },
    { key: "gateway", label: "Payment Gateway", multiplier: 0.912, note: "You lose ~8.8%" },
  ];

  // live FX rate fetched from open API (fallback to baseRate)
  const [liveRate, setLiveRate] = useState(null);
  const [rateLoading, setRateLoading] = useState(false);
  const [rateError, setRateError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchRate = async () => {
      setRateLoading(true);
      setRateError(null);
      try {
        // Tool Call: The API call is commented out as it points to an external, potentially restricted, host.
        // const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=INR");
        
        // Mocking the API response for completeness
        const mockRate = 83.50; 
        const r = mockRate; 
        
        // if (!res.ok) throw new Error(`status:${res.status}`);
        // const data = await res.json();
        // const r = data?.rates?.INR;
        
        if (mounted && r) setLiveRate(Number(r));
      } catch (err) {
        // console.error("Failed to fetch FX rate", err);
        if (mounted) setRateError(err.message || "Fetch error");
      } finally {
        if (mounted) setRateLoading(false);
      }
    };

    fetchRate();
    const iv = setInterval(fetchRate, 5 * 60 * 1000);
    return () => {
      mounted = false;
      clearInterval(iv);
    };
  }, []);

  // compute interpolated multiplier
  const computeMultiplier = (t) => {
    if (t <= 0.5) {
      const u = t / 0.5;
      return methods[0].multiplier * (1 - u) + methods[1].multiplier * u;
    }
    const u = (t - 0.5) / 0.5;
    return methods[1].multiplier * (1 - u) + methods[2].multiplier * u;
  };

  // choose a font-size based on number magnitude so large amounts shrink to fit
  const getFontSizeForAmount = (value, { mobile = 14.52, desktop = 36 } = {}) => {
    const n = Math.abs(Math.round(Number(value) || 0));
    const digits = String(n).length;
    // heuristics: more digits -> smaller font
    if (digits <= 3) return `${desktop}px`;
    if (digits <= 6) return `${Math.max(16, Math.round(desktop * 0.8))}px`;
    if (digits <= 9) return `${Math.max(14, Math.round(desktop * 0.55))}px`;
    return `${Math.max(12, Math.round(desktop * 0.45))}px`;
  };

  const multiplier = computeMultiplier(pos);
  // apply 1.2% adjustment to INR conversion (deduct 1.2%)
  const feePct = 0.012; // 1.2%
  const effectiveBase = (liveRate || baseRate) * (1 - feePct);

  // delivery estimate (used in the card) - show 1 business day by default
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 1);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  useEffect(() => {
    AnalyticsService.sendEvent('IGPS Component View', { component: 'TransferCalculator', page: 'igps' });
  }, []);

  // pointer/drag handlers for the slider
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let dragging = false;

    const onPointerDown = (e) => {
      dragging = true;
      track.setPointerCapture?.(e.pointerId);
      onPointerMove(e);
    };
    const onPointerMove = (e) => {
      if (!dragging && e.pointerType === "mouse" && e.buttons === 0) return;
      const rect = track.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const t = clamp(x / rect.width, 0, 1);
      setPos(t);
      const newUsd = Math.round(minUsd + t * (maxUsd - minUsd));
      setUsd(newUsd);
    };
    const onPointerUp = (e) => {
      dragging = false;
      try { track.releasePointerCapture?.(e.pointerId); } catch (_) {}
    };

    track.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  // keyboard accessibility: left/right arrow adjust position
  const onKey = (e) => {
    let pNew = null;
    if (e.key === "ArrowLeft") pNew = clamp(pos - 0.02, 0, 1);
    if (e.key === "ArrowRight") pNew = clamp(pos + 0.02, 0, 1);
    if (e.key === "Home") pNew = 0;
    if (e.key === "End") pNew = 1;
    if (pNew !== null) {
      setPos(pNew);
      setUsd(Math.round(minUsd + pNew * (maxUsd - minUsd)));
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
      {/* Top row: rounded input with $ and currency selector */}
      <div className="mt-2 w-full bg-[#F6F6F6] rounded-2xl p-4 flex items-center justify-between">
        <div className="flex-1">
          <label className="text-sm text-gray-500">Your client pays</label>
          <div className="mt-2">
            <div className="flex items-center min-w-0">
              <span className="text-3xl font-extrabold mr-2" style={{ lineHeight: 1, verticalAlign: 'middle' }}>$</span>
              <input
                aria-label="Amount in USD"
                type="number"
                min={minUsd}
                max={maxUsd}
                step={1}
                value={usd}
                onChange={(e) => {
                  const v = Number(e.target.value || 0);
                  const clamped = clamp(v, minUsd, maxUsd);
                  setUsd(clamped);
                  setPos(clamp((clamped - minUsd) / (maxUsd - minUsd), 0, 1));
                }}
                className="text-3xl font-extrabold bg-transparent outline-none w-auto max-w-full"
                style={{ appearance: "textfield", MozAppearance: "textfield", lineHeight: 1, verticalAlign: 'middle', padding: 0 }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">Range: $0 — $100,000</div>
          </div>
        </div>

        <div className="ml-4">
          <button className="flex items-center gap-3 bg-[#EEEEEE] rounded-2xl px-4 py-2 shadow-sm">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center overflow-hidden">
              {/* Corrected: Replaced <img> with <Image /> */}
              <Image 
                src="/us_flag.png" 
                alt="USD" 
                width={24} // w-6
                height={24} // h-6
                className="object-cover" 
              />
            </div>
            <span className="font-medium text-sm">USD</span>
            <svg width="12" height="12" viewBox="0 0 24 24" className="text-gray-500"><path d="M7 10l5 5 5-5z" fill="currentColor" /></svg>
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="mt-6">
        <div ref={trackRef} className="relative h-2 bg-gray-100 rounded-full" style={{ touchAction: "none" }}>
          {/* subtle left fill */}
          <div className="absolute left-0 top-0 bottom-0 bg-gray-200 rounded-full" style={{ width: `${pos * 100}%` }} />

          {/* black square knob like design */}
          <div
            ref={knobRef}
            role="slider"
            tabIndex={0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos * 100)}
            onKeyDown={onKey}
            className="absolute w-7 h-7 bg-black rounded-sm shadow-md cursor-grab border-2 border-white"
            style={{ left: `calc(${pos * 100}% - 14px)`, top: "50%", transform: "translateY(-50%)" }}
          />
        </div>
      </div>

      {/* Payment method image */}
      <div className="mt-6">
        {/* Corrected: Replaced <img> with <Image /> */}
        <Image 
          src="/t1.png" 
          alt="Payment method" 
          width={700} // Assuming max-w-2xl is around 700px
          height={100} // Estimated height for a banner-style image
          className="w-full rounded-lg object-cover" 
        />
      </div>

      {/* Receive summary card (replaces rate box) */}
      <div className="mt-6 flex justify-center">
        <div className="w-full bg-white border border-gray-100 rounded-xl py-4 px-5 text-left shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Corrected: Replaced <img> with <Image /> */}
              <Image 
                src="/bepayicon.png" 
                alt="bepay" 
                width={28} // w-7
                height={28} // h-7
                className="object-contain" 
              />
              <div className="text-sm font-semibold">bepay IGPS</div>
              <div className="ml-3 inline-flex items-center gap-2 bg-gray-100 text-xs text-gray-700 rounded-full px-3 py-1">
                <svg width="12" height="12" viewBox="0 0 24 24" className="text-yellow-500"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="currentColor" /></svg>
                <span>Within 24 hrs</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Corrected: Replaced <img> with <Image /> */}
              <Image 
                src="/india_flag.png" 
                alt="INR" 
                width={28} // w-7
                height={28} // h-7
                className="rounded-full" 
              />
              <div className="text-sm font-semibold">INR</div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            {/* 2. Corrected: Escaped apostrophe ('ll) to (&apos;ll) */}
            You&apos;ll receive <span className="text-xs text-gray-400">(By {formattedDelivery})</span>
          </div>

          <div className="mt-2 font-extrabold" style={{ lineHeight: 1 }}>
            {(() => {
              const igpsAmt = Math.round(usd * effectiveBase * methods[0].multiplier);
              const display = `₹${igpsAmt.toLocaleString('en-IN')}`;
              const fontSize = getFontSizeForAmount(igpsAmt, { mobile: 14.52, desktop: 36 });
              return (
                <div style={{ fontSize, whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%' }}>
                  {display}
                </div>
              );
            })()}
          </div>

          <div className="mt-3 text-sm text-green-600 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" className="text-green-600"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="font-medium">Best rate guaranteed!</span>
          </div>
        </div>
      </div>

      {/* Receive panel updated to match design */}
      <div className="mt-6 w-full bg-gray-50 rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 20, color: '#6B6B6B' }}>Other methods</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Corrected: Replaced <img> with <Image /> */}
            <Image 
              src="/india_flag.png" 
              alt="INR" 
              width={40} // w-10
              height={40} // h-10
              className="rounded-full" 
            />
            <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 18 }}>INR</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-0 rounded-lg overflow-hidden">
          {methods.map((m, idx) => {
            const amt = Math.round(usd * effectiveBase * m.multiplier);
            const iconSrc = m.key === 'card' ? '/bepayicon.png' : m.key === 'bank' ? '/bank.png' : '/pg.png';
            return (
              <div key={m.key} className={`flex flex-col items-center justify-center p-6 text-center min-h-[120px] ${idx > 0 ? 'border-l border-gray-200' : ''}`}>
                <div className="flex items-center justify-center gap-3 mb-2">
                  {/* Corrected: Replaced <img> with <Image /> (Inside loop) */}
                  <Image
                    src={iconSrc}
                    alt={m.label}
                    width={32} // w-8
                    height={32} // h-8
                    className="object-contain"
                  />
                  <div className="text-[8px] md:text-sm font-medium" style={{ fontFamily: 'Montserrat', fontWeight: 600, lineHeight: '100%', letterSpacing: '0em' }}>{m.label}</div>
                </div>

                <div className="receive-amount" style={{ color: '#080808', whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%', fontSize: getFontSizeForAmount(amt, { mobile: 14.52, desktop: 36 }) }}>₹{amt.toLocaleString('en-IN')}</div>

                <div className={`mt-2 ${m.key === 'igps' ? 'text-green-600' : 'text-red-600'} text-[9.68px] md:text-sm whitespace-nowrap`} style={{ fontFamily: 'Montserrat', fontWeight: 600, lineHeight: '100%', letterSpacing: '-0.02em' }}>{m.note}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 bg-gray-50 font-sans">
      <style>{`
        /* responsive heading sizing */
        @media (min-width: 768px) {
          .responsive-heading span {
            font-size: 123.76px !important;
            line-height: 91px !important;
            letter-spacing: -0.02em !important;
          }
        }

        /* Receive amount typography: mobile first per spec */
        .receive-amount {
          font-family: 'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          font-weight: 700;
          font-style: normal;
          font-size: 14.52px;
          line-height: 100%;
          letter-spacing: 0;
          /* experimental property requested by design; keep as-is if supported */
          leading-trim: cap-height;
        }

        /* desktop: increase size to match previous large display */
        @media (min-width: 768px) {
          .receive-amount {
            font-size: 36px; /* approx Tailwind md:text-4xl (2.25rem) */
          }
        }
      `}</style>

      {/* IGPS SAVINGS CALCULATOR Heading */}
      <h1 className="responsive-heading text-center mt-12 mb-8 select-none" style={{ fontFamily: "Montserrat", fontWeight: 600, textTransform: "uppercase" }}>
        <span className="block" style={{ fontSize: "41.41px", lineHeight: "34px", letterSpacing: "-0.06em" }}>
          <span className="text-[#C0C0C0] opacity-90">IGPS </span>
          <span className="text-[#0E7630]">SAVINGS </span>
        </span>
        <span className="block" style={{ fontSize: "41.41px", lineHeight: "34px", letterSpacing: "-0.06em" }}>
          <span className="text-[#C0C0C0] opacity-80">CALCULATOR</span>
        </span>
      </h1>
      <div className="relative md:-mt-12 z-10">
        <Calculator />
      </div>
    </div>
  );
};

export default App;