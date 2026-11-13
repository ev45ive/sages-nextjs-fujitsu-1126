"use client";

import { Button } from "@/components/ui/button";
import { useOrder, useOrderAction } from "@/hooks/useOrders";

// Ten sam widok w modalu i na pełnej stronie; mutacja invaliduje ["order", id] i ["orders"]
export function OrderDetailsView({ orderId }: { orderId: string }) {
  const query = useOrder(orderId);
  const action = useOrderAction();

  if (query.isPending) return <p>Ładowanie zamówienia…</p>;
  // 404 z API: cudzy albo nieistniejący numer
  if (query.isError) return <p>Nie znaleziono zamówienia.</p>;

  const order = query.data;

  return (
    <article className="grid gap-3">
      <h1 className="text-xl font-semibold">Zamówienie #{order.id}</h1>
      <p>
        {order.date} · {order.status}
      </p>
      <ul className="grid gap-1">
        {order.items.map((item) => (
          <li key={item.productId}>
            {item.qty} × {item.name} — {item.price} PLN
          </li>
        ))}
      </ul>
      <p className="font-medium">Razem: {order.total} PLN</p>

      {order.status === "Oczekuje" && (
        <div className="flex gap-2">
          <Button disabled={action.isPending} onClick={() => action.mutate({ id: order.id, action: "confirm" })}>
            Potwierdź
          </Button>
          <Button
            variant="outline"
            disabled={action.isPending}
            onClick={() => action.mutate({ id: order.id, action: "cancel" })}
          >
            Anuluj
          </Button>
        </div>
      )}
      {action.isError && <p className="text-red-600">{action.error.message}</p>}
    </article>
  );
}
