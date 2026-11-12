///  Catch all segment must be the last segment

export default async function ShopCategory({
  params,
}: PageProps<"/shop/[...categories]">) {
  const { categories } = await params;

  return (
    <div>
      <h1 className="text-2xl">ShopCategory</h1>

      <ul>
        {categories.map((category) => {
          return <li key={category}>{category}</li>;
        })}
      </ul>
    </div>
  );
}
