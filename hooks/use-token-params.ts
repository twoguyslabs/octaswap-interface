import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useTokenParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const inputCurrency = searchParams.get("inputCurrency");
  const outputCurrency = searchParams.get("outputCurrency");

  const handleSetInputCurrency = useCallback(
    (value: string | null) => {
      if (!value) return;
      const params = new URLSearchParams(searchParams.toString());
      params.set("inputCurrency", value);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const handleSetOutputCurrency = useCallback(
    (value: string | null) => {
      if (!value) return;
      const params = new URLSearchParams(searchParams.toString());
      params.set("outputCurrency", value);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  return { inputCurrency, outputCurrency, handleSetInputCurrency, handleSetOutputCurrency };
}
