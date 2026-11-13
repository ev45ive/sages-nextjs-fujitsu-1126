"use client";

import type { CartLine } from "@/lib/cart-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartState = {
  // znormalizowany stan: kolejność w ids, dane w entities (klucz = productId, bez duplikatów)
  ids: string[];
  entities: Record<string, CartLine>;
  // czas ostatniej zmiany; CartSync po nim wybiera wersję lokalną albo serwerową
  updatedAt: number;
  add: (line: Omit<CartLine, "qty">) => void;
  inc: (productId: string) => void;
  dec: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
  replaceAll: (entities: Record<string, CartLine>, updatedAt: number) => void;
};

const MAX_QTY = 99;

// Zwraca część stanu po zmianie ilości; qty poniżej 1 usuwa linię
function changeQty(s: CartState, productId: string, delta: number): Partial<CartState> {
  const line = s.entities[productId];
  if (!line) return {};

  const qty = Math.min(line.qty + delta, MAX_QTY);
  if (qty < 1) return removeLine(s, productId);

  return {
    entities: { ...s.entities, [productId]: { ...line, qty } },
    updatedAt: Date.now(),
  };
}

function removeLine(s: CartState, productId: string): Partial<CartState> {
  const entities = { ...s.entities };
  delete entities[productId];
  return {
    ids: s.ids.filter((id) => id !== productId),
    entities,
    updatedAt: Date.now(),
  };
}

export const useCartStore = create<CartState>()(
  // persist: zapisuje stan w localStorage (klucz cart-v1) i odczytuje go po załadowaniu strony
  persist(
    (set) => ({
      ids: [],
      entities: {},
      updatedAt: 0,
      add: (line) =>
        set((s) => {
          const existing = s.entities[line.productId];
          if (existing) return changeQty(s, line.productId, 1);
          return {
            ids: [...s.ids, line.productId],
            entities: { ...s.entities, [line.productId]: { ...line, qty: 1 } },
            updatedAt: Date.now(),
          };
        }),
      inc: (productId) => set((s) => changeQty(s, productId, 1)),
      dec: (productId) => set((s) => changeQty(s, productId, -1)),
      remove: (productId) => set((s) => removeLine(s, productId)),
      clear: () => set({ ids: [], entities: {}, updatedAt: Date.now() }),
      replaceAll: (entities, updatedAt) =>
        set({ ids: Object.keys(entities), entities, updatedAt }),
    }),
    {
      name: "cart-v1",
      // createJSONStorage: na serwerze brak localStorage, więc zapis jest pomijany bez błędu
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
