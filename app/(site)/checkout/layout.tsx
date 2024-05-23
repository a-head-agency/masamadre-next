import NavLink from "@/components/navlink";
import { getBasket } from "@/data/basket";
import { getSession } from "@/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

export default async function CheckoutLayout({ children }: Props) {
  const session = await getSession(cookies());
  const basket = await getBasket(session)

  if (!basket.list || basket.list.length === 0) {
    redirect('/order')
  }

  return (
    <div className="px-[2vmax] min-h-full flex flex-col w-full">
      <div className="flex items-center gap-2 text-xl my-8">
        {session.tableOrder ? (
          <span className="underline">
            Заказ на стол {session.tableOrder.table}
            {session.tableOrder.sit
              ? `, место ${session.tableOrder.sit}`
              : null}
          </span>
        ) : (
          <>
            {/* <NavLink href="/checkout" activeClassName="underline" exact>
          Доставка
        </NavLink>
        / */}
            <NavLink
              href="/checkout/self-receipt"
              activeClassName="underline"
              exact
            >
              Самовывоз
            </NavLink>
          </>
        )}
      </div>
      {children}
    </div>
  );
}
