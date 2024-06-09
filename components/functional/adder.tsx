"use client";

import { ShortDishSchema } from "@/data/products";
import { useBasket } from "@/hooks/basket";
import { MinusIcon, PlusIcon } from "@/icons";
import { useMemo } from "react";
import { z } from "zod";

interface Props {
  basket_id?: number;
  dish: Pick<z.infer<typeof ShortDishSchema>, 'id' | 'disabledWhy'>
  mods?: number[];
}

export default function Adder({ dish, mods, basket_id }: Props) {
  const basket = useBasket();

  const item = useMemo(
    () => basket.data?.list.find((d) => d.id === basket_id),
    [basket.data, basket_id]
  );

  const count = item?.count || 0;
  const id = item?.id;

  const isFullyDisabled = basket.isLoading || !!dish.disabledWhy

  return (
    <div className="flex gap-[0.5em]">
      <button
        className="disabled:opacity-50 transition-opacity"
        type="button"
        disabled={isFullyDisabled}
        onClick={() =>
          basket.addDish({
            id: id,
            dish_id: dish.id,
            count: count + 1,
            mods,
          })
        }
      >
        <PlusIcon className="size-[0.6em]" />
      </button>
      <span>{count}шт</span>
      <button
        type="button"
        disabled={isFullyDisabled || count === 0}
        className="disabled:opacity-50 transition-opacity"
        onClick={() =>
          basket.addDish({
            id: id,
            dish_id: dish.id,
            count: Math.max(0, count - 1),
          })
        }
      >
        <MinusIcon className="size-[0.6em]" />
      </button>
    </div>
  );
}
