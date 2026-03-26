"use client";

export default function StepTwoFactor({
  otp,
  inputsRef,
  onUseBackup,
  loading,
  error,
  onOtpChange,
  onKeyDown,
  onSubmit,
  onBack,
}) {
  return (
    <div className="w-full max-w-xl flex flex-col justify-between">

      <div className="text-start px-10 py-2 mt-2">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 flex "
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 6L9 12L15 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg> Back
        </button>
      </div>
      <div className="rounded-3xl p-10">

        <h2 className="text-start text-xl font-medium mb-6">
          Two-Factor Authentication
        </h2>

        <p className="text-[#6A6A6A] text-sm">Enter 6-digit code from your authenticator app to continue</p>
        <p className="text-sm mt-8 mb-4">Authentication code</p>
        <div className="flex gap-3 justify-between mb-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => onOtpChange(e.target.value, index)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className="w-16 h-16 text-center text-xl font-semibold rounded-2xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none"
            />
          ))}
        </div>
        {error && (
          <div className="p-2 bg-red-50 text-red-600 text-sm rounded-md border border-red-200 mb-4">
            {error}
          </div>
        )}



      </div>
      <div className="rounded-3xl px-10 pb-6">
        <button
          onClick={onSubmit}
          disabled={loading || otp.join("").length !== 6}
          className="mt-6 w-full h-10 md:h-16 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
        >
          {loading ? "Verifying..." : "Verify & Login"}
        </button>
        <p className="text-[#080808] mt-8 text-center text-sm">
          Can&apos;t access your authenticator?{" "}
          <button
            type="button"
            onClick={onUseBackup}
            className="font-semibold underline"
          >
            Use backup code
          </button>
        </p>      </div>
    </div>
  );
}