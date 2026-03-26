"use client";

import ProfileMenu from "../components/ProfileMenu";

export default function TopHeader({ title, onProfileClick, onMenuClick }) {
    const titleMap = {
        dashboard: "Overview",
        banking: "Virtual Account",
        beneficiary: "Beneficiaries",
        payment: "Payment requests",
        team: "Team",
        invite: "Invite",
        profile: "Profile",
    };

    return (
        <div className="flex items-center justify-between px-4 lg:px-8 pt-0 pb-6 min-w-0">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden text-2xl"
                >
                    ☰
                </button>

                <h2 className="text-md sm:text-lg font-semibold text-[#6A6A6A]">
                    {titleMap[title] || "Overview"}
                </h2>
            </div>

            <ProfileMenu onProfile={onProfileClick} />
        </div>
    );
}
