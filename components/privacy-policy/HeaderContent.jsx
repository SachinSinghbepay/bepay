import React from "react";

const HeaderContent = ({ heading, subheading }) => {
  return (
    <>
      <h1 className="text-3xl md:text-4xl lg:text-[90px] font-bold text-[#080808]">
        {heading}
      </h1>
      <p className="text-md md:text-xl mt-2 font-[500] lg:text-[32px]">{subheading}</p>
    </>
  );
};

export default HeaderContent;
