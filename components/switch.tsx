import { CgArrowDown } from "react-icons/cg";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function Switch() {
  return (
    <div className="relative">
      <Separator className="mt-7" />
      <Button
        variant="outline"
        size="icon"
        className="absolute left-[45%] top-1/2 -translate-y-[47%] bg-card"
      >
        <CgArrowDown style={{ width: "1.5rem", height: "1.5rem" }} />
      </Button>
    </div>
  );
}
