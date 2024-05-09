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

interface Props extends Omit<AriaButtonProps, "className" | "style"> {
  dish_id: number;
  from_hour_iso: string;
  to_hour_iso: string;
}

export default function Button({
  dish_id,
  from_hour_iso,
  to_hour_iso,
  ...props
}: Props) {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps } = useButton(props, ref);
  let { focusProps, isFocusVisible } = useFocusRing();

  const { addDish, isLoading, data } = useBasket();
  const count = useMemo(
    () => (data?.list.find((d) => d.dish_id === dish_id)?.count || -1) + 1,
    [data, dish_id]
  );

  const unavailable = useMemo(() => {
    const now = DateTime.now();
    const from = DateTime.fromISO(from_hour_iso);
    const to = DateTime.fromISO(to_hour_iso);

    if (now < from || to <= now) {
      const fromFormatted = from.toFormat("HH:mm");
      const toFormatted = to.toFormat("HH:mm");
      return (
        <span className="text-end opacity-50 text-sm">
          с {fromFormatted}
          <br />
          до {toFormatted}
        </span>
      );
    }
  }, [from_hour_iso, to_hour_iso]);

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
                dish_id,
                count: count + 1,
              })
            }
          >
            <BasketIcon className="h-6" />
          </button>

          <div className={cx(count == 0 && "hidden")}>
            <Adder dish_id={dish_id} />
          </div>
        </>
      )}
    </>
  );
}
