import NavLink from "@/components/navlink";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

export default function CheckoutLayout({ children }: Props) {
  return (
    <div className="px-[2vmax]">
      <div className="flex items-center gap-2 text-xl my-8">
        <NavLink href="/checkout" activeClassName="underline" exact>
          Доставка
        </NavLink>
        /
        <NavLink
          href="/checkout/self-receipt"
          activeClassName="underline"
          exact
        >
          Самовывоз
        </NavLink>
      </div>
      {children}
    </div>
  );
}
