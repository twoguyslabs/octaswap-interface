import AccountButton from "./account-button";
import Link from "next/link";
import ChainSelector from "./chain-selector";

export default function Navigation() {
  return (
    <header className="p-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">
            <span className="text-purple-400">Octa</span>Swap
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <ChainSelector />
          <AccountButton />
        </div>
      </div>
    </header>
  );
}
