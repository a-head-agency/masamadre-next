import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col text-center p-[2vmax] gap-8 items-center h-svh">
      <Link href="/" replace>
        <img className="h-6" src="/logo.svg" alt="masamadre" />
      </Link>
      <div className="grow"></div>
      <span className="text-3xl font-bold rotate-90">:)</span>
      <strong className="font-bold text-3xl">
        такой страницы не существует
      </strong>
      <div className="grow"></div>
    </div>
  );
}
