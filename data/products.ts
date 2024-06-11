import { createPublicApiAxios } from "@/axios";
import { getSession } from "@/session";
import { DateTime } from "luxon";
import { cookies } from "next/headers";
import { z } from "zod";

export const DisabledDishReason = z.union([z.literal('time_is_out_of_allowed_range'), z.literal("disabled_by_api")]).optional()
export async function checkIfDishDisabled(dish: {
  id: number;
  from_hour: string;
  to_hour: string;
  active: boolean;
}): Promise<z.output<typeof DisabledDishReason>> {
  const now = DateTime.now()
  if (!dish.active) {
    return 'disabled_by_api'
  }
  if (now < DateTime.fromISO(dish.from_hour) || DateTime.fromISO(dish.to_hour) < now) {
    return 'time_is_out_of_allowed_range'
  }
}

export const CategoryScheme = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string(),
  show_title: z.boolean(),
  subtitle: z.string().optional(),
  type: z
    .union([z.literal(0), z.literal(1), z.literal(2)])
    .optional()
    .transform((t) => {
      switch (t) {
        case 0:
          return "grid";
        case 1:
          return "slider";
        case 2:
          return "column_list";
        default:
          return "grid";
      }
    }),
});

export async function getCategories(tableOrder?: {
  table: number | string;
  sit?: number | string;
}) {
  const schema = z.object({
    list: CategoryScheme.array()
      .nullable()
      .transform((t) => t || []),
    total: z.number(),
  });

  const apiAxios = createPublicApiAxios();

  const response = await apiAxios.get("/api/categories", {
    params: {
      offset: 0,
      limit: 999999999,
      table: tableOrder ? tableOrder.table : undefined,
      sit: tableOrder ? tableOrder.sit : undefined,
    },
  });

  const data = schema.parse(response.data);

  return data;
}

export const ShortDishSchema = z.object({
  id: z.number(),
  name: z.string(),
  img: z.string(),
  alt: z.string(),
  link: z.string(),
  short_description: z.string(),
  maker: z.string().optional(),
  flag: z.string().optional(),
  make_date: z.string().optional(),
  category: z.number(),
  price: z.number(),
  weight: z.number(),
  is_vine: z.boolean().optional(),
  from_hour: z.number().transform((n) => {
    const hour = Math.floor(n / 100);
    const minute = n % 100;
    const dt = DateTime.now()
      .setZone("UTC+3")
      .startOf("day")
      .set({ hour, minute });
    return dt.toISO()!;
  }),
  to_hour: z.number().transform((n) => {
    const hour = Math.floor(n / 100);
    const minute = n % 100;
    const dt = DateTime.now()
      .setZone("UTC+3")
      .startOf("day")
      .set({ hour, minute });
    return dt.toISO()!;
  }),
  disabledWhy: DisabledDishReason,
  active: z.boolean().optional().default(true)
});

export async function getDishesOfCategory(
  link: string,
  tableOrder?: {
    table: number | string;
    sit?: number | string;
  }
) {
  const schema = z.object({
    dishes: ShortDishSchema.array(),
    can_deliver: z.boolean(),
  });

  const api = createPublicApiAxios();

  const response = await api.get("/api/dishes", {
    params: {
      category_link: link,
      offset: 0,
      limit: 99999999999,
      table: tableOrder ? tableOrder.table : 1609,
      sit: tableOrder ? tableOrder.sit : undefined,
    },
  });
  const data = schema.parse(response.data);
  data.dishes.forEach(async (d) => {
    d.is_vine = !!d.make_date;
    d.disabledWhy = await checkIfDishDisabled(d);
  });
  return data;
}

export const CategoriesWithDishesScheme = z.object({
  category: CategoryScheme,
  dishes: ShortDishSchema.array(),
  can_deliver: z.boolean(),
});

export async function getDishes() {
  const session = await getSession(cookies());
  const categories = await getCategories(session.tableOrder);

  const dishesPromises = await Promise.all(
    categories.list.map((c) => getDishesOfCategory(c.link, session.tableOrder))
  );

  const result = dishesPromises
    .map((r, index) => {
      return {
        category: categories.list[index],
        dishes: r.dishes,
        can_deliver: r.can_deliver,
      } satisfies z.output<typeof CategoriesWithDishesScheme>;
    })
    .filter((d) => d.dishes.length > 0);

  return result;
}

export const GetDishesByIdsScheme = z
  .object({
    id: z.number(),
    name: z.string(),
    img: z.string(),
    alt: z.string(),
    link: z.string(),
    short_description: z.string(),
    category: z.number(),
    price: z.number(),
    weight: z.number(),
    mods: z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      active: z.boolean(),
    }).array(),
    from_hour: z.number().transform((n) => {
      const hour = Math.floor(n / 100);
      const minute = n % 100;
      const dt = DateTime.now()
        .setZone("UTC+3")
        .startOf("day")
        .set({ hour, minute });
      return dt.toISO()!;
    }),
    to_hour: z.number().transform((n) => {
      const hour = Math.floor(n / 100);
      const minute = n % 100;
      const dt = DateTime.now()
        .setZone("UTC+3")
        .startOf("day")
        .set({ hour, minute });
      return dt.toISO()!;
    }),
    active: z.boolean(),
    disabledWhy: DisabledDishReason
  })
  .array();
export async function getDishesByIds(dishes: number[]) {
  const api = createPublicApiAxios();
  const response = await api.post("/api/dishes/ids", {
    dishes,
  });

  const data = GetDishesByIdsScheme.parse(response.data);
  data.forEach(async d => {
    d.disabledWhy = await checkIfDishDisabled(d)
  });

  return data;
}

export const GetOneDishScheme = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  img: z.string(),
  short_description: z.string(),
  content: z.string(),
  alerg: z.string(),
  date_contain: z.string(),
  maker: z.string().optional(),
  cert: z
    .union([z.literal("eco"), z.literal("org"), z.literal("bio")])
    .or(z.literal(""))
    .nullish()
    .transform((s) => s || null),
  make_date: z.string().optional(),
  malbec: z.string().optional(),
  flag: z.string().optional(),
  is_vine: z.boolean().optional(),
  category: z.number(),
  price: z.number(),
  weight: z.number(),
  title: z.string(),
  description_seo: z.string(),
  keywords: z.string(),
  link: z.string(),
  alt: z.string(),
  images: z
    .string()
    .array()
    .nullable()
    .transform((a) => a || []),
  mods: z
    .object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      active: z.boolean()
    })
    .array(),
  max_modes: z.number(),
  from_hour: z.number().transform((n) => {
    const hour = Math.floor(n / 100);
    const minute = n % 100;
    const dt = DateTime.now()
      .setZone("UTC+3")
      .startOf("day")
      .set({ hour, minute });
    return dt.toISO()!;
  }),
  to_hour: z.number().transform((n) => {
    const hour = Math.floor(n / 100);
    const minute = n % 100;
    const dt = DateTime.now()
      .setZone("UTC+3")
      .startOf("day")
      .set({ hour, minute });
    return dt.toISO()!;
  }),
  disabledWhy: DisabledDishReason,
  active: z.boolean()
});

export async function getOneDish(id: number) {
  const api = createPublicApiAxios();

  const response = await api.get("/api/dish", {
    params: {
      id,
    },
  });

  const data = GetOneDishScheme.parse(response.data);

  data.is_vine = !!data.make_date;
  data.disabledWhy = await checkIfDishDisabled(data)

  return data;
}
