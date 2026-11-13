// Allow blocking route (TODO: Suspense)
// export const instant = false;

import { delay } from "@/app/utils/delay";
import { getBlogPostById } from "@/services/BlogAPI";
import { notFound } from "next/navigation";

// http://localhost:3000/blog/post/123/

export default async function BlogPostPage(props: PageProps<`/blog/post/[postId]`>,) {
  const { postId } = await props.params;

  const post = await getBlogPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <article className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {post.title}

          </h1>
        </header>
        <div className="prose prose-gray max-w-none whitespace-pre-line text-gray-700">
          {post.body}
        </div>
      </article>
    </main>
  );
}
