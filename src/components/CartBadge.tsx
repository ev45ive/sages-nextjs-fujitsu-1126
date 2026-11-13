"use client";

import { useMounted } from "@/hooks/useMounted";
import { useCartStore } from "@/stores/cartStore";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

// Licznik sumuje qty; przed montażem pokazujemy 0, bo localStorage nie istnieje na serwerze
export function CartBadge() {
  const mounted = useMounted();
  const count = useCartStore((s) =>
    Object.values(s.entities).reduce((n, line) => n + line.qty, 0),
  );
  const shown = mounted ? count : 0;

  return (
    <Link href="/cart" aria-label={`Koszyk, ${shown} szt.`} className="relative flex items-center rounded-md px-3 py-1.5 hover:bg-muted">
      <ShoppingCart className="size-5" />
      {shown > 0 && (
        <span className="absolute -top-1 -right-1 rounded-full bg-red-600 px-1.5 text-xs text-white">
          {shown}
        </span>
      )}
    </Link>
  );
}
