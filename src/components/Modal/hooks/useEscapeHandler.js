import { useEffect } from "react";

export function useEscapeHandler(onEscape) {
  useEffect(() => {
    if (!onEscape) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onEscape();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onEscape]);
}
