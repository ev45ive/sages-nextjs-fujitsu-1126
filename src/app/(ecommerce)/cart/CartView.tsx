"use client";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/useMounted";
import { useCartStore } from "@/stores/cartStore";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Lista koszyka: dane z localStorage, więc renderuje się dopiero po montażu (bez rozjazdu z SSR)
export function CartView() {
  const mounted = useMounted();
  const ids = useCartStore((s) => s.ids);
  const entities = useCartStore((s) => s.entities);
  const inc = useCartStore((s) => s.inc);
  const dec = useCartStore((s) => s.dec);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  if (!mounted) return <p>Ładowanie koszyka…</p>;
  if (ids.length === 0) return <p>Koszyk jest pusty.</p>;

  const total = ids.reduce((sum, id) => sum + entities[id].price * entities[id].qty, 0);

  return (
    <div className="grid gap-4">
      <ul className="grid gap-3">
        {ids.map((id) => {
          const line = entities[id];
          return (
            <li key={id} className="flex items-center gap-4 border p-3">
              <Image
                src={line.image}
                alt={line.name}
                width={64}
                height={64}
                className="size-16 object-cover"
              />
              <span className="flex-1">{line.name}</span>
              <span>{line.price * line.qty} PLN</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" aria-label="Zmniejsz ilość" onClick={() => dec(id)}>
                  <Minus />
                </Button>
                <span className="min-w-8 text-center">{line.qty}</span>
                <Button variant="outline" size="icon" aria-label="Zwiększ ilość" onClick={() => inc(id)}>
                  <Plus />
                </Button>
              </div>
              <Button variant="outline" onClick={() => remove(id)}>
                Usuń
              </Button>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium">Razem: {total} PLN</p>
        <Button render={<Link href="/checkout" />} nativeButton={false}>
          Do kasy
        </Button>
        <Button variant="outline" onClick={clear}>
          Wyczyść koszyk
        </Button>
      </div>
    </div>
  );
}
