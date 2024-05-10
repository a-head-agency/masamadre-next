import NavLink from "@/components/navlink";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

export default function OrdersLayout({ children }: Props) {
  return (
    <div className="py-4 px-[2vmax] md:pt-24 w-full gap-4 md:gap-24 max-w-[60rem]">
      <div className="mb-2 flex gap-3">
        {/* <NavLink
          className="lowercase focus:underline hover:underline outline-none"
          href="/profile/orders"
          activeClassName="underline"
          exact
        >
          Доставки
        </NavLink>
        / */}
        <NavLink
          className="lowercase focus:underline hover:underline outline-none"
          href="/profile/orders/take-away"
          activeClassName="underline"
          exact
        >
          take away
        </NavLink>
      </div>

      {children}
    </div>
  );
}
