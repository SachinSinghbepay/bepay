"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IgpsService } from "@/services/igpsService";
import { useAuth } from "@/components/Dashboard-IGPS/context/AuthContext";
import StepCredentials from "./StepCredentials";
import StepTwoFactor from "./StepTwoFactor";
import BackupCode from "./BackupCode";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

const igpsService = new IgpsService();

export default function LoginPage() {
  const router = useRouter();
  const { login, completeLogin } = useAuth();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorData, setTwoFactorData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState("");

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);


  const [backupCode, setBackupCode] = useState("");

  const [forgotData, setForgotData] = useState({ email: "" });

  const [resetData, setResetData] = useState({
    otp: "",
    newPassword: ""
  });

  // ================= LOGIN HANDLER =================
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (result.requiresTwoFactor) {
      // only move to step 2 if backend says 2FA is required
      setTwoFactorData(result.twoFactorData);
      setStep(2);
    } else if (result.success) {
      setLoginSuccess(true);
      setTimeout(() => {
        router.push("/igps/dashboard");
      }, 1000);
    } else {
      setError(result.error || "Login failed");
    }

    setLoading(false);
  };

  // ================= OTP INPUT HANDLERS =================
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // ================= VERIFY 2FA =================
  const handleVerify2FA = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await igpsService.verifyTwoFactorLogin({
        userId: twoFactorData.userId,
        token: otp.join(""),
        twoFactorToken: twoFactorData.twoFactorToken,
        isBackupCode: false,
      });

      if (response.success) {
        const { accessToken, refreshToken } = response.data.tokens;

        const ok = await completeLogin(accessToken, refreshToken);

        if (ok) {
          router.push("/igps/dashboard");
        }
      } else {
        setError(response.message || "Invalid code");
      }
    } catch (err) {
      setError("Verification failed.");
    } finally {
      setLoading(false);
    }
  };


  // ================= VERIFY backup codes =================
  const handleVerifyBackupCode = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await igpsService.verifyTwoFactorLogin({
        userId: twoFactorData.userId,
        token: backupCode,
        twoFactorToken: twoFactorData.twoFactorToken,
        isBackupCode: true,
      });

      if (response.success) {
        const { accessToken, refreshToken } = response.data.tokens;

        const ok = await completeLogin(accessToken, refreshToken);

        if (ok) {
          router.push("/igps/dashboard");
        }
      } else {
        setError(response.message || "Invalid backup code");
      }
    } catch (err) {
      setError("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // ================= Forgot Password =================

  const handleForgotPassword = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await igpsService.forgotPassword({
        email: forgotData.email,
      });

      if (response.success) {
        setStep(5); // go to Reset Password UI
      } else {
        setError(response.error || "Failed to send reset email");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  // ================= Reset Password =================

  const handleResetPassword = async ({ otp, newPassword }) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await igpsService.resetPassword({
        email: forgotData.email,
        otp,
        password: newPassword,
      });

      if (response.success && response.data?.reset) {
        setSuccess(true);

        setTimeout(() => {
          setStep(1);
          setSuccess(false);
          setResetData({ newPassword: "", otp: "" });
        }, 1200);
      } else {
        setError(response.error || "Reset failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}

      {step === 1 && (
        <StepCredentials
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          loading={loading}
          success={loginSuccess}
          error={error}
          onSubmit={handleLogin}
          onForgot={() => setStep(4)}
        />
      )}

      {step === 2 && (
        <StepTwoFactor
          otp={otp}
          inputsRef={inputsRef}
          loading={loading}
          error={error}
          onOtpChange={handleOtpChange}
          onKeyDown={handleKeyDown}
          onSubmit={handleVerify2FA}
          onBack={() => setStep(1)}
          onUseBackup={() => {
            setError("");
            setOtp(Array(6).fill(""));
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <BackupCode
          backupCode={backupCode}
          setBackupCode={setBackupCode}
          loading={loading}
          error={error}
          onSubmit={handleVerifyBackupCode}
          onBack={() => {
            setError("");
            setBackupCode("");
            setStep(2);
          }}
          onUseAuthenticator={() => {
            setError("");
            setBackupCode("");
            setStep(2);
          }}
        />
      )}

      {step === 4 && (
        <ForgotPassword
          data={forgotData}
          setData={setForgotData}
          onNext={handleForgotPassword}
        />
      )}

      {step === 5 && (
        <ResetPassword
          data={resetData}
          setData={setResetData}
          onSubmit={handleResetPassword}
          loading={loading}
          error={error}
          onBack={() => setStep(1)}
          success={success}
          onNext={handleResetPassword}
        />
      )}


    </>
  );
}
