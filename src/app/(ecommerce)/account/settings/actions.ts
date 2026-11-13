"use server";

import { cookies } from "next/headers";

// Server Action: id użytkownika bierzemy z cookie, nie z formularza, więc nie zmienimy cudzego konta
export async function saveName(formData: FormData) {
  const userId = (await cookies()).get("session")?.value;
  const name = String(formData.get("name") ?? "").trim();
  if (!userId || name.length < 2) return;

  // PATCH zmienia tylko pole name w json-server, reszta rekordu zostaje
  await fetch(`http://localhost:9000/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}
