"use server";

import { createPrivateApiAxios } from "@/axios";
import { getCards } from "@/data/user";
import { getSession } from "@/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function setCardAsMain(id: number) {
  const session = await getSession(cookies());
  const api = createPrivateApiAxios(session);

  const response = await api.get("/user/carts/main", {
    params: {
      id,
    },
  });
  revalidatePath("/profile/payment");

  return response.data;
}

export async function deleteCard(id: number) {
  const session = await getSession(cookies());
  const api = createPrivateApiAxios(session);

  
  const response = await api.delete("/user/cart", {
    params: {
      id,
    },
  });

  const allCards = await getCards(session);

  await setCardAsMain(allCards.list[0]?.id || 0)

  revalidatePath("/profile/payment");

  return response.data;
}
