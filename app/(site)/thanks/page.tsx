import Footer from "@/components/footer";
import { getLastOrders } from "@/data/user";
import { getSession } from "@/session";
import { DateTime } from "luxon";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Thanks() {
  const session = await getSession(cookies());
  const lastOrders = await getLastOrders(session);
  const lastOrder = lastOrders.length > 0 ? lastOrders[0] : null;

  if (!lastOrder) {
    redirect(process.env.NEXT_PUBLIC_URL!);
  }

  lastOrder.time_deliver = DateTime.fromISO(lastOrder.time_deliver).toFormat(
    "hh:mm"
  );

  return (
    <div className="min-h-full flex flex-col">
      <div className="grow flex items-center px-[2vmax] py-8">
        <div>
          <strong className="font-display text-4xl lowercase tracking-widest font-normal text-balance">
            спасибо за заказ
          </strong>
          <p className="normal-case text-lg">
            ваш номер заказа {lastOrder.id} будет ждать вас в Маса Мадре по
            адресу солянка 1/2с1{" "}
            {lastOrder.time_deliver && `в ${lastOrder.time_deliver}`}
          </p>
        </div>
      </div>
      <div className="px-[2vmax] py-[2vmax]">
        <Footer withTree />
      </div>
    </div>
  );
}
