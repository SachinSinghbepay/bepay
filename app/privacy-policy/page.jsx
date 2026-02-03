import HeaderContent from "@/components/privacy-policy/HeaderContent";
import PrivacyPolicyContent from "@/components/privacy-policy/PrivacyPolicyContent";
import React from "react";

const page = () => {
  return (
    <>
      <section className="bg-[#f9f9f9]">
        <div className="py-20 max-w-7xl mx-auto px-4">
          <HeaderContent heading={"Privacy Policy"} />
           <PrivacyPolicyContent />
        </div>
      </section>
      
    </>
  );
};

export default page;
