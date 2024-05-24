"use client";

import { useRef } from "react";
import type { AriaTextFieldProps } from "react-aria";
import { useTextField } from "react-aria";
import { clsx as cx } from "clsx";
import { NumberFormatBase } from "react-number-format";

interface Props extends AriaTextFieldProps {
  isRequired?: boolean;
  size?: "md" | "lg";
  help?: string;
}
export type PhoneFieldProps = Props;

export default function PhoneField({
  isRequired,
  size = "md",
  help,
  ...props
}: Props) {
  let { label } = props;
  let ref = useRef(null);
  const onChange = (s: string) => {
    if (props.onChange) {
      const str = s.replaceAll(/\D/g, "");
      props.onChange(str);
    }
  };
  let { labelProps, inputProps, isInvalid } = useTextField(
    {
      ...props,
      onChange,
    },
    ref
  );
  let { type, value, defaultValue, ...restInputProps } = inputProps;

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
            isInvalid && "!text-red selection:bg-red  selection:text-white",
            size === "md" && "text-sm",
            size === "lg" && "text-base"
          )}
        >
          {label ? label : props.placeholder}
          {isRequired && "*"}
        </label>
      )}
      <NumberFormatBase
        {...restInputProps}
        value={value as any}
        defaultValue={defaultValue as any}
        className={cx(
          "bg-transparent border-b border-black outline-none transition-colors py-1 placeholder:text-black/30",
          isInvalid &&
            "!border-red text-red selection:bg-red selection:text-white placeholder:!text-red/50",
          size === "md" && "text-base",
          size === "lg" && "text-xl"
        )}
        getInputRef={ref}
        format={formatPhone}
        inputMode="tel"
      />
      {help && <div className="opacity-50 text-xs">{help}</div>}
    </div>
  );
}

export const formatPhone = (str: string) => {
  str = str.replace(/\D/g, "");
  str = str.slice(0, 11);
  if (str) {
    let s = "+";
    if (str[0] === "7" || str[0] === "8") {
      str = str.slice(1);
    }

    s += "7";
    let part = str.slice(0, 3);
    str = str.slice(3);
    if (part) {
      s += " (" + part;
    }

    part = str.slice(0, 3);
    str = str.slice(3);
    if (part) {
      s += ") " + part;
    }

    part = str.slice(0, 2);
    str = str.slice(2);
    if (part) {
      s += " - " + part;
    }

    part = str.slice(0, 2);
    str = str.slice(2);
    if (part) {
      s += " - " + part;
    }

    return s;
  }
  return "";
};
