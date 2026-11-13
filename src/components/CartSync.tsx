"use client";

import type { CartLine } from "@/lib/cart-types";
import { useCartStore } from "@/stores/cartStore";
import { useEffect } from "react";

type ServerCart = { entities: Record<string, CartLine>; updatedAt: number };

// Synchronizacja localStorage <-> serwer: nowsza wersja (updatedAt) wygrywa, lokalne zmiany idą z debounce
export function CartSync() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function push() {
      const { entities, updatedAt } = useCartStore.getState();
      await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entities, updatedAt }),
      });
    }

    async function pull() {
      const res = await fetch("/api/cart");
      if (!res.ok) return;
      const server: ServerCart = await res.json();
      const local = useCartStore.getState();
      if (server.updatedAt > local.updatedAt) {
        local.replaceAll(server.entities, server.updatedAt);
      } else if (local.updatedAt > server.updatedAt) {
        await push();
      }
    }

    // reagujemy tylko na realną zmianę koszyka (updatedAt), nie na każde odświeżenie stanu
    const unsubscribe = useCartStore.subscribe((state, prev) => {
      if (state.updatedAt === prev.updatedAt) return;
      clearTimeout(timer);
      timer = setTimeout(push, 500);
    });

    pull();
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  return null;
}
