import { BiChevronDown, BiSolidWalletAlt } from "react-icons/bi";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import ManageTokensDialog from "./manage-tokens-dialog";
import SearchToken from "./search-token";
import TokenList from "./token-list";
import { useState } from "react";

interface SwapBoxProps {
  labelHtmlFor: string;
  labelText: string;
  token: Token | null;
  onSetToken: (token: Token | null) => void;
}

function SwapInput() {
  return (
    <Input
      placeholder="0.00"
      className="h-20 text-right text-xl font-bold placeholder:text-xl md:text-2xl md:placeholder:text-2xl"
    />
  );
}

function TokenDialog({
  token,
  onSetToken,
}: {
  token: Token | null;
  onSetToken: (token: Token | null) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {token ? (
          <Button
            variant="ghost"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 p-1"
          >
            {token.logoURI && (
              <div className="relative h-7 w-7">
                <Image
                  src={token.logoURI}
                  alt={token.name}
                  quality={100}
                  fill
                  priority
                />
              </div>
            )}
            <div className="flex items-center">
              <span className="text-lg font-bold sm:text-xl">
                {token.symbol}
              </span>
              <BiChevronDown style={{ width: "1.2rem", height: "1.2rem" }} />
            </div>
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 p-1"
          >
            <div className="flex items-center">
              <span className="text-lg font-bold sm:text-xl">Select Token</span>
              <BiChevronDown style={{ width: "1.2rem", height: "1.2rem" }} />
            </div>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="flex h-full max-w-md flex-col justify-center border sm:h-fit">
        <DialogHeader>
          <DialogTitle>Token List</DialogTitle>
          <DialogDescription>Select a token to swap</DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          <SearchToken />
          <TokenList text="Tokens" onSetToken={onSetToken} onOpen={setOpen} />
          <ManageTokensDialog />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SwapBalance() {
  return (
    <div className="flex items-center gap-1">
      <BiSolidWalletAlt size={15} />
      <div className="text-sm">0</div>
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

export default function SwapBox({
  labelHtmlFor,
  labelText,
  token,
  onSetToken,
}: SwapBoxProps) {
  return (
    <div className="space-y-3 p-4">
      <div className="flex justify-between">
        <SwapLabel htmlFor={labelHtmlFor} label={labelText} />
        <SwapBalance />
      </div>
      <div className="relative">
        <TokenDialog token={token} onSetToken={onSetToken} />
        <SwapInput />
      </div>
    </div>
  );
}
