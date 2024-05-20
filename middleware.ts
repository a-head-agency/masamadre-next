import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./session";
import { cookies } from "next/headers";
import { Session } from "inspector";

export async function middleware(request: NextRequest) {
  if (process.env.FEATURE_TAKEAWAYS === "off") {
    if (request.nextUrl.pathname.startsWith("/order")) {
      const session = await getSession(cookies());
      if (!session.tableOrder) {
        return NextResponse.redirect(
          new URL("/not-available-takeaway", request.url)
        );
      }
    }
    if (request.nextUrl.pathname.startsWith("/not-available-takeaway")) {
      const session = await getSession(cookies());
      if (session.tableOrder) {
        return NextResponse.redirect(new URL("/order", request.url));
      }
    }
  } else {
    if (request.nextUrl.pathname.startsWith("/not-available-takeaway")) {
      return NextResponse.redirect(new URL("/order", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/profile")) {
    const session = await getSession(cookies());
    if (!session.isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    const session = await getSession(cookies());
    if (session.isAuthenticated) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/checkout")) {
    if (request.nextUrl.pathname === "/checkout/qr") {
      const session = await getSession(cookies());
      if (!session.tableOrder) {
        return NextResponse.redirect(new URL("/checkout", request.url));
      }
    }
    if (
      request.nextUrl.pathname === "/checkout" ||
      request.nextUrl.pathname === "/checkout/self-receipt"
    ) {
      const session = await getSession(cookies());
      if (session.tableOrder) {
        return NextResponse.redirect(new URL("/checkout/qr", request.url));
      }
    }
  }

  return NextResponse.next();
}
