"use client";

import { useBasket } from "@/hooks/basket";
import { MinusIcon, PlusIcon } from "@/icons";
import { useMemo } from "react";

interface Props {
  basket_id?: number;
  dish_id: number;
  mods?: number[];
}

export default function Adder({ dish_id, mods, basket_id }: Props) {
  const basket = useBasket();

  const item = useMemo(
    () => basket.data?.list.find((d) => d.id === basket_id),
    [basket.data, basket_id]
  );

  const count = item?.count || 0;
  const id = item?.id;

  return (
    <div className="flex gap-[0.5em]">
      <button
        type="button"
        disabled={basket.isLoading}
        onClick={() =>
          basket.addDish({
            id: id,
            dish_id: dish_id,
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
        disabled={count === 0 || basket.isLoading}
        className="disabled:opacity-50 transition-opacity"
        onClick={() =>
          basket.addDish({
            id: id,
            dish_id: dish_id,
            count: Math.max(0, count - 1),
          })
        }
      >
        <MinusIcon className="size-[0.6em]" />
      </button>
    </div>
  );
}
