import ModalFrame from "./ModalFrame";
import { useEffect, useRef } from "react";

export default function LearnAboutRolesModal({ onClose }) {
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

    return (
        <ModalFrame size="lg">
            <div className="flex flex-col h-[85vh] bg-white rounded-3xl">

                {/* HEADER */}
                <div className="relative flex items-center justify-center px-8 pt-8 pb-6">
                    <h2 className="text-lg font-medium">
                        Learn about roles
                    </h2>

                    <button
                        onClick={onClose}
                        className="absolute right-8 text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                {/* BODY */}

                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-8 pb-8 space-y-8">

                    {/* ROLES SECTION */}
                    <div className="bg-[#F7F7F7] rounded-3xl overflow-hidden">

                        {/* HEADER ROW */}
                        <div className="grid grid-cols-3 px-8 py-5 bg-[#ECECEC] font-medium text-[16px]">
                            <span>Role</span>
                            <span className="col-span-2">Permission</span>
                        </div>

                        {/* ROWS */}
                        <RoleRow
                            role="Owner"
                            description="Full access – can view and manage all features (team, cards, transactions, transfers, wallets)."
                        />

                        <RoleRow
                            role="Admin"
                            description="Full access – same as Owner, except for organization deletion."
                        />

                        <RoleRow
                            role="Manager"
                            description="Can view team, manage cards, view & create transfers, view wallets (but no team management)."
                        />

                        <RoleRow
                            role="Bookkeeper"
                            description="Read-only access – can view team, cards, transactions, transfers, and wallets."
                        />

                        <RoleRow
                            role="Employee"
                            description="Limited access – can only view crypto cards and their own transactions."
                            last
                        />
                    </div>


                    {/* STATUS SECTION */}
                    <div className="bg-[#F7F7F7] rounded-3xl overflow-hidden">

                        {/* HEADER ROW */}
                        <div className="grid grid-cols-3 px-8 py-5 bg-[#ECECEC] font-medium">
                            <span>Status</span>
                            <span className="col-span-2">Description</span>
                        </div>

                        <RoleRow
                            role="Invited"
                            description="User has been invited but hasn't joined the organization yet."
                        />

                        <RoleRow
                            role="Active"
                            description="User has joined and can access the organization."
                        />

                        <RoleRow
                            role="Suspended"
                            description="User's access has been temporarily revoked."
                            last
                        />
                    </div>

                </div>
            </div>
        </ModalFrame>
    );
}


function RoleRow({ role, description, last }) {
    return (
        <div
            className={`
                grid grid-cols-3 px-8 py-6
                ${!last ? "border-b border-[#E4E4E4]" : ""}
            `}
        >
            <span className="font-medium text-[14px]">{role}</span>
            <span className="col-span-2 text-gray-600 text-[14px]">
                {description}
            </span>
        </div>
    );
}
