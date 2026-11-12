// Allow blocking route (TODO: Suspense)
// export const instant = false;

import { delay } from "@/app/utils/delay";

// http://localhost:3000/blog/post/123/

export default async function BlogPostPage(
  props: PageProps<`/blog/post/[postId]`>,
) {
  const { postId } = await props.params;

  await delay(4000);

  return <div>Blog post: {postId}</div>;
}
