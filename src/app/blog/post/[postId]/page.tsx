import { TopNavigation } from "../../../components/TopNavigation";

// Allow blocking route (TODO: Suspense)
export const instant = false;

// http://localhost:3000/blog/post/123/

export default async function BlogPostPage(
  props: PageProps<`/blog/post/[postId]`>,
) {
  const { postId } = await props.params;

  return (
    <div>
      <TopNavigation />
      Blog post: {postId}
    </div>
  );
}
