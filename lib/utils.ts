import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasDecimal(num: number | string): boolean {
  return typeof num === "number" ? num.toString().includes(".") : num.toString().includes(".");
}

export function mergeTokens(tokenList: Token[][]) {
  return tokenList.flat();
}

export function isTokenInList(tokenList: (Token | undefined)[], token: Token | `0x${string}`) {
  const address = typeof token === "string" ? token : token.address;
  return tokenList?.some((t) => t?.address?.toLowerCase() === address?.toLowerCase());
}

export function matchQuery(token: Token | undefined, query: string) {
  const lowerCaseQuery = query.toLowerCase();
  return (
    token?.name?.toLowerCase().includes(lowerCaseQuery) ||
    token?.symbol?.toLowerCase().includes(lowerCaseQuery) ||
    token?.address?.toLowerCase().includes(lowerCaseQuery)
  );
}

export function getTokenByAddress(address: string, tokenList: Token[]) {
  return tokenList.find((token) => token.address === address);
}
