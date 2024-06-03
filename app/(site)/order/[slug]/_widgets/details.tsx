"use client";
import Adder from "@/components/functional/adder";
import { GetOneDishScheme } from "@/data/products";
import { z } from "zod";
import clsx from "clsx";
import TotalPrice from "./total-price";
import AddToCartButtonAuth from "./add-to-cart-button-auth";
import ModificatorSelector from "@/components/functional/modificators-selector";
import { Item, Key } from "react-stately";
import { useEffect, useMemo, useState } from "react";
import { useBasket } from "@/hooks/basket";

interface Props {
  isAuthenticated: boolean;
  dish: z.infer<typeof GetOneDishScheme>;
}

export default function Details({ isAuthenticated, dish }: Props) {
  const [selectedKeys, setSelectedKeys] = useState(new Set<string>([]));

  const indexedMods = useMemo(() => {
    return dish.mods.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: curr,
      }),
      {} as Record<number, (typeof dish.mods)[0]>
    );
  }, [dish]);

  const arraySelectedKeys = useMemo(
    () => Array.from(selectedKeys).map((v) => Number(v)),
    [selectedKeys]
  );

  const basket = useBasket();
  const item = useMemo(
    () => basket.data?.list.find((d) => d.dish_id === dish.id),
    [dish.id, basket.data]
  );
  useEffect(() => {
    if (item?.mods) {
      setSelectedKeys(new Set(item.mods.map((v) => v.id.toString())));
    }
  }, [item?.mods]);

  const selectedMods = useMemo(() => {
    return arraySelectedKeys.map((k) => indexedMods[k]);
  }, [indexedMods, arraySelectedKeys]);

  const displayPrice = useMemo(
    () => dish.price + selectedMods.reduce((acc, cur) => acc + cur.price, 0),
    [dish.price, selectedMods]
  );

  return (
    <div>
      <div className="grow-[3]"></div>

      {dish.is_vine ? (
        <h1 className="text-xs md:text-base normal-case border-b border-black pb-6">
          {dish.make_date} {dish.malbec} /{" "}
          <span className="font-bold text-2xl">{dish.name}</span> / {dish.maker}{" "}
          {dish.flag}
        </h1>
      ) : (
        <h1 className="text-xs md:text-base">
          <span className="font-bold text-sm md:text-2xl">{dish.name}</span>{" "}
          {dish.short_description}
        </h1>
      )}

      <div className="text-sm md:text-2xl my-6 flex justify-between items-center">
        <div>{displayPrice} ₽</div>
        <Adder
          dish_id={dish.id}
          basket_id={item?.id}
          mods={arraySelectedKeys}
        />
      </div>

      {!dish.is_vine && (
        <>
          <div className="border-t text-xs md:text-base border-black mb-[9vmin]">
            <p>{dish.description}</p>
            {dish.mods.length > 0 && (
              <div className="mt-4">
                <ModificatorSelector
                  mods={dish.mods}
                  items={dish.mods}
                  selectionMode="multiple"
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys as any}
                >
                  {(item) => (
                    <Item key={item.id} textValue={item.name}>
                      <span className="flex items-center justify-between">
                        <span>{item.name}</span>
                        <span className="font-bold shrink-0">
                          {item.price} ₽
                        </span>
                      </span>
                    </Item>
                  )}
                </ModificatorSelector>
              </div>
            )}
          </div>

          <div className="border-t text-xs md:text-base border-black mb-[9vmin]">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <p
                className={clsx(
                  dish.content.length > 100 ? "col-span-full" : "col-span-1"
                )}
              >
                <span className="font-bold">состав:</span> {dish.content}
              </p>
              <p
                className={clsx(
                  dish.alerg.length > 100 ? "col-span-full" : "col-span-1"
                )}
              >
                <span className="font-bold">кбжу:</span> {dish.alerg}
              </p>
            </div>
            <p>
              <span className="font-bold">срок хранения:</span>{" "}
              {dish.date_contain}
            </p>
          </div>
        </>
      )}

      {dish.is_vine && (
        <>
          <div className="grow-[90]"></div>
          <div className="border-b border-black mb-6 pb-2">
            {dish.cert === "org" && (
              <div className="flex items-center gap-2">
                <img src="/org.svg" className="h-5" alt="" />
                org
              </div>
            )}
            {dish.cert === "bio" && (
              <div className="flex items-center gap-2">
                <img src="/bio.svg" className="h-5" alt="" />
                bio
              </div>
            )}
            {dish.cert === "eco" && (
              <div className="flex items-center gap-2">
                <img src="/eco.svg" className="h-5" alt="" />
                eco
              </div>
            )}
          </div>
        </>
      )}

      <div className="flex justify-between flex-wrap gap-4 items-center">
        {isAuthenticated && (
          <p className="text-sm md:text-xl">
            <TotalPrice dish_id={dish.id} />
          </p>
        )}
        <AddToCartButtonAuth
          dish_id={dish.id}
          basket_id={item?.id}
          mods={arraySelectedKeys}
        />
      </div>

      <div className="grow-[2]"></div>
    </div>
  );
}
