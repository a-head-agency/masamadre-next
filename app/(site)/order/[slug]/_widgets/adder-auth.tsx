"use client";

import { GetOneDishScheme } from "@/data/products";
import { useBasket } from "@/hooks/basket";
import { MinusIcon, PlusIcon } from "@/icons";
import { useMemo } from "react";
import { z } from "zod";

interface Props {
  dish: Pick<z.infer<typeof GetOneDishScheme>, 'id' | 'from_hour' | 'to_hour' | 'disabledWhy'>
}

export default function AdderAuth({ dish }: Props) {
  const basket = useBasket();

  const count = useMemo(
    () =>
      basket.data?.list.find((d) => d.dish_id === dish.id)?.count || 0,
    [basket.data, dish]
  );

  const isFullyDisabled = basket.isLoading || !!dish.disabledWhy

  return (
    <div className="flex gap-4">
      <button
        type="button"
        disabled={isFullyDisabled}
        onClick={() =>
          basket.addDish({
            dish_id: dish.id,
            count: count + 1,
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
