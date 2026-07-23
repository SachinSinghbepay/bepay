import React, { Suspense } from "react";
import DAppPage from "@/components/deAppHero";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <DAppPage />
    </Suspense>
  );
};

export default Page;
