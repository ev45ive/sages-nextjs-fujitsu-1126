"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartBadge } from "./CartBadge";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/catalog/nowosci", label: "Shop" },
];

export function TopNavigation() {
  const pathname = usePathname();

  return (
    <header className="flex items-center gap-2">
      <nav className="flex items-center gap-1">
        {links.map(({ href, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Button
              key={href}
              variant={active ? "secondary" : "ghost"}
              nativeButton={false}
              render={
                <Link href={href} aria-current={active ? "page" : undefined} />
              }
            >
              {label}
            </Button>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-2 text-sm">
        <Input
          type="search"
          placeholder="Szukaj"
          aria-label="Szukaj produktów"
          className="h-8 w-44"
        />
        <ModeToggle />
        <CartBadge />
        <Link href="/account/orders" className="rounded-md px-3 py-1.5">
          Konto
        </Link>
        <Link href="/login" className="rounded-md px-3 py-1.5">
          Zaloguj
        </Link>
      </div>
    </header>
  );
}
