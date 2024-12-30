import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasDecimal(num: number | string): boolean {
  return typeof num === "number" ? num.toString().includes(".") : num.toString().includes(".");
}

export function mergeTokens(tokenList: TokenList[]) {
  return tokenList.flat();
}
