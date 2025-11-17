'use client';
import React from "react";
import { Suspense } from 'react';
import DAppPage from "@/components/deAppHero";


const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DAppPage />
      </Suspense>
    </>
  );
};

export default page;
