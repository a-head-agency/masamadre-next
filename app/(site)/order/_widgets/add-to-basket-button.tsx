"use client";

import {
  AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
} from "react-aria";
import { useMemo, useRef } from "react";
import cx from "clsx";
import { useBasket } from "@/hooks/basket";
import { BasketIcon } from "@/icons";
import Adder from "@/components/functional/adder";
import { DateTime } from "luxon";
import { ShortDishSchema } from "@/data/products";
import { z } from "zod";

interface Props extends Omit<AriaButtonProps, "className" | "style"> {
  dish: Pick<z.infer<typeof ShortDishSchema>, 'id' | 'to_hour' | 'from_hour' | 'disabledWhy'>
}

export default function Button({
  dish,
  ...props
}: Props) {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps } = useButton(props, ref);
  let { focusProps, isFocusVisible } = useFocusRing();

  const { addDish, isLoading, data } = useBasket();
  const item = useMemo(
    () => data?.list.find((d) => d.dish_id == dish.id && d.mods.length === 0),
    [dish.id, data]
  );
  const count = item?.count || 0;

  const unavailable = useMemo(() => {
    const from = DateTime.fromISO(dish.from_hour);
    const to = DateTime.fromISO(dish.to_hour);

    if (dish.disabledWhy) {
      if (dish.disabledWhy === 'time_is_out_of_allowed_range') {
        const fromFormatted = from.toFormat("HH:mm");
        const toFormatted = to.toFormat("HH:mm");
        return (
          <span className="text-end opacity-50 text-sm text-nowrap">
            с {fromFormatted}
            <br />
            до {toFormatted}
          </span>
        );
      }
    }
  }, [dish]);

  return (
    <>
      {unavailable ? (
        unavailable
      ) : (
        <>
          <button
            {...mergeProps(buttonProps, focusProps)}
            className={cx(
              count > 0 && "hidden",
              "transition-all",
              "disabled:opacity-50",
              isFocusVisible && "ring-2 ring-offset-2 ring-black",
              isLoading && "opacity-50"
            )}
            disabled={isLoading}
            ref={ref}
            onClick={() =>
              addDish({
                dish_id: dish.id,
                count: count + 1,
              })
            }
          >
            <BasketIcon className="h-6" />
          </button>

          <div className={cx(count == 0 && "hidden")}>
            <Adder dish={dish} basket_id={item?.id} />
          </div>
        </>
      )}
    </>
  );
}
