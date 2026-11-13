"use client";

import { useInView } from "@/hooks/useInView";
import type { Product } from "@/services/CatalogAPI";
import Image from "next/image";
import Link from "next/link";
import { lazy, Suspense } from "react";

// lazy: kod przycisku koszyka jest osobnym fragmentem i ładuje się dopiero, gdy karta jest widoczna
// const AddToCartButton = lazy(() =>
//   import("@/components/AddToCartButton").then((m) => ({ default: m.AddToCartButton })),
// );

// eager: pierwsze karty są w HTML od razu (LCP), pozostałe ładują się przy zbliżaniu się do ekranu
export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const { ref, visible } = useInView<HTMLLIElement>("300px", eager);

  return (
    <li ref={ref} className="grid min-w-0 gap-2 rounded-lg border p-3">
      <div className="h-40 w-full overflow-hidden rounded-md bg-muted">
        {  (
          // next/image: width/height rezerwują miejsce, więc karty nie przeskakują po załadowaniu
          <Image
            src={`/demo/images/product/${product.image}`}
            alt={product.name}
            width={300}
            height={300}
            priority={eager}
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="h-40 w-full object-cover"
          />
        )}
      </div>
      {/* prefetch={visible}: trasa produktu i jej dane z cache pobierane dopiero po wejściu w viewport */}
      <Link href={`/product/${product.id}`} prefetch={visible} className="font-medium hover:underline">
        {product.name}
      </Link>
      <span className="text-sm text-muted-foreground">{product.price} PLN</span>
      {visible && (
        // Suspense: do czasu załadowania fragmentu pokazujemy szkielet o tej samej wysokości, bez skoku układu
        <Suspense fallback={<div className="h-8 animate-pulse rounded-md bg-muted" />}>
          {/* <AddToCartButton
            productId={product.id}
            name={product.name}
            price={product.price}
            image={`/demo/images/product/${product.image}`}
          /> */}
        </Suspense>
      )}
    </li>
  );
}
