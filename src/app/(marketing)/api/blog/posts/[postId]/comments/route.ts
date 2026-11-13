import {
  BlogPostComment,
  getBlogPostById,
  getBlogPostComments,
} from "@/services/BlogAPI";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/blog/posts/123/comments

export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/api/blog/posts/[postId]/comments">,
) {
  const { postId } = await ctx.params;
  const filter = new URL(request.url).searchParams.get("q");


  const comments = await getBlogPostComments(postId);

  return NextResponse.json(comments);
}

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/blog/posts/[postId]/comments">,
) {
  const { postId } = await ctx.params;

  // const bearerToken = (await headers()).get("Authorization");
  // const cookieJar = await cookies();
  // const session = cookieJar.get("session");

  const body = await request.json();

  const post = await getBlogPostById(postId);

  if (!post) notFound(); // 404

  // No InMemory User state!
  post.comments.push(body as BlogPostComment);

  //   return NextResponse.redirect('/api/blog/posts/',{})

  return NextResponse.json({ postId }, { status: 201 });
}
