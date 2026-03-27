import { useState, useRef, useEffect } from "react";

export default function MultiSelect({
  options = [],
  value = [],
  onChange,
  placeholder = "Select..."
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const removeChip = (option) => {
    onChange(value.filter((v) => v !== option));
  };

  return (
    <div ref={containerRef} className="relative">
      {/* SELECT BOX */}
      <div
        onClick={() => setOpen(!open)}
        className="w-full rounded-xl border px-4 h-[54px] flex items-center gap-2 cursor-pointer overflow-hidden"
      >
        {value.length === 0 && (
          <span className="text-sm text-[#C0C0C0] flex-1">{placeholder}</span>
        )}

        {value.length > 0 && (
          <div className="flex items-center gap-2 flex-1 overflow-hidden">
            {value.map((item) => (
              <div
                key={item}
                className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm whitespace-nowrap shrink-0"
              >
                {item}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeChip(item);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => toggleOption(option)}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <span>{option}</span>
              {value.includes(option) && (
                <span className="text-black">✔</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
