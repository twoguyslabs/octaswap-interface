"use client";

import { Button } from "./ui/button";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function AccountButton() {
  const { isConnected, address } = useAccount();

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  const handleConnect = () => {
    if (isConnected) {
      openAccountModal?.();
    } else {
      openConnectModal?.();
    }
  };
  return (
    <Button size="sm" onClick={handleConnect} variant={isConnected ? "secondary" : "default"}>
      {isConnected ? address?.slice(0, 4) + "..." + address?.slice(-4) : "Connect"}
    </Button>
  );
}
