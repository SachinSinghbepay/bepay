import Image from "next/image";
import { Button } from "@/components/ui/button";

const IgpsHero = () => {
  return (
    // 1. Mobile BG is white (bg-white), Desktop BG is the original gray (lg:bg-[#F9F9F9])
    <section className="bg-white lg:bg-[#F9F9F9] text-black py-20 md:py-20"> 
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-gray-800 lg:-mt-15 text-[26px] md:text-[60px]" style={{ fontFamily: 'Montserrat', fontWeight: 500, lineHeight: '100%', letterSpacing: '-0.1em', textTransform: 'uppercase' }}>
            MOVE MONEY GLOBALLY
          </h1>
          <p className="text-gray-600 mt-2" style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '16px', lineHeight: '100%', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            YOUR ALL-IN-ONE PLATFORM FOR INTERNATIONAL PAYMENTS
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          {/* Image Container Block */}
          <div className="lg:w-1/2 w-full flex justify-center -mx-4 lg:mx-0 mt-0 lg:-mt-25"> 
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
              
              {/* Pointer 1: Added mb-5 for extra gap on mobile. */}
              <div className="flex items-center mb-5 lg:mb-0"> 
                <div className="flex-shrink-0">
                  <Image
                    src="/h1.png"
                    alt="rupee icon"
                    width={91} 
                    height={91} 
                  />
                </div>
                <p className="ml-4">
                  Send and receive business payments across{" "}<br/>
                  <span className="font-bold">100+ countries & 40+ currencies</span>.
                </p>
              </div>
              
              {/* Pointer 2: Added mb-5 for extra gap on mobile, and adjusted top margin. */}
              <div className="flex items-center mt-0 lg:-mt-5 mb-5 lg:mb-0">
                <div className="flex-shrink-0">
                  <Image
                    src="/h2.png"
                    alt="sync icon"
                    width={91} 
                    height={91} 
                  />
                </div>
                <p className="ml-4">
                  <span className="font-bold">Faster settlements, transparent pricing</span> and <br/>
                  complete control over your cash flow.
                </p>
              </div>
              
              {/* Pointer 3: Added mb-5 for extra gap on mobile, and adjusted top margin. */}
              <div className="flex items-center mt-0 lg:-mt-5 mb-5 lg:mb-0">
                <div className="flex-shrink-0">
                  <Image
                    src="/h3.png"
                    alt="power icon"
                    width={91} 
                    height={91} 
                  />
                </div>
                <p className="ml-4">
                  Powering <span className="font-bold">$200T+ in global B2B trade</span> with an{" "}<br/>
                  <span className="font-bold">intelligent global payment system.</span>
                </p>
              </div>
              
              {/* Checkmark List (Hidden on Mobile, block on Desktop) */}
              <div className="mt-8 space-y-4 hidden lg:block">
                <div className="flex items-center">
                  <Image
                    src="/icons/h1.png"
                    alt="check icon"
                    width={20} 
                    height={20} 
                  />
                  <p className="ml-3">Global coverage across 100+ Countries</p>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/icons/h3.png"
                    alt="check icon"
                    width={20} 
                    height={20} 
                  />
                  <p className="ml-3">Zero FX markup</p>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/icons/h3.png"
                    alt="check icon"
                    width={20} 
                    height={20} 
                  />
                  <p className="ml-3">Instant e-FIRA/FIRC</p>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/icons/h4.png"
                    alt="check icon"
                    width={20} 
                    height={20} 
                  />
                  <p className="ml-3">Multi-currency Bank Accounts</p>
                </div>
              </div>
              
              {/* Compliance Text (Original spacing kept, except for overall flow) */}
              <div className="mt-6 pl-3 border-l-4 border-black">
                <p className="text-[11px] md:text-sm text-gray-500" style={{ fontFamily: 'Montserrat', fontWeight: 600, lineHeight: '100%', letterSpacing: '0%', textTransform: 'uppercase' }}>
                100% SAFE AND COMPLIANT • POWERED BY LEADING BANKS • <br/> RBI APPROVED • PA-CB AUTHORISED • MADE IN INDIA
                </p>
              </div>
              
              {/* Buttons Block (Adjusted size for mobile) */}
              <div className="flex items-center mt-8 space-x-[10px]">
                
                {/* Get Started Button */}
                <button
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
    </section>
  );
};

export default IgpsHero;