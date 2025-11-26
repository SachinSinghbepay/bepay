import Image from "next/image";
import { Button } from "@/components/ui/button";

const IgpsHero = () => {
  return (
    <section className="bg-white text-black py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-gray-800 -mt-15" style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: '60px', lineHeight: '100%', letterSpacing: '-0.1em', textTransform: 'uppercase' }}>
            MOVE MONEY GLOBALLY
          </h1>
          <p className="text-gray-600 mt-2" style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '16px', lineHeight: '100%', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            YOUR ALL-IN-ONE PLATFORM FOR INTERNATIONAL PAYMENTS
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Change max-w-lg to max-w-xl for a larger container for hero.png */}
          <div className="lg:w-1/2 w-full flex justify-center -mt-25">
            <div className="relative w-full max-w-[35rem] aspect-square">
              <Image
                src="/hero.png"
                alt="IGPS Hero Image"
                fill
                className="rounded-lg object-contain"
              />
            </div>
          </div>
          {/* End of Hero Image adjustment */}

          <div className="lg:w-1/2 w-full lg:pl-8">
            <div className="space-y-0 -mt-10">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    src="/h1.png"
                    alt="rupee icon"
                    width={91} // Restored to original size
                    height={91} // Restored to original size
                  />
                </div>
                <p className="ml-4">
                  Send and receive business payments across{" "}<br/>
                  <span className="font-bold">100+ countries & 40+ currencies</span>.
                </p>
              </div>
              <div className="flex items-center -mt-5">
                <div className="flex-shrink-0">
                  <Image
                    src="/h2.png"
                    alt="sync icon"
                    width={91} // Restored to original size
                    height={91} // Restored to original size
                  />
                </div>
                <p className="ml-4">
                  <span className="font-bold">Faster settlements, transparent pricing</span> and <br/>
                  complete control over your cash flow.
                </p>
              </div>
              <div className="flex items-center -mt-5">
                <div className="flex-shrink-0">
                  <Image
                    src="/h3.png"
                    alt="power icon"
                    width={91} // Restored to original size
                    height={91} // Restored to original size
                  />
                </div>
                <p className="ml-4">
                  Powering <span className="font-bold">$200T+ in global B2B trade</span> with an{" "}<br/>
                  <span className="font-bold">intelligent global payment system.</span>
                </p>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <Image
                    src="/icons/h1.png"
                    alt="check icon"
                    width={20} // Restored to original size
                    height={20} // Restored to original size
                  />
                  <p className="ml-3">Global coverage across 100+ Countries</p>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/icons/h3.png"
                    alt="check icon"
                    width={20} // Restored to original size
                    height={20} // Restored to original size
                  />
                  <p className="ml-3">Zero FX markup</p>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/icons/h3.png"
                    alt="check icon"
                    width={20} // Restored to original size
                    height={20} // Restored to original size
                  />
                  <p className="ml-3">Instant e-FIRA/FIRC</p>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/icons/h4.png"
                    alt="check icon"
                    width={20} // Restored to original size
                    height={20} // Restored to original size
                  />
                  <p className="ml-3">Multi-currency Bank Accounts</p>
                </div>
              </div>
              <div className="mt-6 pl-3 border-l-4 border-black">
<p className="text-sm text-gray-500">
100% SAFE AND COMPLIANT • POWERED BY LEADING BANKS • <br/> RBI APPROVED • PA-CB AUTHORISED • MADE IN INDIA
</p>
</div>
              
              {/* === START: Horizontal Alignment of Buttons === */}
              <div className="flex items-center mt-8 space-x-[10px]">
                
                {/* Get Started Button */}
                <button
                  // Removed mx-auto for left alignment
                  className="flex items-center justify-center gap-2 bg-black text-white px-6 py-4 h-[66px] rounded-[100px] text-xs font-medium md:w-[180px] md:text-[14px]"
                >
                  
                  <span>Get Started</span>
                  {/* Keeping ArrowUpRight from lucide-react for the button icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-7 flex-shrink-0">
                    <path d="M7 17l10-10M7 7h10v10"/>
                  </svg>
                </button>

                {/* Telegram/WhatsApp Button (66x66, p-20) */}
                <Button 
                  variant="outline" 
                  className="rounded-full w-[66px] h-[66px] p-[20px] border border-gray-300"
                  style={{ borderColor: 'rgba(192, 192, 192, 0.4)' }} // Apply Border: #C0C0C0 40%
                >
                  <Image
                    src="/icons/wp.png"
                    alt="whatsapp icon"
                    width={26}
                    height={26}
                  />
                </Button>
                
                {/* Call Button (66x66, p-20) */}
                <Button 
                  variant="outline" 
                  className="rounded-full w-[66px] h-[66px] p-[20px] border border-gray-300"
                  style={{ borderColor: 'rgba(192, 192, 192, 0.4)' }} // Apply Border: #C0C0C0 40%
                >
                  <Image
                    src="/icons/phone.png"
                    alt="phone icon"
                    width={26}
                    height={26}
                  />
                </Button>
                
                {/* Mail Button (66x66, p-20) */}
                <Button 
                  variant="outline" 
                  className="rounded-full w-[66px] h-[66px] p-[20px] border border-gray-300"
                  style={{ borderColor: 'rgba(192, 192, 192, 0.4)' }} // Apply Border: #C0C0C0 40%
                >
                  <Image
                    src="/icons/mail.png"
                    alt="mail icon"
                    width={26}
                    height={26}
                  />
                </Button>
              </div>
              {/* === END: Horizontal Alignment of Buttons === */}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IgpsHero;