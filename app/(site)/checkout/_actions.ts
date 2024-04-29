"use server";

import { createPrivateApiAxios, createPublicApiAxios } from "@/axios";
import { getSession } from "@/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { number, z } from "zod";

const PlaceOrderScheme = z.object({
  phone: z.string(),
  name: z.string(),
  cart_id: z.number(),
  dishes: z
    .object({
      id: z.number(),
      count: z.number(),
    })
    .array()
    .optional(),
});

export async function placeOrder(vals: z.input<typeof PlaceOrderScheme>) {
  const session = await getSession(cookies());
  const api = createPrivateApiAxios(session);
  if (session.tableOrder) {
    try {
      const response = await api.post("user/order", {
        ...vals,
        rest: session.tableOrder.rest,
        table: session.tableOrder.table,
        sit: session.tableOrder.sit,
      });
      console.log("PLACE ORDER API RESPONSE (NO USER)", response.data);
    } catch {}
    redirect(process.env.NEXT_PUBLIC_URL! + "/profile/orders");
  }

  try {
    const response = await api.post("user/order", {
      ...vals,
    });
    console.log("PLACE ORDER API RESPONSE (WITH USER)", response.data);
  } catch {}

  redirect(process.env.NEXT_PUBLIC_URL! + "/profile/orders");
}
