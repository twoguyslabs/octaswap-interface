import { useLocalStorageState } from "ahooks";

export default function useImportedTokenList() {
  const [importedTokenList, setImportedTokenList] = useLocalStorageState<Token[]>("importedTokens", {
    defaultValue: [],
  }) as [Token[], (value: Token[]) => void];

  const handleSetImportedTokenList = (tokens: Token[]) => {
    setImportedTokenList([...(importedTokenList || []), ...tokens]);
  };

  return { importedTokenList, setImportedTokenList, handleSetImportedTokenList };
}
