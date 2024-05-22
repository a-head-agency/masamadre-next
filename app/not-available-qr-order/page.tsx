import Link from "next/link";
import QuitQrOrderButton from "./_widgets/quit-qr-order-button";

export default function QrOrderNotAvailbale() {
  return (
    <div className="min-h-svh flex flex-col items-center select-none p-8 text-center">
      <Link href="/" replace>
        <img className="h-6" src="/logo.svg" alt="masa madre logo" />
      </Link>
      <div className="grow"></div>
      <strong className="mb-4">
        Заказы по QR-коду временно не принимаются
      </strong>
      <QuitQrOrderButton />
      <div className="grow"></div>
    </div>
  );
}
