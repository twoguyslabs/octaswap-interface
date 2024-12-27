import { BiSolidCoinStack } from "react-icons/bi";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TokenListProps {
  text: string;
  onSetToken: (token: Token | null) => void;
  onOpen: (open: boolean) => void;
}

export default function TokenList({
  text,
  onSetToken,
  onOpen,
}: TokenListProps) {
  const tokens: Token[] = [
    {
      name: "Ethereum",
      symbol: "ETH",
      address: null,
      decimals: 18,
      chainId: 1,
      logoURI: "/eth-logo.svg",
    },
    {
      name: "Binance Smart Chain",
      symbol: "BNB",
      address: null,
      decimals: 18,
      chainId: 56,
      logoURI: "/bnb-logo.svg",
    },
    {
      name: "Octa Space",
      symbol: "OCTA",
      address: null,
      decimals: 18,
      chainId: 800001,
      logoURI: "/octa-logo.svg",
    },
  ];

  const handleSelectToken = (token: Token) => {
    onSetToken(token);
    onOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground/70">
        <BiSolidCoinStack size={20} />
        <div className="text-sm font-medium">{text}</div>
      </div>
      <div className="grid">
        <ScrollArea className="h-[250px]">
          {tokens.map((token) => (
            <div
              key={token.symbol}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 px-3 py-4 hover:bg-card",
              )}
              onClick={() => handleSelectToken(token)}
            >
              <div className="flex items-center gap-2.5">
                {token.logoURI && (
                  <div className="relative h-9 w-9">
                    <Image
                      src={token.logoURI}
                      alt={token.symbol}
                      fill
                      priority
                    />
                  </div>
                )}
                <div className="grid justify-items-start">
                  <div className="text-sm font-medium">{token.symbol}</div>
                  <div className="text-xs text-muted-foreground">
                    {token.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
