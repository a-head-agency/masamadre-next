"use server";

import { createPrivateApiAxios, createPublicApiAxios } from "@/axios";
import { getSession } from "@/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { DateTime } from "luxon";
import { clearBasket } from "@/data/basket";

const PlaceOrderScheme = z.object({
  phone: z
    .string()
    .optional()
    .transform((s) => s || "74956362981"),
  name: z
    .string()
    .optional()
    .transform((s) => s || "masa madre"),
  cart_id: z.number(),
  dishes: z
    .object({
      id: z.number(),
      count: z.number(),
      mods: z
        .object({
          id: z.number(),
          count: z.number(),
        })
        .array(),
    })
    .array()
    .optional(),
  time_deliver: z
    .string()
    .nullish()
    .transform((s) => {
      if (!s) {
        return undefined;
      }

      const dt = DateTime.fromISO(s);
      return dt.toFormat("yyyy-MM-dd HH:mm:ss ZZZ ZZZZ");
    }),
  comment: z
    .string()
    .nullish()
    .transform((s) => s || ""),
});

export async function placeOrder(vals: z.input<typeof PlaceOrderScheme>) {
  const session = await getSession(cookies());

  const api = session.isAuthenticated
    ? createPrivateApiAxios(session)
    : createPublicApiAxios();
  let payload: Record<string, any> = PlaceOrderScheme.parse(vals);
  if (session.tableOrder) {
    if (process.env.FEATURE_QR_ORDERS === "off") {
      redirect(process.env.NEXT_PUBLIC_URL! + "/not-available-qr-order");
    }
    payload = {
      ...payload,
      rest: session.tableOrder.rest,
      table: session.tableOrder.table,
      sit: session.tableOrder.sit,
    };
  } else {
    if (process.env.FEATURE_TAKEAWAYS === "off") {
      redirect(process.env.NEXT_PUBLIC_URL! + "/not-available-takeaway");
    }
    payload = {
      ...payload,
      table: 1609,
      rest: 1,
    };
  }

  const response = await api.post("user/order", payload);

  if (response.data.action === "success") {
    session.lastOrders = session.lastOrders || [];
    session.lastOrders.push({
      id: response.data.id,
    });
    await clearBasket(session);
    await session.save();
    revalidatePath("/thanks");
    redirect(process.env.NEXT_PUBLIC_URL! + "/thanks");
  } else if (response.data.link) {
    session.lastOrders = session.lastOrders || [];
    session.lastOrders.push({
      id: response.data.id,
    });
    await clearBasket(session);
    await session.save();
    revalidatePath("/thanks");
    redirect(response.data.link);
  }
}
