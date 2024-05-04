import { getCards } from "@/data/user";
import { CardIcon } from "@/icons";
import { getSession } from "@/session";
import { cookies } from "next/headers";
import { useMemo } from "react";

export default async function Payment() {
  const session = await getSession(cookies());
  const data = await getCards(session);

  return (
    <main className="py-4 px-[2vmax] md:pt-24 w-full gap-4 md:gap-24 max-w-4xl">
      {data.list.length > 0 ? (
        <>
          {data.list.map((c, i) => (
            <div
              key={i}
              className="flex md:gap-4 flex-col md:flex-row items-start md:items-center justify-start mb-4 md:mb-2"
            >
              <div className="flex border w-full md:max-w-xs border-black items-center p-3 gap-4">
                <div className="grow-0 shrink-0">
                  <img
                    className="h-6 aspect-[2/1] object-contain object-left"
                    src={''}
                    alt=""
                  />
                </div>
                <div className="flex-1 uppercase">
                  {c.cart}
                </div>
                <button
                  className="grow-0 shrink-0 size-4 md:size-6"
                  type="button"
                >
                  {/* <Icon name="cross" className="h-full aspect-square text-black" /> */}
                </button>
              </div>

              {/* {c.isMain && (
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
              )} */}
            </div>
          ))}

          <button
            type="button"
            className="bg-black text-white px-8 mt-8 py-1.5 rounded-full w-full md:w-max text-sm lowercase"
          >
            Сохранить
          </button>
        </>
      ) : (
        <div>
          У вас еще нет сохраненных карт, сделайте заказ, и использованная карта
          появится здесь
        </div>
      )}

      {/* <button
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
      </button> */}
    </main>
  );
}
