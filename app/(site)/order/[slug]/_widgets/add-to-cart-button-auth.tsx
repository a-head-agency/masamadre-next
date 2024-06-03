"use client";

import Button from "@/components/ui/button";
import { useBasket } from "@/hooks/basket";
import { useMemo } from "react";

interface Props {
  dish_id: number;
  basket_id?: number;
  mods?: number[];
}

export default function AddToCartButtonAuth(props: Props) {
  const basket = useBasket();

  const count = useMemo(
    () =>
      basket.data?.list.find((d) => d.dish_id === props.dish_id)?.count || 0,
    [basket.data, props.dish_id]
  );

  return (
    <Button
      isInverted
      onPress={() =>
        basket.addDish({
          id: props.basket_id,
          mods: props.mods,
          dish_id: props.dish_id,
          count: count + 1,
        })
      }
      isDisabled={basket.isLoading}
    >
      <span className="text-xs md:text-base">добавить в корзину</span>
    </Button>
  );
}
