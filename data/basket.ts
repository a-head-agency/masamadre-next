import { createPrivateApiAxios } from "@/axios";
import { Session } from "@/session";
import { z } from "zod";
import { getDishesByIds } from "./products";

export const AddToBasketInputSchema = z.object({
  count: z.number(),
  dish_id: z.number(),
});
export async function addToBasket(
  session: Session,
  input: z.infer<typeof AddToBasketInputSchema>
) {
  const _input = AddToBasketInputSchema.parse(input);

  console.log("session", session);

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

  if (!session.isAuthenticated) {
    session.basket = session.basket || [];
    session.basket = session.basket.filter((id) => id !== _input.dish_id);
    session.basket = session.basket.concat(
      ...Array(_input.count).fill(_input.dish_id)
    );
    return { action: "success" } satisfies z.output<typeof schema>;
  }

  const api = createPrivateApiAxios(session);

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

export type GetBasketServiceResult = z.infer<typeof GetBasketSchema>;
export async function getBasket(
  session: Session
): Promise<GetBasketServiceResult> {
  if (!session.isAuthenticated) {
    session.basket = session.basket || [];

    const counts = session.basket.reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: (acc[curr] || 0) + 1,
      }),
      {} as { [key: number]: number }
    );

    console.log(counts);

    const withoutDupsBasket = Array.from(new Set(session.basket));
    console.log("without dups", withoutDupsBasket);
    const dishes = await getDishesByIds(withoutDupsBasket);

    const total = Object.keys(counts).length;
    const total_price = dishes.reduce(
      (prev, curr) => prev + curr.price * counts[curr.id],
      0
    );

    return {
      list: dishes.map((d, idx) => ({
        id: idx,
        dish_id: d.id,
        gift_id: "-1",
        count: counts[d.id],
        count_in: 0,
        img: d.img,
        name: d.name,
        price: d.price,
        short_description: d.short_description,
        weight: d.weight,
      })),
      total,
      total_count: total,
      total_price: total_price,
    };
  }

  const api = createPrivateApiAxios(session);

  const response = await api.get("/user/basket", {
    params: {
      offset: 0,
      limit: 9999999999,
    },
  });

  // console.log("basket", response.data);

  const data = GetBasketSchema.parse(response.data);
  return data;
}
