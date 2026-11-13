"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

      <Input type="search" placeholder="Search" className="ml-auto w-56" />
      <ModeToggle />
      <Button>Login</Button>
    </header>
  );
}
