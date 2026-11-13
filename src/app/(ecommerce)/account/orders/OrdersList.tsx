"use client";

import { Button } from "@/components/ui/button";
import { useOrderAction, useOrders } from "@/hooks/useOrders";
import Link from "next/link";

// Lista z react-query: dane przychodzą z /api/account/orders, a akcje odświeżają ten sam klucz ["orders"]
export function OrdersList() {
  const query = useOrders();
  const action = useOrderAction();

  if (query.isPending) return <p>Ładowanie zamówień…</p>;
  if (query.isError) return <p className="text-red-600">Nie udało się pobrać zamówień.</p>;
  if (query.data.length === 0) return <p>Brak zamówień.</p>;

  return (
    <div className="grid gap-2">
      <ul className="grid gap-2">
        {query.data.map((o) => (
          <li key={o.id} className="flex flex-wrap items-center gap-3 border p-3">
            <Link href={`/account/orders/${o.id}`} className="text-blue-600 hover:underline">
              Zamówienie #{o.id}
            </Link>
            <span>
              · {o.date} · {o.status} · {o.total} PLN
            </span>
            {o.status === "Oczekuje" && (
              <span className="ml-auto flex gap-2">
                <Button
                  size="sm"
                  disabled={action.isPending}
                  onClick={() => action.mutate({ id: o.id, action: "confirm" })}
                >
                  Potwierdź
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={action.isPending}
                  onClick={() => action.mutate({ id: o.id, action: "cancel" })}
                >
                  Anuluj
                </Button>
              </span>
            )}
          </li>
        ))}
      </ul>
      {action.isError && <p className="text-red-600">{action.error.message}</p>}
    </div>
  );
}
