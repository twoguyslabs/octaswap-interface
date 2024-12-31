import { BiChevronDown, BiSolidWalletAlt, BiTrash } from "react-icons/bi";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ButtonHTMLAttributes, forwardRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import useTokenTriggerWidth from "@/hooks/use-token-trigger-width";
import useTokenBalance from "@/hooks/use-token-balance";
import { formatUnits } from "viem";
import { cn, hasDecimal, isTokenInList } from "@/lib/utils";
import useTokenListByQuery from "@/hooks/use-token-list-by-query";
import { BsQuestionCircle } from "react-icons/bs";
import useImportedTokenList from "@/hooks/use-imported-token-list";
import useOfficialTokenList from "@/hooks/use-official-token-list";
import { BiSearch } from "react-icons/bi";
import { Input } from "./ui/input";
import { BiSolidCoinStack } from "react-icons/bi";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { native } from "@/lib/native";
import { useChainId } from "wagmi";

interface TokenBoxProps {
  labelHtmlFor: string;
  labelText: string;
  onSetTokenParam: (value: string | null) => void;
  token: Token | undefined;
  onSetToken: (token: Token | undefined) => void;
  amount: string;
  onSetAmount: (amount: string) => void;
}

interface TokenTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  token: Token | undefined;
}

interface TokenDialogProps {
  onSetTokenParam: (value: string | null) => void;
  token: Token | undefined;
  onSetToken: (token: Token | undefined) => void;
  tokenTriggerRef: React.RefObject<HTMLButtonElement | null>;
}

interface TokenListProps {
  tokenList: Token[];
  tokenListByQuery: Token[];
  onSetTokenParam: (value: string | null) => void;
  onSetToken: (token: Token | undefined) => void;
  onSetImportedTokenList: (tokens: Token[]) => void;
  onOpen: (open: boolean) => void;
}

function TokenAmountInput({
  tokenTriggerWidth,
  amount,
  onSetAmount,
}: {
  tokenTriggerWidth: number;
  amount: string;
  onSetAmount: (amount: string) => void;
}) {
  const inputPaddingLeft = tokenTriggerWidth + 30;
  return (
    <Input
      placeholder="0.00"
      className="h-20 text-right text-xl font-bold placeholder:text-xl md:text-2xl md:placeholder:text-2xl"
      style={{ paddingLeft: `${inputPaddingLeft}px` }}
      value={amount}
      onChange={(e) => onSetAmount(e.target.value)}
      pattern="^[0-9]+(\.[0-9]+)?$"
      title="Only numbers and decimals are allowed"
    />
  );
}

function ImportedTokenList({
  importedTokenList,
  onSetImportedTokenList,
}: {
  importedTokenList: Token[] | undefined;
  onSetImportedTokenList: (tokens: Token[]) => void;
}) {
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

function ManageTokensDialog({
  importedTokenList,
  onSetImportedTokenList,
}: {
  importedTokenList: Token[] | undefined;
  onSetImportedTokenList: (tokens: Token[]) => void;
}) {
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
  onSetToken,
  onSetImportedTokenList,
  onOpen,
}: TokenListProps) {
  const handleSelectToken = (token: Token | undefined) => {
    if (!token) return;

    onSetTokenParam(token.address);
    onSetToken(token);
    onOpen(false);

    if (!isTokenInList(tokenList || [], token)) {
      onSetImportedTokenList([token]);
    }
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

function SearchToken({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
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

const TokenTrigger = forwardRef<HTMLButtonElement, TokenTriggerProps>(function TokenTrigger({ token, ...props }, ref) {
  return token ? (
    <Button ref={ref} variant="ghost" className="absolute left-3 top-1/2 z-10 -translate-y-1/2 p-1" {...props}>
      {token.logoURI ? (
        <div className="relative h-7 w-7">
          <Image src={token.logoURI} alt={token.name} quality={100} fill priority />
        </div>
      ) : (
        <BsQuestionCircle style={{ width: "1.75rem", height: "1.75rem" }} />
      )}
      <div className="flex items-center">
        <span className="text-lg font-bold sm:text-xl">{token.symbol}</span>
        <BiChevronDown style={{ width: "1.2rem", height: "1.2rem" }} />
      </div>
    </Button>
  ) : (
    <Button ref={ref} variant="ghost" className="absolute left-3 top-1/2 z-10 -translate-y-1/2 p-1" {...props}>
      <div className="flex items-center">
        <span className="text-lg font-bold sm:text-xl">Select Token</span>
        <BiChevronDown style={{ width: "1.2rem", height: "1.2rem" }} />
      </div>
    </Button>
  );
});

function TokenDialog({ onSetTokenParam, token, onSetToken, tokenTriggerRef }: TokenDialogProps) {
  const chainId = useChainId();

  const [open, setOpen] = useState(false);
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

  // const tkn = useTokenByParams(tokenParam, token, tokenList);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <TokenTrigger token={token} ref={tokenTriggerRef} />
      </DialogTrigger>
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
            onSetToken={onSetToken}
            onSetImportedTokenList={handleSetImportedTokenList}
            onOpen={setOpen}
          />
          <ManageTokensDialog importedTokenList={importedTokenList} onSetImportedTokenList={setImportedTokenList} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TokenBalance({ token, onSetAmount }: { token: Token | undefined; onSetAmount: (amount: string) => void }) {
  const balance = useTokenBalance(token);

  const stringBalance = balance ? formatUnits(balance, 18) : "0";
  const formattedBalance = hasDecimal(stringBalance) ? Number(stringBalance).toFixed(4) : stringBalance;

  return (
    <div className="flex items-center gap-1">
      <button type="button" onClick={() => onSetAmount(formattedBalance)}>
        {formattedBalance}
      </button>
      <BiSolidWalletAlt size={17} />
    </div>
  );
}

function TokenLabel({ htmlFor, label }: { htmlFor: string; label: string }) {
  return <Label htmlFor={htmlFor}>{label}</Label>;
}

export default function TokenBox({
  labelHtmlFor,
  labelText,
  onSetTokenParam,
  token,
  onSetToken,
  amount,
  onSetAmount,
}: TokenBoxProps) {
  const { tokenTriggerWidth, tokenTriggerRef } = useTokenTriggerWidth();

  return (
    <div className="space-y-3 p-4">
      <div className="flex justify-between">
        <TokenLabel htmlFor={labelHtmlFor} label={labelText} />
        <TokenBalance token={token} onSetAmount={onSetAmount} />
      </div>
      <div className="relative">
        <TokenDialog
          onSetTokenParam={onSetTokenParam}
          token={token}
          onSetToken={onSetToken}
          tokenTriggerRef={tokenTriggerRef}
        />
        <TokenAmountInput tokenTriggerWidth={tokenTriggerWidth} amount={amount} onSetAmount={onSetAmount} />
      </div>
    </div>
  );
}
