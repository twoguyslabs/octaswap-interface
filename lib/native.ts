export const NATIVE_COIN_DATA: NativeCoinData = {
  1: {
    chainId: 1,
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    logoURI: "/eth-logo.svg",
  },
  56: {
    chainId: 56,
    name: "Binance Smart Chain",
    symbol: "BNB",
    decimals: 18,
    logoURI: "/bnb-logo.svg",
  },
  800001: {
    chainId: 800001,
    name: "Octa Space",
    symbol: "OCTA",
    decimals: 18,
    logoURI: "/octa-logo.svg",
  },
};

export function native(chainId: number | undefined) {
  if (!chainId) return null;

  return {
    ...NATIVE_COIN_DATA[chainId],
    address: null,
  };
}
