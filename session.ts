import { getIronSession, SessionOptions } from "iron-session";
import { cookies as _cookies } from "next/headers";

export interface SessionData {
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
  basket?: number[];
  tableOrder?: {
    rest: number;
    table: number;
    sit: number;
  };
}

export async function getSession(cookies: ReturnType<typeof _cookies>) {
  if (
    !process.env.SESSION_COOKIE_NAME ||
    !process.env.SESSION_COOKIE_SECRET ||
    !process.env.SESSION_COOKIE_MAXAGE_SEC
  ) {
    throw new Error(
      "MISSING REQUIRED ENV VARIABLES: SESSION_COOKIE_NAME, SESSION_COOKIE_SECRET, SESSION_COOKIE_MAXAGE_SEC"
    );
  }

  const session = await getIronSession<SessionData>(cookies, {
    cookieName: process.env.SESSION_COOKIE_NAME,
    password: process.env.SESSION_COOKIE_SECRET,
    cookieOptions: {
      maxAge: Number(process.env.SESSION_COOKIE_MAXAGE_SEC),
      path: "/",
      secure: process.env.NODE_ENV === "production",
      SameSite: "strict",
    },
  });

  session.accessToken = session.accessToken || "";
  session.refreshToken = session.refreshToken || "";
  session.basket = session.basket || [];
  session.isAuthenticated = session.isAuthenticated || false;

  return session;
}

export type Session = Awaited<ReturnType<typeof getSession>>;
