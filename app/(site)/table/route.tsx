import { clearBasket } from "@/data/basket";
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
  revalidatePath("/checkout");
  revalidatePath("/checkout/self-receipt");
  revalidatePath("/checkout/qr");
  if (!rest || !table) {
    redirect(process.env.NEXT_PUBLIC_URL!);
  }
  const session = await getSession(cookies());
  await clearBasket(session);
  session.tableOrder = {
    rest: Number(rest),
    table: Number(table),
    sit: Number(sit),
  };

  await clearBasket(session)

  await session.save();
  redirect(process.env.NEXT_PUBLIC_URL! + "/order");
}
