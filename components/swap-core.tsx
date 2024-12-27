import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function SwapCore() {
  return (
    <Card>
      <CardContent className="p-4">
        <Button className="w-full">Swap</Button>
      </CardContent>
    </Card>
  );
}
