"use client";

import ProfileMenu from "../components/ProfileMenu";

export default function TopHeader({ title, onProfileClick }) {
    const titleMap = {
        dashboard: "Overview",
        banking: "Banking",
        beneficiary: "Beneficiaries",
        team: "Team",
        invite: "Invite",
        profile: "Profile",
    };

    return (
        <div className="flex items-center justify-between px-8 pt-0 pb-6">
            <h2 className="text-lg font-semibold text-[#6A6A6A]">
                {titleMap[title] || "Overview"}
            </h2>

            <ProfileMenu onProfile={onProfileClick} />
        </div>
    );
}
