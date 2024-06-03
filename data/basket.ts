import { createPrivateApiAxios } from "@/axios";
import { Session } from "@/session";
import { z } from "zod";
import { getDishesByIds } from "./products";

export const AddToBasketInputSchema = z.object({
  id: z.number().optional(),
  count: z.number(),
  dish_id: z.number(),
  mods: z
    .number()
    .transform((m) => ({
      id: m,
      count: 1,
    }))
    .array()
    .optional()
    .default([]),
});
export async function addToBasket(
  session: Session,
  input: z.input<typeof AddToBasketInputSchema>
) {
  const _input = AddToBasketInputSchema.parse(input);

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
  const data = schema.parse(response.data);
  return data;
}

export async function clearBasket(session: Session) {
  const basket = await getBasket(session);
  await Promise.all(
    basket.list.map((d) =>
      addToBasket(session, { count: 0, dish_id: d.dish_id })
    )
  );
  return { action: "success" };
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
      short_description: z
        .string()
        .optional()
        .transform((t) => t || ""),
      img: z.string(),
      name: z.string(),
      mods: z
        .object({
          id: z.number(),
          count: z.number(),
          name: z.string(),
          price: z.number(),
        })
        .array()
        .optional()
        .default([]),
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

    const withoutDupsBasket = Array.from(new Set(session.basket));
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
        mods: []
      })),
      total,
      total_count: session.basket.length,
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

  const data = GetBasketSchema.parse(response.data);
  return data;
}
