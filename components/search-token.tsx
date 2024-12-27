import { BiSearch } from "react-icons/bi";
import { Input } from "./ui/input";

export default function SearchToken() {
  return (
    <div className="relative">
      <BiSearch
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2"
      />
      <Input
        placeholder="Search by name or paste address"
        className="h-12 pl-9 text-sm"
      />
    </div>
  );
}
