'use client';
import Footer from "@/components/Footer1";
import CookiePolicyFooter from "@/components/privacy-policy/cookie-policy-footer";
import CookiesPolicyContent from "@/components/privacy-policy/CookiePolicy";
import HeaderContent from "@/components/privacy-policy/HeaderContent";
import React from "react";

const page = () => {
  return (
    <>
      <section className="bg-[#f9f9f9]">
        <div className="py-20 max-w-7xl mx-auto px-4">
          <HeaderContent heading={"Cookie Policy"} />
          <CookiesPolicyContent />
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default page;
