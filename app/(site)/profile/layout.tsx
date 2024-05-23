import { deleteAccount, logout } from "@/app/_actions";
import Footer from "@/components/footer";
import NavLink from "@/components/navlink";
import { getUser } from "@/data/user";
import { getSession } from "@/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren, ReactNode, useMemo } from "react";
import { NavigationDropdown } from "./_widgets";

interface Props extends PropsWithChildren {}

export default async function ProfileLayout({ children }: Props) {
  const session = await getSession(cookies());
  const data = await getUser(session);

  //#region Nav Links
  const links = [
    {
      to: "/profile",
      content: "Учетные данные",
      textValue: "Учетные данные",
      exact: true,
    },
    {
      to: "/profile/orders",
      content: "История заказов",
      textValue: "История заказов",
      exact: false,
    },
    // {
    //   to: "/profile/bonuses",
    //   content: <BonusesLink amount={data?.bonuses ?? 0} />,
    //   textValue: "Бонусы",
    //   exact: true,
    // },
    // {
    //   to: "/profile/promocodes",
    //   content: "Промокоды",
    //   textValue: "Промокоды",
    //   exact: true,
    // },
    {
      to: "/profile/payment",
      content: "способ оплаты",
      textValue: "способ оплаты",
      exact: true,
    },
  ];
  //#endregion Nav Links

  return (
    <main className="min-h-full flex flex-col w-full">
      <div className="flex flex-col md:flex-row gap-4 md:gap-[2vmax] items-stretch md:items-start grow">
        <aside className="hidden md:flex sticky p-[2vmax] shrink-0 flex-col gap-8  h-[calc(100dvh-6rem-4rem-4vmax-3rem)] top-24">
          <div>
            <div className="text-3xl mb-8 capitalize w-min">
              {(data?.name ?? "Загрузка...") || "Без имени"}
            </div>
            <ul className="lowercase flex flex-col gap-2">
              {links.map((l, i) => (
                <li key={i}>
                  <NavLink
                    href={l.to}
                    className="inline-block outline-none focus-visible:translate-x-4 transition-transform"
                    activeClassName="underline"
                    exact={l.exact}
                  >
                    {l.content}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="grow"></div>

          <div className="flex flex-col items-start gap-4">
            <form action={logout}>
              <button>выход из аккаунта</button>
            </form>

            <form action={deleteAccount}>
              <button className="text-red">удалить аккаунт</button>
            </form>
          </div>
        </aside>

        <div className="px-4 pt-4 font-bold capitalize md:hidden">
          {(data?.name ?? "Загрузка...") || "Без имени"}
        </div>

        <NavigationDropdown links={links} />

        <div className="grow">{children}</div>

        <div className="md:hidden px-[2vmax] flex flex-col items-start gap-4">
          <form action={logout}>
            <button>выход из аккаунта</button>
          </form>

          <form action={deleteAccount}>
            <button className="text-red">удалить аккаунт</button>
          </form>
        </div>
      </div>
      <div className="p-[2vmax] pt-24 md:pt-[2vmax]">
        <Footer withTree />
      </div>
    </main>
  );
}

interface BonusesLinkProps {
  amount: number;
}
function BonusesLink(props: BonusesLinkProps) {
  return (
    <span>
      бонусы <span className="font-bold underline">{props.amount}р</span>
    </span>
  );
}
