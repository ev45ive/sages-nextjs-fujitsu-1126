import { CheckoutForm } from "./CheckoutForm";

// Formularz to komponent klienta: react-hook-form działa w przeglądarce, a koszyk czyta się z zustand
export default function CheckoutPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Zamówienie</h1>
      <CheckoutForm />
    </div>
  );
}
