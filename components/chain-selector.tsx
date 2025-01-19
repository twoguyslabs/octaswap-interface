"use client";

import { useAccount, useChainId } from "wagmi";
import { Button } from "./ui/button";
import Image from "next/image";
import { NATIVE_COIN_DATA } from "@/lib/native";
import { ChevronDownIcon } from "lucide-react";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { cn } from "@/lib/utils";

export default function ChainSelector() {
  const chainId = useChainId();
  const { isConnected } = useAccount();
  const { openChainModal } = useChainModal();

  const chain = NATIVE_COIN_DATA[chainId];
  return (
    <Button variant="secondary" size="sm" onClick={() => openChainModal?.()} className={cn(!isConnected && "hidden")}>
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="relative h-6 w-6">
          <Image src={chain.logoURI} alt={chain.name} fill priority quality={100} />
        </div>
        <div className="flex items-center">
          <span className="hidden font-bold sm:inline-block">{chain.name}</span>
          <ChevronDownIcon style={{ width: "1.2rem", height: "1.2rem" }} />
        </div>
      </div>
    </Button>
  );
}
