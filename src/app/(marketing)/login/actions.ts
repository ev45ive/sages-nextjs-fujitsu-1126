"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Server Action: wywoływana z formularza, bez osobnego endpointu API
export async function login() {
  // cookies() z next/headers: zapis cookie po stronie serwera; httpOnly = niedostępne z JS w przeglądarce
  // wartość cookie to id użytkownika z db.json; proxy sprawdza tylko, czy cookie istnieje
  const cookieStore = await cookies();
  
  cookieStore.set("session", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  // redirect: przerywa akcję i kieruje na /cart; proxy przepuści, bo cookie już istnieje
  redirect("/cart");
}
