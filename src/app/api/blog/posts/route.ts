import { getBlogPosts } from "@/services/BlogAPI";
import type { NextRequest } from "next/server";

// Route Handler: eksport GET wybiera metodę HTTP; Response.json zwraca JSON bez ręcznego nagłówka
export async function GET(request: NextRequest) {
  // nextUrl daje sparsowany URL, więc query nie wymaga ręcznego parsowania
  const filter = request.nextUrl.searchParams.get("filter") ?? "";
  const posts = await getBlogPosts({ filter });
  return Response.json(posts);
}
