import CTASection from "@/components/aboutus/cta-section";
import ContactHeroSection from "@/components/contactus/contact-hero-section";
import ContactForm from "@/components/contactus/ContactUsForm";
import React from "react";

const page = () => {
  return (
    <>
      <ContactHeroSection />
      <ContactForm />
      <CTASection />
    </>
  );
};

export default page;
