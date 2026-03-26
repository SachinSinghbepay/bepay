"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateAccountLayout from "./Layout";
import StepEmail from "./StepEmail";
import StepVerifyCode from "./StepVerifyCode";
import StepPersonalDetails from "./StepPersonalDetails";
import { useAuth } from "@/components/Dashboard-IGPS/context/AuthContext";

export default function OnboardingPage() {
  const { completeLogin } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  const handleFinalSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/igps/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          verificationCode: formData.verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create account.");
        return;
      }

      const { accessToken, refreshToken } = data.tokens;

      const ok = await completeLogin(accessToken, refreshToken);

      if (ok) {
        router.push("/igps/dashboard");
      } else {
        setError("Account created but login failed. Please login manually.");
        router.push("/igps/login");
      }

    } catch (error) {
      console.error("Error creating account:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepEmail data={formData} setData={setFormData} onNext={next} />;
      case 2:
        return <StepVerifyCode data={formData} setData={setFormData} onNext={next} onBack={back} />;
      case 3:
        return (
          <StepPersonalDetails
            data={formData}
            setData={setFormData}
            onNext={handleFinalSubmit}
            onBack={back}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <CreateAccountLayout stepKey={step}>
      {renderStep()}
    </CreateAccountLayout>
  );
}
