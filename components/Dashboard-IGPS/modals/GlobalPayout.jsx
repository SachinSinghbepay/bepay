import ModalFrame from "./ModalFrame";
import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import useSWR from 'swr';



export default function GlobalPayoutModal({
  onClose,
  onBack,
  onAddBeneficiary,
  onPay
}) {
  const { igpsService } = useAuth();

  const { data, isValidating } = useSWR(
    'igps-beneficiaries',
    async () => {
      const res = await igpsService.listBeneficiaries(true);
      return res.success ? res.data : [];
    }
  );

  const beneficiaries = data ?? [];
  const loading = !data && isValidating;
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
      } else {
        e.stopPropagation();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);


  // Helper to format address
  const formatAddress = (b) => {
    if (!b.address) return "";
    return `${b.address.city}, ${b.address.country}`;
  };

  // Helper to get bank name
  const getBankName = (b) => {
    if (b.paymentInfo?.paymentType === 'bank_account') {
      return b.paymentInfo.bankName || "Bank Account";
    }
    return "Wallet";
  };

  return (
    <ModalFrame>
      <div className="flex flex-col max-h-[80vh] h-full lg:px-4">
        {/* HEADER */}
        <div className="flex items-center justify-between  p-8 pb-4 shrink-0">
          <button onClick={onBack} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <Image
              src="/icons/back.svg"
              alt=""
              width={18}
              height={18}
            />
          </button>
          <h2 className="text-xl font-medium">Global Payout</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <Image src="/icons/close.png" alt="close" width={16} height={16} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 sm:px-8 pb-8 min-h-0">
          {/* LOADING STATE */}
          {loading && (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && beneficiaries.length === 0 && (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">?</span>
              </div>
              <h3 className="text-lg font-medium">No beneficiaries found</h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                You haven&apos;t added any beneficiaries yet. Add one to start sending payments.
              </p>
              <button
                onClick={onAddBeneficiary}
                className="mt-4 px-6 py-3 bg-black text-white rounded-xl font-medium cursor-pointer"
              >
                Add new beneficiary +
              </button>
            </div>
          )}

          {/* LIST */}
          {!loading && beneficiaries.length > 0 && (
            <div className="space-y-3 mt-5 sm:mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-500">Beneficiaries with bank details</h3>
                <button
                  onClick={onAddBeneficiary}
                  className="text-sm font-medium underline cursor-pointer"
                >
                  Add new beneficiary +
                </button>
              </div>

              <div className="space-y-3 pr-2 mt-3">
                {beneficiaries.map((b) => (
                  <BeneficiaryRow
                    key={b.id}
                    id={b.id}
                    name={b.type === 'business' ? b.fullName : `${b.firstName} ${b.lastName}`}
                    bank={getBankName(b)}
                    country={b.countryName || b.addressCountry || b.address?.country}
                    status={b.status}
                    flag={b.countryFlagUrl || getCountryFlag(b.addressCountry || b.address?.country)}
                    onPay={() => onPay(b)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </ModalFrame>
  );
}

function BeneficiaryRow({ id, name, bank, country, status = "active", flag, onPay }) {
  return (
    <div className="flex items-center justify-between p-4 md:gap-30 lg:gap-60 bg-[#F9F9F9] rounded-2xl">
      <div className="flex items-center gap-4 p-[1.5px] rounded-xl ">
        <div className="w-10 h-10 bg-[#F5F5F5] rounded-xl p-2 flex items-center justify-center border shadow-sm overflow-hidden">
          {flag ? (
            <img src={flag} alt={country ?? ""} className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-xs font-bold">{country?.substring(0, 2).toUpperCase()}</span>
          )}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">{bank} - {country}</p>
          {status === "verification_in_progress" && (
            <p className="text-xs text-orange-500 mt-0.5">Bank verification in progress</p>
          )}
        </div>
      </div>

      <button
        onClick={onPay}
        disabled={status !== "verified" && status !== "active" && status !== "pending"} // Allow pending for now based on rules
        className={`px-6 py-4 rounded-full text-sm font-medium transition-colors cursor-pointer
          ${status === "verification_in_progress"
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800"
          }`}
      >
        Pay
      </button>
    </div>
  );
}

const COUNTRY_FLAGS = {
  US: "/icons/usa.svg",
  USA: "/icons/usa.svg",
  IN: "/icons/india.svg",
  IND: "/icons/india.svg",
  BR: "/icons/brazil.svg",
  AE: "/icons/uae.svg",
  ZA: "/icons/south-africa.svg",
  MX: "/icons/mexico.svg",
  GB: "/icons/uk.svg",
  SG: "/icons/singapore.svg",
  PH: "/icons/philippines.svg",
  ID: "/icons/indonesia.svg",
  TH: "/icons/thailand.svg",
  VN: "/icons/vietnam.svg",
  MY: "/icons/malaysia.svg",
  CO: "/icons/colombia.svg",
  AR: "/icons/argentina.svg",
  JP: "/icons/japan.svg",
  AU: "/icons/australia.svg",
  CA: "/icons/canada.svg",
  // Europe / EUR countries
  DE: "/icons/europe.png",
  FR: "/icons/europe.png",
  IT: "/icons/europe.png",
  ES: "/icons/europe.png",
  NL: "/icons/europe.png",
  BE: "/icons/europe.png",
  AT: "/icons/europe.png",
  PT: "/icons/europe.png",
  EU: "/icons/europe.png",
};

function getCountryFlag(countryCode) {
  if (!countryCode) return null;
  return COUNTRY_FLAGS[countryCode.toUpperCase()] ?? null;
}

