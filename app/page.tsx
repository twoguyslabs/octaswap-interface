"use client";

import Settings from "@/components/settings";
import Switch from "@/components/switch";
import SwapCore from "@/components/swap-core";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import TokenBox from "@/components/token-box";
import useTokenParams from "@/hooks/use-token-params";
import useToken from "@/hooks/use-token";
import { native } from "@/lib/native";
import TokenListDialog from "@/components/token-list-dialog";
import { TokenListDialogProvider } from "@/contexts/token-list-dialog-context";
import { useAccount } from "wagmi";

export default function Home() {
  const { chainId } = useAccount();

  const [settings, setSettings] = useState<SettingsState>({
    slippage: 1,
    deadline: 5,
  });

  const { inputCurrency, outputCurrency, handleSetTokenParam } = useTokenParams();

  const { token: tokenZero, setToken: setTokenZero } = useToken(initia);
  const { token: tokenOne, setToken: setTokenOne } = useToken();

  const [amountZero, setAmountZero] = useState("");
  const [amountOne, setAmountOne] = useState("");

  const [openTokenListDialog, setOpenTokenListDialog] = useState(false);

  useEffect(() => {
    console.log("chainId", chainId);
  }, [chainId]);

  return (
    <main className="mx-auto max-w-md px-4 pt-5 sm:px-0 md:pt-10">
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Settings settings={settings} onSettings={setSettings} />
          <Card>
            <CardContent className="p-0">
              <TokenListDialogProvider>
                <TokenBox
                  labelHtmlFor="from"
                  labelText="From"
                  token={tokenZero}
                  amount={amountZero}
                  onSetAmount={setAmountZero}
                  onOpenTokenListDialog={setOpenTokenListDialog}
                  tokenParamKey="inputCurrency"
                />
                <Switch onSetTokenZero={() => setTokenZero(tokenOne)} onSetTokenOne={() => setTokenOne(tokenZero)} />
                <TokenBox
                  labelHtmlFor="to"
                  labelText="To"
                  token={tokenOne}
                  amount={amountOne}
                  onSetAmount={setAmountOne}
                  onOpenTokenListDialog={setOpenTokenListDialog}
                  tokenParamKey="outputCurrency"
                />
                <TokenListDialog
                  onSetTokenParam={handleSetTokenParam}
                  onSetTokenZero={setTokenZero}
                  onSetTokenOne={setTokenOne}
                  openTokenListDialog={openTokenListDialog}
                  onOpenTokenListDialog={setOpenTokenListDialog}
                />
              </TokenListDialogProvider>
            </CardContent>
          </Card>
        </div>
        <SwapCore />
      </form>
    </main>
  );
}
