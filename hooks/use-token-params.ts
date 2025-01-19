import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useTokenParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const inputCurrency = searchParams.get("inputCurrency");
  const outputCurrency = searchParams.get("outputCurrency");

  const handleSetTokenParam = useCallback(
    (key: "inputCurrency" | "outputCurrency", value: string | null) => {
      if (!value) return;
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  return { inputCurrency, outputCurrency, handleSetTokenParam };
}
