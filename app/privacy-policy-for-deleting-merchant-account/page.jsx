"use client";
import { Suspense } from 'react'; // 1. Import Suspense
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

        {/* 2. Wrap the client component in Suspense */}
        <Suspense fallback={<p>Loading policy...</p>}>
          <MerchantUrlDeletionPolicyContent />
        </Suspense>
        
      </div>
    </section>
  );
};

export default page;