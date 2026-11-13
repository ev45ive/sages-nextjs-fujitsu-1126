import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/blog/posts/123/comments

export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/api/blog/posts/[postId]/comments">,
) {
  const { postId } = await ctx.params;
  const filter = new URL(request.url).searchParams.get("q");

  return NextResponse.json({ postId });
}

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/blog/posts/[postId]/comments">,
) {
  const { postId } = await ctx.params;

  const bearerToken = (await headers()).get("Authorization");
  const cookieJar = await cookies();
  const session = cookieJar.get("session");

  const body = await request.json();

  //   return NextResponse.redirect('/api/blog/posts/',{})

  return NextResponse.json({ postId, session, body }, { status: 201 });
}
