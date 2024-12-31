import { getTokenByAddress } from "@/lib/utils";
import { useEffect, useState } from "react";
import useOfficialTokenList from "./use-official-token-list";

export default function useToken(tokenParam: string | null, asset: Token | undefined = undefined) {
  const initialToken = tokenParam ? undefined : asset;

  const [token, setToken] = useState<Token | undefined>(initialToken);
  const officialTokenList = useOfficialTokenList();

  useEffect(() => {
    if (tokenParam) {
      const token = getTokenByAddress(tokenParam, officialTokenList);
      setToken(token);
    }
  }, [tokenParam, officialTokenList]);

  return { token, setToken };
}
