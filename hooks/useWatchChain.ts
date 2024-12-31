import { config } from "@/config/wagmi";
import { watchChainId } from "@wagmi/core";
import { useEffect } from "react";

export default function useWatchChain() {
  useEffect(() => {
    const unwatch = watchChainId(config, {
      onChange: () => {
        window.location.reload();
        window.location.href = window.location.pathname;
      },
    });

    return () => unwatch();
  }, []);
}
