import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./session";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/profile")) {
    const session = await getSession(cookies());
    if (!session.isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    const session = await getSession(cookies());
    console.log("middleware session", session);
    if (session.isAuthenticated) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  return NextResponse.next();
}
