import ModalFrame from "./ModalFrame";

export default function KycRequiredModal({ onClose, onGoToKyc }) {
  return (
    <ModalFrame size="sm" height="550px">
      <div className="p-8 text-center space-y-4">
        <h2 className="text-lg font-semibold">
          Verification Required
        </h2>

        <p className="text-sm text-gray-600">
          Please complete your KYC verification to access this feature.
        </p>

        <button
          onClick={onGoToKyc}
          className="px-6 py-2 rounded-full bg-black text-white"
        >
          Complete Verification
        </button>
      </div>
    </ModalFrame>
  );
}