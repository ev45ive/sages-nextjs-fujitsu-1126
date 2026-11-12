// Allow blocking route (TODO: Suspense)
// export const instant = false;

import { delay } from "@/app/utils/delay";

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

  await delay(2000);

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
