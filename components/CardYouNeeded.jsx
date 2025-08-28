import React from "react";
const CardYouNeeded = () => {
  return (
    <section className="mt-[42vw] max-w-[1500px] relative w-full flex flex-col items-start bg-white pl-8">
      <h2 className="text-[100px] lg:text-[160px] w-full font-[400] mb-0 z-1 text-left leading-none tracking-[-0.15em]">
        <span className="text-[#C0C0C0] tracking-[-0.3em]">The only </span>
        <span className="text-black tracking-[-0.3em]">card</span>
        <span className="text-[#C0C0C0] tracking-[-0.3em]">
          {" "}
          you'll
          <br />
          ever need!
        </span>
      </h2>
      <div className="relative w-full flex justify-start mt-[3rem]">
        <div className="relative w-1/2 h-full">
          <img
            src="/Credit card mockup.png"
            alt="Credit Card Mockup"
            className="w-full h-full object-contain rounded-3xl shadow-2xl"
            style={{ zIndex: 1 }}
          />
        </div>
      </div>
    </section>
  );
};
export default CardYouNeeded;