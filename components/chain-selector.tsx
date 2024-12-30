"use client";

import { useChainId } from "wagmi";
import { Button } from "./ui/button";
import Image from "next/image";
import { NATIVE_COIN_DATA } from "@/lib/native";
import { ChevronDownIcon } from "lucide-react";
import { useAppKit } from "@reown/appkit/react";

export default function ChainSelector() {
  const chainId = useChainId();
  const { open } = useAppKit();

  const chain = NATIVE_COIN_DATA[chainId];
  return (
    <Button variant="secondary" size="sm" onClick={() => open({ view: "Networks" })}>
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
