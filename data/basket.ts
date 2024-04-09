import { createPrivateApiAxios } from "@/axios";
import { Session, getSession } from "@/session";
import { redirect } from "next/navigation";
import { z } from "zod";

export const AddToBasketInputSchema = z.object({
  count: z.number(),
  dish_id: z.number(),
});
export async function addToBasket(
  session: Session,
  input: z.infer<typeof AddToBasketInputSchema>
) {
  if (!session.isAuthenticated) {
    redirect("/login");
  }

  const _input = AddToBasketInputSchema.parse(input);

  const api = createPrivateApiAxios(session);

  const schema = z.object({
    action: z.union([
      z.literal("auth"),
      z.literal("not verified"),
      z.literal("error adres"),
      z.literal("not found adres"),
      z.literal("not found rest"),
      z.literal("not found"),
      z.literal("success"),
    ]),
  });
  const response = await api.post("/user/basket", _input);
  console.log({ res: response.data });
  const data = schema.parse(response.data);
  return data;
}

export const GetBasketSchema = z.object({
  list: z
    .object({
      id: z.number(),
      dish_id: z.number(),
      gift_id: z.string(),
      count: z.number(),
      count_in: z.number(),
      price: z.number(),
      weight: z.number(),
      short_description: z.string(),
      img: z.string(),
      name: z.string(),
    })
    .array()
    .nullish()
    .transform((t) => t ?? []),
  total: z.number(),
  total_count: z.number(),
  total_price: z.number(),
});

export type GetBasketServiceResult = Awaited<ReturnType<typeof getBasket>>;
export async function getBasket(session: Session) {
  if (!session.isAuthenticated) {
    redirect("/login");
  }

  const api = createPrivateApiAxios(session);

  const response = await api.get("/user/basket", {
    params: {
      offset: 0,
      limit: 9999999999,
    },
  });

  console.log("basket", response.data);

  const data = GetBasketSchema.parse(response.data);
  return data;
}
