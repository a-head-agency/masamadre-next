import { getUser, getCards } from "@/data/user";
import { getSession } from "@/session";
import { cookies } from "next/headers";

export type RouteApiUserCartsDataType = Awaited<ReturnType<typeof getCards>>;
export async function GET() {
  console.log('pidor')
  const session = await getSession(cookies());
  const cards = await getCards(session);

  return Response.json(cards);
}
