import { useEffect, useMemo, useState } from "react";
import { erc20Abi } from "viem";
import { useReadContract } from "wagmi";
import { useChainId } from "wagmi";
export default function useCustomToken(address: string) {
  const chainId = useChainId();
  const [tokens, setTokens] = useState<Token[]>([]);

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

  const token = useMemo(() => {
    if (name && symbol && decimals) {
      return { chainId, address, name, symbol, decimals, logoURI: "" };
    }
  }, [chainId, address, name, symbol, decimals]);

  useEffect(() => {
    if (token) {
      setTokens([token]);
    }
  }, [token]);

  return tokens;
}
