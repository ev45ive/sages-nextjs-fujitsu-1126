import type { CartLine } from "@/lib/cart-types";

export type ServerCart = { entities: Record<string, CartLine>; updatedAt: number };

// Koszyki w pamięci procesu serwera (Map po cartId); restart dev-servera je czyści
const carts = new Map<string, ServerCart>();

export function getServerCart(cartId: string): ServerCart {
  return carts.get(cartId) ?? { entities: {}, updatedAt: 0 };
}

export function saveServerCart(cartId: string, cart: ServerCart) {
  carts.set(cartId, cart);
}
