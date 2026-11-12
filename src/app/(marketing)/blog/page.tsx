
// Allow blocking route (TODO: Suspense)
// export const instant = false;

type QueryParams = {
  searchParams: Promise<{
    filter?: string;
    page?: string;
  }>;
};

// http://localhost:3000/blog
export default async function BlogPage({
  searchParams,
}: PageProps<"/blog"> & QueryParams) {
  const { filter, page } = await searchParams; //

  return (
    <>
      <h1 className="text-lg">BlogPage</h1>

      <div className="flex justify-between gap-5 sm:px-5">
        <p>Filter: {filter ?? "No filter"}</p>
        <p>Page: {page ?? 1}</p>
      </div>

      <a href="blog/post/123">Post 123</a>
    </>
  );
}
