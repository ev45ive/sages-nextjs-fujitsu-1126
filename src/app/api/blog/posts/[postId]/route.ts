import { getBlogPostById } from "@/services/BlogAPI";

// RouteContext (globalny typ z typegen) daje params jako Promise do await
export async function GET(_req: Request, ctx: RouteContext<"/api/blog/posts/[postId]">) {
  const { postId } = await ctx.params;
  const post = await getBlogPostById(postId);

  // status w Response.json to kod HTTP dla klienta API (nie strona not-found)
  if (!post) return Response.json({ message: "Not found" }, { status: 404 });
  return Response.json(post);
}
