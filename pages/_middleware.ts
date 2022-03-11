import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  if (pathname == "/connections") {
    return NextResponse.redirect("/connections/inbox");
  }

  return NextResponse.next();
}
