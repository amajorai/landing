import { type NextRequest, NextResponse } from "next/server";

const HTML_ROUTES = ["/", "/services", "/blog", "/projects"];

export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  if (accept.includes("text/markdown")) {
    const { pathname } = request.nextUrl;
    if (
      HTML_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/api/markdown";
      url.searchParams.set("path", pathname);
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
