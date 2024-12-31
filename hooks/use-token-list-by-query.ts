import { isTokenInList, matchQuery, mergeTokens } from "@/lib/utils";
import { useMemo } from "react";
import useCustomTokens from "./use-custom-tokens";
import { isAddress, isAddressEqual } from "viem";

export default function useTokenListByQuery(
  searchQuery: string,
  nativeToken: Token[],
  officialTokenList: Token[],
  importedTokenList: Token[],
) {
  const customTokens = useCustomTokens(searchQuery);

  const tokenList = useMemo(() => {
    return mergeTokens([nativeToken, officialTokenList, importedTokenList]);
  }, [nativeToken, officialTokenList, importedTokenList]);

  const tokenListByQuery = useMemo(() => {
    const filteredTokenList = tokenList.filter((token) => matchQuery(token, searchQuery));

    if (isAddress(searchQuery)) {
      if (isTokenInList(filteredTokenList, searchQuery)) {
        return filteredTokenList;
      } else {
        return customTokens.filter((token) => isAddressEqual(token.address as `0x${string}`, searchQuery));
      }
    }

    return filteredTokenList;
  }, [searchQuery, tokenList, customTokens]);

  return { tokenList, tokenListByQuery };
}
