import ModalFrame from "./ModalFrame";
import { useState, useEffect, useRef } from "react";
import { IgpsService } from "../../../services/igpsService";

const igpsService = new IgpsService();

export default function GlobalPayoutModal({
  onClose,
  onBack,
  onAddBeneficiary,
  onPay
}) {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    try {
      setLoading(true);
      const response = await igpsService.listBeneficiaries();
      if (response.success) {
        setBeneficiaries(response.data);
      } else {
        console.error("Failed to fetch beneficiaries:", response.error);
      }
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
    } finally {
      setLoading(false);
    }
  };

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
          <button onClick={onBack} className="text-gray-400 hover:text-gray-600">
            <img src="/icons/back.svg" alt="Back" className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-medium">Global Payout</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 pb-8 min-h-0">
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
                You haven't added any beneficiaries yet. Add one to start sending payments.
              </p>
              <button
                onClick={onAddBeneficiary}
                className="mt-4 px-6 py-3 bg-black text-white rounded-xl font-medium"
              >
                Add new beneficiary +
              </button>
            </div>
          )}

          {/* LIST */}
          {!loading && beneficiaries.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-500">Beneficiaries with bank details</h3>
                <button
                  onClick={onAddBeneficiary}
                  className="text-sm font-medium underline"
                >
                  Add new beneficiary +
                </button>
              </div>

              <div className="space-y-3 pr-2">
                {beneficiaries.map((b) => (
                  <BeneficiaryRow
                    key={b.id}
                    id={b.id}
                    name={b.type === 'business' ? b.fullName : `${b.firstName} ${b.lastName}`}
                    bank={getBankName(b)}
                    country={b.addressCountry || b.address?.country}
                    status={b.status}
                    flag={getCountryFlag(b.addressCountry || b.address?.country)}
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
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border shadow-sm overflow-hidden">
          {/* Placeholder or Flag */}
          <span className="text-xs font-bold">{country?.substring(0, 2).toUpperCase()}</span>
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
        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
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

function getCountryFlag(countryName) {
  // Simple mock map or logic provided here
  // In a real app, use a library or the existing icon system
  return null;
}

