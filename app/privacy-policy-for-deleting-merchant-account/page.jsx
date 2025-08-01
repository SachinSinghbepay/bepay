import HeaderContent from "@/components/privacy-policy/HeaderContent";
import MerchantUrlDeletionPolicyContent from "@/components/privacy-policy/MerchantUrlDeletionPolicyContent";
import React from "react";

const page = () => {
  return (
    <section className="bg-[#f9f9f9]">
      <div className="py-20 max-w-7xl mx-auto px-4 lg:px-0">
        <HeaderContent
          heading={"Privacy Policy"}
          subheading={"(For deleting merchant URL content)"}
        />
        <MerchantUrlDeletionPolicyContent />
      </div>
    </section>
  );
};

export default page;
