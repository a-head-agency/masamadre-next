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

interface Props extends Omit<AriaButtonProps, "className" | "style"> {
  dish_id: number;
}

export default function Button({ dish_id, ...props }: Props) {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps } = useButton(props, ref);
  let { focusProps, isFocusVisible } = useFocusRing();

  const { addDish, isLoading, data } = useBasket();
  const count = useMemo(
    () => (data?.list.find((d) => d.dish_id === dish_id)?.count || -1) + 1,
    [data, dish_id]
  );

  return (
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
  );
}
