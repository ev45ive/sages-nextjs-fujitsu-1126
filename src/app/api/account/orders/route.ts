import { getOrders } from "@/services/AccountAPI";
import { cookies } from "next/headers";

// Route Handler: lista zamówień zalogowanego użytkownika, id bierzemy z cookie, nie z parametru
export async function GET() {
  const userId = (await cookies()).get("session")?.value ?? "";
  if (!userId) return Response.json({ message: "Brak sesji" }, { status: 401 });
  return Response.json(await getOrders(userId));
}
