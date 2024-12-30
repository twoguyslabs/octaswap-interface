import { BiChevronDown, BiQuestionMark, BiSolidWalletAlt } from "react-icons/bi";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import ManageTokensDialog from "./manage-tokens-dialog";
import SearchToken from "./search-token";
import TokenList from "./token-list";
import { ButtonHTMLAttributes, forwardRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import useTokenTriggerWidth from "@/hooks/use-token-trigger-width";
import useTokenBalance from "@/hooks/use-token-balance";
import { formatUnits } from "viem";
import { hasDecimal } from "@/lib/utils";
import useTokenListByQuery from "@/hooks/use-token-list-by-query";

interface SwapBoxProps {
  labelHtmlFor: string;
  labelText: string;
  token: Token | null;
  onSetToken: (token: Token | null) => void;
}

interface TokenTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  token: Token | null;
}

function SwapInput({ tokenTriggerWidth }: { tokenTriggerWidth: number }) {
  const inputPaddingLeft = tokenTriggerWidth + 30;
  return (
    <Input
      placeholder="0.00"
      className="h-20 text-right text-xl font-bold placeholder:text-xl md:text-2xl md:placeholder:text-2xl"
      style={{ paddingLeft: `${inputPaddingLeft}px` }}
    />
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
        <BiQuestionMark className="h-7 w-7 rounded-lg border" />
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

function TokenDialog({
  token,
  onSetToken,
  tokenTriggerRef,
}: {
  token: Token | null;
  onSetToken: (token: Token | null) => void;
  tokenTriggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const tokenListByQuery = useTokenListByQuery(searchQuery);

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
          <TokenList tokens={tokenListByQuery} onSetToken={onSetToken} onOpen={setOpen} />
          <ManageTokensDialog />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SwapBalance({ balance }: { balance: bigint | undefined }) {
  const stringBalance = balance ? formatUnits(balance, 18) : "0";
  const formattedBalance = hasDecimal(stringBalance) ? Number(stringBalance).toFixed(4) : stringBalance;

  return (
    <div className="flex items-center gap-1">
      <div className="text-sm">{formattedBalance}</div>
      <BiSolidWalletAlt size={15} />
    </div>
  );
}

function SwapLabel({ htmlFor, label }: { htmlFor: string; label: string }) {
  return (
    <Label htmlFor={htmlFor} className="text-sm">
      {label}
    </Label>
  );
}

export default function SwapBox({ labelHtmlFor, labelText, token, onSetToken }: SwapBoxProps) {
  const { tokenTriggerWidth, tokenTriggerRef } = useTokenTriggerWidth();
  const balance = useTokenBalance(token);

  return (
    <div className="space-y-3 p-4">
      <div className="flex justify-between">
        <SwapLabel htmlFor={labelHtmlFor} label={labelText} />
        <SwapBalance balance={balance} />
      </div>
      <div className="relative">
        <TokenDialog token={token} onSetToken={onSetToken} tokenTriggerRef={tokenTriggerRef} />
        <SwapInput tokenTriggerWidth={tokenTriggerWidth} />
      </div>
    </div>
  );
}
