"use client";
import { useState, useRef, useEffect } from "react";
import ModalFrame from "./ModalFrame";
import CustomSelect from "../components/CustomSelect";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";


const roleOptions = [
    { label: "Owner", value: "owner" },
    { label: "Admin", value: "admin" },
    { label: "Member", value: "member" },
];

export default function AddTeamMemberModal({
    onClose,
    onBack,
    onSubmit,
    refresh
}) {
    const { igpsService } = useAuth();
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

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const isValid = firstName && lastName && email && role;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const roleOptions = [
        { label: "Owner", value: "owner" },
        { label: "Admin", value: "admin" },
        { label: "Member", value: "member" },
    ];

    const handleInvite = async () => {
        if (!isValid || loading) return;

        setLoading(true);
        setError("");

        try {
            const payload = {
                email: email.trim(),
                role: role,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
            };

            const res = await igpsService.inviteMember(payload);

            if (res.success) {
                refresh?.();
                onClose();
                onSubmit?.({
                    name: `${firstName} ${lastName}`,
                    email,
                    role,
                });
            } else {
                setError(res.error || "Failed to send invitation");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <ModalFrame size="sm">
            <div className="flex flex-col bg-white rounded-3xl">

                {/* HEADER */}
                <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
                    <button
                        className="absolute left-8 text-xl text-gray-500"
                        onClick={onBack}
                    >
                        <Image
                            src="/icons/back.svg"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </button>

                    <h2 className="text-lg font-semibold text-gray-900">
                        Add team member
                    </h2>

                    <button
                        className="absolute right-8 text-xl text-gray-400 hover:text-gray-600"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {/* BODY */}
                <div className="px-8 space-y-6">

                    {/* FIRST + LAST NAME */}
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="First name"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={setFirstName}
                        />
                        <Input
                            label="Last name"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={setLastName}
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="space-y-2">
                        <Input
                            label="Email"
                            placeholder="Enter team member email"
                            value={email}
                            onChange={setEmail}
                        />

                        <p className="text-sm text-gray-500 flex items-center gap-2">
                            <span className="text-gray-400">ⓘ</span>
                            An invitation will be sent to this email address.
                        </p>
                    </div>

                    {/* ROLE */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-600">
                            Role
                        </label>

                        <CustomSelect
                            options={roleOptions}
                            value={role}
                            onChange={setRole}
                            placeholder="Select team member’s role"
                        />
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                            <span className="text-gray-400">ⓘ</span>
                            This determines what permissions the team members will have.
                        </p>
                        {error && (
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                                {error}
                            </div>
                        )}
                    </div>
                </div>

                {/* FOOTER */}
                <div className="px-8 py-8 space-y-4">
                    <button
                        disabled={!isValid}
                        onClick={handleInvite}
                        className={`w-full h-14 rounded-2xl text-white font-medium transition
                        ${isValid ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}
                        `}
                    >
                        {loading ? "Sending..." : "Send invitation"}
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full text-center text-gray-700"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </ModalFrame>
    );
}


/* Reusable Input */
function Input({ label, placeholder, value, onChange }) {
    return (
        <div className="space-y-2">
            <label className="text-sm text-gray-600">
                {label}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full h-14 rounded-2xl border px-4 outline-none text-gray-700"
            />
        </div>
    );
}
