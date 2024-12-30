import { useLocalStorageState } from "ahooks";

export default function useImportedTokenList() {
  const [importedTokenList, setImportedTokenList] = useLocalStorageState<Token[]>("importedTokens", { defaultValue: [] });

  return { importedTokenList, setImportedTokenList };
}
