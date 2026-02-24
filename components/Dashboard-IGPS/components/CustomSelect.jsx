// components/CustomSelect.jsx
import { useState, useRef, useEffect } from "react";

export default function CustomSelect({
    options = [],
    placeholder = "Select",
    value,
    onChange
}) {

    const normalizedOptions = options.map((opt) => {
        if (typeof opt === "string") {
            return {
                label: opt,
                value: opt,
                icon: null
            };
        }
        return opt;
    });
    const dropdownRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [direction, setDirection] = useState("down");
    const wrapperRef = useRef(null);
    const selected = normalizedOptions.find(o => o.value === value);;

    useEffect(() => {
        const el = dropdownRef.current;
        if (!el) return;

        const handler = (e) => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            const atTop = scrollTop === 0 && e.deltaY < 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;

            if (!atTop && !atBottom) {
                e.stopPropagation();
                e.preventDefault();
                el.scrollTop += e.deltaY;
            }
        };

        if (open) {
            el.addEventListener("wheel", handler, { passive: false });
        }
        return () => el.removeEventListener("wheel", handler);
    }, [open]);


    const toggle = () => {
        if (!open) {
            const rect = wrapperRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            setDirection(spaceAbove > spaceBelow ? "up" : "down");
        }
        setOpen((v) => !v);
    };
    useEffect(() => {
        const handler = (e) => {
            if (!wrapperRef.current?.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={wrapperRef} className="relative w-full">
            <button
                type="button"
                onClick={toggle}
                className="w-full h-12 rounded-xl border px-4 flex justify-between items-center bg-white"
            >
                {selected ? (
                    <div className="flex items-center gap-2">
                        {selected.icon && (
                            <img src={selected.icon} alt="" className="w-5 h-5" />
                        )}
                        <span className="text-gray-700">
                            {selected.label}
                        </span>
                    </div>
                ) : (
                    <span className="text-[#C0C0C0]">
                        {placeholder}
                    </span>
                )}

                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""
                        }`}
                    viewBox="0 0 24 24"
                >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" />
                </svg>
            </button>

            {open && (
                <div
                    ref={dropdownRef}
                    className={`absolute left-0 w-full bg-white rounded-xl shadow-lg border z-50
            ${direction === "down" ? "top-[110%]" : "bottom-[110%]"}
            max-h-[40vh] overflow-y-auto`}
                >
                    {normalizedOptions.map((opt) => (
                        <div
                            key={opt.value}
                            className="px-4 py-3 flex items-center gap-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                        >
                            {opt.icon && (
                                <img src={opt.icon} alt="" className="w-5 h-5" />
                            )}
                            <span>{opt.label}</span>
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
}
