"use client";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/useMounted";
import type { CartLine } from "@/lib/cart-types";
import { useCartStore } from "@/stores/cartStore";
import { Minus, Plus } from "lucide-react";

type Product = Omit<CartLine, "qty">;

// Produkt już w koszyku: przycisk zamienia się w licznik -/+ (entities są indeksowane po productId)
export function AddToCartButton(product: Product) {
  const mounted = useMounted();
  const line = useCartStore((s) => s.entities[product.productId]);
  const add = useCartStore((s) => s.add);
  const inc = useCartStore((s) => s.inc);
  const dec = useCartStore((s) => s.dec);

  if (!mounted || !line) {
    return <Button onClick={() => add(product)}>Dodaj do koszyka</Button>;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        aria-label="Zmniejsz ilość"
        onClick={() => dec(product.productId)}
      >
        <Minus />
      </Button>
      <span className="min-w-8 text-center" aria-live="polite">
        {line.qty}
      </span>
      <Button
        variant="outline"
        size="icon"
        aria-label="Zwiększ ilość"
        onClick={() => inc(product.productId)}
      >
        <Plus />
      </Button>
    </div>
  );
}
