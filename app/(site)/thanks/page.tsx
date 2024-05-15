import Footer from "@/components/footer";
import { getOrdersById } from "@/data/user";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";
import { z } from "zod";

interface Props {
  searchParams: {
    id: string;
    pay_id: string;
  };
}

const SearchParamsScheme = z.object({
  id: z.string().transform((s) => Number(s)),
  pay_id: z.string(),
});

export default async function Thanks({ searchParams }: Props) {
  const ids = SearchParamsScheme.safeParse(searchParams);
  if (!ids.success) {
    redirect(process.env.NEXT_PUBLIC_URL!);
  }
  const lastOrder = await getOrdersById(ids.data.id);

  if (!lastOrder) {
    redirect(process.env.NEXT_PUBLIC_URL!);
  }

  console.log(lastOrder.order)

  lastOrder.order.time_deliver = lastOrder.order.time_deliver
    ? DateTime.fromISO(lastOrder.order.time_deliver).toFormat("HH:mm")
    : null;

  return (
    <div className="min-h-full flex flex-col">
      <div className="grow flex items-center px-[2vmax] py-8">
        <div>
          <strong className="font-display text-4xl lowercase tracking-widest font-normal text-balance">
            спасибо за заказ
          </strong>
          <p className="normal-case text-lg">
            ваш номер заказа {lastOrder.id} будет ждать вас в Маса Мадре по
            адресу {lastOrder.adres}
            {lastOrder.order.table && `, стол ${lastOrder.order.table}`}
            {lastOrder.order.time_deliver && ` в ${lastOrder.order.time_deliver}`}
          </p>
        </div>
      </div>
      <div className="px-[2vmax] py-[2vmax]">
        <Footer withTree />
      </div>
    </div>
  );
}
