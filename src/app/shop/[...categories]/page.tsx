///  Catch all segment must be the last segment

import { TopNavigation } from "@/app/components/TopNavigation";

export default async function ShopCategory({
  params,
}: PageProps<"/shop/[...categories]">) {
  const { categories } = await params;

  return (
    <div className="container mx-auto grid gap-5 my-5">
      <TopNavigation />
      <h1 className="text-2xl">ShopCategory</h1>

      {/* .grid.grid-cols-2.gap-5>.grid.gap-5*4{Columna $} */}
      <div className="grid grid-cols-[10rem_1fr] gap-5">
        <div className="grid gap-5">
          {categories.map((category) => {
            return <li key={category}>{category}</li>;
          })}
        </div>
        <div className="grid gap-5">
          
          {/* .grid.grid-cols-3.gap-5>.border.border-red-200{Product $} */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            <div className="border border-red-200">Product 1</div>
            <div className="border border-red-200">Product 2</div>
            <div className="border border-red-200">Product 3</div>
            <div className="border border-red-200">Product 4</div>
            <div className="border border-red-200">Product 5</div>
          </div>

        </div>
        <div className="grid gap-5">Columna 3</div>
        <div className="grid gap-5">Columna 4</div>
      </div>

      <ul></ul>
    </div>
  );
}
