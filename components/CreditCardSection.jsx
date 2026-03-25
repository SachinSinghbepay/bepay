import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const CreditCardSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRef = useRef(null);
  const mobileRef = useRef(null);
  const textLinesRef = useRef(null);
  const accountRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!windowWidth) return;

    const section = sectionRef.current;
    const card = cardRef.current;
    const mobile = mobileRef.current;
    const textLines = textLinesRef.current?.children || [];
    const cards = cardsRef.current?.children || [];
    const button = buttonRef.current;
    const account = accountRef.current;

    // Initial setup for cards
    const isMobile = windowWidth < 768;
    const tabletSize = windowWidth < 1024 && windowWidth >= 768;
    
    // Responsive initial positions
    gsap.set(cards, { 
      y: isMobile ? 300 : (tabletSize ? 400 : 500),
      rotate: 0,
      transformOrigin: "center center"
    });
    
    // Position cards in a stack with slight offset
    [...cards].forEach((card, index) => {
      gsap.set(card, {
        y: isMobile ? 300 : (tabletSize ? 400 : 500),
        x: index * (isMobile ? 0.5 : 1),
        z: -index * (isMobile ? 1 : 2),
        scale: 1 - (index * 0.02)
      });
    });
    
    gsap.set(button, { y: 150 });

    // Cleanup previous animations
    ScrollTrigger.getAll().forEach(st => st.kill());
    gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=500%", // Increased for slower animations
          pin: true,
          scrub: 2, // Increased for smoother scrolling
          anticipatePin: 1, // Smoother pin start
          fastScrollEnd: true, // Better behavior for fast scrolling
          preventOverlaps: true,
          // markers: true // Helpful for debugging
        }
      });

      // Initial setup
      gsap.set(mobile, { y: '-200%' });
      gsap.set(textLines, { y: 300 });
      gsap.set(account, { y: "200%" });
2
      // Animation values based on screen size
      const isMobile = windowWidth < 768;
      const tabletSize = windowWidth < 1024 && windowWidth >= 768;
      
      const cardAnimation = {
        rotate: -90,
        scale: isMobile ? 0.15 : (tabletSize ? 0.18 : 0.22),
        x: isMobile ? "45%" : (tabletSize ? "47%" : "49%"),
        y: isMobile ? "-42%" : (tabletSize ? "-44%" : "-46.5%"),
        duration: 2,
        ease: "power3.inOut"
      };

      const mobileDeviceAnimation = {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.inOut"
      };

      // Animate all elements with slower, more deliberate timing
      tl.to(mobile, mobileDeviceAnimation)
        .to(account,{
          y: 0,
          duration: 2,
        },"<+0.8")
        .to(card, cardAnimation, "<") // Start at the same time as mobile animation
        .to(textLines, {
          y: 0,
          stagger: 1, // Increased stagger time
          duration: 3,
          ease: "power3.out"
        }, "+=1") // Start text animation with mobile and card
        .to(textLines, {
          x: isMobile ? -400 : -500,
          stagger: 1,
          duration: 3,
          ease: "power3.in"
        }, "+=1")
        
        // Cards animation - first bring them up as a stack
        .to(cards, {
          y: 0,
          stagger: 0.1,
          duration: 1.5,
          ease: "power3.out",
          clearProps: "scale,x,z" // Clear the stacking properties
        }, "+=1")
        
        // Then animate each card out one by one
        .to([...cards].slice(0, 6), {
          rotate: isMobile ? 45 : 60,
          y: isMobile ? "-50vh" : "-100vh",
          x: isMobile ? "50%" : "0",
          stagger: 6, // Increased stagger for more visible individual card animations
          duration: 6,
          ease: "power3.inOut",
          // onComplete: () => gsap.set([...cards].slice(0, 6), { opacity: 0 })
        }, "+=1")
        
        // Animate button with more pronounced entrance
        .to(button, {
          y: 0,
          duration: 3.5,
          ease: "elastic.out(1, 0.5)"
        }, ">-0.5");

    }, section);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [windowWidth]); // Re-run when window width changes

  const cardsRef = useRef(null);
  const buttonRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-white overflow-hidden">
      <div className="container mx-auto h-full py-20 sm:py-5 px-4 lg:px-8">
        {/* Initial Heading */}
        <h2 ref={headingRef} className="text-[3.5rem] md:text-[7rem] lg:text-[9rem] leading-none mb-20 font-[350]">
          <span className="text-[#c0c0c0]">The only </span>
          <span className="text-black">card </span>
          <span className="text-[#c0c0c0]">you&apos;ll<br />ever need</span>
          <span className="text-[#c0c0c0]">!</span>
        </h2>

        {/* Mobile Mockup */}
        <div ref={mobileRef} className="absolute right-54 top-[60%] lg:top-[80%] -translate-y-1/2   w-[300px] md:w-[350px] h-[600px] md:h-[700px] bg-gray-100 rounded-4xl border-8 border-[#d7d7d7] overflow-hidden shadow-2xl">
          <Image
            src="/Account screen.png"
            ref={accountRef}
            alt="App Interface"
            className="w-full h-full object-cover account"
          />
        </div>

        {/* Credit Card */}
        <div ref={cardRef} className="absolute left-1/2 top-1/2 -translate-x-1/2">
          <Image
            src="/Credit card mockup.png"
            alt="Credit Card Mockup"
            className="w-[20rem] sm:w-[30rem] md:w-[40rem] lg:w-[50rem] h-auto"
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))'
            }}
          />
        </div>

        {/* Animated Text Lines */}
        <div ref={textLinesRef} className="absolute left-4 md:left-20 top-[70%] -translate-y-1/2 max-w-xl">
          {['Meet the ', 'Card — designed for ', 'lifestyle, and ', 'zero compromise.'].map((line, index) => (
            <div key={index} className="text-line text-xl md:text-2xl lg:text-3xl font-light leading-tight">
              {line}
              {index === 0 && <span className="font-normal">bepay RuPay</span>}
              {index === 1 && <span className="font-normal">rewards</span>}
              {index === 2 && <span className="font-normal"></span>}
              {index === 3 && <span className="font-normal"></span>}
            </div>
          ))}
        </div>

        {/* Cards Stack */}
        <div ref={cardsRef} className="cards absolute top-[130vh] sm:top-[45vh] sm:left-[10%] left-[5%] w-full h-full flex flex-col gap-4 mt-10 sm:z-2 z-10">
          <div className="absolute card-1 bg-white rounded-3xl shadow-xl p-2 sm:max-w-[23rem] max-w-[20rem] mx-auto">
            <Image src="/cardupi.png" alt="Card Image" className="rounded-xl" />
            <div className="my-8 text-center space-y-1 flex gap-1 sm:ml-7 ml-4">
              <span className="text-sm font-medium text-gray-500">Seamless</span>
              <span className="text-sm font-semibold text-black">UPI payments</span>
            </div>
          </div>

          <div className="absolute card-2 bg-white rounded-3xl shadow-xl p-2 sm:max-w-[23rem] max-w-[20rem] mx-auto">
            <Image src="/cardemi.png" alt="Card Image" className="rounded-xl" />
            <div className="my-8 text-center space-y-1 flex gap-1 sm:ml-7 ml-4">
              <span className="text-sm font-medium text-gray-500">Cashback on</span>
              <span className="text-sm font-semibold text-black">EMI</span>
              <span className="text-sm font-medium text-gray-500">payments</span>
            </div>
          </div>

          <div className="absolute card-3 bg-white rounded-3xl shadow-xl p-2 sm:max-w-[23rem] max-w-[20rem] mx-auto">
            <Image src="/cardlounge.png" alt="Card Image" className="rounded-xl" />
            <div className="my-8 text-center space-y-1 flex gap-1 sm:ml-7 ml-4">
              <span className="text-sm font-medium text-gray-500">Airport lounge</span>
              <span className="text-sm font-semibold text-black">access</span>
            </div>
          </div>

          <div className="absolute card-4 bg-white rounded-3xl shadow-xl p-2 sm:max-w-[23rem] max-w-[20rem] mx-auto">
            <Image src="/cardfores.png" alt="Card Image" className="rounded-xl" />
            <div className="my-8 text-center space-y-1 flex gap-1 sm:ml-7 ml-4">
              <span className="text-sm font-semibold text-black">No </span>
              <span className="text-sm font-medium text-gray-500">forex fees</span>
            </div>
          </div>

          <div className="absolute card-5 bg-white rounded-3xl shadow-xl p-2 sm:max-w-[23rem] max-w-[20rem] mx-auto">
            <Image src="/cardtinder.png" alt="Card Image" className="rounded-xl" />
            <div className="my-8 text-center space-y-1 flex gap-1 sm:ml-7 ml-4 flex-wrap">
              <span className="text-sm font-medium text-gray-500">Includes </span>
              <span className="text-sm font-semibold text-black">free Bumble & Tinder Gold</span>
              <span className="text-sm font-medium text-gray-500">subscriptions</span>
            </div>
          </div>

          <div className="absolute card-6 bg-white rounded-3xl shadow-xl p-2 sm:max-w-[23rem] max-w-[20rem] mx-auto">
            <Image src="/cardonetime.png" alt="Card Image" className="rounded-xl" />
            <div className="my-8 text-center space-y-1 flex gap-1 sm:ml-7 ml-4 flex-wrap">
              <span className="text-sm font-semibold text-black">One-time<span className="text-sm font-medium text-gray-500">setup. </span></span>
              <span className="text-sm font-semibold text-black">No</span>
              <span className="text-sm font-medium text-gray-500">annual charges.</span>
              <span className="text-sm font-semibold text-black">No</span>
              <span className="text-sm font-medium text-gray-500">surprises.</span>
            </div>
          </div>

          <div className="absolute card-7 bg-white rounded-3xl shadow-xl p-2 sm:max-w-[23rem] max-w-[20rem] mx-auto">
            <Image src="/cardwallet.png" alt="Card Image" className="rounded-xl" />
            <div className="my-8 text-center space-y-1 flex gap-1 sm:ml-7 ml-4 flex-wrap leading-tight">
              <span className="text-sm font-medium text-gray-500">Unlimited </span>
              <span className="text-sm font-semibold text-black">7% cashback & rewards</span>
              <span className="text-sm font-medium text-gray-500">on</span>
              <span className="text-sm font-medium text-gray-500">every spend</span>
            </div>
          </div>

          
        </div>
        <button ref={buttonRef} className="absolute cardbutton top-[89vh] sm:left-57 left-18 bg-black sm:w-[13vw] w-[50vw] text-white px-7 py-5 rounded-full flex items-center gap-2">
            <Image src="/cardbutton.png" alt="" className="h-3" />
            <div className="text-left sm:text-[0.6rem] text-[0.5rem]"> 
              <div>Get your bepay money card now</div>
            </div>
          </button>
      </div>
    </section>
  );
};

export default CreditCardSection;
