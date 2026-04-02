"use client";

export default function StepEntitySelect({ onSelect }) {
    return (
        <div className="w-full max-w-xl flex flex-col justify-between">
            <div className="rounded-3xl p-6 py-3">
                <h2 className="text-center text-xl font-bold mb-2">
                    Select Entity Type
                </h2>
                <p className="text-center text-sm text-[#6A6A6A] mb-8">
                    Please select the type of entity you are operating as.
                </p>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => onSelect("international")}
                        className="w-full h-16 rounded-2xl border-2 border-gray-200 hover:border-black transition flex flex-col items-center justify-center gap-1 cursor-pointer"
                    >
                        <span className="font-semibold text-gray-900">International Entity</span>
                        <span className="text-xs text-[#6A6A6A]">Outside India</span>
                    </button>

                    <button
                        onClick={() => onSelect("indian")}
                        className="w-full h-16 rounded-2xl border-2 border-gray-200 hover:border-black transition flex flex-col items-center justify-center gap-1 cursor-pointer"
                    >
                        <span className="font-semibold text-gray-900">Indian Entity</span>
                        <span className="text-xs text-[#6A6A6A]">Based in India</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
