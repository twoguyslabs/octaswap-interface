import { useEffect, useState, useRef } from "react";

export default function useButtonWidthRef() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    if (!buttonRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === buttonRef.current) {
          const newWidth = entry.contentRect.width;
          setButtonWidth(newWidth);
        }
      }
    });

    resizeObserver.observe(buttonRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { buttonRef, buttonWidth };
}
