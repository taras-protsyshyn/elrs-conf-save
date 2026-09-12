import { useEffect } from "react";

export function useFocusTrap(ref, isActive) {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const modal = ref.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (isActive) {
      ref.current.previousActiveElement = document.activeElement;

      setTimeout(() => {
        if (modal) {
          if (firstFocusable) {
            firstFocusable.focus();
          } else {
            modal.focus();
          }
        }
      }, 0);
    } else {
      if (ref.current.previousActiveElement) {
        ref.current.previousActiveElement.focus();
      }
    }

    const handleTabKey = (event) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleTabKey);

    return () => modal.removeEventListener("keydown", handleTabKey);
  }, [ref, isActive]);
}
