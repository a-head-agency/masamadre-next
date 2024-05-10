"use client";

import { GetOrderDetailsHandlerScheme } from "@/app/api/user/order-details/route";
import { CrossIcon } from "@/icons";
import { useControllableState } from "@chakra-ui/react";
import axios from "axios";
import { DateTime } from "luxon";
import { FC, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

interface TOrder {
  id: number;
  status: string;
  price?: number;
  created_at: string;
}

interface OrderDetailsProps {
  onOpenChange?: (isOpen: boolean) => unknown;
  isOpen?: boolean;
  orderID: number;
}

function AddToCartButton() {}

function OrderDetails({ orderID, onOpenChange, isOpen }: OrderDetailsProps) {
  const [_isOpen, _setIsOpen] = useControllableState({
    onChange: onOpenChange,
    value: isOpen,
    defaultValue: false,
  });

  const { data } = useSWR<GetOrderDetailsHandlerScheme>(
    "/api/user/order-details?id=" + orderID,
    fetcher
  );

  return (
    <div className="relative p-4 mb-4 -mt-[0.5px] flex flex-col xl:flex-row items-stretch xl:items-start gap-4 bg-white border border-black w-full">
      {data ? (
        <>
          <button
            className="absolute top-2 right-2 xl:top-4 xl:right-4"
            type="button"
            onClick={() => _setIsOpen(false)}
          >
            <CrossIcon className="size-3 xl:size-6" />
          </button>
          <div className="w-full xl:w-64">
            {data.list.length === 1 && (
              <div className="leading-tight text-xs xl:text-base w-full flex items-center xl:items-start gap-4 xl:gap-0 xl:flex-col">
                <img
                  className="size-24 min-w-24 xl:size-48 xl:min-w-48 xl:mb-4 object-cover object-center"
                  src={data.list[0].img}
                  alt={data.list[0].name}
                />
                <div>
                  <div className="font-bold xl:max-w-48">
                    {data.list[0].name}
                  </div>
                  <div className="xl:max-w-48">
                    {data.list[0].short_description}
                  </div>
                  <div className="xl:hidden mt-2">{data.order.price} ₽</div>
                </div>
              </div>
            )}
            {data.list.length > 1 && (
              <div className="flex flex-col gap-4">
                {data.list.map((d) => (
                  <div className="flex gap-1 max-w-80 items-center" key={d.id}>
                    <img
                      className="size-20 object-center object-cover"
                      src={d.img}
                      alt={d.name}
                    />

                    <div className="flex flex-col text-xs leading-[1.2] gap-1">
                      <div>
                        <div className="font-bold">{d.name}</div>
                        <div>{d.short_description}</div>
                      </div>
                      <div className="grow flex flex-col justify-end items-start">
                        <button
                          type="button"
                          className="px-3 py-[0.15rem] border border-black rounded-full hover:bg-black transition-colors hover:text-white focus-visible:bg-black focus-visible:text-white"
                        >
                          в корзину
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6 text-lg hidden xl:block">
              <span className="font-bold">{data.order.price}</span> ₽
            </div>
          </div>
          <div className="grow h-full leading-[1.8] text-xs xl:text-base">
            <div className="mb-8">
              <div className="lowercase underline font-bold">Способ оплаты</div>
              <div className="flex gap-2 xl:gap-12">
                <div className="lowercase basis-0 grow-[2] shrink-0">
                  Картой онлайн
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start">
                  <span className="font-bold">{data.order.price}</span> ₽,
                  оплачено
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="lowercase underline font-bold">
                Способ получения
              </div>
              {data.order.adres && (
                <div className="flex gap-2 xl:gap-12">
                  <div className="lowercase basis-0 grow-[2] shrink-0 opacity-50">
                    Адрес доставки
                  </div>
                  <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start normal-case">
                    {data.order.adres}
                  </div>
                </div>
              )}
              <div className="flex gap-2 xl:gap-12">
                <div className="lowercase basis-0 grow-[2] shrink-0 opacity-50">
                  Получатель
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start normal-case">
                  {data.order.user_name}
                </div>
              </div>
              <div className="flex gap-2 xl:gap-12">
                <div className="lowercase basis-0 grow-[2] shrink-0 opacity-50">
                  Дата
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start">
                  {data.order.time_deliver}
                </div>
              </div>
              {/* <div className="flex gap-2 xl:gap-12">
            <div className="lowercase basis-0 grow-[2] shrink-0 opacity-50">
              Стоимость доставки
            </div>
            <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start text-green-400">
              {order.data.deliveryCost}
            </div>
          </div>
          <div className="flex gap-2 xl:gap-12">
            <div className="lowercase basis-0 grow-[2] shrink-0 opacity-50">
              Чаевые курьеру
            </div>
            <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start">
              {order.data.courierTip} ₽
            </div>
          </div> */}

              {/* <div className="flex gap-2 xl:gap-12 mt-2">
            <div className="lowercase basis-0 grow-[2] shrink-0 font-bold underline">
              Начисленные бонусы
            </div>
            <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start">
              {order.data.bonusesAdded} ₽
            </div>
          </div> */}
            </div>

            <div>
              <div className="flex gap-2 xl:gap-12 flex-col xl:flex-row items-stretch xl:items-center">
                <div className="lowercase xl:basis-0 xl:grow-[2] xl:shrink-0">
                  {/* <button
                    type="button"
                    className="text-white bg-black w-full xl:w-auto py-1.5 xl:py-0.5 px-6 font-normal rounded-full"
                  >
                    повторить заказ
                  </button> */}
                </div>
                <div className="text-end xl:basis-0 xl:grow-[2.5] mt-2 xl:mt-0 flex justify-between xl:justify-start gap-2 xl:gap-12 xl:shrink-0">
                  <a href="#" className="underline">
                    поддержка
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>загрузка...</p>
      )}
    </div>
  );
}

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

const Order: FC<{
  order: TOrder;
  hideBorderBottom?: boolean;
}> = ({ order, hideBorderBottom }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dateFormatted = useMemo(() => {
    return DateTime.fromISO(order.created_at).toFormat("dd.MM.yyyy HH:mm");
  }, [order.created_at]);

  return (
    <div>
      <button
        className={[
          "flex leading-tight py-2 justify-between items-start gap-4 text-start w-full max-w-lg",
          !hideBorderBottom && "border-b border-black",
          isOpen && "!border-transparent",
        ]
          .filter(Boolean)
          .join(" ")}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <div className="lowercase font-bold">заказ {order.id}</div>
          {order.price != undefined && (
            <div className="lowercase">{order.price} ₽</div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="size-2 bg-green-400 rounded-full"></div>
            <div>{order.status}</div>
          </div>
          <div className="pl-4 opacity-70">{dateFormatted}</div>
        </div>
      </button>

      {isOpen && (
        <OrderDetails
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          orderID={order.id}
        />
      )}

      {/* {isOpen && (
        <div className="relative p-4 mb-4 -mt-[0.5px] flex flex-col xl:flex-row items-stretch xl:items-start gap-4 bg-white border border-black w-full">
          <button
            className="absolute top-2 right-2 xl:top-4 xl:right-4"
            type="button"
            onClick={() => setIsOpen(false)}
          >
          </button>
          <div className="w-full xl:w-64">
            {order.data.dishes.length === 1 && (
              <div className="leading-tight text-xs xl:text-base w-full flex items-center xl:items-start gap-4 xl:gap-0 xl:flex-col">
                <img
                  className="size-24 min-w-24 xl:size-48 xl:min-w-48 xl:mb-4 object-cover object-center"
                  src={order.data.dishes[0].img}
                  alt={order.data.dishes[0].name}
                />
                <div>
                  <div className="font-bold xl:max-w-48">
                    {order.data.dishes[0].name}
                  </div>
                  <div className="xl:max-w-48">
                    {order.data.dishes[0].description}
                  </div>
                  <div className="xl:hidden mt-2">{order.price} ₽</div>
                </div>
              </div>
            )}
            {order.data.dishes.length > 1 && (
              <div className="flex flex-col gap-4">
                {order.data.dishes.map((d) => (
                  <div className="flex gap-1 max-w-80 items-center" key={d.id}>
                    <img
                      className="size-20 object-center object-cover"
                      src={d.img}
                      alt={d.name}
                    />

                    <div className="flex flex-col text-xs leading-[1.2] gap-1">
                      <div>
                        <div className="font-bold">{d.name}</div>
                        <div>{d.description}</div>
                      </div>
                      <div className="grow flex flex-col justify-end items-start">
                        <button
                          type="button"
                          className="px-3 py-[0.15rem] border border-black rounded-full hover:bg-black transition-colors hover:text-white focus-visible:bg-black focus-visible:text-white"
                        >
                          в корзину
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6 text-lg hidden xl:block">
              <span className="font-bold">{order.price}</span> ₽
            </div>
          </div>
          <div className="grow h-full leading-[1.8] text-xs xl:text-base">
            <div className="mb-8">
              <div className="lowercase underline font-bold">Способ оплаты</div>
              <div className="flex gap-2 xl:gap-12">
                <div className="lowercase basis-0 grow-[2] shrink-0">
                  Картой онлайн
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start">
                  <span className="font-bold">{order.price}</span> ₽, оплачено
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="lowercase underline font-bold">
                Способ получения
              </div>
              <div className="flex gap-2 xl:gap-12">
                <div className="lowercase basis-0 grow-[2] shrink-0 opacity-50">
                  Адрес доставки
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start">
                  {order.data.deliveryAddress}
                </div>
              </div>
              <div className="flex gap-2 xl:gap-12">
                <div className="lowercase basis-0 grow-[2] shrink-0 opacity-50">
                  Получатель
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start">
                  {order.data.recipient}
                </div>
              </div>
              <div className="flex gap-2 xl:gap-12">
                <div className="lowercase basis-0 grow-[2] shrink-0 opacity-50">
                  Дата доставки
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start">
                  {order.data.deliveryTime}
                </div>
              </div>
              <div className="flex gap-2 xl:gap-12">
                <div className="lowercase basis-0 grow-[2] shrink-0 opacity-50">
                  Стоимость доставки
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start text-green-400">
                  {order.data.deliveryCost}
                </div>
              </div>
              <div className="flex gap-2 xl:gap-12">
                <div className="lowercase basis-0 grow-[2] shrink-0 opacity-50">
                  Чаевые курьеру
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start">
                  {order.data.courierTip} ₽
                </div>
              </div>

              <div className="flex gap-2 xl:gap-12 mt-2">
                <div className="lowercase basis-0 grow-[2] shrink-0 font-bold underline">
                  Начисленные бонусы
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start">
                  {order.data.bonusesAdded} ₽
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-2 xl:gap-12 flex-col xl:flex-row items-stretch xl:items-center">
                <div className="lowercase xl:basis-0 xl:grow-[2] xl:shrink-0">
                  <button
                    type="button"
                    className="text-white bg-black w-full xl:w-auto py-1.5 xl:py-0.5 px-6 font-normal rounded-full"
                  >
                    повторить заказ
                  </button>
                </div>
                <div className="xl:basis-0 xl:grow-[2.5] mt-2 xl:mt-0 flex justify-between xl:justify-start gap-2 xl:gap-12 xl:shrink-0">
                  <a href="#" className="underline">
                    чеки
                  </a>
                  <a href="#" className="underline">
                    поддержка
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Order;
