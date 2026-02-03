"use client"
import { useEffect } from "react";

export default function ScrollArrow({ children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        window.scrollBy({
          top: window.innerHeight,
          behavior: "smooth",
        });
      } else if (e.key === "ArrowUp") {
        window.scrollBy({
          top: -window.innerHeight,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <div>{children}</div>;
}