"use client";
import { CrossIcon } from "@/icons";
import { DateTime } from "luxon";
import { FC, useState, useMemo } from "react";

interface TOrder {
  id: number;
  status: string;
  price: number;
  date: DateTime;
  details: {
    dishes: {
      id: number;
      name: string;
      description: string;
      img: string;
    }[];
    payType: string;
    deliveryAddress: string;
    recipient: string;
    deliveryTime: string;
    deliveryCost: string;
    courierTip: number;
    bonusesAdded: number;
  };
}

const Order: FC<{
  order: TOrder;
  hideBorderBottom?: boolean;
}> = ({ order, hideBorderBottom }) => {
  const [isOpen, setIsOpen] = useState(false);
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
          <div className="lowercase">{order.price} ₽</div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="size-2 bg-green-400 rounded-full"></div>
            <div>{order.status}</div>
          </div>
          <div className="pl-4 opacity-70">
            {order.date.toFormat("dd.MM.yyyy HH:mm")}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="relative p-4 mb-4 -mt-[0.5px] flex flex-col xl:flex-row items-stretch xl:items-start gap-4 bg-white border border-black w-full">
          <button
            className="absolute top-2 right-2 xl:top-4 xl:right-4"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            {/* <Icon name="cross" className="size-3 xl:size-6" /> */}
            <CrossIcon className="size-3 xl:size-6" />
          </button>
          <div className="w-full xl:w-64">
            {order.details.dishes.length === 1 && (
              <div className="leading-tight text-xs xl:text-base w-full flex items-center xl:items-start gap-4 xl:gap-0 xl:flex-col">
                <img
                  className="size-24 min-w-24 xl:size-48 xl:min-w-48 xl:mb-4 object-cover object-center"
                  src={order.details.dishes[0].img}
                  alt={order.details.dishes[0].name}
                />
                <div>
                  <div className="font-bold xl:max-w-48">
                    {order.details.dishes[0].name}
                  </div>
                  <div className="xl:max-w-48">
                    {order.details.dishes[0].description}
                  </div>
                  <div className="xl:hidden mt-2">{order.price} ₽</div>
                </div>
              </div>
            )}
            {order.details.dishes.length > 1 && (
              <div className="flex flex-col gap-4">
                {order.details.dishes.map((d) => (
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
                  {order.details.deliveryAddress}
                </div>
              </div>
              <div className="flex gap-2 xl:gap-12">
                <div className="lowercase basis-0 grow-[2] shrink-0 opacity-50">
                  Получатель
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start">
                  {order.details.recipient}
                </div>
              </div>
              <div className="flex gap-2 xl:gap-12">
                <div className="lowercase basis-0 grow-[2] shrink-0 opacity-50">
                  Дата доставки
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start">
                  {order.details.deliveryTime}
                </div>
              </div>
              <div className="flex gap-2 xl:gap-12">
                <div className="lowercase basis-0 grow-[2] shrink-0 opacity-50">
                  Стоимость доставки
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start text-green-400">
                  {order.details.deliveryCost}
                </div>
              </div>
              <div className="flex gap-2 xl:gap-12">
                <div className="lowercase basis-0 grow-[2] shrink-0 opacity-50">
                  Чаевые курьеру
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start">
                  {order.details.courierTip} ₽
                </div>
              </div>

              <div className="flex gap-2 xl:gap-12 mt-2">
                <div className="lowercase basis-0 grow-[2] shrink-0 font-bold underline">
                  Начисленные бонусы
                </div>
                <div className="basis-0 grow-[2.5] shrink-0 text-end xl:text-start">
                  {order.details.bonusesAdded} ₽
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
      )}
    </div>
  );
};

export default function Index() {
  const orders = useMemo(
    () => [
      {
        id: 1346534,
        status: "доставлен",
        price: 300,
        date: DateTime.fromObject({
          day: 12,
          month: 2,
          year: 2023,
          hour: 14,
          minute: 0,
        }),
        details: {
          dishes: [
            {
              id: 1,
              name: "фокачча пшеничная",
              description: "на цельнозерновой закваске и оливковом масле",
              img: "/b1.png",
            },
          ],
          payType: "card_online",
          deliveryAddress: "Москва, Дмитровское шоссе 82",
          recipient: "Бережная Евгения",
          deliveryTime: "10 октября, с 11-15",
          deliveryCost: "бесплатно",
          courierTip: 50,
          bonusesAdded: 100,
        },
      },
      {
        id: 1346535,
        status: "доставлен",
        price: 2500,
        date: DateTime.fromObject({
          day: 12,
          month: 2,
          year: 2023,
          hour: 14,
          minute: 0,
        }),
        details: {
          dishes: [
            {
              id: 1,
              name: "фокачча пшеничная",
              description: "на цельнозерновой закваске и оливковом масле",
              img: "/b1.png",
            },
            {
              id: 2,
              name: "завтрак 1",
              description: "на цельнозерновой закваске и оливковом масле",
              img: "/b2.png",
            },
            {
              id: 3,
              name: "завтрак 3",
              description: "на цельнозерновой закваске и оливковом масле",
              img: "/b3.png",
            },
          ],
          payType: "card_online",
          deliveryAddress: "Москва, Дмитровское шоссе 82",
          recipient: "Бережная Евгения",
          deliveryTime: "10 октября, с 11-15",
          deliveryCost: "бесплатно",
          courierTip: 50,
          bonusesAdded: 100,
        },
      },
      {
        id: 1346536,
        status: "доставлен",
        price: 2500,
        date: DateTime.fromObject({
          day: 12,
          month: 2,
          year: 2023,
          hour: 14,
          minute: 0,
        }),
        details: {
          dishes: [
            {
              id: 1,
              name: "фокачча пшеничная",
              description: "на цельнозерновой закваске и оливковом масле",
              img: "/b1.png",
            },
            {
              id: 2,
              name: "завтрак 1",
              description: "на цельнозерновой закваске и оливковом масле",
              img: "/b2.png",
            },
            {
              id: 3,
              name: "завтрак 3",
              description: "на цельнозерновой закваске и оливковом масле",
              img: "/b3.png",
            },
          ],
          payType: "card_online",
          deliveryAddress: "Москва, Дмитровское шоссе 82",
          recipient: "Бережная Евгения",
          deliveryTime: "10 октября, с 11-15",
          deliveryCost: "бесплатно",
          courierTip: 50,
          bonusesAdded: 100,
        },
      },
    ],
    []
  );

  return (
    <main>
      {orders.map((o, i) => (
        <Order
          key={o.id}
          order={o}
          hideBorderBottom={i === orders.length - 1}
        />
      ))}
    </main>
  );
}
