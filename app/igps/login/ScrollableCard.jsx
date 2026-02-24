"use client";

import { useEffect, useRef } from "react";

export default function ScrollableCard({ children }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = el;

      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        // allow parent scroll
        return;
      }

      // stop bubbling so parent doesn’t scroll
      e.stopPropagation();
    };

    el.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="bg-white rounded-3xl shadow-sm w-full
                 min-h-[450px]
                 max-h-[80vh]
                 overflow-y-auto
                 flex flex-col p-4"
    >
      {children}
    </div>
  );
}