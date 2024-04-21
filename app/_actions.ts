"use server";

import { createPrivateApiAxios } from "@/axios";
import * as basketService from "@/data/basket";
import { getSession } from "@/session";
import { DateTime } from "luxon";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function logout() {
  const session = await getSession(cookies());
  session.destroy();
  return redirect("/login");
}

export async function deleteAccount() {
  const session = await getSession(cookies());
  session.destroy();
  return redirect("/login");
}

const SetUserMeScheme = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  birthday: z
    .string()
    .nullish()
    .transform((v) => {
      if (v === null) {
        return "";
      }
      if (v === undefined) {
        return;
      }
      const dt = DateTime.fromISO(v);
      const vl = dt.toFormat("yyyy/MM/dd");
      return vl;
    }),
  adres: z.number().optional(),
  rest: z.number().optional(),
  status_pushes: z.boolean().optional(),
  get_pushes: z.boolean().optional(),
  email_pushes: z.boolean().optional(),
  sms_pushes: z.boolean().optional(),
});
export async function setUser(inputs: z.input<typeof SetUserMeScheme>) {
  const session = await getSession(cookies());
  if (!session.isAuthenticated) {
    session.destroy();
    redirect("/login");
  }

  const api = createPrivateApiAxios(session);

  const data = SetUserMeScheme.parse(inputs);
  const response = await api.post("/user/me", data);
  console.log(response.data);
  revalidatePath("/profile");
}

export async function addToBasketAction(
  data: z.input<typeof basketService.AddToBasketInputSchema>
) {
  const _data = basketService.AddToBasketInputSchema.parse(data);
  const session = await getSession(cookies());
  const result = basketService.addToBasket(session, _data);
  await session.save();
  return result;
}
