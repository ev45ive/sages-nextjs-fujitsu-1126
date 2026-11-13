import { NextRequest, NextResponse } from "next/server";

// proxy (dawniej middleware) działa przed renderem trasy; tu chroni /cart i panel /account
export function proxy(request: NextRequest) {
  // request.cookies: odczyt cookie z nagłówka żądania (bez await, to nie jest dane runtime z cache)
  const session = request.cookies.get("session")?.value;

  if (!session) {
    // NextResponse.redirect: przekierowanie na /login zanim trasa /cart się wyrenderuje
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // NextResponse.next: przepuszcza żądanie dalej do trasy
  return NextResponse.next();
}

// matcher: proxy działa tylko dla /cart i /account, nie dla całej aplikacji
export const config = {
  matcher: ["/cart", "/checkout", "/account/:path*"],
};
