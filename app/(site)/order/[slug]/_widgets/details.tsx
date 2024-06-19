"use client";
import Adder from "@/components/functional/adder";
import { GetOneDishScheme } from "@/data/products";
import { z } from "zod";
import clsx from "clsx";
import AddToCartButtonAuth from "./add-to-cart-button-auth";
import ModificatorSelector from "@/components/functional/modificators-selector";
import { Item, Section, Selection } from "react-stately";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useBasket } from "@/hooks/basket";
import { areSetsEqual } from "@/utils";

interface Props {
  isAuthenticated: boolean;
  dish: z.infer<typeof GetOneDishScheme>;
}

export default function Details({ dish }: Props) {
  const [selectedKeys, setSelectedKeys] = useState(new Set<string>([]));

  const indexedMods = useMemo(() => {
    return dish.mod_group
      .flat()
      .map((v) => v.modificators)
      .flat()
      .reduce(
        (acc, curr) => ({
          ...acc,
          [curr.id]: curr,
        }),
        {} as Record<number, (typeof dish.mod_group)[0]["modificators"][0]>
      );
  }, [dish]);

  const arraySelectedKeys = useMemo(
    () => Array.from(selectedKeys).map((v) => Number(v)),
    [selectedKeys]
  );

  const selectedMods = useMemo(() => {
    return arraySelectedKeys.map((k) => indexedMods[k]).filter(Boolean);
  }, [indexedMods, arraySelectedKeys]);

  const disabledKeys = useMemo(
    () =>
      dish.mod_group
        .flatMap((v) => v.modificators)
        .filter((v) => !v.active)
        .map((v) => v.id.toString()),
    [dish]
  );

  const basket = useBasket();
  const item = useMemo(() => {
    const currentVariantHash = selectedMods
      .map((v) => `${v.id}:1`)
      .sort()
      .join(",");

    const exactMatch = basket.data?.list.find((d) => {
      const variantInBasketHash = d.mods
        .map((v) => `${v.id}:${v.count}`)
        .sort()
        .join(",");
      console.log(JSON.stringify({
        currentVariantHash,
        variantInBasketHash,
      }));
      return (
        d.dish_id === dish.id && variantInBasketHash === currentVariantHash
      );
    });

    return exactMatch;
  }, [basket.data?.list, dish.id, selectedMods]);

  useEffect(() => {
    if (item?.mods) {
      setSelectedKeys(new Set(item.mods.map((v) => v.id.toString())));
    }
  }, [item?.mods]);

  const isModsSelectorDirty = useMemo(() => {
    const modsForCurrentBasketId = new Set(
      item?.mods.map((v) => v.id.toString())
    );
    const currentMods = selectedKeys;
    return !areSetsEqual(modsForCurrentBasketId, currentMods);
  }, [item?.mods, selectedKeys]);

  const displayPrice = useMemo(
    () => dish.price + selectedMods.reduce((acc, cur) => acc + cur.price, 0),
    [dish.price, selectedMods]
  );

  const onSelectionChange = (_keys: Selection) => {
    if (_keys === "all") {
      return;
    }

    const keys = Array.from(_keys).map((v) => v.toString());
    const lastKey = keys.at(-1);
    const nextSet = new Set(keys);

    // check if last selected key is from "options"
    if (lastKey) {
      const optionsGroup = dish.mod_group
        .filter((v) => v.type === "options")
        .find((v) =>
          v.modificators.map((v) => v.id.toString()).includes(lastKey)
        );

      // if last key from "options" group we need
      // to remove all other keys from the group and leave only last selected one
      if (optionsGroup) {
        optionsGroup.modificators.forEach((v) =>
          nextSet.delete(v.id.toString())
        );
        nextSet.add(lastKey);
      }
    }

    setSelectedKeys(nextSet);
  };

  return (
    <div className="flex flex-col h-full">
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
          dish={dish}
          basket_id={isModsSelectorDirty ? undefined : item?.id}
          mods={arraySelectedKeys}
        />
      </div>

      {!dish.is_vine && (
        <>
          <div className="border-t text-xs md:text-base border-black mb-[9vmin]">
            <p>{dish.description}</p>
            {Object.keys(indexedMods).length > 0 && (
              <div className="mt-4">
                <ModificatorSelector
                  mods={dish.mod_group}
                  items={dish.mod_group}
                  selectionMode="multiple"
                  selectedKeys={selectedKeys}
                  onSelectionChange={onSelectionChange}
                  disabledKeys={disabledKeys}
                >
                  {(section) => (
                    <Section
                      key={section.id}
                      items={section.modificators}
                      title={section.name}
                    >
                      {(item) => (
                        <Item key={item.id} textValue={item.name}>
                          <span className="flex items-start justify-between text-sm">
                            <span>{item.name}</span>
                            <span className="font-bold shrink-0">
                              {item.price} ₽
                            </span>
                          </span>
                        </Item>
                      )}
                    </Section>
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

      <div className="flex justify-between flex-wrap gap-2 items-center">
        <p className="text-sm md:text-xl">
          в корзине: {basket.data?.total_price || 0} ₽
        </p>
        <AddToCartButtonAuth
          dish={dish}
          basket_id={isModsSelectorDirty ? undefined : item?.id}
          mods={arraySelectedKeys}
        />
      </div>

      <div className="grow-[2]"></div>
    </div>
  );
}
