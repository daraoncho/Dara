import { useEffect, useRef } from "react";

/** Moves focus into a modal and restores it on unmount. */
export function useFocusTrap(isActive) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return undefined;

    const previousFocus = document.activeElement;
    const focusable = containerRef.current.querySelector("button, [href], input, select, textarea");
    focusable?.focus();

    const onKeyDown = (event) => {
      if (event.key !== "Tab" || !containerRef.current) return;

      const elements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previousFocus?.focus) previousFocus.focus();
    };
  }, [isActive]);

  return containerRef;
}
