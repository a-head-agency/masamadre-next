import Link from "next/link";

interface Props {
  withTree?: boolean;
  withPhone?: boolean;
}

export default function Footer({ withTree, withPhone }: Props) {
  return (
    <div className="flex justify-between items-end gap-4 relative">
      {withPhone && (
        <img
          className="absolute bottom-full select-none w-full max-w-xl left-1/2 -translate-x-1/2 -translate-y-8 md:translate-y-0"
          src="/phone.svg"
          alt="+79166714831"
          draggable="false"
        />
      )}
      <div className="flex flex-col relative">
        {withTree && (
          <img
            className="absolute h-16 pointer-events-none select-none left-[4ch] md:left-[6ch] bottom-[2em] md:bottom-full"
            src="/small-tree-footer.svg"
            alt=""
          />
        )}

        <Link href="https://t.me/masamadremsc">tg</Link>
        <Link href="/about-payment-and-delivery">доставка и оплата</Link>
        <Link href="/contacts">контакты</Link>
      </div>
      <div className="hidden lg:block">
        <p className="mb-4">
          <span>Panadería de una manera nueva</span>
          <br />
          <span>En nuestra cocina abierta podrán apreciar</span>
          <br />
          <span>todos los procesos de la elaboración del pan. ¡Venga!</span>
        </p>
        <p className="normal-case">© All Rights Reserved.</p>
      </div>
    </div>
  );
}
