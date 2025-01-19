import useImportedTokenList from "@/hooks/use-imported-token-list";
import useOfficialTokenList from "@/hooks/use-official-token-list";
import useTokenListByQuery from "@/hooks/use-token-list-by-query";
import { native } from "@/lib/native";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useChainId } from "wagmi";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { BiSearch, BiSolidCoinStack, BiTrash } from "react-icons/bi";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { isTokenInList } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import { BsQuestionCircle } from "react-icons/bs";
import { Button } from "./ui/button";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./ui/tabs";
import { useTokenListDialogContext } from "@/contexts/token-list-dialog-context";

interface TokenListDialogProps {
  onSetTokenParam: (key: "inputCurrency" | "outputCurrency", value: string | null) => void;
  onSetTokenZero: (token: Token | undefined) => void;
  onSetTokenOne: (token: Token | undefined) => void;
  openTokenListDialog: boolean;
  onOpenTokenListDialog: (open: boolean) => void;
}

interface SearchTokenProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

interface TokenListProps {
  tokenList: Token[];
  tokenListByQuery: Token[];
  onSetTokenParam: (key: "inputCurrency" | "outputCurrency", value: string | null) => void;
  onSetTokenZero: (token: Token | undefined) => void;
  onSetTokenOne: (token: Token | undefined) => void;
  onSetImportedTokenList: (tokens: Token[]) => void;
  onOpenTokenListDialog: (open: boolean) => void;
}

interface ManageTokensDialogProps {
  importedTokenList: Token[] | undefined;
  onSetImportedTokenList: (tokens: Token[]) => void;
}

interface ImportedTokenListProps {
  importedTokenList: Token[] | undefined;
  onSetImportedTokenList: (tokens: Token[]) => void;
}

function ImportedTokenList({ importedTokenList, onSetImportedTokenList }: ImportedTokenListProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground/70">
        <BiSolidCoinStack size={20} />
        <div className="text-sm font-medium">Imported Tokens</div>
      </div>
      <div className="grid">
        <ScrollArea className="h-[250px]">
          {importedTokenList?.map((token) => (
            <div
              key={token?.symbol}
              className={cn("flex cursor-pointer items-center justify-between gap-2.5 px-3 py-4 hover:bg-card")}
            >
              <div className="flex items-center gap-2.5">
                {token?.logoURI ? (
                  <div className="relative h-9 w-9">
                    <Image src={token.logoURI} alt={token.symbol} fill priority />
                  </div>
                ) : (
                  <BsQuestionCircle className="h-9 w-9 rounded-lg" />
                )}
                <div className="grid justify-items-start">
                  <div className="text-sm font-medium">{token?.symbol}</div>
                  <div className="text-xs text-muted-foreground">{token?.name}</div>
                </div>
              </div>
              <div>
                <Button variant="destructive" size="icon" onClick={() => onSetImportedTokenList([])}>
                  <BiTrash />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}

function ManageTokensDialog({ importedTokenList, onSetImportedTokenList }: ManageTokensDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="w-full">
          Manage Tokens
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-full max-w-md flex-col justify-center sm:h-fit">
        <DialogHeader>
          <DialogTitle>Manage Tokens</DialogTitle>
          <DialogDescription>Manage token lists or tokens you import</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="tokens">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lists" disabled>
              Lists
            </TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
          </TabsList>
          <TabsContent value="lists">Coming Soon</TabsContent>
          <TabsContent value="tokens" className="mt-5 space-y-5">
            <Input placeholder="Search by address" className="text-sm" />
            <ImportedTokenList importedTokenList={importedTokenList} onSetImportedTokenList={onSetImportedTokenList} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function TokenList({
  tokenList,
  tokenListByQuery,
  onSetTokenParam,
  onSetTokenZero,
  onSetTokenOne,
  onSetImportedTokenList,
  onOpenTokenListDialog,
}: TokenListProps) {
  const { tokenParamKey } = useTokenListDialogContext();

  const handleSelectToken = (token: Token | undefined) => {
    if (!token || !tokenParamKey) return;

    if (tokenParamKey === "inputCurrency") {
      onSetTokenZero(token);
    } else {
      onSetTokenOne(token);
    }

    if (!isTokenInList(tokenList || [], token)) {
      onSetImportedTokenList([token]);
    }

    onSetTokenParam(tokenParamKey, token.address);
    onOpenTokenListDialog(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground/70">
        <BiSolidCoinStack size={20} />
        <div className="text-sm font-medium">Tokens</div>
      </div>
      <div className="grid">
        <ScrollArea className="h-[250px]">
          {tokenListByQuery.map((token) => (
            <div
              key={token?.symbol}
              className={cn("flex cursor-pointer items-center gap-2.5 px-3 py-4 hover:bg-card")}
              onClick={() => handleSelectToken(token)}
            >
              <div className="flex items-center gap-2.5">
                {token?.logoURI ? (
                  <div className="relative h-9 w-9">
                    <Image src={token.logoURI} alt={token.symbol} fill priority />
                  </div>
                ) : (
                  <BsQuestionCircle className="h-9 w-9 rounded-lg" />
                )}
                <div className="grid justify-items-start">
                  <div className="text-sm font-medium">{token?.symbol}</div>
                  <div className="text-xs text-muted-foreground">{token?.name}</div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}

function SearchToken({ searchQuery, setSearchQuery }: SearchTokenProps) {
  return (
    <div className="relative">
      <BiSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2" />
      <Input
        placeholder="Search by name or paste address"
        className="h-12 pl-9 text-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default function TokenListDialog({
  onSetTokenParam,
  onSetTokenZero,
  onSetTokenOne,
  openTokenListDialog,
  onOpenTokenListDialog,
}: TokenListDialogProps) {
  const chainId = useChainId();
  const [searchQuery, setSearchQuery] = useState("");

  const nativeToken = [native(chainId)];
  const officialTokenList = useOfficialTokenList();
  const { importedTokenList, setImportedTokenList, handleSetImportedTokenList } = useImportedTokenList();

  const { tokenList, tokenListByQuery } = useTokenListByQuery(
    searchQuery,
    nativeToken,
    officialTokenList,
    importedTokenList,
  );

  const handleOpenChange = (open: boolean) => {
    onOpenTokenListDialog(open);
    setSearchQuery("");
  };

  return (
    <Dialog open={openTokenListDialog} onOpenChange={handleOpenChange}>
      <DialogContent className="flex h-full max-w-md flex-col justify-center border sm:h-fit">
        <DialogHeader>
          <DialogTitle>Token List</DialogTitle>
          <DialogDescription>Select a token to swap</DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          <SearchToken searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <TokenList
            tokenList={tokenList}
            tokenListByQuery={tokenListByQuery}
            onSetTokenParam={onSetTokenParam}
            onSetTokenZero={onSetTokenZero}
            onSetTokenOne={onSetTokenOne}
            onSetImportedTokenList={handleSetImportedTokenList}
            onOpenTokenListDialog={onOpenTokenListDialog}
          />
          <ManageTokensDialog importedTokenList={importedTokenList} onSetImportedTokenList={setImportedTokenList} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
