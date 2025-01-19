"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, getDefaultConfig, RainbowKitProvider as RainbowKit } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, bsc, sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { octaspace } from "@/config/chain";

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains: [
    { ...octaspace, iconUrl: "/octa-logo.svg" },
    { ...mainnet, iconUrl: "/eth-logo.png" },
    { ...bsc, iconUrl: "/bnb-logo.svg" },
    { ...sepolia, iconUrl: "/eth-logo.png" },
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function RainbowKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKit initialChain={octaspace} theme={darkTheme()}>
          {children}
        </RainbowKit>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
