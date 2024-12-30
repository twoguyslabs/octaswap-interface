"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { Button } from "./ui/button";

export default function AccountButton() {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();
  return (
    <Button size="sm" onClick={() => open()} variant={isConnected ? "secondary" : "default"}>
      {isConnected ? address?.slice(0, 4) + "..." + address?.slice(-4) : "Connect"}
    </Button>
  );
}
