"use client";

import Link from "next/link";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { BiMenu } from "react-icons/bi";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const menus = [
    {
      label: "Products",
      links: [
        { label: "Trade", href: "/" },
        { label: "Pool", href: "/pool" },
        { label: "Staking", href: "/staking" },
        { label: "Launchpad", href: "/launchpad" },
      ],
    },
    {
      label: "Socials",
      links: [
        { label: "Twitter", href: "https://twitter.com/octaswap" },
        { label: "Telegram", href: "https://t.me/octaswap" },
        { label: "Discord", href: "https://discord.gg/octaswap" },
      ],
    },
    {
      label: "Misc",
      links: [
        { label: "Octa Space Bridge", href: "https://octaswap.xyz/bridge" },
      ],
    },
  ];

  const pathname = usePathname();
  const isActive = (menu: (typeof menus)[0], href: string) =>
    menu.label === "Products" && pathname.includes(href) && "bg-card";
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <span className="text-purple-400">Octa</span>Swap
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" className="fixed bottom-3 right-3">
              <BiMenu style={{ width: "1.5rem", height: "1.5rem" }} />
            </Button>
          </DialogTrigger>
          <DialogContent className="flex h-full max-w-md flex-col justify-center sm:h-fit">
            <DialogHeader>
              <DialogTitle>Navigation Menu</DialogTitle>
              <DialogDescription>
                Navigate to different pages and features
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[400px]">
              {menus.map((menu) => (
                <div className="space-y-3 pt-4" key={menu.label}>
                  <h2 className="font-bold">{menu.label}</h2>
                  <div className="grid">
                    {menu.links.map((link) => (
                      <Link
                        href={link.href}
                        key={link.href}
                        className={cn(
                          "p-3 hover:bg-card",
                          isActive(menu, link.href),
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </DialogContent>
        </Dialog>
        {/* @ts-expect-error Server Component */}
        <appkit-button label="Connect" />
      </div>
    </div>
  );
}
