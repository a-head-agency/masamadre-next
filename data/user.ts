import { createPrivateApiAxios, createPublicApiAxios } from "@/axios";
import { Session } from "@/session";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";
import { z } from "zod";

const GetUserScheme = z.object({
  name: z.string(),
  status_pushes: z.boolean(),
  get_tg: z.boolean(),
  email_pushes: z.boolean(),
  get_whatsapp: z.boolean(),
  male: z.boolean().transform((m) => (m ? "male" : "female")),
  phone: z.string(),
  email: z.string(),
  birthday: z.string().transform((s) => {
    const parts = s.split("/");
    if (parts.length === 3) {
      const d = DateTime.fromObject({
        year: Number(parts[0]),
        month: Number(parts[1]),
        day: Number(parts[2]),
      });
      return d.toISO() ?? null;
    }
    return null;
  }),
  adres_id: z.number(),
  rest_id: z.number(),
  bonuses: z.number(),
  count_in_basket: z.number(),
  total_basket: z.number(),
});
export type GetUserMeSchemeType = z.output<typeof GetUserScheme>;

export async function getUser(session: Session) {
  if (!session.isAuthenticated) {
    redirect("/login");
  }

  const api = createPrivateApiAxios(session);

  const response = await api.get("/user/me");
  const data = GetUserScheme.parse(response.data);

  return data;
}

const ShortOrderSchema = z.object({
  id: z.number(),
  status: z.string(),
  time_deliver: z.string().transform((s) => {
    const dt = DateTime.fromFormat(s, "yyyy-MM-dd HH:mm:ss", {
      zone: "Europe/Moscow",
    });
    return dt.toISO()!;
  }),
  price: z.number(),
  created_at: z.string(),
});

const ManyShortOrdersScheme = ShortOrderSchema.array();

export async function getLastOrders(session: Session) {
  let lastOrders = session.lastOrders || [];

  const api = createPublicApiAxios();
  const response = await api.post("/api/orders", {
    ids: lastOrders.map((o) => o.id).sort(),
  });
  const data = ManyShortOrdersScheme.parse(response.data);
  return data;
}

const ORDER_STATUS_CONVERTER = (s: string) => {
  switch (s) {
    case "success":
      return "Доставлен";
    case "rejected":
      return "Отменен";
    case "process":
      return "В процессе";
    case "wait pay":
      return "Ожидает оплаты";
    default:
      return "Нет информации";
  }
};

const OrdersHistoryEntryScheme = z.object({
  id: z.number(),
  status: z.string().transform(ORDER_STATUS_CONVERTER),
  price: z.number().optional(),
  created_at: z.string(),
});
const OrdersHistoryScheme = z.object({
  list: OrdersHistoryEntryScheme.array(),
  total: z.number(),
});
export async function getOrdersHistory(
  session: Session,
  offset: number = 0,
  limit: number = 9999999999
) {
  const api = createPrivateApiAxios(session);

  const response = await api.get("/user/orders/stories", {
    params: {
      offset,
      limit,
    },
  });

  response.data.list = response.data.last_orders.concat(
    response.data.active_orders
  );

  const data = OrdersHistoryScheme.parse(response.data);
  return data;
}

const OrderDetailsScheme = z.object({
  id: z.number(),
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
    })
    .array(),
  order: z.object({
    count_items: z.number(),
    created_at: z.string(),
    id: z.number(),
    phone: z.string(),
    price: z.number(),
    promo: z.string(),
    status: z.string().transform(ORDER_STATUS_CONVERTER),
    time_deliver: z.string(),
    user_name: z.string(),
    adres: z.string().optional(),
  }),
});
export type OrderDetailsSchemeType = z.output<typeof OrderDetailsScheme>;
export async function getOrderDetails(session: Session, id: number | string) {
  const api = createPrivateApiAxios(session);

  const response = await api.get("/user/order/story", {
    params: {
      id,
    },
  });
  const data = OrderDetailsScheme.parse(response.data);
  return data;
}

const PaymentCardScheme = z.object({
  id: z.number(),
  cart: z.string(),
});
const ManyPaymentCardsScheme = z.object({
  list: PaymentCardScheme.array(),
  total: z.number(),
});
export async function getCards(session: Session) {
  const api = createPrivateApiAxios(session);

  const response = await api.get("/user/carts", {
    params: {
      offset: 0,
      limit: 99999999,
    },
  });

  const data = ManyPaymentCardsScheme.parse(response.data);

  return data;
}
