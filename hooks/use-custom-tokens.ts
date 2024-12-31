import { useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { useReadContract } from "wagmi";
import { useChainId } from "wagmi";
export default function useCustomTokens(address: string) {
  const chainId = useChainId();
  const [customTokens, setCustomTokens] = useState<Token[]>([]);

  const { data: name } = useReadContract({
    abi: erc20Abi,
    address: address as `0x${string}`,
    functionName: "name",
  });

  const { data: symbol } = useReadContract({
    abi: erc20Abi,
    address: address as `0x${string}`,
    functionName: "symbol",
  });

  const { data: decimals } = useReadContract({
    abi: erc20Abi,
    address: address as `0x${string}`,
    functionName: "decimals",
  });

  useEffect(() => {
    if (name && symbol && decimals) {
      setCustomTokens([{ chainId, address, name, symbol, decimals, logoURI: "" }]);
    }
  }, [chainId, address, name, symbol, decimals]);

  return customTokens;
}
