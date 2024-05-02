"use server";

import { createPrivateApiAxios, createPublicApiAxios } from "@/axios";
import { getSession } from "@/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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

  const api = session.isAuthenticated
    ? createPrivateApiAxios(session)
    : createPublicApiAxios();
  let payload: Record<string, any> = {
    ...vals,
  };
  if (session.tableOrder) {
    payload = {
      ...payload,
      rest: session.tableOrder.rest,
      table: session.tableOrder.table,
      sit: session.tableOrder.sit,
    };
  }

  console.log("payload", payload);

  // return;

  const response = await api.post("user/order", payload);

  console.log("place order", response.data);

  if (response.data.action === "success") {
    session.lastOrders = session.lastOrders || [];
    session.lastOrders.push({
      id: response.data.id,
    });
    revalidatePath("/thanks");
    redirect(process.env.NEXT_PUBLIC_URL! + "/thanks");
  } else if (response.data.link) {
    session.lastOrders = session.lastOrders || [];
    session.lastOrders.push({
      id: response.data.id,
    });
    revalidatePath("/thanks");
    redirect(response.data.link);
  }
}
