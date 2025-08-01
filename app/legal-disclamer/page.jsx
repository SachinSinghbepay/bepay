import DisclaimerContent from "@/components/privacy-policy/DisclaimerContent";
import HeaderContent from "@/components/privacy-policy/HeaderContent";
import React from "react";

const page = () => {
  return (
    <section className="bg-[#f9f9f9]">
      <div className="py-20 max-w-7xl mx-auto px-4">
        <HeaderContent
          heading={"Privacy Policy"}
          subheading={"(For bepay.money)"}
        />
        <DisclaimerContent />
      </div>
    </section>
  );
};

export default page;
