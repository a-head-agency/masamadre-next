import { createPublicApiAxios } from "@/axios";
import { z } from "zod";

export const CategoryScheme = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string(),
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

export async function getCategories() {
  const schema = z.object({
    list: CategoryScheme.array(),
    total: z.number(),
  });

  const apiAxios = createPublicApiAxios();

  const response = await apiAxios.get("/api/categories", {
    params: {
      offset: 0,
      limit: 999999999,
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
  category: z.number(),
  price: z.number(),
  weight: z.number(),
  count: z.number(),
  count_basket: z.number(),
  basket_id: z.number(),
});

export async function getDishesOfCategory(link: string) {
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
    },
  });
  const data = schema.parse(response.data);
  return data;
}

export const CategoriesWithDishesScheme = z.object({
  category: CategoryScheme,
  dishes: ShortDishSchema.array(),
  can_deliver: z.boolean(),
});

export async function getDishes() {
  const categories = await getCategories();

  const dishesPromises = await Promise.all(
    categories.list.map((c) => getDishesOfCategory(c.link))
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
