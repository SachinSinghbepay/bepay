import ModalFrame from "./ModalFrame";

export default function InviteSuccessModal({
    onClose,
    name,
    email,
    role
}) {
    return (
        <ModalFrame size="sm">
            <div className="relative bg-white rounded-3xl px-10 py-16 text-center">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                {/* Success Icon */}
                <div className="flex justify-center mb-8">
                    <div className="h-24 w-24 rounded-full bg-green-700 flex items-center justify-center">
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold mb-4">
                    Invite sent successfully.
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-base leading-relaxed max-w-md mx-auto">
                    A new invite has been sent to{" "}
                    <span className="font-medium text-gray-800">
                        {name}
                    </span>{" "}
                    ({email}) to join as an{" "}
                    <span className="capitalize">{role}</span>.
                </p>

            </div>
        </ModalFrame>
    );
}
