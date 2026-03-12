"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IgpsService } from "@/services/igpsService";
import CreateAccountLayout from "../onboarding/Layout";
import StepEmail from "../onboarding/StepEmail";
import StepVerifyCode from "../onboarding/StepVerifyCode";
import StepPersonalDetails from "../onboarding/StepPersonalDetails";
import { useSearchParams } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const igpsService = new IgpsService();

export default function IgpsSignupPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const email = params.get("email");
  const name = params.get("name");

  const isGoogleSignup = params.get("google") === "1";
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isGoogleSignup) {
      setStep(3);
    }
  }, [isGoogleSignup]);
  useEffect(() => {
    if (!isGoogleSignup) return;

    const fullName = name || "";
    const parts = fullName.split(" ");

    setFormData((prev) => ({
      ...prev,
      email: email || "",
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
      signupToken: token || "", // IMPORTANT
    }));
  }, [email, name, token, isGoogleSignup]);

  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
    signupToken: "", // Token from OTP verification
    firstName: "",
    lastName: "",
    organizationName: "", // New field
    password: "",
    confirmPassword: "",
  });

  // 📧 Step 1: Send verification code to email
  const handleEmailNext = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await igpsService.signupInitiate(formData.email);

      if (response.success) {
        // Move to verify code step
        setStep(2);
      } else {
        setError(response.error || "Failed to send verification code.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Verify the code
  const handleCodeNext = async (otp) => {
    setLoading(true);
    setError("");

    try {
      // Use the OTP passed directly from the component
      const verificationCode = otp || formData.verificationCode;

      const response = await igpsService.verifySignupCode(
        formData.email,
        verificationCode,
      );

      if (response.success) {
        // 🔑 Store the signupToken from response
        setFormData((prev) => ({
          ...prev,
          signupToken: response.data.signupToken || "",
          verificationCode: verificationCode,
        }));
        // Move to personal details step
        setStep(3);
      } else {
        setError(response.error || "Invalid verification code.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🎉 Step 3: Complete signup
  const handleFinalSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await igpsService.completeSignup({
        signupToken: formData.signupToken,
        firstName: formData.firstName,
        lastName: formData.lastName,
        organizationName: formData.organizationName,
        password: formData.password,
      });

      if (response.success) {
        // Set tokens in cookies
        const { accessToken, refreshToken } = response.data.tokens;
        document.cookie = `igps_token=${accessToken}; path=/; max-age=86400; SameSite=Strict`;
        document.cookie = `igps_refresh=${refreshToken}; path=/; max-age=86400; SameSite=Strict`;

        igpsService.setTokens(accessToken, refreshToken);

        // Redirect to dashboard
        router.push("/igps/dashboard");
      } else {
        setError(response.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await igpsService.signupInitiate(formData.email);
      if (!response.success) {
        setError(response.error || "Failed to resend code.");
      }
    } catch (err) {
      setError("Resend failed.");
    } finally {
      setLoading(false);
    }
  };

  // ================= Google Auth =================

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential: idToken } = credentialResponse;
      const decoded = jwtDecode(idToken);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/igps/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
            email: decoded.email,
            googleId: decoded.sub,
            name: decoded.name || null,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      console.log("Google signup response:", data);

      /*
      Possible responses:
      1️⃣ requiresTwoFactor
      2️⃣ existing user
      3️⃣ new user (signupToken)
    */

      if (data.data.requiresTwoFactor) {
        const { userId, email, twoFactorToken } = data.data;
        router.push(
          `/igps/login?twofactor=1&userId=${encodeURIComponent(userId)}&email=${encodeURIComponent(email)}&token=${encodeURIComponent(twoFactorToken)}`,
        );
        return;
      }

      if (data.data.signupToken) {
        // NEW GOOGLE USER
        const { signupToken } = data.data;
        router.push(
          `/igps/signup?google=1&email=${encodeURIComponent(decoded.email)}&name=${encodeURIComponent(decoded.name)}&token=${encodeURIComponent(signupToken)}`,
        );
        return;
      }

      if (data.data.tokens) {
        // EXISTING USER
        const { accessToken, refreshToken } = data.data.tokens;

        document.cookie = `igps_token=${accessToken}; path=/; max-age=86400; SameSite=Strict`;
        document.cookie = `igps_refresh=${refreshToken}; path=/; max-age=86400; SameSite=Strict`;

        igpsService.setTokens(accessToken, refreshToken);

        router.push("/igps/dashboard");
      }
    } catch (err) {
      console.error("Google signup error:", err);
      setError(err.message);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepEmail
            data={formData}
            setData={setFormData}
            onNext={handleEmailNext}
            onGoogleSuccess={handleGoogleSuccess}
          />
        );
      case 2:
        return (
          <StepVerifyCode
            data={formData}
            setData={setFormData}
            onNext={handleCodeNext}
            onBack={() => setStep(1)}
            onResend={handleResend}
          />
        );
      case 3:
        return (
          <StepPersonalDetails
            data={formData}
            setData={setFormData}
            onNext={handleFinalSubmit}
            onBack={() => setStep(2)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <CreateAccountLayout stepKey={step}>
      {error && (
        <div className="p-3 mx-10 mt-10 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
          {error}
        </div>
      )}
      {renderStep()}
    </CreateAccountLayout>
  );
}
