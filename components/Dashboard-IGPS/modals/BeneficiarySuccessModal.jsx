import ModalFrame from "./ModalFrame";

export default function BeneficiarySuccessModal({
  onClose,
  onAddAnother,
}) {
  return (
    <ModalFrame size="lg">
      {/* BODY */}
      <div className="flex flex-col items-center justify-center text-center px-10 py-20 space-y-6 h-full ">
        
        {/* CHECK ICON */}
        <div className="h-20 w-20 rounded-full bg-green-600 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="h-10 w-10 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* TITLE */}
        <h2 className="text-[32px] font-semibold text-gray-900">
          Beneficiary Added
        </h2>

        {/* SUBTEXT */}
        <p className="text-[#6A6A6A] -mt-4 text-base text-[16px] ">
          Your new beneficiary has been saved successfully.
        </p>
      </div>

      {/* FOOTER */}
      <div className="flex gap-4 px-10 pb-10">
        <button
          onClick={onAddAnother}
          className="flex-1 h-16 rounded-2xl border border-[#C0C0C0] text-base font-medium"
        >
          Add another beneficiary
        </button>

        <button
          onClick={onClose}
          className="flex-1 h-16 rounded-2xl bg-black text-white text-base font-medium"
        >
          Done
        </button>
      </div>
    </ModalFrame>
  );
}
