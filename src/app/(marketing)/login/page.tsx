import { Button } from "@/components/ui/button";
import { login } from "./actions";

// http://localhost:3000/login
export default function LoginPage() {
  return (
    // form action={login}: Server Action; przeglądarka wysyła POST, a serwer wykonuje login()
    <form action={login} className="flex max-w-xs flex-col gap-3 p-5">
      <h1 className="text-lg">Logowanie (demo)</h1>
      <Button type="submit">Zaloguj</Button>
    </form>
  );
}
