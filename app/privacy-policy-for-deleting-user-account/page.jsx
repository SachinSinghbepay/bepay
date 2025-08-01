import HeaderContent from "@/components/privacy-policy/HeaderContent";
import UrlDeletionPolicyContent from "@/components/privacy-policy/UrlDeletionPolicyContent";
import React from "react";

const page = () => {
  return (
    <section className="bg-[#f9f9f9]">
      <div className="py-20 max-w-7xl mx-auto px-4">
        <HeaderContent
          heading={"Privacy Policy"}
          subheading={"(For deleting user URL content)"}
        />
        <UrlDeletionPolicyContent />
      </div>
    </section>
  );
};

export default page;
