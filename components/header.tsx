import ChainSelector from "./chain-selector";
import AccountButton from "./account-button";

export default function Navigation() {
  return (
    <header className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <span className="text-purple-400">Octa</span>Swap
        </h1>
        <div className="flex items-center gap-2">
          <ChainSelector />
          <AccountButton />
        </div>
      </div>
    </header>
  );
}
