import NavLink from "@/components/navlink";
import { getRests } from "@/data/rests";
import { getSession } from "@/session";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

export default async function CheckoutLayout({ children }: Props) {
  const session = await getSession(cookies());
  return (
    <div className="px-[2vmax] min-h-full flex flex-col">
      <div className="flex items-center gap-2 text-xl my-8">
        {session.tableOrder ? (
          <span className="underline">Заказ на стол {session.tableOrder.table}</span>
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
