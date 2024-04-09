"use client";

import {
  AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
} from "react-aria";
import { useRef } from "react";
import cx from "clsx";
import { useBasket } from "@/hooks/basket";
import { BasketIcon } from "@/icons";

interface Props extends Omit<AriaButtonProps, "className" | "style"> {
  dish_id: number;
}

export default function Button({ dish_id, ...props }: Props) {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps } = useButton(props, ref);
  let { focusProps, isFocusVisible } = useFocusRing();

  const { addDish, isLoading, data } = useBasket();

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      className={cx(
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
          count:
            (data?.list.find((d) => d.dish_id === dish_id)?.count || 0) + 1,
        })
      }
    >
      <BasketIcon className="h-6" />
    </button>
  );
}
