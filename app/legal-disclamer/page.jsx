import { Suspense } from 'react'; // 1. Import Suspense
import DisclaimerContent from "@/components/privacy-policy/DisclaimerContent";
import HeaderContent from "@/components/privacy-policy/HeaderContent";
import React from "react";

const page = () => {
  return (
    <section className="bg-[#f9f9f9]">
      <div className="py-20 max-w-7xl mx-auto px-4">
        <HeaderContent
          heading={"Legal disclaimer"}
          subheading={"(For bepay.money)"}
        />
        
        {/* 2. Wrap the client component in Suspense */}
        <Suspense fallback={<p>Loading content...</p>}>
          <DisclaimerContent />
        </Suspense>

      </div>
    </section>
  );
};

export default page;