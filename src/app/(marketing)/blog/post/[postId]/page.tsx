// Allow blocking route (TODO: Suspense)
// export const instant = false;

import { delay } from "@/app/utils/delay";
import { notFound } from "next/navigation";

// http://localhost:3000/blog/post/123/

export default async function BlogPostPage(
  props: PageProps<`/blog/post/[postId]`>,
) {
  const { postId } = await props.params;

  await delay(4000);

  if (parseInt(postId) == 500) {
    throw new Error("Ten post się pospsuł...");
  }

  if (parseInt(postId) > 400) {
    notFound();
    // const x = 123 // Unreachable code detected.ts(7027)
  }

  return <div>Blog post: {postId}</div>;
}
