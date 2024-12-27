import { BiInfoCircle, BiSolidCog } from "react-icons/bi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function Deadline({
  settings,
  onHandleSettings,
}: {
  settings: SettingsState;
  onHandleSettings: (key: keyof typeof settings, value: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <p>Transaction Deadline</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <BiInfoCircle size={17} />
            </TooltipTrigger>
            <TooltipContent className="w-60" sideOffset={5}>
              <p>
                Your transaction will revert if it is left confirming for longer
                than this time.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="grid grid-cols-2 items-center gap-2">
        <div className="relative">
          <p className="absolute right-2 top-1/2 -translate-y-1/2">Minutes</p>
          <Input
            type="text"
            placeholder="5"
            value={settings.deadline}
            onChange={(e) =>
              onHandleSettings("deadline", Number(e.target.value))
            }
          />
        </div>
        <Button
          variant="outline"
          onClick={() => onHandleSettings("deadline", 5)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

function Slippage({
  settings,
  onHandleSettings,
}: {
  settings: SettingsState;
  onHandleSettings: (key: keyof typeof settings, value: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <p className="font-medium">Slippage Tolerance</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <BiInfoCircle size={17} />
            </TooltipTrigger>
            <TooltipContent className="w-60" sideOffset={5}>
              <p>
                Your transaction will revert if the price changes more than the
                slippage percentage.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-card p-2">
        <ToggleGroup
          type="single"
          defaultValue="1"
          className="w-fit"
          onValueChange={(value) => onHandleSettings("slippage", Number(value))}
          value={settings.slippage.toString()}
        >
          <ToggleGroupItem value="0.1">0.1%</ToggleGroupItem>
          <ToggleGroupItem value="0.5">0.5%</ToggleGroupItem>
          <ToggleGroupItem value="1">1%</ToggleGroupItem>
        </ToggleGroup>
        <div className="relative">
          <p className="absolute right-2 top-1/2 -translate-y-1/2">%</p>
          <Input
            type="text"
            placeholder="1"
            value={settings.slippage}
            onChange={(e) =>
              onHandleSettings("slippage", Number(e.target.value))
            }
          />
        </div>
      </div>
    </div>
  );
}

export default function Settings({ settings, onSettings }: SettingsProps) {
  const handleSettings = (key: keyof typeof settings, value: number) => {
    onSettings({ ...settings, [key]: value });
  };
  return (
    <Dialog>
      <div className="text-right">
        <DialogTrigger>
          <BiSolidCog size={23} />
        </DialogTrigger>
      </div>
      <DialogContent
        className="w-[90%] max-w-sm rounded-lg"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Change the settings of the swap</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Slippage settings={settings} onHandleSettings={handleSettings} />
          <Deadline settings={settings} onHandleSettings={handleSettings} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
