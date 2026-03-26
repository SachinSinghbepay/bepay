"use client";
import ModalFrame from "./ModalFrame";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";


export default function RemoveMemberModal({ onClose, member, refresh }) {

    const { igpsService } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const initial = member?.name?.charAt(0).toUpperCase();
    const isInvite = member?.type === "invite";
    const handleRemove = async () => {
        if (!member?.id) return;

        try {
            setLoading(true);
            setError("");

            let res;

            if (member.type === "invite") {
                // Pending invite → cancel invite
                res = await igpsService.cancelInvite(member.id);
                console.log("REMOVE RESPONSE:", res);
            } else {
                // Active member → remove member
                res = await igpsService.removeMember(member.id);
                console.log("REMOVE RESPONSE:", res);
            }

            if (res.success) {
                refresh?.();
                onClose();
            } else {
                setError(res.error || "Failed to remove");
            }

        } catch (err) {
            setError("Something went wrong");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
                    {isInvite ? "Cancel invite for" : "Remove"} {member?.name}?
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                    Are you sure you want to remove{" "}
                    <span className="font-medium">{member?.email}</span>{" "}
                    from your team?
                </p>

                <p className="text-red-600 text-sm mb-10">
                    {isInvite
                        ? "This invitation will be cancelled."
                        : "This action cannot be undone. The user will lose access to your organisation."
                    }
                </p>

                {/* Buttons */}
                <div className="flex gap-4 mt-30">
                    <button
                        onClick={onClose}
                        className="flex-1 h-14 rounded-2xl border text-gray-700 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        className="flex-1 h-14 rounded-2xl bg-black text-white hover:bg-gray-900 transition"
                        onClick={handleRemove}
                    >
                        {loading ? "Removing..." : "Remove"}
                    </button>

                </div>
                {error && (
                    <p className="text-red-600 text-sm mt-8 ">
                        {error}
                    </p>
                )}
            </div>
        </ModalFrame>
    );
}
