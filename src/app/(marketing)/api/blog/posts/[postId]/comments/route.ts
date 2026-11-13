import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/blog/posts/123/comments

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/blog/posts/[postId]/comments">,
) {
  const { postId } = await ctx.params;

  return NextResponse.json({ postId });
}
