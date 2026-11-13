import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/services/CatalogAPI";

// Siatka: kolumny ograniczone do szerokości treści, karty nie wychodzą poza kontener
export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="py-10 text-center text-muted-foreground">Brak produktów w tej kategorii.</p>;
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} eager={i < 4} />
      ))}
    </ul>
  );
}
