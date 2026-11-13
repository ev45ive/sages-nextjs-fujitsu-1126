import Link from "next/link";
import { Suspense } from "react";

export const instant = false

export default async function CatalogPage({
  params,
}: PageProps<"/catalog/[...categories]">) {
  const { categories } = await params;

  return (
    <>
      {/* /catalog/nowosci */}

      {/* catalog/product/[id] */}

      {/* catalog/[...] */}

      <div className="flex gap-5">
        <Suspense>
          {categories.map((category, index) => {
            return (
              <Link
                key={category}
                href={`/catalog/${categories.slice(0, index + 1).join("/")}`}
              >
                &raquo; {category}
              </Link>
            );
          })}
        </Suspense>
      </div>

      {/* .grid.grid-cols-3.gap-5>.border.border-red-200{Product $} */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        <div className="border border-red-200">Product 1</div>
        <div className="border border-red-200">Product 2</div>
        <div className="border border-red-200">Product 3</div>
        <div className="border border-red-200">Product 4</div>
        <div className="border border-red-200">Product 5</div>
      </div>
    </>
  );
}
