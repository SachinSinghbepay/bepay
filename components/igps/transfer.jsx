"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnalyticsService } from "@/services/analyticsService";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function Calculator() {
  const minUsd = 0;
  const maxUsd = 2000; // slider maps to this USD range
  const [usd, setUsd] = useState(1000);
  const [pos, setPos] = useState(() =>
    clamp((1000 - minUsd) / (maxUsd - minUsd), 0, 1)
  ); // 0..1 slider position
  const trackRef = useRef(null);
  const knobRef = useRef(null);

  // Base FX rate and method multipliers (approx from design)
  const baseRate = 89.5569;
  const methods = [
    {
      key: "igps",
      label: "bepay IGPS",
      multiplier: 1.0,
      note: "You save 1-9%",
    },
    { key: "bank", label: "Banks", multiplier: 0.99, note: "You lose ~1%" },
    {
      key: "gateway",
      label: "Payment Gateway",
      multiplier: 0.915,
      note: "You lose ~8.8%",
    },
  ];

  // Interpolate multiplier across whole range, splitting between segments
  const computeMultiplier = (t) => {
    if (t <= 0.5) {
      // between igps (0) and bank (0.5)
      const u = t / 0.5;
      return methods[0].multiplier * (1 - u) + methods[1].multiplier * u;
    }
    // between bank (0.5) and gateway (1)
    const u = (t - 0.5) / 0.5;
    return methods[1].multiplier * (1 - u) + methods[2].multiplier * u;
  };

  const multiplier = computeMultiplier(pos);
  const converted = Math.round(usd * baseRate * multiplier);
  const baseConverted = Math.round(usd * baseRate);

  // determine nearest method for display highlights
  const nearestMethod = () => {
    if (pos <= 0.33) return 0;
    if (pos <= 0.66) return 1;
    return 2;
  };

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
      // update USD amount to match slider position
      const newUsd = Math.round(minUsd + t * (maxUsd - minUsd));
      setUsd(newUsd);
    };
    const onPointerUp = (e) => {
      dragging = false;
      try {
        track.releasePointerCapture?.(e.pointerId);
      } catch (_) {}
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

  useEffect(() => {
    AnalyticsService.sendEvent('IGPS Component View', { component: 'TransferCalculator', page: 'igps' });
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
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
      {/* Top row: rounded input with $ and currency selector (matches screenshot) */}
      <div className="mt-2 w-full bg-gray-100 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex-1">
          <label className="text-sm text-gray-500">Your client pays</label>
          <div className="mt-2 flex items-center">
            <span className="text-3xl font-extrabold mr-2">$</span>
            <input
              aria-label="Amount in USD"
              type="number"
              value={usd}
              onChange={(e) => {
                const v = Number(e.target.value || 0);
                const clamped = clamp(v, minUsd, maxUsd);
                setUsd(clamped);
                setPos(clamp((clamped - minUsd) / (maxUsd - minUsd), 0, 1));
              }}
              className="text-3xl font-extrabold bg-transparent outline-none w-28"
              style={{ appearance: "textfield", MozAppearance: "textfield" }}
            />
          </div>
        </div>

        <div className="ml-4">
          <button className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 shadow-sm">
            <img
              src="/us-flag.png"
              alt="USD"
              className="w-6 h-6 rounded-full"
            />
            <span className="font-medium">USD</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="text-gray-500"
            >
              <path d="M7 10l5 5 5-5z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="mt-6">
        <div
          ref={trackRef}
          className="relative h-2 bg-gray-100 rounded-full"
          style={{ touchAction: "none" }}
        >
          {/* subtle left fill */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-gray-200 rounded-full"
            style={{ width: `${pos * 100}%` }}
          />
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
            style={{
              left: `calc(${pos * 100}% - 14px)`,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        </div>
      </div>

      {/* Payment method */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center border">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                d="M3 11l9-6 9 6v7a1 1 0 0 1-1 1h-4v-6h-8v6h-4a1 1 0 0 1-1-1v-7z"
                fill="#111827"
              />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">Payment method</div>
            <div className="text-lg font-semibold">Bank transfer</div>
          </div>
        </div>
        <div className="text-gray-400">▾</div>
      </div>

      {/* Rate box */}
      <div className="mt-6 flex justify-center">
        <div className="w-full bg-yellow-50 border border-yellow-100 rounded-xl py-3 px-4 text-center">
          <div className="text-lg font-semibold">
            1 USD = {baseRate.toFixed(4)} INR
          </div>
          <div className="mt-2 text-sm text-gray-600 flex items-center justify-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
            <span>Live FX rate</span>
            <span className="text-red-500">(0 Margin)</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="text-gray-400"
            >
              <path
                d="M12 8v5l4 2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Receive card: replaced with image asset. Save `receive-panel.png` in public/ to use it. */}
      <div className="mt-6">
        <img
          src="/receive-panel.png"
          alt="You'll receive"
          className="w-full rounded-xl shadow-sm"
        />
      </div>
    </div>
  );
}

const App = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 bg-gray-50 font-sans">
      <style>{`
        @media (min-width: 768px) {
          .responsive-heading span {
            font-size: 123.76px !important;
            line-height: 91px !important;
            letter-spacing: -0.02em !important;
          }
        }
      `}</style>
      
      {/* IGPS SAVINGS CALCULATOR Heading */}
      <h1
        className="responsive-heading text-center mt-12 mb-8 select-none"
        style={{
          fontFamily: "Montserrat",
          fontWeight: 600, // SemiBold
          textTransform: "uppercase",
        }}
      >
        <span 
          className="block"
          style={{
            fontSize: "41.41px",
            lineHeight: "34px",
            letterSpacing: "-0.06em"
          }}
        >
          <span className="text-[#C0C0C0] opacity-90">IGPS </span>
          <span className="text-[#0E7630]">SAVINGS </span>
        </span>
        <span 
          className="block"
          style={{
            fontSize: "41.41px",
            lineHeight: "34px",
            letterSpacing: "-0.06em"
          }}
        >
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