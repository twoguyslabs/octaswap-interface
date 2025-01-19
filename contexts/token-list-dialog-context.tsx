import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface TokenListDialogContextProps {
  tokenParamKey: "inputCurrency" | "outputCurrency" | null;
  onSetTokenParamKey: Dispatch<SetStateAction<"inputCurrency" | "outputCurrency" | null>>;
}

const TokenListDialogContext = createContext<TokenListDialogContextProps | undefined>(undefined);

export function TokenListDialogProvider({ children }: { children: ReactNode }) {
  const [tokenParamKey, setTokenParamKey] = useState<"inputCurrency" | "outputCurrency" | null>(null);

  return (
    <TokenListDialogContext value={{ tokenParamKey, onSetTokenParamKey: setTokenParamKey }}>
      {children}
    </TokenListDialogContext>
  );
}

export function useTokenListDialogContext() {
  const context = useContext(TokenListDialogContext);

  if (!context) {
    throw new Error("useTokenListDialogContext must be used within a TokenListDialogProvider");
  }

  return context;
}
