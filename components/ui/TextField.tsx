"use client";

import { useCallback, useRef } from "react";
import type { AriaTextFieldProps } from "react-aria";
import { useTextField } from "react-aria";
import { clsx as cx } from "clsx";

interface Props extends AriaTextFieldProps {
  isRequired?: boolean;
  size?: "md" | "lg";
  capitalize?: boolean;
}
export type TextFieldProps = Props;

export default function TextField({
  isRequired,
  size = "md",
  capitalize = false,
  ...props
}: Props) {
  let { label } = props;
  let ref = useRef(null);
  let { labelProps, inputProps, isInvalid } = useTextField(props, ref);

  return (
    <div
      className={cx(
        "flex flex-col gap-2 transition-opacity min-w-0",
        props.isDisabled && "opacity-50"
      )}
    >
      {(label || props.placeholder) && (
        <label
          {...labelProps}
          className={cx(
            "transition-colors opacity-50",
            !label && "hidden",
            isInvalid && "!text-red selection:bg-red selection:text-white",
            size === "md" && "text-sm",
            size === "lg" && "text-base"
          )}
        >
          {label ? label : props.placeholder}
          {isRequired && "*"}
        </label>
      )}
      <input
        {...inputProps}
        className={cx(
          "bg-transparent border-b border-black outline-none transition-colors py-1 placeholder:text-black/30",
          isInvalid &&
            "!border-red text-red selection:bg-red selection:text-white !placeholder:text-red/50",
          size === "md" && "text-base",
          size === "lg" && "text-xl",
          capitalize && "capitalize"
        )}
        ref={ref}
      />
    </div>
  );
}
