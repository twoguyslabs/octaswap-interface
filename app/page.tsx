"use client";

import Settings from "@/components/settings";
import SwapBox from "@/components/swap-box";
import Switch from "@/components/switch";
import SwapCore from "@/components/swap-core";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useChainId } from "wagmi";
import { native } from "@/lib/native";

export default function Home() {
  const chainId = useChainId();

  const [settings, setSettings] = useState<SettingsState>({
    slippage: 1,
    deadline: 5,
  });

  const [tokenZero, setTokenZero] = useState<Token | null>(native(chainId));
  const [tokenOne, setTokenOne] = useState<Token | null>(null);

  useEffect(() => {
    setTokenZero(native(chainId));
  }, [chainId]);

  return (
    <main className="mx-auto max-w-md px-4 pt-5 sm:px-0 md:pt-10">
      <div className="space-y-4">
        <div>
          <Settings settings={settings} onSettings={setSettings} />
          <Card>
            <CardContent className="p-0">
              <SwapBox labelHtmlFor="from" labelText="From" token={tokenZero} onSetToken={setTokenZero} />
              <Switch onSetTokenZero={() => setTokenZero(tokenOne)} onSetTokenOne={() => setTokenOne(tokenZero)} />
              <SwapBox labelHtmlFor="to" labelText="To" token={tokenOne} onSetToken={setTokenOne} />
            </CardContent>
          </Card>
        </div>
        <SwapCore />
      </div>
    </main>
  );
}
