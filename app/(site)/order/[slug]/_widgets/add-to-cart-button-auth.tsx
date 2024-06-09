"use client";

import Button from "@/components/ui/button";
import { GetOneDishScheme } from "@/data/products";
import { useBasket } from "@/hooks/basket";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { z } from "zod";


interface Props {
  dish: Pick<z.infer<typeof GetOneDishScheme>, 'id' | 'from_hour' | 'to_hour' | 'disabledWhy'>;
  basket_id?: number;
  mods?: number[];
}

export default function AddToCartButtonAuth(props: Props) {
  const basket = useBasket();

  const count = useMemo(
    () =>
      basket.data?.list.find((d) => d.dish_id === props.dish.id)?.count || 0,
    [basket.data, props.dish.id]
  );

  const disabledMessage = useMemo(() => {
    const dish = props.dish;
    if (dish.disabledWhy) {
      switch (dish.disabledWhy) {
        case 'time_is_out_of_allowed_range': {
          const from = DateTime.fromISO(dish.from_hour).toFormat('HH:mm');
          const to = DateTime.fromISO(dish.to_hour).toFormat('HH:mm');
          return `С ${from} до ${to}`
        }
        default: {
          return 'Не доступно'
        }
      }
    }

  }, [props.dish.disabledWhy])

  return (
    <Button
      isInverted
      onPress={() =>
        basket.addDish({
          id: props.basket_id,
          mods: props.mods,
          dish_id: props.dish.id,
          count: count + 1,
        })
      }
      isDisabled={basket.isLoading || !!disabledMessage}
    >
      <span className="text-xs md:text-base lowercase">{disabledMessage || 'добавить в корзину'}</span>
    </Button>
  );
}
