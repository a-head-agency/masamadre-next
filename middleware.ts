import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./session";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  if (process.env.FEATURE_TAKEAWAYS === "off") {
    if (
      request.nextUrl.pathname.startsWith("/order") ||
      request.nextUrl.pathname.startsWith("/checkout/self-receipt")
    ) {
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

  if (process.env.FEATURE_QR_ORDERS === "off") {
    if (
      request.nextUrl.pathname.startsWith("/order") ||
      request.nextUrl.pathname.startsWith("/checkout/qr")
    ) {
      const session = await getSession(cookies());
      if (session.tableOrder) {
        return NextResponse.redirect(
          new URL("/not-available-qr-order", request.url)
        );
      }
    }
    if (request.nextUrl.pathname.startsWith("/not-available-qr-order")) {
      const session = await getSession(cookies());
      if (!session.tableOrder) {
        return NextResponse.redirect(new URL("/order", request.url));
      }
    }
  } else {
    if (request.nextUrl.pathname.startsWith("/not-available-qr-order")) {
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
