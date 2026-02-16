"use client";

import { useState } from "react";

import StepEmail from "./StepEmail";
import StepVerifyCode from "./StepVerifyCode";
import StepPersonalDetails from "./StepPersonalDetails";
import StepBusinessDetails from "./StepBusinessDetails";
import StepComplete from "./StepComplete";

export default function CreateAccountPage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    code: "",
    firstName: "",
    lastName: "",
    password: "",
    accountType: "", // business or individual
    usageType: "",
    referralSource: ""
  });

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  return (
    <>
      {step === 1 && (
        <StepEmail
          data={formData}
          setData={setFormData}
          onNext={next}
        />
      )}

      {step === 2 && (
        <StepVerifyCode
          data={formData}
          setData={setFormData}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 3 && (
        <StepPersonalDetails
          data={formData}
          setData={setFormData}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 4 && (
        <StepBusinessDetails
          data={formData}
          setData={setFormData}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 5 && <StepComplete />}
    </>
  );
}
