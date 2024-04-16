import { createPublicApiAxios } from "@/axios";
import { z } from "zod";

export const CategoryScheme = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string(),
  show_title: z.boolean(),
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
    },
  });

  console.log("gandon", response.data);

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

  console.log(dishesPromises);

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
  })
  .array();
export async function getDishesByIds(dishes: number[]) {
  const api = createPublicApiAxios();
  const response = await api.post("/api/dishes/ids", {
    dishes,
  });

  console.log("get dishes by ids", response.data);

  const data = GetDishesByIdsScheme.parse(response.data);

  return data;
}

export async function getOneDish(id: number) {
  const api = createPublicApiAxios();

  const schema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    img: z.string(),
    short_description: z.string(),
    content: z.string(),
    alerg: z.string(),
    date_contain: z.string(),
    maker: z.string(),
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
  });

  const response = await api.get("/api/dish", {
    params: {
      id,
    },
  });

  // response.data.images = [
  //   "https://s3.timeweb.cloud/516d5635-a864ec80-ee47-4c91-bc37-97ff745b4050/062c811c-6166-4f59-ba41-10ad4d75e2ca.1000055192.jpg",
  //   "https://s3.timeweb.cloud/516d5635-a864ec80-ee47-4c91-bc37-97ff745b4050/678e62ee-0215-4609-b3d8-7428f4b9b9ef.107f5e00-63b5-4eb1-8b25-f0570371e0a61885376460395238346.jpg",
  // ];

  const data = schema.parse(response.data);

  return data;
}
