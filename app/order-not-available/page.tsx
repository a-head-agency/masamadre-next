import { redirect } from "next/navigation";

export default function OrderNotAvailbale() {
  if (process.env.FEATURE_ORDER_PAGE !== "off") {
    redirect("/order");
  }

  return (
    <div className="min-h-svh flex flex-col items-center select-none p-8">
      <img className="h-6" src="/logo.svg" alt="masa madre logo" />
      <div className="grow"></div>
      <strong>Заказы онлайн временно не принимаются</strong>
      <div className="grow"></div>
    </div>
  );
}
