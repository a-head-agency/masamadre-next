import { getUser, getCards } from "@/data/user";
import { getSession } from "@/session";
import { cookies } from "next/headers";

export type RouteApiUserCartsDataType = Awaited<ReturnType<typeof getCards>>;
export async function GET() {
  const session = await getSession(cookies())
  if (session.isAuthenticated) {
    const cards = await getCards(session);
    return Response.json(cards);
  }

  return Response.json({
    list: [],
    total: 0
  })
}
