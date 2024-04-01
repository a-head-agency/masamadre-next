import { CardIcon } from "@/icons";
import { useMemo } from "react";

export default function Payment() {
  const cards = useMemo(
    () => [
      {
        vendor: "mir",
        img: "/icon-mir.svg",
        number: "**2782",
        isMain: true,
      },
      {
        vendor: "mastercard",
        img: "/icon-mastercard.svg",
        number: "**2782",
        isMain: false,
      },
    ],
    []
  );

  return (
    <main className="py-4 px-[2vmax] md:pt-24 w-full gap-4 md:gap-24 max-w-4xl">
      {cards.map((c, i) => (
        <div
          key={i}
          className="flex md:gap-4 flex-col md:flex-row items-start md:items-center justify-start mb-4 md:mb-2"
        >
          <div className="flex border w-full md:max-w-xs border-black items-center p-3 gap-4">
            <div className="grow-0 shrink-0">
              <img
                className="h-6 aspect-[2/1] object-contain object-left"
                src={c.img}
                alt=""
              />
            </div>
            <div className="flex-1 uppercase">
              {c.vendor} {c.number}
            </div>
            <button className="grow-0 shrink-0 size-4 md:size-6" type="button">
              {/* <Icon name="cross" className="h-full aspect-square text-black" /> */}
            </button>
          </div>

          {c.isMain && (
            <span className="opacity-50 lowercase text-start">
              основная карта
            </span>
          )}
          {!c.isMain && (
            <button
              type="button"
              className="lowercase text-green-400 text-start"
            >
              сделать основной
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className="p-3 w-full max-w-xs flex items-center gap-4 mt-6"
      >
        <div className="shrink-0">
          <CardIcon className="h-6 text-black" />
        </div>
        <span>Добавить способ оплаты</span>
      </button>
      <button
        type="button"
        className="p-3 w-full max-w-xs flex items-center gap-4"
      >
        <div className="shrink-0">
          <CardIcon className="h-6 text-black" />
        </div>
        <span>Добавить способ оплаты</span>
      </button>

      <button
        type="button"
        className="bg-black text-white px-8 mt-8 py-1.5 rounded-full w-full md:w-max text-sm lowercase"
      >
        Сохранить
      </button>
    </main>
  );
}
