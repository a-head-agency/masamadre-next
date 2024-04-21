export default function NotFound() {
  return (
    <div className="flex flex-col text-center p-[2vmax] gap-8 items-center h-svh">
      <img className="h-6" src="/logo.svg" alt="masamadre" />

      <div className="grow"></div>
      <span className="text-3xl font-bold rotate-90">:)</span>
      <strong className="font-bold text-3xl">
        ведутся технические работы, приносим свои извинения за предоставленные
        неудобства
      </strong>
      <div className="grow"></div>
    </div>
  );
}
