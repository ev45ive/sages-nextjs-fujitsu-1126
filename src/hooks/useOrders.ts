"use client";

import type { Order } from "@/services/AccountAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Klucze zapytań: ["orders"] to lista, ["order", id] to szczegóły; invalidacja działa osobno dla każdego
export const ordersKey = ["orders"] as const;
export const orderKey = (id: string) => ["order", id] as const;

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `HTTP ${res.status}`);
  }
  return res.json();
}

export function useOrders() {
  return useQuery({
    queryKey: ordersKey,
    queryFn: () => fetchJson<Order[]>("/api/account/orders"),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: orderKey(id),
    queryFn: () => fetchJson<Order>(`/api/account/orders/${id}`),
  });
}

export type OrderAction = "confirm" | "cancel";

export function useOrderAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: OrderAction }) =>
      fetchJson<Order>(`/api/account/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      }),
    onSuccess: (_order, { id }) => {
      // invalidateQueries: lista i szczegóły tego zamówienia są oznaczone jako nieaktualne, więc ponownie się pobiorą
      queryClient.invalidateQueries({ queryKey: ordersKey });
      queryClient.invalidateQueries({ queryKey: orderKey(id) });
    },
  });
}
