"use client";
import { Suspense } from 'react'; // 1. Import Suspense
import CTASection from "@/components/aboutus/cta-section";
import ContactHeroSection from "@/components/contactus/contact-hero-section";
import ContactForm from "@/components/contactus/ContactUsForm";
import React from "react";

const page = () => {
  return (
    <>
      <ContactHeroSection />

      {/* 2. Wrap the client component in Suspense */}
      <Suspense fallback={<p>Loading form...</p>}>
        <ContactForm />
      </Suspense>
      
      <CTASection />
    </>
  );
};

export default page;