"use client";

export default function BackupCode({
    backupCode,
    setBackupCode,
    loading,
    error,
    onSubmit,
    onBack,
    onUseAuthenticator,
}) {
    return (
        <div className="w-full max-w-xl flex flex-col justify-between">

            {/* Back button */}
           <div className="text-start px-10 py-4 mt-6">
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

            {/* Main content */}
            <div className="rounded-3xl p-10">

                <h2 className="text-start text-xl font-medium mb-6">
                    Enter backup code
                </h2>

                <p className="text-[#6A6A6A] text-sm">
                    Enter one of your backup codes to continue
                </p>

                <p className="text-sm mt-12 mb-4">Backup code</p>

                <input
                    type="text"
                    placeholder="Enter backup code"
                    value={backupCode}
                    onChange={(e) => setBackupCode(e.target.value)}
                    className="w-full px-4 py-4 text-lg rounded-2xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none"
                />

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200 mt-4">
                        {error}
                    </div>
                )}
            </div>

            {/* Bottom section */}
            <div className="rounded-3xl p-10">
                <button
                    onClick={onSubmit}
                    disabled={loading || !backupCode.trim()}
                    className="mt-6 w-full h-10 md:h-16 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition disabled:opacity-50"
                >
                    {loading ? "Verifying..." : "Verify code"}
                </button>

                <button
                    type="button"
                    onClick={onUseAuthenticator}
                    className="text-[#080808] mt-8 text-center text-sm font-semibold w-full"
                >
                    Use authenticator code instead
                </button>
            </div>

        </div>
    );
}