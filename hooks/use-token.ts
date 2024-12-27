import { useState } from "react";

export default function useToken(value: Token | null) {
  const [token, setToken] = useState<Token | null>(value);

  return { token, setToken };
}
