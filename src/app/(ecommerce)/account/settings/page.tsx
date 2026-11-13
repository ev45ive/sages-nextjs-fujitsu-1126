import { Button } from "@/components/ui/button";
import { getUser } from "@/services/AccountAPI";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { saveName } from "./actions";

// Suspense: cookies() to dane runtime, więc formularz czeka w granicy, a shell wysyła się od razu
export default function SettingsPage() {
  return (
    <Suspense fallback={<p>Ładowanie ustawień…</p>}>
      <SettingsForm />
    </Suspense>
  );
}

async function SettingsForm() {
  // cookies(): id zalogowanego użytkownika z sesji, nie z adresu URL
  const userId = (await cookies()).get("session")?.value ?? "";
  const user = await getUser(userId);
  // redirect: brak sesji lub użytkownika kieruje do logowania
  if (!user) redirect("/login");

  return (
    // form action: Server Action zapisuje imię; po jej zakończeniu Next odświeża RSC bieżącej trasy
    <form action={saveName} className="grid max-w-sm gap-3">
      <label className="grid gap-1">
        Imię
        <input name="name" defaultValue={user.name} className="border px-2 py-1" />
      </label>
      <p className="text-sm text-gray-500">E-mail: {user.email}</p>
      <Button type="submit">Zapisz</Button>
    </form>
  );
}
