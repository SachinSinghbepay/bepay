"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <main className="px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-20 min-h-screen flex justify-center hero-section">
        <div className="max-w-[90rem] w-full mx-auto">
          {/* Hero Text */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 max-w-[95%] mx-auto">
            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] sm:leading-none mb-6 sm:mb-8">
              <span className="text-gray-400">THE </span>
              <span className="text-black font-normal">CRYPTO PAYMENT</span>
              <br />
              <span className="text-gray-400">INFRASTRUCTURE FOR</span>
              <br />
              <span className="text-black font-normal">MODERN BUSINESSES</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl sm:max-w-4xl mx-auto leading-relaxed px-4 sm:px-6">
              Join{" "}
              <span className="text-black font-semibold">
                1,000+ businesses
              </span>{" "}
              using bepay to process crypto payments — with{" "}
              <span className="text-black font-semibold">
                30-second settlements
              </span>{" "}
              and up to{" "}
              <span className="text-black font-semibold">70% lower fees</span>{" "}
              than traditional processors...
            </p>
          </div>

          {/* Demo Cards */}
          <div className="relative w-full h-[70vh] sm:h-[80vh] mt-8 sm:mt-12 lg:mt-16">
            {/* Mockup Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Background curved shape */}
              <div
                className="absolute
                            w-[140%]
                            h-[45%]
                           bg-white
                           rounded-[60px]
                           transform
                            rotate-[-2deg]
                            translate-y-[60%]
                            z-[1]"
              />

              {/* Horizontal Device */}
              <div
                className="absolute right-[5%] transform -translate-y-62
                           w-[400px] sm:w-[500px] md:w-[700px] lg:w-[900px]
                           h-[200px] sm:h-[250px] md:h-[340px] lg:h-[400px]
                           top-[60%]
                           z-[2]"
                style={{ transformOrigin: "center center" }}
              >
                {/* Device Frame */}
                <div className="relative w-full h-full">
                  {/* White background with border */}
                  <div
                    className="absolute inset-0
                                bg-white
                                w-full h-full
                               rounded-[24px] sm:rounded-[32px] md:rounded-[40px]
                               shadow-[0_20px_60px_rgba(0,0,0,0.1)]
                               border-[8px] sm:border-[10px] md:border-[13px] border-[#d7d7d7]/60 "
                  />
                  {/* Screen Content */}
                  <div className="absolute inset-2 rounded-[16px] sm:rounded-[24px] md:rounded-[28px] overflow-hidden bg-white">
                    <Image
                      src="/business_s1_2.png"
                      alt="Transaction Interface"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Vertical Device */}
              <div
                className="absolute left-[5%] transform -translate-y-2/12 sm:translate-y-33
                           w-[200px] sm:w-[250px] md:w-[340px] lg:w-[420px]
                           h-[400px] sm:h-[500px] md:h-[680px] lg:h-[920px]
                           z-[3]"
                style={{ transformOrigin: "center center" }}
              >
                {/* Device Frame */}
                <div className="relative w-full h-full overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border-[6px] sm:border-[8px] border-[#d7d7d7]/60">
                  {/* White background with border */}
                  <div
                    className="absolute inset-0
                                bg-white
                                rounded-[18px] sm:rounded-[24px] md:rounded-[30px]
                               shadow-[0_16px_50px_rgba(0,0,0,0.12)]
                                overflow-hidden"
                  />
                  {/* Screen Content */}
                  <div className="absolute inset-2 rounded-[20px] sm:rounded-[28px] md:rounded-[40px] overflow-hidden bg-white z-[4]">
                    <Image
                      src="/business_s1_1.png"
                      alt="Merchant Account"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/*new screen*/}
                  <div className="absolute inset-2 rounded-[20px] sm:rounded-[28px] md:rounded-[40px] overflow-hidden bg-white z-[5]">
                    <Image
                      src="/business_s1_12.png"
                      alt="Merchant Account"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
