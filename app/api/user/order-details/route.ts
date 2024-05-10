import {
  OrderDetailsSchemeType,
  getOrderDetails,
  getOrdersHistory,
} from "@/data/user";
import { getSession } from "@/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export type GetOrderDetailsHandlerScheme = OrderDetailsSchemeType;
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return Response.json(
      {
        message: '"id" is required query param',
      },
      {
        status: 400,
      }
    );
  }

  const session = await getSession(cookies());
  const details = await getOrderDetails(session, id);
  return Response.json(details);
}
