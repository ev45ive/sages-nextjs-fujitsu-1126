///  Catch all segment must be the last segment

import { TopNavigation } from "@/app/components/TopNavigation";

export default async function ShopCategory({
  params,
}: PageProps<"/shop/[...categories]">) {
  const { categories } = await params;

  return (
    <div>
      <TopNavigation />
      <h1 className="text-2xl">ShopCategory</h1>

      <ul>
        {categories.map((category) => {
          return <li key={category}>{category}</li>;
        })}
      </ul>
    </div>
  );
}
