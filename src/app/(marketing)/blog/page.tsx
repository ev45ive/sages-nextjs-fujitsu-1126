// Allow blocking route (TODO: Suspense)
// export const instant = false;

import { delay } from "@/app/utils/delay";
import { getBlogPosts } from "@/services/BlogAPI";

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

  const posts = await getBlogPosts({ filter });

  return (
    <>
      <h1 className="text-lg">BlogPage</h1>

      <div className="flex justify-between gap-5 sm:px-5">
        <p>Filter: {filter ?? "No filter"}</p>
        <p>Page: {page ?? 1}</p>
      </div>

      <ul className="grid gap-6 p-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <img
              src={post.images[0]}
              alt={post.title}
              className="h-48 w-full object-cover"
            />
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
              <p className="line-clamp-3 text-sm text-gray-600">{post.body}</p>
              <div className="mt-auto flex items-center gap-3 pt-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm text-gray-700">{post.author.name}</span>
                <span className="ml-auto text-sm text-gray-500">
                  {post.comments.length} comments
                </span>
              </div>
              <a
                href={`/blog/post/${post.id}`}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Read more
              </a>
            </div>
          </li>
        ))}
      </ul>

    </>
  );
}
