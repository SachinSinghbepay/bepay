import Image from "next/image";
import { useAuth } from "../context/AuthContext";

export default function KycBanner({ setActivePage }) {
  const { kycStatus } = useAuth();

  if (kycStatus !== "incomplete") return null;

  return (
    <div className="flex items-center justify-center py-16">
      <div className="bg-[#E7DED1] rounded-3xl px-10 py-10 max-w-lg w-full text-center shadow-sm">

        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl">
            <Image
              width={28}
              height={28}
              src="/icons/kyc.svg"
              alt="kyc"
            />
          </div>
        </div>

        <p className="text-[15px] sm:text-[16px] font-medium text-black leading-relaxed">
          Complete your KYB/KYC verification to enable bank withdrawals,
          global payouts and full account access.
        </p>

        <button
          onClick={() => setActivePage("kyc")}
          className="mt-6 px-7 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-900 transition"
        >
          Complete verification
        </button>

      </div>
    </div>
  );
}