import { useEffect, useState, useRef } from "react";

export default function useTokenTriggerWidth() {
  const [tokenTriggerWidth, setTokenTriggerWidth] = useState(0);
  const tokenTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!tokenTriggerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === tokenTriggerRef.current) {
          const newWidth = entry.contentRect.width;
          setTokenTriggerWidth(newWidth);
        }
      }
    });

    resizeObserver.observe(tokenTriggerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { tokenTriggerWidth, tokenTriggerRef };
}
