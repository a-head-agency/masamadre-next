import NavLink from "@/components/navlink";
import Link from "next/link";
import { BasketIcon, UserIcon } from "@/icons";
import { Cart } from "./_widgets/cart";
import { getSession } from "@/session";
import { cookies } from "next/headers";
import Booking from "@/app/_widgets/booking";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession(cookies());

  return (
    <main>
      <div className="px-[2vmax] flex pb-3 pt-9 gap-y-4 justify-between items-end flex-wrap top-0 fixed z-40 w-full bg-white/50 backdrop-blur-md">
        <div className="hidden md:block grow-[2]"></div>

        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-8 md:h-9 select-none"
            src="/logo.svg"
            alt="Логотип Masamadre"
            draggable="false"
          />
        </Link>

        <div className="hidden md:block grow-[1]"></div>

        <div className="flex gap-4">
          <Cart />

          <Link href="/profile">
            <UserIcon className="h-6 md:h-7" />
          </Link>
        </div>

        <div className="flex gap-x-4 justify-between flex-row w-full md:w-auto md:basis-1/2 text-sm md:text-base md:order-first">
          <NavLink href="/order" activeClassName="underline">
            заказ
          </NavLink>
          {/* <Booking withTopPadding /> */}
          <NavLink href="/work" activeClassName="underline">
            сотрудничество
          </NavLink>
        </div>
      </div>

      <div className="min-h-dvh flex flex-col pt-32 md:pt-24">
        <div className="grow shrink-0 basis-0">{children}</div>
      </div>
    </main>
  );
}
