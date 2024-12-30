// Settings types
type SettingsState = {
  slippage: number;
  deadline: number;
};

type SettingsProps = {
  settings: SettingsState;
  onSettings: (settings: SettingsState) => void;
};

// Native coin types
type NativeCoin = {
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
};

type NativeCoinData = {
  [chainId: number]: NativeCoin;
};

// Token types
type Token = {
  chainId: number;
  address: string | null;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
};

// Token list types
type TokenList = Token[] | undefined;

// Swap types
type SwapState = {
  chainId: number;
  selectedTokenA: Token | null;
  selectedTokenB: Token | null;
};
