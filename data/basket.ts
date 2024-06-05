import { createPrivateApiAxios } from "@/axios";
import { Session, SessionDataV1 } from "@/session";
import { z } from "zod";
import { getDishesByIds, getOneDish } from "./products";
import { IronSession } from "iron-session";

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
    .nullish()
    .transform((a) => a || []),
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
    // migrate session to new version
    if (!session.version || session.version === "v1") {
      // there is no session.version property - it's v1 session
      const sessionv1 = session as IronSession<SessionDataV1>;
      sessionv1.basket = sessionv1.basket || [];

      session.version = "v2";
      if (session.version === "v2") {
        // "if" is there only for TS type inference
        const counts = sessionv1.basket.reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: (acc[curr] || 0) + 1,
          }),
          {} as { [key: number]: number }
        );

        session.basket = sessionv1.basket.map((dish_id, index) => ({
          id: index + 1,
          count: counts[dish_id],
          dish_id: dish_id,
          mods: [],
        }));
      }
    }
    if (session.version === "v2") {
      const dish = await getOneDish(_input.dish_id);
      const indexedMods = dish.mods.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.id]: cur,
        }),
        {} as Record<number, (typeof dish.mods)[0]>
      );

      if (_input.id != undefined) {
        // mutating already existing basket item
        session.basket = session.basket || [];
        const item = session.basket.find((v) => v.id === _input.id);
        if (!item) {
          return { action: "not found" } satisfies z.output<typeof schema>;
        }

        item.count = _input.count;
      } else {
        session.basket = session.basket || [];
        const nextID = session.basket.length
          ? Math.max(...session.basket.map((b) => b.id)) + 1
          : 1;
        session.basket.push({
          id: nextID,
          count: _input.count,
          dish_id: _input.dish_id,
          mods: _input.mods.map((t) => ({
            id: t.id,
            count: t.count,
            name: indexedMods[t.id].name,
            price: indexedMods[t.id].price,
          })),
        });
      }

      session.basket = session.basket.filter((v) => v.count > 0);

      return { action: "success" } satisfies z.output<typeof schema>;
    }
    return { action: "not found" } satisfies z.output<typeof schema>;
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

    // migrate session to new version
    if (!session.version || session.version === "v1") {
      // there is no session.version property - it's v1 session
      const sessionv1 = session as IronSession<SessionDataV1>;
      sessionv1.basket = sessionv1.basket || [];

      session.version = "v2";
      if (session.version === "v2") {
        // "if" is there only for TS type inference
        const counts = sessionv1.basket.reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: (acc[curr] || 0) + 1,
          }),
          {} as { [key: number]: number }
        );

        session.basket = sessionv1.basket.map((dish_id, index) => ({
          id: index + 1,
          count: counts[dish_id],
          dish_id: dish_id,
          mods: [],
        }));
      }
    }

    if (session.version === "v2") {
      session.basket = session.basket || [];
      const dishes = await getDishesByIds(
        session.basket?.map((b) => b.dish_id)
      );
      const indexedDishes = dishes.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.id]: cur,
        }),
        {} as Record<number, (typeof dishes)[0]>
      );
      const total = dishes.length;
      const total_price = session.basket.reduce(
        (acc, cur) =>
          acc +
          (indexedDishes[cur.dish_id].price +
            cur.mods.reduce((a, c) => a + c.price * c.count, 0)) *
            cur.count,
        0
      );

      return {
        list: session.basket.map((d) => ({
          id: d.id,
          dish_id: d.dish_id,
          gift_id: "-1",
          count: d.count,
          count_in: 0,
          img: indexedDishes[d.dish_id].img,
          name: indexedDishes[d.dish_id].name,
          price:
            indexedDishes[d.dish_id].price +
            d.mods.reduce((acc, cur) => acc + cur.price * cur.count, 0),
          short_description: indexedDishes[d.dish_id].short_description,
          weight: indexedDishes[d.dish_id].weight,
          mods: d.mods,
        })),
        total,
        total_count: session.basket.length,
        total_price: total_price,
      };
    }
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
