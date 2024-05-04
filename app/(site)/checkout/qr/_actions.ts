'use server'

import { getSession } from "@/session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export const optOutQROrder = async () => {
  const session = await getSession(cookies())
  session.tableOrder = undefined
  await session.save()
  redirect(process.env.NEXT_PUBLIC_URL + '/checkout')
}