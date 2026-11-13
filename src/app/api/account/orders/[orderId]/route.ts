import { getOrder, patchOrder } from "@/services/AccountAPI";
import { cookies } from "next/headers";
import { z } from "zod";

const ActionSchema = z.object({ action: z.enum(["confirm", "cancel"]) });

// Dozwolone przejścia statusu: tylko z "Oczekuje"
const TRANSITIONS = {
  confirm: { from: "Oczekuje", to: "Potwierdzone" },
  cancel: { from: "Oczekuje", to: "Anulowane" },
} as const;

// Właściciel sprawdzany na serwerze; cudzy i nieistniejący numer dają ten sam wynik (null)
async function ownOrder(orderId: string) {
  const userId = (await cookies()).get("session")?.value;
  const order = await getOrder(orderId);
  if (!order || order.userId !== userId) return null;
  return order;
}

export async function GET(_req: Request, ctx: RouteContext<"/api/account/orders/[orderId]">) {
  const { orderId } = await ctx.params;
  const order = await ownOrder(orderId);
  if (!order) return Response.json({ message: "Not found" }, { status: 404 });
  return Response.json(order);
}

export async function PATCH(request: Request, ctx: RouteContext<"/api/account/orders/[orderId]">) {
  const { orderId } = await ctx.params;
  const order = await ownOrder(orderId);
  if (!order) return Response.json({ message: "Not found" }, { status: 404 });

  // request.json() bywa dowolny, więc akcję sprawdzamy zodem
  const parsed = ActionSchema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ message: "Błędna akcja" }, { status: 400 });

  const rule = TRANSITIONS[parsed.data.action];
  // 409: zamówienie jest już w innym stanie, np. po anulowaniu w drugiej karcie
  if (order.status !== rule.from) {
    return Response.json({ message: `Nie można zmienić statusu: ${order.status}` }, { status: 409 });
  }

  return Response.json(await patchOrder(orderId, { status: rule.to }));
}
