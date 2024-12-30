import { getTokenListUrl } from "@/lib/token-list-url";
import { useState, useEffect } from "react";
import { useChainId } from "wagmi";

export default function useOfficialTokenList() {
  const chainId = useChainId();
  const [officialTokenList, setOfficialTokenList] = useState<Token[]>([]);

  const tokenListUrl = getTokenListUrl(chainId);

  useEffect(() => {
    if (tokenListUrl) {
      const fetchTokens = async () => {
        const response = await fetch(tokenListUrl);
        const data = await response.json();
        setOfficialTokenList(data.tokens);
      };
      fetchTokens();
    }
  }, [tokenListUrl]);

  return officialTokenList;
}
