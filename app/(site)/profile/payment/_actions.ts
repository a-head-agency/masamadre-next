"use server";

import { createPrivateApiAxios } from "@/axios";
import { getSession } from "@/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function setCardAsMain(id: number) {
  const session = await getSession(cookies());
  const api = createPrivateApiAxios(session);

  console.log({id})
  const response = await api.get("/user/carts/main", {
    params: {
      id,
    },
  });
  revalidatePath("/profile/payment");

  return response.data;
}
