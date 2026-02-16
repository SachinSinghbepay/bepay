import ModalFrame from "./ModalFrame";

export default function RemoveMemberModal({ onClose, member }) {
    const initial = member?.name?.charAt(0).toUpperCase();

    return (
        <ModalFrame size="sm">
            <div className="relative bg-white rounded-3xl px-10 py-14 text-center">

                {/* Close X */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-gray-500"
                >
                    ✕
                </button>

                {/* Avatar */}
                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-[#E9E1CF] flex items-center justify-center text-xl font-medium text-gray-600">
                        {initial}
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold mb-4">
                    Remove {member?.name}?
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                    Are you sure you want to remove{" "}
                    <span className="font-medium">{member?.email}</span>{" "}
                    from your team?
                </p>

                <p className="text-red-600 text-sm mb-10">
                    This action is cannot be undone. The user will lose access to your organisation.
                </p>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 h-14 rounded-2xl border text-gray-700 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>

                    <button
                        className="flex-1 h-14 rounded-2xl bg-black text-white hover:bg-gray-900 transition"
                        onClick={() => {
                            console.log("Remove member:", member?.id);
                            onClose();
                        }}
                    >
                        Remove
                    </button>
                </div>

            </div>
        </ModalFrame>
    );
}
