"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnalyticsService } from "@/services/analyticsService";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Points for the piecewise linear scale: [percentage, value]
const scalePoints = [
  { p: 0, v: 0 },
  { p: 20, v: 10000 },
  { p: 40, v: 100000 },
  { p: 60, v: 500000 },
  { p: 80, v: 1000000 },
  { p: 100, v: 10000000 }
];

const percentageToValue = (percentage) => {
  if (percentage <= 0) return 0;
  if (percentage >= 100) return 10000000;

  // Find the segment
  const index = scalePoints.findIndex(point => point.p > percentage);
  const upper = scalePoints[index];
  const lower = scalePoints[index - 1];

  // Interpolate
  const ratio = (percentage - lower.p) / (upper.p - lower.p);
  return Math.round(lower.v + ratio * (upper.v - lower.v));
};

const valueToPercentage = (value) => {
  if (value <= 0) return 0;
  if (value >= 10000000) return 100;

  // Find the segment
  const index = scalePoints.findIndex(point => point.v >= value);
  if (index === -1) return 100; // Should not happen if max is correct
  if (index === 0) return 0; // Should not happen if min is 0

  const upper = scalePoints[index];
  const lower = scalePoints[index - 1];

  // Interpolate
  const ratio = (value - lower.v) / (upper.v - lower.v);
  return lower.p + ratio * (upper.p - lower.p);
};

function Calculator() {
  const trackRef = useRef(null);
  const knobRef = useRef(null);

  // State initialization
  const [usd, setUsd] = useState(10000);
  const [sliderValue, setSliderValue] = useState(() => valueToPercentage(10000));

  // Tick marks
  const tickMarks = [
    { value: 0, label: "$0", position: 0 },
    { value: 10000, label: "$10K", position: 0.2 },
    { value: 100000, label: "$100K", position: 0.4 },
    { value: 500000, label: "$500K", position: 0.6 },
    { value: 1000000, label: "$1M", position: 0.8 },
    { value: 10000000, label: "$10M", position: 1 },
  ];



  const [liveRate, setLiveRate] = useState(null);
  const [rateLoading, setRateLoading] = useState(false);
  const [rateError, setRateError] = useState(null); // Added state for error handling

  // for currencies
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState({ code: "USD", name: "US Dollar", logoUrl: "/us_flag.png" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currenciesLoading, setCurrenciesLoading] = useState(false);

  // For final prices
  const [finalAmount, setFinalAmount] = useState(null);
  const [calculationLoading, setCalculationLoading] = useState(false);
  const [cardAmount, setCardAmount] = useState(null);
  const [bankAmount, setBankAmount] = useState(null);
  const [pgAmount, setPgAmount] = useState(null);
  const [lessForCard, setlessForCard] = useState(null);
  const [lessForBank, setlessForBank] = useState(null);
  const [lessForGateway, setlessForGateway] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchRate = async () => {
      setRateLoading(true);
      setRateError(null);
      try {
        const mockRate = 83.50;
        const r = mockRate;
        if (mounted && r) setLiveRate(Number(r));
      } catch (err) {
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

  // calling  currencies API
  useEffect(() => {
    const fetchCurrencies = async () => {
      setCurrenciesLoading(true);
      try {
        const res = await fetch("https://dev.bepay.money/api/forex/currencies");
        const data = await res.json();
        if (data.success && data.data.currencies) {
          setCurrencies(data.data.currencies);
          // Set USD as default if it exists in the list
          const usdCurrency = data.data.currencies.find(c => c.code === "USD");
          if (usdCurrency) {
            setSelectedCurrency(usdCurrency);
          }
        }
      } catch (err) {
        console.error("Failed to fetch currencies", err);
      } finally {
        setCurrenciesLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  // to close the drop down
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.relative')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // for final amounts after currency conversion
  useEffect(() => {
    const calculateAmount = async () => {
      if (!usd || usd === 0) {
        setFinalAmount(null);
        setCardAmount(null);
        setBankAmount(null);
        setPgAmount(null);
        return;
      }

      setCalculationLoading(true);
      try {
        const response = await fetch("https://dev.bepay.money/api/forex/calculate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: selectedCurrency.code,
            to: "INR",
            amount: usd
          })
        });

        const result = await response.json();

        if (result.success && result.data) {
          setFinalAmount(result.data.finalAmount);
          setCardAmount(result.data.comparisons.methods.card.finalAmount);
          setBankAmount(result.data.comparisons.methods.bank.finalAmount);
          setPgAmount(result.data.comparisons.methods.payment_gateway.finalAmount);
          setlessForGateway(result.data.comparisons.methods.payment_gateway.youGetLess);
          setlessForBank(result.data.comparisons.methods.bank.youGetLess);
          setlessForCard(result.data.comparisons.methods.card.youGetLess);
        }
      } catch (error) {
        console.error("Failed to calculate amount:", error);
        setFinalAmount(null);
        setCardAmount(null);
        setBankAmount(null);
        setPgAmount(null);
      } finally {
        setCalculationLoading(false);
      }
    };

    calculateAmount();
  }, [usd, selectedCurrency.code]);




  const getFontSizeForAmount = (value, { mobile = 14.52, desktop = 36 } = {}) => {
    const n = Math.abs(Math.round(Number(value) || 0));
    const digits = String(n).length;
    if (digits <= 3) return `${desktop}px`;
    if (digits <= 6) return `${Math.max(16, Math.round(desktop * 0.8))}px`;
    if (digits <= 9) return `${Math.max(14, Math.round(desktop * 0.55))}px`;
    return `${Math.max(12, Math.round(desktop * 0.45))}px`;
  };



  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 1);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  useEffect(() => {
    AnalyticsService.sendEvent('IGPS Component View', { component: 'TransferCalculator', page: 'igps' });
  }, []);

  // Function to update position and USD value
  const updatePosition = React.useCallback((newSliderValue) => {
    setSliderValue(newSliderValue);
    const newUsd = percentageToValue(newSliderValue);
    setUsd(newUsd);
  }, []);

  // Click handler for tick marks
  const handleTickClick = (tickValue) => {
    setUsd(tickValue);
    setSliderValue(valueToPercentage(tickValue));
  };

  useEffect(() => {
    const track = trackRef.current;
    const knob = knobRef.current;
    if (!track || !knob) return;

    let dragging = false;

    const onKnobPointerDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragging = true;
      knob.setPointerCapture?.(e.pointerId);
    };

    const onTrackClick = (e) => {
      if (e.target === knob || knob.contains(e.target)) return;
      const rect = track.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = clamp((x / rect.width) * 100, 0, 100);
      updatePosition(percentage);
    };

    const onPointerMove = (e) => {
      if (!dragging) return;
      const rect = track.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = clamp((x / rect.width) * 100, 0, 100);
      updatePosition(percentage);
    };

    const onPointerUp = (e) => {
      dragging = false;
      try { knob.releasePointerCapture?.(e.pointerId); } catch (_) { }
    };

    knob.addEventListener("pointerdown", onKnobPointerDown);
    track.addEventListener("click", onTrackClick);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      knob.removeEventListener("pointerdown", onKnobPointerDown);
      track.removeEventListener("click", onTrackClick);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [updatePosition]);


  const onKey = (e) => {
    let newSliderValue = null;
    if (e.key === "ArrowLeft") newSliderValue = clamp(sliderValue - 2, 0, 100);
    if (e.key === "ArrowRight") newSliderValue = clamp(sliderValue + 2, 0, 100);
    if (e.key === "Home") newSliderValue = 0;
    if (e.key === "End") newSliderValue = 100;
    if (newSliderValue !== null) {
      updatePosition(newSliderValue);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
      {/* Top row */}
      <div className="mt-2 w-full bg-[#F6F6F6] rounded-2xl p-4 flex items-center justify-between">
        <div className="flex-1">
          <label className="text-sm text-gray-500">Your client pays</label>
          <div className="mt-2">
            <div className="flex items-center min-w-0">
              <span className="text-3xl font-extrabold mr-2" style={{ lineHeight: 1, verticalAlign: 'middle' }}>$</span>
              <input
                aria-label="Amount in USD"
                type="number"
                min={0}
                max={10000000}
                step={1}
                value={usd}
                onChange={(e) => {
                  const v = Number(e.target.value || 0);
                  const clamped = clamp(v, 0, 10000000);
                  setUsd(clamped);
                  setSliderValue(valueToPercentage(clamped));
                }}
                className="text-3xl font-extrabold bg-transparent outline-none w-auto max-w-full"
                style={{ appearance: "textfield", MozAppearance: "textfield", lineHeight: 1, verticalAlign: 'middle', padding: 0 }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">Range: $0 — $10,000,000</div>
          </div>
        </div>

        <div className="ml-4 relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 bg-[#EEEEEE] rounded-2xl px-4 py-2 shadow-sm hover:bg-gray-200 transition-colors"
          >
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center overflow-hidden">
              <Image
                src={selectedCurrency.logoUrl}
                alt={selectedCurrency.code}
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
            <span className="font-medium text-sm">{selectedCurrency.code}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            >
              <path d="M7 10l5 5 5-5z" fill="currentColor" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
              {currenciesLoading ? (
                <div className="p-4 text-center text-gray-500">Loading...</div>
              ) : currencies.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No currencies available</div>
              ) : (
                currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => {
                      setSelectedCurrency(currency);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${selectedCurrency.code === currency.code ? 'bg-gray-100' : ''
                      }`}
                  >
                    <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center overflow-hidden border border-gray-200">
                      <Image
                        src={currency.logoUrl}
                        alt={currency.code}
                        width={24}
                        height={24}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{currency.code}</div>
                      <div className="text-xs text-gray-500 truncate">{currency.name}</div>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Slider with tick marks */}
      <div className="mt-6">
        <div className="relative">
          {/* Tick marks - now clickable */}
          <div className="relative h-8 mb-2">
            {tickMarks.map((tick, idx) => (
              <div
                key={idx}
                className="absolute transform -translate-x-1/2 cursor-pointer"
                style={{ left: `${tick.position * 100}%` }}
                onClick={() => handleTickClick(tick.value)}
              >
                <div className="w-0.5 h-3 bg-gray-400 mx-auto"></div>
                <div className="text-xs text-gray-600 mt-1 whitespace-nowrap hover:text-black transition-colors">
                  {tick.label}
                </div>
              </div>
            ))}
          </div>

          {/* Slider track - now clickable */}
          <div
            ref={trackRef}
            className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
            style={{ touchAction: "none" }}
          >
            <div className="absolute left-0 top-0 bottom-0 bg-gray-300 rounded-full pointer-events-none" style={{ width: `${(sliderValue / 100) * 100}%` }} />

            {/* Knob */}
            <div
              ref={knobRef}
              role="slider"
              tabIndex={0}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderValue)}
              onKeyDown={onKey}
              className="absolute w-7 h-7 bg-black rounded-sm shadow-md cursor-grab active:cursor-grabbing border-2 border-white"
              style={{ left: `calc(${(sliderValue / 100) * 100}% - 14px)`, top: "50%", transform: "translateY(-50%)" }}
            />
          </div>
        </div>
      </div>

      {/* Payment method image */}
      <div className="mt-6">
        <Image src="/t1.png" alt="Payment method" width={700} height={100} className="w-full rounded-lg object-cover" />
      </div>

      {/* Receive summary card */}
      <div className="mt-6 flex justify-center">
        <div className="w-full bg-white border border-gray-100 rounded-xl py-4 px-5 text-left shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/bepayicon.png" alt="bepay" width={28} height={28} className="object-contain" />
              <div className="text-sm font-semibold">bepay IGPS</div>
              <div className="ml-3 inline-flex items-center gap-2 bg-gray-100 text-xs text-gray-700 rounded-full px-3 py-1">
                <svg width="12" height="12" viewBox="0 0 24 24" className="text-yellow-500"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="currentColor" /></svg>
                <span>Within 24 hrs</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Image src="/india_flag.png" alt="INR" width={28} height={28} className="rounded-full" />
              <div className="text-sm font-semibold">INR</div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            You&apos;ll receive <span className="text-xs text-gray-400">(By {formattedDelivery})</span>
          </div>

          <div className="mt-2 font-extrabold" style={{ lineHeight: 1 }}>
            {calculationLoading ? (
              <div className="text-gray-400 text-lg">Calculating...</div>
            ) : finalAmount ? (
              (() => {
                const display = `₹${Math.round(finalAmount).toLocaleString('en-IN')}`;
                const fontSize = getFontSizeForAmount(finalAmount, { mobile: 14.52, desktop: 36 });
                return (
                  <div style={{ fontSize, whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%' }}>
                    {display}
                  </div>
                );
              })()
            ) : (
              <div className="text-gray-400 text-lg">Enter amount</div>
            )}
          </div>

          <div className="mt-3 text-sm text-green-600 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" className="text-green-600"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="font-medium">Best rate guaranteed!</span>
          </div>
        </div>
      </div>

      {/* Other methods panel */}
      <div className="grid grid-cols-3 gap-0 rounded-lg overflow-hidden">
        {/* Card/IGPS */}
        <div className="flex flex-col items-center justify-center p-6 text-center min-h-[120px]">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Image src="/icons/cards.png" alt="Card/IGPS" width={32} height={32} className="object-contain" />
            <div className="text-[8px] md:text-sm font-medium" style={{ fontFamily: 'Montserrat', fontWeight: 600, lineHeight: '100%', letterSpacing: '0em' }}>Card</div>
          </div>

          <div className="receive-amount" style={{ color: '#080808', whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%' }}>
            {calculationLoading ? (
              <div className="text-gray-400 text-lg">Calculating...</div>
            ) : cardAmount ? (
              (() => {
                const display = `₹${Math.round(cardAmount).toLocaleString('en-IN')}`;
                const fontSize = getFontSizeForAmount(cardAmount, { mobile: 14.52, desktop: 36 });
                return (
                  <div style={{ fontSize, whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%' }}>
                    {display}
                  </div>
                );
              })()
            ) : (
              <div className="text-gray-400 text-lg">Enter amount</div>
            )}
          </div>

          <div className="mt-2 text-red-600 text-[9.68px] md:text-sm whitespace-nowrap" style={{ fontFamily: 'Montserrat', fontWeight: 600, lineHeight: '100%', letterSpacing: '-0.02em' }}>
            {calculationLoading ? (
              "Calculating..."
            ) : lessForCard !== null && lessForCard !== undefined ? (
              `₹${lessForCard} less`
            ) : (
              "Can't Calculate"
            )}
          </div>
        </div>

        {/* Bank Transfer */}
        <div className="flex flex-col items-center justify-center p-6 text-center min-h-[120px] border-l border-gray-200">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Image src="/bank.png" alt="Bank Transfer" width={32} height={32} className="object-contain" />
            <div className="text-[8px] md:text-sm font-medium" style={{ fontFamily: 'Montserrat', fontWeight: 600, lineHeight: '100%', letterSpacing: '0em' }}>Bank Transfer</div>
          </div>

          <div className="receive-amount" style={{ color: '#080808', whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%' }}>
            {calculationLoading ? (
              <div className="text-gray-400 text-lg">Calculating...</div>
            ) : bankAmount ? (
              (() => {
                const display = `₹${Math.round(bankAmount).toLocaleString('en-IN')}`;
                const fontSize = getFontSizeForAmount(bankAmount, { mobile: 14.52, desktop: 36 });
                return (
                  <div style={{ fontSize, whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%' }}>
                    {display}
                  </div>
                );
              })()
            ) : (
              <div className="text-gray-400 text-lg">Enter amount</div>
            )}
          </div>

          <div className="mt-2 text-red-600 text-[9.68px] md:text-sm whitespace-nowrap" style={{ fontFamily: 'Montserrat', fontWeight: 600, lineHeight: '100%', letterSpacing: '-0.02em' }}>
            {calculationLoading ? (
              "Calculating..."
            ) : lessForBank !== null && lessForBank !== undefined ? (
              `₹${lessForBank} less`
            ) : (
              "Can't Calculate"
            )}
          </div>
        </div>

        {/* Payment Gateway */}
        <div className="flex flex-col items-center justify-center p-6 text-center min-h-[120px] border-l border-gray-200">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Image src="/pg.png" alt="Payment Gateway" width={32} height={32} className="object-contain" />
            <div className="text-[8px] md:text-sm font-medium" style={{ fontFamily: 'Montserrat', fontWeight: 600, lineHeight: '100%', letterSpacing: '0em' }}>Payment Gateway</div>
          </div>

          <div className="receive-amount" style={{ color: '#080808', whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%' }}>
            {calculationLoading ? (
              <div className="text-gray-400 text-lg">Calculating...</div>
            ) : pgAmount ? (
              (() => {
                const display = `₹${Math.round(pgAmount).toLocaleString('en-IN')}`;
                const fontSize = getFontSizeForAmount(pgAmount, { mobile: 14.52, desktop: 36 });
                return (
                  <div style={{ fontSize, whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%' }}>
                    {display}
                  </div>
                );
              })()
            ) : (
              <div className="text-gray-400 text-lg">Enter amount</div>
            )}
          </div>

          <div className="mt-2 text-red-600 text-[9.68px] md:text-sm whitespace-nowrap" style={{ fontFamily: 'Montserrat', fontWeight: 600, lineHeight: '100%', letterSpacing: '-0.02em' }}>
            {calculationLoading ? (
              "Calculating..."
            ) : lessForGateway !== null && lessForGateway !== undefined ? (
              `₹${lessForGateway} less`
            ) : (
              "Can't Calculate"
            )}
          </div>
        </div>
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

        .receive-amount {
          font-family: 'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          font-weight: 700;
          font-style: normal;
          font-size: 14.52px;
          line-height: 100%;
          letter-spacing: 0;
          leading-trim: cap-height;
        }

        @media (min-width: 768px) {
          .receive-amount {
            font-size: 36px;
          }
        }
      `}</style>

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