"use client";

import {
  AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
} from "react-aria";
import { useRef } from "react";
import cx from "clsx";

interface Props extends Omit<AriaButtonProps, "className" | "style"> {
  isInverted?: boolean;
  isLoading?: boolean;
}

export default function Button({ isLoading, isInverted, ...props }: Props) {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps } = useButton(props, ref);
  let { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      className={cx(
        "outline-none rounded-full border border-black px-4 py-2 transition-all",
        "disabled:opacity-50",
        isInverted && !props.isDisabled && "hover:bg-black hover:text-white",
        !isInverted && "bg-black text-white",
        isFocusVisible && "ring-2 ring-offset-2 ring-black",
        isLoading && "opacity-50"
      )}
      ref={ref}
    >
      {props.children}
    </button>
  );
}
