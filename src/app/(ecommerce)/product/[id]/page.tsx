import { AddToCartButton } from "@/components/AddToCartButton";
import { getProduct, getReviews, getStock } from "@/services/CatalogAPI";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Suspense: params są danymi runtime, więc shell wysyła się od razu, a wyspy strumieniują się same
export default function ProductPage(props: PageProps<"/product/[id]">) {
  return (
    <Suspense fallback={<p className="p-5">Ładowanie produktu…</p>}>
      <ProductRoute params={props.params} />
    </Suspense>
  );
}

async function ProductRoute({ params }: { params: Promise<{ id: string }> }) {
  // await params: dopiero tutaj znamy id, dlatego cała trasa siedzi w granicy Suspense
  const { id } = await params;

  return (
    <div className="grid gap-6">
      {/* Każda wyspa ma własną granicę: wolna część nie blokuje pozostałych */}
      <Suspense fallback={<p>Ładowanie opisu…</p>}>
        <ProductContent id={id} />
      </Suspense>

      <div className="grid gap-4 sm:grid-cols-2">
        <Suspense fallback={<p>Cena…</p>}>
          <PricePanel id={id} />
        </Suspense>
        <Suspense fallback={<p>Stan magazynowy…</p>}>
          <StockPanel id={id} />
        </Suspense>
      </div>

      <Suspense fallback={<p>Ładowanie opinii…</p>}>
        <ReviewsPanel id={id} />
      </Suspense>
    </div>
  );
}

async function ProductContent({ id }: { id: string }) {
  // getProduct z "use cache": to samo wywołanie co w PricePanel, więc drugi raz nie idzie do json-server
  const product = await getProduct(id);
  // notFound: przerywa render i pokazuje not-found.tsx z najbliższej granicy
  if (!product) notFound();

  return (
    <section className="grid gap-4 sm:grid-cols-[300px_1fr]">
      {/* next/image z public/; priority: zdjęcie nad przełomem jest LCP, więc Next preloaduje je */}
      <Image
        src={`/demo/images/product/${product.image}`}
        alt={product.name}
        width={300}
        height={300}
        className="h-auto w-full object-cover"
        style={{ height: "auto" }}
        priority
      />
      <div className="grid content-start gap-2">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p>{product.description}</p>
        <p className="text-sm text-gray-500">Kategoria: {product.category}</p>
        {/* AddToCartButton: klient, dostaje snapshot produktu, który trafia do linii koszyka */}
        {/* <AddToCartButton
          productId={product.id}
          name={product.name}
          price={product.price}
          image={`/demo/images/product/${product.image}`}
        /> */}
      </div>
    </section>
  );
}

async function PricePanel({ id }: { id: string }) {
  // ten sam wpis cache co w ProductContent: cena nie generuje dodatkowego żądania
  const product = await getProduct(id);
  return <p className="text-xl font-medium">{product?.price} PLN</p>;
}

async function StockPanel({ id }: { id: string }) {
  // bez cache: stan magazynowy jest czytany przy każdym żądaniu, żeby nie był stary
  const stock = await getStock(id);
  return (
    <p>
      {stock
        ? `Na stanie: ${stock.available} szt. (magazyn ${stock.warehouse})`
        : "Brak danych o stanie"}
    </p>
  );
}

async function ReviewsPanel({ id }: { id: string }) {
  // getReviews ma celowe opóźnienie, więc ten panel pojawia się ostatni
  const reviews = await getReviews(id);
  return (
    <section className="grid gap-2">
      <h2 className="text-lg font-semibold">Opinie ({reviews.length})</h2>
      {reviews.length === 0 && <p className="text-gray-500">Brak opinii.</p>}
      <ul className="grid gap-2">
        {reviews.map((r) => (
          <li key={r.id} className="border p-2">
            ★ {r.rating}: {r.comment}
          </li>
        ))}
      </ul>
    </section>
  );
}
