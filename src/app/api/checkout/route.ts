import { checkoutSchema } from "@/lib/checkout-schema";
import { getProductPrice } from "@/services/CatalogAPI";
import { cookies } from "next/headers";
import { z } from "zod";

// Adres json-server z `npm run db` (port 9000)
const API = "http://localhost:9000";

const ItemsSchema = z
  .array(z.object({ productId: z.string(), qty: z.number().int().min(1).max(99) }))
  .min(1, { error: "Koszyk jest pusty" });

// Route Handler: klient wysyła dane formularza i pozycje koszyka, kwoty liczy serwer
export async function POST(request: Request) {
  const userId = (await cookies()).get("session")?.value;
  if (!userId) {
    return Response.json({ message: "Zaloguj się, aby złożyć zamówienie" }, { status: 401 });
  }

  // request.json() zwraca dowolne dane, więc formularz i koszyk walidujemy zodem
  const body = await request.json();
  const form = checkoutSchema.safeParse(body);
  if (!form.success) {
    return Response.json(
      { message: "Popraw dane formularza", fieldErrors: z.flattenError(form.error).fieldErrors },
      { status: 400 },
    );
  }

  const items = ItemsSchema.safeParse(body.items);
  if (!items.success) {
    return Response.json({ message: items.error.issues[0]?.message }, { status: 400 });
  }

  // cena z aktualnego produktu w json-server, a nie z klienta (C37: kwotę liczy serwer)
  const lines = [];
  for (const item of items.data) {
    const product = await getProductPrice(item.productId);
    if (!product) {
      return Response.json({ message: `Produkt ${item.productId} nie istnieje` }, { status: 400 });
    }
    lines.push({ productId: product.id, name: product.name, price: product.price, qty: item.qty });
  }
  const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0);

  // POST bez id: json-server sam nadaje identyfikator zamówienia
  const res = await fetch(`${API}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      date: new Date().toISOString().slice(0, 10),
      status: "Oczekuje",
      total,
      items: lines,
      checkout: form.data,
    }),
  });
  const order = await res.json();
  return Response.json({ orderId: order.id }, { status: 201 });
}
