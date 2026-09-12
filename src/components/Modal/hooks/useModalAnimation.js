import { useState, useEffect } from "react";

export function useModalAnimation(isOpen, duration = 200) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);

      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);

      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration]);

  return { shouldRender, isAnimating };
}
