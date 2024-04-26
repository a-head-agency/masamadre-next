import { getUser } from "@/data/user";
import { getSession } from "@/session";
import { cookies } from "next/headers";

export async function GET() {
  const session = await getSession(cookies());
  if (session.isAuthenticated) {
    const data = await getUser(session);
    return Response.json(data);
  }
  return Response.json(null);
}
