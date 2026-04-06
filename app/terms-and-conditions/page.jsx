export const metadata = {
  title: "Terms and Conditions - bepay",
  description: "Read bepay's Terms and Conditions to understand the rules, obligations, and agreements governing the use of our payment platform and services.",
  alternates: { canonical: "https://www.bepay.money/terms-and-conditions" },
};

import HeaderContent from "@/components/privacy-policy/HeaderContent";
import TermsAndConditionsContent from "@/components/privacy-policy/TermsAndConditionsContent";
import React from "react";

const page = () => {
  return (
    <section className="bg-[#f9f9f9]">
      <div className="py-20 max-w-7xl mx-auto px-4">
        <HeaderContent heading={"Terms and Conditions"} />
        <TermsAndConditionsContent />
      </div>
    </section>
  );
};

export default page;
