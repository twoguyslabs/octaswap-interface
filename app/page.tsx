"use client";

import Settings from "@/components/settings";
import Switch from "@/components/switch";
import SwapCore from "@/components/swap-core";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useChainId } from "wagmi";
import TokenBox from "@/components/token-box";
import useTokenParams from "@/hooks/use-token-params";
import useToken from "@/hooks/use-token";
import { native } from "@/lib/native";
import useWatchChain from "@/hooks/useWatchChain";

export default function Home() {
  const chainId = useChainId();

  const [settings, setSettings] = useState<SettingsState>({
    slippage: 1,
    deadline: 5,
  });

  const { inputCurrency, outputCurrency, handleSetInputCurrency, handleSetOutputCurrency } = useTokenParams();

  const { token: tokenZero, setToken: setTokenZero } = useToken(inputCurrency, native(chainId));
  const { token: tokenOne, setToken: setTokenOne } = useToken(outputCurrency);

  const [amountZero, setAmountZero] = useState("");
  const [amountOne, setAmountOne] = useState("");

  useWatchChain();

  return (
    <main className="mx-auto max-w-md px-4 pt-5 sm:px-0 md:pt-10">
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Settings settings={settings} onSettings={setSettings} />
          <Card>
            <CardContent className="p-0">
              <TokenBox
                labelHtmlFor="from"
                labelText="From"
                onSetTokenParam={handleSetInputCurrency}
                token={tokenZero}
                onSetToken={setTokenZero}
                amount={amountZero}
                onSetAmount={setAmountZero}
              />
              <Switch onSetTokenZero={() => setTokenZero(tokenOne)} onSetTokenOne={() => setTokenOne(tokenZero)} />
              <TokenBox
                labelHtmlFor="to"
                labelText="To"
                onSetTokenParam={handleSetOutputCurrency}
                token={tokenOne}
                onSetToken={setTokenOne}
                amount={amountOne}
                onSetAmount={setAmountOne}
              />
            </CardContent>
          </Card>
        </div>
        <SwapCore />
      </form>
    </main>
  );
}
