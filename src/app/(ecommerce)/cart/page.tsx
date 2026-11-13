import { CartView } from "./CartView";

// Stan koszyka żyje w localStorage (zustand), więc listę renderuje komponent klienta
export default function CartPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Koszyk</h1>
      <CartView />
    </div>
  );
}
