// Allow blocking route (TODO: Suspense)
export const instant = false;

type QueryParams = {
  searchParams: Promise<{
    filter?: string;
    page?: string;
  }>;
};


// http://localhost:3000/blog/?filter=banana&page=12

// export default async function BlogPage(
//   params: PageProps<"/blog"> & QueryParams,
// ) {
//   params.params;
//   params.searchParams;
//   const { params, searchParams } = params; // Destructuring
// }

export default async function BlogPage({searchParams, params}: PageProps<"/blog"> & QueryParams) {
  const { filter, page } = await searchParams; //

  return (
    <div>
      <h1 className="text-2xl">BlogPage</h1>
      <p>Filter: {filter ?? "No filter"}</p>
      <p>Page: {page ?? 1}</p>
    </div>
  );
}
