import Image from "next/image";
import { useAuth } from "../context/AuthContext";
export default function Profile() {

    const { user, organization, loading } = useAuth();
    if (loading) return <div>Loading...</div>;

        const displayName = organization?.name || user?.organizationName || (user?.firstName ? `${user.firstName} ${user.lastName}` : "User");
        const email = user?.email || "user@example.com"
        const status = user?.isActive ? 'active' : "unverified";
    return (
        <div className="px-8 space-y-8 max-w-full">

            {/* USER CARD */}
            <div className="bg-white rounded-3xl p-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="h-[88px] w-[88px] rounded-3xl bg-[#D1D1D1] p-[2px]">
                        <div className="h-full w-full rounded-3xl overflow-hidden bg-[#B6B6B6]">
                            <Image
                                src="/profile.png"
                                alt="profile"
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-lg font-semibold text-gray-900">
                         {displayName}
                        </p>
                        <p className="text-sm text-gray-500">
                         {email}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-green-100  px-4 py-2 rounded-full text-sm font-medium">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600">
                        <svg
                            className="h-3 w-3 text-white font-semibold"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>

                   {status}
                </div>

            </div>

            {/* SECURITY */}
            <Section>
                <Row
                    title="Change password"
                    desc="Update your password for enhanced security"
                    action="Change password"
                />
                <Divider />
                <Row
                    title="Two-factor authentication (2FA)"
                    desc="Add an extra layer of security to your account."
                    action="Enable two-factor authentication"
                />
            </Section>

            {/* EXPORT DATA */}
            <Section title="Export data">
                <ExportRow title="Export transactions" desc="Download your transaction history" />
                <ExportRow title="Export payees" desc="Download your saved payees" />
                <ExportRow title="Export bank accounts" desc="Download your saved bank accounts" />
            </Section>

            {/* LEGAL */}
            <Section title="Legal">
                <SimpleRow title="Privacy policy" />
                <SimpleRow title="Terms of service" />
            </Section>

        </div>
    );
}

/* ---------- Reusable UI ---------- */

function Section({ title, children }) {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
            {title && (
                <h3 className="text-sm font-semibold text-gray-700">
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}

function Row({ title, desc, action }) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="font-medium text-gray-900">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
            <button className="px-5 py-2 rounded-full bg-black text-white text-sm">
                {action}
            </button>
        </div>
    );
}

function ExportRow({ title, desc }) {
    return (
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
            <div>
                <p className="font-medium text-gray-900">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
            <span className="text-sm text-gray-500">CSV</span>
        </div>
    );
}

function SimpleRow({ title }) {
    return (
        <div className="bg-gray-50 rounded-2xl p-4 font-medium text-gray-900">
            {title}
        </div>
    );
}

function Divider() {
    return <div className="border-t" />;
}
