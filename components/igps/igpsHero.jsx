"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AnalyticsService } from "@/services/analyticsService"
import GetStartedPopup from "@/components/popups/getStartedPopup"

const IgpsHero = () => {
  const sectionRef = useRef(null)
  const [hasTrackedView, setHasTrackedView] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [itemsInView, setItemsInView] = useState([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("IGPS Hero section viewed")
          setHasTrackedView(true)
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    const currentRef = sectionRef.current
    if (currentRef) observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [hasTrackedView])

  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setItemsInView((prev) => {
        if (prev.length < 7) {
          return [...prev, prev.length]
        }
        clearInterval(timer)
        return prev
      })
    }, 100)

    return () => clearInterval(timer)
  }, [isVisible])

  const handleOpenPopup = (type, eventName) => {
    try {
      if (eventName) {
        AnalyticsService.sendEvent(eventName, {
          component: "IgpsHero",
          popup: type,
        })
      } else {
        AnalyticsService.sendEvent("IGPS popup opened", {
          component: "IgpsHero",
          popup: type,
        })
      }
    } catch (e) { }
    setPopup(type)
  }

  const handleGetStarted = () => window.location.href = process.env.NEXT_PUBLIC_IGPS_URL

  const [popup, setPopup] = useState(null)
  const pillRef = useRef(null)
  const textRef = useRef(null)
  const iconRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    function adjustWidth() {
      if (!popup) return
      if (!pillRef.current || !textRef.current || !iconRef.current) return

      if (window.innerWidth <= 480) {
        ; (pillRef.current).style.width = ""
        return
      }

      const textW = Math.ceil(textRef.current.getBoundingClientRect().width || 0)
      const iconW = Math.ceil(iconRef.current.getBoundingClientRect().width || 0)
      const gap = 12
      const contentW = textW + iconW + gap

      const cs = window.getComputedStyle(pillRef.current)
      const padLeft = Number.parseFloat(cs.paddingLeft) || 0
      const padRight = Number.parseFloat(cs.paddingRight) || 0

      let totalTarget = Math.ceil(contentW * 1.2 + padLeft + padRight)
      const vw90 = Math.floor(window.innerWidth * 0.9)
      const maxAllowed = Math.max(vw90 - 40, 200)

      if (totalTarget > maxAllowed) totalTarget = maxAllowed
        ; (pillRef.current).style.width = `${totalTarget}px`
    }

    if (popup) {
      requestAnimationFrame(adjustWidth)
      window.addEventListener("resize", adjustWidth)
    }

    return () => window.removeEventListener("resize", adjustWidth)
  }, [popup])

  const checklistItems = [
       {
      icon: "/icons/h2.png",
      text: "Accept payments in USD, EUR, GBP, CNY, ZAR, MAD  & 40+ Major Currencies",
    },
    {
      icon: "/icons/h3.png",
      text: "Accept payments from US, UK, Europe, Africa, China, UAE & 100+ Countries supported!",
    },
    {
      icon: "/icons/h4.png",
      text: "Instant e-FIRA & e-BRC",
    },
    {
      icon: "/icons/h5.png",
      text: "Multi-currency Bank Account",
    },
    {
      icon: "/icons/h6.png",
      text: "Quick KYB Approval",
    },
    {
      icon: "/icons/h7.png",
      text: "24/7 Merchant Support",
    },
  ]

  return (
    <section ref={sectionRef} className="bg-[#F9F9F9] text-black pt-12 pb-16 md:pt-4 md:pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div
          className={`text-center mb-4 md:mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <h1
            className="text-gray-800 text-[26px] md:text-[44px]"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 500,
              lineHeight: "100%",
              letterSpacing: "-0.1em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "#C0C0C0" }}>MOVE</span>
            <span style={{ color: "#6A6A6A" }}> MONEY</span>
            <span style={{ color: "#333333" }}> GLOBALLY</span>
          </h1>

          <p
            className="text-gray-600 mt-2 text-center igps-subheading"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: "13px",
              lineHeight: "15px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            ACCEPT INTERNATIONAL PAYMENTS WITH EASE
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 justify-center">
          <div
            className={`lg:w-auto w-full flex flex-col transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
          >
            <div className="relative w-full max-w-[28rem] mx-auto lg:mx-0 pb-6">
              {/* Main Video Card */}
              <div className="relative w-full aspect-[4/5] rounded-[52px] overflow-hidden shadow-lg border border-gray-100 bg-white">
                <video
                  src="https://assets.bepay.money/website_assets/merchant_video.mp4"
                  poster="/merchant-video-poster.webp"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Bottom Image */}
              {/* <div className="absolute -bottom-1 lg:-bottom-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[85%] lg:w-[105%] z-10">
                <div className="relative shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-t-2xl md:rounded-t-none rounded-b-[32px] md:rounded-[52px] overflow-hidden">
                  <Image
                    src="/landingimg.png"
                    alt="IGPS Rates"
                    width={600}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
              </div> */}
            </div>
          </div>

          <div
            className={`flex-1 w-full max-w-[32rem] lg:max-w-[35rem] lg:pl-0 flex flex-col justify-between transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
          >
            <div className="flex flex-col h-full justify-between py-3">
              <div className="w-full">
                {/* <p className="igps-intro text-left mb-4">
                  Global first platform offering free <br className="hidden lg:block" />
                  international settlements for businesses
                </p> */}

                <div className="space-y-4 lg:space-y-0 lg:block lg:divide-y lg:divide-gray-200 sm:py-6">
                  {checklistItems.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between lg:py-3 transition-all duration-500 ${itemsInView.includes(idx) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        }`}
                      style={{
                        transitionDelay: `${idx * 40}ms`,
                      }}
                    >
                      <div className="flex items-center flex-1">
                        <Image src={item.icon || "/placeholder.svg"} alt="icon" width={20} height={20} />
                        <p className="igps-check-text ml-3 w-full">{item.text}</p>
                      </div>
                      <svg
                        className="hidden lg:block transition-all duration-300"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="#16A34A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 sm: mt-0">
                <div
                  className={`pl-3 border-l-2 border-gray-400 transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <p
                    className="text-[11px] md:text-sm text-gray-500"
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      textTransform: "uppercase",
                    }}
                  >
                    100% SAFE AND COMPLIANT • POWERED BY LEADING BANKS •
                    <span className="hidden lg:inline">
                      {" "}
                      <br />
                    </span>{" "}
                    RBI APPROVED • PA-CB AUTHORISED • MADE IN INDIA
                  </p>
                </div>

                <div className="flex items-center mt-4 space-x-[12px]">
                  <button
                    onClick={handleGetStarted}
                    className={`flex items-center cursor-pointer justify-center gap-2 bg-black text-[#F9F9F9] px-8 py-4 h-[56px] rounded-full text-xs font-medium md:text-[14px] md:h-[66px] transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                  >
                    <span>Get started</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-7 flex-shrink-0 transition-transform group-hover:translate-x-1"
                    >
                      <path d="M7 17l10-10M7 7h10v10" />
                    </svg>
                  </button>

                  <Button
                    variant="outline"
                    onClick={() => handleOpenPopup("email", "IGPS Email Clicked")}
                    className={`rounded-full w-[56px] h-[56px] p-3 md:w-[66px] md:h-[66px] bg-gray-100 border-0 transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                  >
                    <Image src="/icons/mail.png" alt="mail icon" width={26} height={26} className="opacity-60" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {
        popup && popup !== "getstarted" && (
          <div className="igps-popup-overlay" onClick={() => setPopup(null)}>
            <div className="igps-popup" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
              <button className="igps-popup-close" onClick={() => setPopup(null)} aria-label="Close popup">
                ×
              </button>
              <div className="igps-popup-content">
                <h3 className="igps-popup-title">
                  {popup === "email" && "Leave us a message on email and we'll get back\nto you within 24 hours"}
                </h3>
                <div className="igps-popup-contact">
                  <div className="igps-contact-pill" ref={pillRef}>
                    <span className="igps-contact-text" ref={textRef}>
                      {popup === "email" ? "info@bepay.money" : "+918-200-000-000"}
                    </span>
                    <button
                      className="igps-pill-copy"
                      ref={iconRef}
                      onClick={() => {
                        const text = popup === "email" ? "info@bepay.money" : "+918-200-000-000"
                        try {
                          AnalyticsService.sendEvent("IGPS Copy Contact Clicked", {
                            component: "IgpsHero",
                            method: popup,
                            value: text,
                          })
                        } catch (e) { }
                        if (navigator && navigator.clipboard) {
                          navigator.clipboard.writeText(text)
                          setCopied(true)
                          setTimeout(() => setCopied(false), 2000)
                        }
                      }}
                      aria-label="Copy contact"
                    >
                      {copied ? (
                        <span className="text-[10px] text-green-600 font-bold uppercase transition-all duration-300">Copied!</span>
                      ) : (
                        <svg
                          width="17.35"
                          height="19.66"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <rect
                            x="3"
                            y="2"
                            width="11"
                            height="12"
                            rx="2"
                            fill="none"
                            stroke="#6A6A6A"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeOpacity="0.32"
                          />
                          <rect
                            x="6"
                            y="6"
                            width="11"
                            height="12"
                            rx="2"
                            fill="none"
                            stroke="#6A6A6A"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <button
                  className="igps-action-btn"
                  onClick={() => {
                    try {
                      const action = "open_email"
                      AnalyticsService.sendEvent("IGPS Popup Action", {
                        component: "IgpsHero",
                        popup,
                        action,
                      })
                    } catch (e) { }
                    window.location.href = "mailto:info@bepay.money"
                  }}
                >
                  Open email
                </button>
              </div>
            </div>
          </div>
        )
      }

      {popup === "getstarted" && <GetStartedPopup isOpen={true} onClose={() => setPopup(null)} />}

      <style jsx>{`
        @media (max-width: 1023px) {
          .igps-pointer-text {
            font-family: "Montserrat", sans-serif;
            font-weight: 600;
            font-style: normal;
            font-size: 12px;
            leading-trim: cap-height;
            line-height: 16px;
            letter-spacing: -2%;
            margin-left: 1.25rem;
          }
          .igps-subheading {
            font-family: "Montserrat", sans-serif;
            font-weight: 600;
            font-style: normal;
            font-size: 14px;
            leading-trim: cap-height;
            line-height: 16px;
            letter-spacing: 0.08em;
            text-align: center;
            text-transform: uppercase;
            color: #080808;
          }
          .igps-check-text {
            font-size: 14px;
            line-height: 16px;
          }
        }
        .igps-check-text {
          font-family: "Montserrat", sans-serif;
          font-weight: 600;
          font-style: normal;
          color: #080808;
          leading-trim: cap-height;
          line-height: 20px;
          letter-spacing: -0.02em;
          text-align: left;
        }
        .igps-intro {
          color: #6a6a6a;
          font-family: "Montserrat", sans-serif;
          font-weight: 600;
          font-style: normal;
          font-size: 18px;
          leading-trim: cap-height;
          line-height: 22px;
        }
        @media (min-width: 1024px) {
          .igps-intro {
            font-size: 28px;
            line-height: 32px;
            letter-spacing: -0.04em;
          }
        }
        .igps-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 60;
          padding: 24px;
          animation: fadeInOverlay 300ms ease-out;
        }
        @keyframes fadeInOverlay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .igps-popup {
          background: #fff;
          border-radius: 16px;
          width: 90vw;
          max-width: 768px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
          position: relative;
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          animation: slideUpPopup 300ms ease-out;
        }
        @keyframes slideUpPopup {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          transition: transform 200ms ease;
        }
        .igps-popup-close:hover {
          transform: rotate(90deg);
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
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-style: normal;
          font-size: 20px;
          leading-trim: cap-height;
          line-height: 28px;
          letter-spacing: -4%;
          text-align: center;
          margin: 0;
        }
        .igps-popup-contact {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .igps-contact-pill {
          background: #f5f5f5;
          padding: 14px 44px;
          border-radius: 12px;
          color: #333333;
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 20px;
          leading-trim: cap-height;
          line-height: 28px;
          letter-spacing: -4%;
          position: relative;
          display: inline-block;
          box-sizing: border-box;
          max-width: 92%;
          transition: all 200ms ease;
        }
        .igps-contact-pill:hover {
          background: #f0f0f0;
        }
        .igps-contact-text {
          display: block;
          width: 100%;
          text-align: center;
        }
        .igps-pill-copy {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 18px;
          padding: 6px;
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          transition: transform 200ms ease;
        }
        .igps-pill-copy:hover {
          transform: translateY(-50%) scale(1.1);
        }
        .igps-pill-copy:active {
          transform: translateY(-50%) scale(0.95);
        }
        @media (max-width: 480px) {
          .igps-contact-pill {
            padding: 12px 28px;
            min-width: 0;
            width: 90vw;
          }
          .igps-pill-copy {
            right: 10px;
          }
          .igps-contact-pill {
            border-radius: 10px;
          }
          .igps-popup-title {
            font-size: 16px;
            line-height: 22px;
          }
          .igps-contact-pill {
            font-size: 16px;
            line-height: 22px;
          }
          .igps-popup {
            min-height: 320px;
          }
        }
        .igps-action-btn {
          background: #000;
          color: #fff;
          border: none;
          padding: 14px 26px;
          border-radius: 999px;
          display: inline-block;
          cursor: pointer;
          transition: all 200ms ease;
        }
        .igps-action-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .igps-action-btn:active {
          transform: scale(0.98);
        }
        @media (min-width: 1024px) {
          .igps-popup {
            width: 768px;
            height: 370px;
            border-radius: 32px;
          }
          .igps-popup-close {
            top: 20px;
            right: 22px;
          }
        }
      `}</style>
    </section >
  )
}

export default IgpsHero
