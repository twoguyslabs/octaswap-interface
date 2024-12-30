import { mergeTokens } from "@/lib/utils";
import useImportedTokenList from "./use-imported-token-list";
import useOfficialTokenList from "./use-official-token-list";
import { useMemo } from "react";
import useCustomTokens from "./use-custom-tokens";
import { isAddress } from "viem";

export default function useTokenListByQuery(searchQuery: string) {
  const officialTokenList = useOfficialTokenList();
  const { importedTokenList } = useImportedTokenList();
  const customTokens = useCustomTokens(searchQuery);

  const tokenList = useMemo(() => {
    return mergeTokens([officialTokenList, importedTokenList]);
  }, [officialTokenList, importedTokenList]);

  const tokenListByQuery = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const address = isAddress(searchQuery);

    const filteredTokenList = tokenList.filter(
      (token) =>
        token?.name?.toLowerCase().includes(lowerCaseQuery) ||
        token?.symbol?.toLowerCase().includes(lowerCaseQuery) ||
        token?.address?.toLowerCase().includes(lowerCaseQuery),
    );

    if (address) {
      const isInTokenList = filteredTokenList.some((token) => token?.address?.toLowerCase().includes(lowerCaseQuery));
      if (isInTokenList) {
        return filteredTokenList;
      } else {
        return customTokens.filter((token) => token?.address?.toLowerCase().includes(lowerCaseQuery));
      }
    }

    return filteredTokenList;
  }, [searchQuery, tokenList, customTokens]);

  return tokenListByQuery;
}
