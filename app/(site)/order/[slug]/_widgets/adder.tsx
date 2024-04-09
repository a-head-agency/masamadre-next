"use client";

import { useBasket } from "@/hooks/basket";
import { MinusIcon, PlusIcon } from "@/icons";
import { useMemo } from "react";

interface Props {
  dish_id: number;
}

export default function Adder(props: Props) {
  const basket = useBasket();

  const count = useMemo(
    () =>
      basket.data?.list.find((d) => d.dish_id === props.dish_id)?.count || 0,
    [basket.data, props.dish_id]
  );

  const totalSum = useMemo(() => {
    const dish = basket.data?.list.find((d) => d.dish_id === props.dish_id);
    return (dish?.count || 0) * (dish?.price || 0);
  }, [basket.data, props.dish_id]);

  return (
    <div className="flex gap-4">
      <button
        type="button"
        disabled={basket.isLoading}
        onClick={() =>
          basket.addDish({
            dish_id: props.dish_id,
            count: count + 1,
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
            dish_id: props.dish_id,
            count: Math.max(0, count - 1),
          })
        }
      >
        <MinusIcon className="size-[0.6em]" />
      </button>
    </div>
  );
}
