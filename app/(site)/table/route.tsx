import { getSession } from "@/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rest = searchParams.get("rest");
  const table = searchParams.get("table");
  const sit = searchParams.get("sit");
  revalidatePath("/order");
  revalidatePath("/order/checkout");
  revalidatePath("/order/checkout/self-receipt");
  if (!rest || !table || !sit) {
    redirect("https://masamadre.ru");
  }
  const session = await getSession(cookies());
  session.tableOrder = {
    rest: Number(rest),
    table: Number(table),
    sit: Number(sit),
  };
  await session.save();
  redirect("https://masamadre.ru/order");
}
