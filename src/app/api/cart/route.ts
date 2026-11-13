import { getServerCart, saveServerCart } from "@/services/CartStore";
import { cookies } from "next/headers";
import { z } from "zod";

const CartLineSchema = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  qty: z.number().int().min(1).max(99),
});

type CartLineSchema = z.infer<typeof CartLineSchema>;

const PutBodySchema = z.object({
  entities: z.record(z.string(), CartLineSchema),
  updatedAt: z.number(),
});

// cookies() w Route Handler: ustawia anonimowy identyfikator koszyka, jeśli go jeszcze nie ma
async function getCartId() {
  const store = await cookies();
  let cartId = store.get("cartId")?.value;
  if (!cartId) {
    cartId = crypto.randomUUID();
    store.set("cartId", cartId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return cartId;
}

export async function GET() {
  const cartId = await getCartId();
  return Response.json(getServerCart(cartId));
}

export async function PUT(request: Request) {
  const cartId = await getCartId();
  // request.json() może zwrócić dowolne dane, więc body sprawdzamy zodem przed zapisem
  const parsed = PutBodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ message: "Błędny koszyk" }, { status: 400 });
  }
  saveServerCart(cartId, parsed.data);
  return Response.json(parsed.data);
}
