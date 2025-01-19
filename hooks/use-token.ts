import { useState } from "react";

type TokenParam = string | null;

export default function useToken(asset: Token | TokenParam | undefined = undefined) {
  const [token, setToken] = useState<Token | undefined>();

  return { token, setToken };
}
