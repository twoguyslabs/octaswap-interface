import { BiChevronDown, BiSolidWalletAlt } from "react-icons/bi";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Image from "next/image";
import useTokenBalance from "@/hooks/use-token-balance";
import { formatUnits } from "viem";
import { hasDecimal } from "@/lib/utils";
import { BsQuestionCircle } from "react-icons/bs";
import { Input } from "./ui/input";
import useButtonWidthRef from "@/hooks/use-button-width-ref";
import { useTokenListDialogContext } from "@/contexts/token-list-dialog-context";
import { forwardRef } from "react";

interface TokenBoxProps {
  labelHtmlFor: string;
  labelText: string;
  token: Token | undefined;
  amount: string;
  onSetAmount: (amount: string) => void;
  onOpenTokenListDialog: (open: boolean) => void;
  tokenParamKey: "inputCurrency" | "outputCurrency";
}

function TokenAmountInput({
  buttonWidth,
  amount,
  onSetAmount,
}: {
  buttonWidth: number;
  amount: string;
  onSetAmount: (amount: string) => void;
}) {
  const inputPaddingLeft = buttonWidth + 30;
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

const TokenListDialogTrigger = forwardRef<
  HTMLButtonElement,
  {
    token: Token | undefined;
    onOpenTokenListDialog: (open: boolean) => void;
    tokenParamKey: "inputCurrency" | "outputCurrency";
  }
>(function TokenListDialogTrigger({ token, onOpenTokenListDialog, tokenParamKey }, ref) {
  const { onSetTokenParamKey } = useTokenListDialogContext();

  const handleClick = () => {
    onOpenTokenListDialog(true);
    onSetTokenParamKey(tokenParamKey);
  };

  return token ? (
    <Button
      variant="ghost"
      className="absolute left-3 top-1/2 z-10 -translate-y-1/2 p-1"
      ref={ref}
      onClick={handleClick}
    >
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
    <Button
      variant="ghost"
      className="absolute left-3 top-1/2 z-10 -translate-y-1/2 p-1"
      ref={ref}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <span className="text-lg font-bold sm:text-xl">Select Token</span>
        <BiChevronDown style={{ width: "1.2rem", height: "1.2rem" }} />
      </div>
    </Button>
  );
});

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
  token,
  amount,
  onSetAmount,
  onOpenTokenListDialog,
  tokenParamKey,
}: TokenBoxProps) {
  const { buttonWidth, buttonRef } = useButtonWidthRef();

  return (
    <div className="space-y-3 p-4">
      <div className="flex justify-between">
        <TokenLabel htmlFor={labelHtmlFor} label={labelText} />
        <TokenBalance token={token} onSetAmount={onSetAmount} />
      </div>
      <div className="relative">
        <TokenListDialogTrigger
          ref={buttonRef}
          token={token}
          onOpenTokenListDialog={onOpenTokenListDialog}
          tokenParamKey={tokenParamKey}
        />
        <TokenAmountInput buttonWidth={buttonWidth} amount={amount} onSetAmount={onSetAmount} />
      </div>
    </div>
  );
}
