import Link from "next/link";

export default function OrderNotAvailbale() {
  return (
    <div className="min-h-svh flex flex-col items-center select-none p-8 text-center">
      <Link href="/" replace>
        <img className="h-6" src="/logo.svg" alt="masa madre logo" />
      </Link>
      <div className="grow"></div>
      <strong>Заказы онлайн временно не принимаются</strong>
      <div className="grow"></div>
    </div>
  );
}
