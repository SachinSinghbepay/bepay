"use client";

import { useState } from "react";
import CreateAccountLayout from "./Layout";
import StepEmail from "./StepEmail";
import StepVerifyCode from "./StepVerifyCode";
import StepPersonalDetails from "./StepPersonalDetails";
import StepBusinessDetails from "./StepBusinessDetails";

export default function CreateAccountPage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    code: "",
    firstName: "",
    lastName: "",
  });

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepEmail data={formData} setData={setFormData} onNext={next} />;
      case 2:
        return <StepVerifyCode data={formData} setData={setFormData} onNext={next} onBack={back} />;
      case 3:
        return <StepPersonalDetails data={formData} setData={setFormData} onNext={next} onBack={back} />;
      default:
      case 4:
        return (
          <StepBusinessDetails
            data={formData}
            setData={setFormData}
            onNext={() => {
              console.log("FINAL DATA:", formData);

            }}
            onBack={back}
          />
        );
        return null;
    }
  };

  return (
    <CreateAccountLayout stepKey={step}>
      {renderStep()}
    </CreateAccountLayout>
  );
}
