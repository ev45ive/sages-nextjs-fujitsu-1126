import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildTree, productsFor, resolveChain } from "@/lib/category-tree";
import { getAllProducts, getCategories } from "@/services/CatalogAPI";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductGrid } from "../ProductGrid";

// params to dane runtime: strona wysyła shell, a ścieżkę sprawdza i produkty dociąga w granicy
export default function CategoryPage(
  props: PageProps<"/catalog/[...categories]">,
) {
  return (
    <Suspense
      fallback={<p className="text-muted-foreground">Ładowanie produktów kategorii…</p>}
    >
      <CategoryContent params={props.params} />
    </Suspense>
  );
}

async function CategoryContent({
  params,
}: {
  params: Promise<{ categories: string[] }>;
}) {
  const { categories } = await params;
  const [categoriesData, products] = await Promise.all([
    getCategories(),
    getAllProducts(),
  ]);

  // nieznana ścieżka (np. stary /catalog/nowosci) daje 404, a pusta kategoria zostaje z komunikatem
  const chain = resolveChain(buildTree(categoriesData, products), categories);
  if (!chain) notFound();

  const leaf = chain[chain.length - 1];
  const crumbs = [
    { label: "Sklep", href: "/catalog" },
    ...chain.map((node, i) => ({
      label: node.name,
      href:
        i < chain.length - 1 ? `/catalog/${node.path.join("/")}` : undefined,
    })),
  ];

  return (
    <>
      <Breadcrumbs items={crumbs} />
      <h1 className="mb-4 text-xl font-semibold">
        {leaf.name}{" "}
        <span className="text-base font-normal text-muted-foreground">
          ({leaf.count})
        </span>
      </h1>
      <ProductGrid products={productsFor(products, leaf)} />
    </>
  );
}
