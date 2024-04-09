import { GetBasketServiceResult, getBasket } from "@/data/basket";
import { getSession } from "@/session";
import { cookies } from "next/headers";

export type GetBasketHandlerResult = GetBasketServiceResult;
export async function GET() {
  const session = await getSession(cookies());
  const basket = await getBasket(session);
  console.log('handler', basket)
  return Response.json(basket);
}
