export const NATIVE_COIN_DATA: NativeCoinData = {
  1: {
    chainId: 1,
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    logoURI: "/eth-logo.png",
  },
  56: {
    chainId: 56,
    name: "BNB Smart Chain",
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
  11155111: {
    chainId: 11155111,
    name: "Sepolia",
    symbol: "ETH",
    decimals: 18,
    logoURI: "/eth-logo.png",
  },
};

export function native(chainId: number | undefined) {
  if (!chainId) {
    return null;
  }

  return {
    ...NATIVE_COIN_DATA[chainId],
    address: null,
  };
}
