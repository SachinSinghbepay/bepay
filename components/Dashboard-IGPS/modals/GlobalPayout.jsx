import ModalFrame from "./ModalFrame";

export default function GlobalPayoutModal({
  onClose,
  onBack,
  onAddBeneficiary,
}) {
  const beneficiaries = [
    {
      id: 1,
      name: "Nordek Fintech INC",
      bank: "Cross River bank - 9755",
      countryIcon: "/icons/usa.svg",
      verified: true,
    },
    {
      id: 2,
      name: "Alibaba ecom",
      bank: "JP Morgan Chase - 1024",
      countryIcon: "/icons/usa.svg",
      verified: true,
    },
    {
      id: 3,
      name: "Soulstore pvt ltd",
      bank: "State Bank of India - 4997",
      countryIcon: "/icons/india.svg",
      verified: false,
    },
  ];
  
// const beneficiaries = [];

  const hasBeneficiaries = beneficiaries.length > 0;

  return (
    <ModalFrame size="lg">
      {/* HEADER */}
      <div className="relative flex items-center justify-center p-6 mb-6">
        <button
          onClick={onBack}
          className="absolute left-6 text-xl text-gray-500"
        >
          <img src="/icons/back.svg" alt="" />
        </button>

        <h2 className="text-lg font-semibold">Global payout</h2>

        <button
          onClick={onClose}
          className="absolute right-6 text-2xl text-gray-400"
        >
          ✕
        </button>
      </div>

      {/* BODY */}
      {!hasBeneficiaries ? (
        /* ========== EMPTY STATE ========== */
        <div className="flex flex-col items-center justify-center text-center py-24 space-y-6 h-full">
          <p className="text-gray-600">No beneficiaries yet</p>
          <p className="text-sm text-gray-500">
            Add employees, vendors, or freelancers to start sending payments quickly.
          </p>

          <button
            onClick={onAddBeneficiary}
            className="rounded-full bg-black px-6 py-3 text-white text-sm"
          >
            Add beneficiary
          </button>
        </div>
      ) : (
        /* ========== BENEFICIARY LIST ========== */
        <div className="px-10 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Beneficiaries with bank details
            </p>

            <button
              onClick={onAddBeneficiary}
              className="text-sm underline"
            >
              Add new beneficiary +
            </button>
          </div>

          <div className="space-y-4">
            {beneficiaries.map((b) => (
              <BeneficiaryRow key={b.id} {...b} />
            ))}
          </div>
        </div>
      )}
    </ModalFrame>
  );
}


function BeneficiaryRow({
  name,
  bank,
  countryIcon,
  verified,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-[#FAFAFA] p-5">
      <div className="flex items-center gap-4">
        <img
          src={countryIcon}
          alt=""
          className="h-10 w-10 rounded-full"
        />

        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{bank}</p>

          {!verified && (
            <p className="text-sm text-orange-600 mt-3">
              Bank verification in progress
            </p>
          )}
        </div>
      </div>

      <button
        disabled={!verified}
        className={`
          h-12 px-8 rounded-full text-sm font-medium
          ${
            verified
              ? "bg-black text-white"
              : "bg-gray-300 text-white cursor-not-allowed"
          }
        `}
      >
        Pay
      </button>
    </div>
  );
}
