import { getCommonData } from "@/data/main";
import Link from "next/link";

interface Props {
  withTree?: boolean;
  withPhone?: boolean;
}

export default async function Footer({ withTree, withPhone }: Props) {
  const data = await getCommonData();

  const p = [...data.phone];
  let parts = [];
  parts.push(p.splice(-2, 2));
  parts.push(p.splice(-2, 2));
  parts.push(p.splice(-3, 3));
  parts.push(p.splice(-3, 3));
  parts.push(p);
  parts.reverse();
  parts = parts.map((p) => p.join(""));

  return (
    <div className="flex justify-between items-end gap-4 relative">
      {withPhone && (
        <div className="text-xl sm:text-3xl md:text-4xl absolute bottom-full -translate-y-16 md:translate-y-0 left-1/2 -translate-x-1/2">
          <div>
            <span className="mr-[3ch]">{parts[0]}</span>
            <span className="mr-[3ch]">{parts[1]}</span>
          </div>
          <div>
            <span
              style={{
                marginLeft: parts[0].length + 4 + 'ch',
              }}
            >
              {parts[2]}
            </span>
            <span className="ml-[3ch]">{parts[3]}</span>
            <span className="ml-[3ch]">{parts[4]}</span>
          </div>
        </div>
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
