// Adres json-server z `npm run db` (port 9000)
const API = "http://localhost:9000";

export type User = { id: string; name: string; email: string };

export type OrderItem = { productId: string; name: string; qty: number; price: number };

export type Order = {
  id: string;
  userId: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
};

// Bez "use cache": dane konta są prywatne, więc czytamy je przy każdym żądaniu
export async function getUser(id: string): Promise<User | null> {
  // pusty id zwróciłby całą listę /users, więc odrzucamy go wcześniej
  if (!id) return null;
  const res = await fetch(`${API}/users/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function getOrders(userId: string): Promise<Order[]> {
  if (!userId) return [];
  const res = await fetch(`${API}/orders?userId=${userId}`);
  return res.json();
}

// PATCH zmienia tylko podane pola (status), reszta zamówienia zostaje
export async function patchOrder(id: string, patch: { status: string }): Promise<Order> {
  const res = await fetch(`${API}/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  return res.json();
}

export async function getOrder(id: string): Promise<Order | null> {
  const res = await fetch(`${API}/orders/${id}`);
  if (!res.ok) return null;
  return res.json();
}
