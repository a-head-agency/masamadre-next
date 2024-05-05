'use server'

import { clearBasket } from "@/data/basket"
import { getSession } from "@/session"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export const optOutQROrder = async () => {
  const session = await getSession(cookies())
  session.tableOrder = undefined
  revalidatePath('/order')
  await clearBasket(session)
  await session.save()
  redirect(process.env.NEXT_PUBLIC_URL + '/order')
}