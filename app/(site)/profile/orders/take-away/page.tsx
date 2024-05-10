import { getOrdersHistory } from "@/data/user";
import { getSession } from "@/session";
import { cookies } from "next/headers";
import Order from "../_widgets/order";

export default async function Index() {
  const session = await getSession(cookies());
  const orders = await getOrdersHistory(session);

  console.log(orders);

  return (
    <main>
      {orders.list.map((o, i) => (
        <Order
          key={o.id}
          order={o}
          hideBorderBottom={i === orders.list.length - 1}
        />
      ))}
    </main>
  );
}
