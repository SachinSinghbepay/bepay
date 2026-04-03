// components/CustomSelect.jsx
import { useState, useRef, useEffect } from "react";

export default function CustomSelect({
    options = [],
    placeholder = "Select",
    value,
    onChange,
    className = "",
    searchable = false,
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
    const searchRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [direction, setDirection] = useState("down");
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);
    const selected = normalizedOptions.find(o => o.value === value);

    const filteredOptions = searchable && search.trim()
        ? normalizedOptions.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
        : normalizedOptions;

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
            setSearch("");
            setTimeout(() => searchRef.current?.focus(), 50);
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
                className={`w-full py-4 px-4 text-sm rounded-xl border flex justify-between items-center bg-white focus:outline-none focus:border-gray-200 focus:ring-0 cursor-pointer ${className}`}
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
                    className={`absolute left-0 w-full bg-white rounded-xl shadow-lg border z-50
            ${direction === "down" ? "top-[110%]" : "bottom-[110%]"}
            flex flex-col max-h-[40vh]`}
                >
                    {searchable && (
                        <div className="px-3 pt-3 pb-2 border-b">
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:border-gray-300"
                            />
                        </div>
                    )}
                    <div ref={dropdownRef} className="overflow-y-auto">
                        {filteredOptions.length === 0 ? (
                            <p className="px-4 py-3 text-sm text-gray-400">No results</p>
                        ) : filteredOptions.map((opt) => (
                            <div
                                key={opt.value}
                                className="px-4 py-3 flex items-center gap-3 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    onChange(opt.value);
                                    setOpen(false);
                                    setSearch("");
                                }}
                            >
                                {opt.icon && (
                                    <img src={opt.icon} alt="" className="w-5 h-5" />
                                )}
                                <span>{opt.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div >
    );
}
