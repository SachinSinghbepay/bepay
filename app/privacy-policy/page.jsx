export const metadata = {
  title: "Privacy Policy - bepay",
  description: "Read bepay's Privacy Policy to understand how we collect, use, and protect your personal data in compliance with GDPR, DPDP, and global privacy regulations.",
  alternates: { canonical: "https://www.bepay.money/privacy-policy" },
};

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
