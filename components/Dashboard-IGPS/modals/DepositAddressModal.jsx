import ModalFrame from "./ModalFrame"; 

export default function DepositAddressModal({
    onClose,
    onBack,
    network,
}) {
    const address =
        "0xde2b741dujf4839hf4394f48735tyw98dnvcrveb75c3ee52493";

    const copyAddress = async () => {
        await navigator.clipboard.writeText(address);
    };

    return (
        <ModalFrame size="md">
            {/* HEADER */}
            <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
                {/* Back */}
                <button
                    className="absolute left-8 text-xl text-gray-500"
                    onClick={onBack}
                >
                 <img src="/icons/back.svg" alt="" />
                </button>

                <h2 className="text-lg font-semibold text-gray-900">
                    Deposit USDC
                </h2>

                {/* Close */}
                <button
                    className="absolute right-8 text-xl text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col items-center px-8 py-8 space-y-6">
                {/* NETWORK PILL */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-[16px] font-medium">
                    <img
                        src="/icons/polygon.png"
                        className="h-10 w-10"
                        alt=""
                    />
                    Polygon network
                </div>

                {/* WARNING */}
                <p className="text-center text-sm text-orange-600 max-w-lg">
                    Only send USDC to this address on polygon network. Sending wrong <br />
                    token or wrong network will cause loss of funds.
                </p>

                {/* QR CARD */}
                <div className="w-full max-w-[388px] h-[388px] bg-white rounded-2xl border p-6 flex flex-col items-center gap-4">
                    {/* Dummy QR */}
                    <img
                        src="/qrdummy.png"
                        alt="QR"
                        className="h-62 w-62 object-contain"
                    />

                    {/* ADDRESS + COPY */}
                    <div className="flex items-center gap-3 w-full justify-between">
                        <p className="text-[12px] text-center text-gray-500 break-all pr-2">
                            {address}
                        </p>

                        <button
                            onClick={copyAddress}
                            className="h-12 w-12 flex items-center justify-center rounded-lg hover:bg-gray-50"
                            title="Copy address"
                        >
                            <img
                                src="/icons/copy.svg"
                                alt="Copy"
                                className="h-9 w-9"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </ModalFrame>
    );
}
