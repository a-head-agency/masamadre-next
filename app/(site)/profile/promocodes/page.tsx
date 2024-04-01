"use client";

import TextField from "@/components/ui/TextField";
import { useMemo } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { DateTime } from "luxon";

export default function Promocodes() {
  const copyToClipboard = useCopyToClipboard()[1];
  const promocodes = useMemo(
    () => [
      {
        promocode: "VAMOS",
        img: "/promo-img.png",
        from_price: 1500,
        active_until: DateTime.fromObject({
          day: 31,
          month: 12,
          year: 2023,
        }),
      },
      {
        promocode: "UHETNSUH",
        img: "/promo-img.png",
        from_price: 1500,
        active_until: DateTime.fromObject({
          day: 10,
          month: 5,
          year: 2024,
        }),
      },
    ],
    []
  );

  return (
    <main className="py-4 px-[2vmax] md:pt-24 w-full gap-4 md:gap-24 max-w-4xl">
      <div className="flex items-end gap-2 mb-16">
        <TextField
          size="lg"
          id="promocodes-promocode-input"
          label="ввести промокод"
        />
        <button type="button" className="lowercase leading-none">
          активировать
        </button>
      </div>

      <div>
        <p className="lowercase mb-4 opacity-50">Активные промокоды</p>
        {promocodes.map((p, i) => (
          <div className="flex gap-2 items-start mb-8" key={i}>
            <img className="size-16 border-black border-2" src={p.img} alt="" />
            <div>
              <div className="flex gap-2 mb-3">
                <span className="font-bold text-2xl uppercase">
                  {p.promocode}
                </span>
                <button
                  type="button"
                  className="lowercase underline md:text-2xl"
                  onClick={() => copyToClipboard(p.promocode)}
                >
                  Скопировать
                </button>
              </div>
              <div className="opacity-50 text-sm md:text-base">
                действует при покупке от {p.from_price}р
              </div>
              <div className="opacity-50 text-sm md:text-base">
                до {p.active_until.toFormat("dd.MM.yy")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
