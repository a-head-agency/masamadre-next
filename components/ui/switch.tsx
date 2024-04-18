"use client";

import { useRef } from "react";
import { useToggleState } from "react-stately";
import {
  useFocusRing,
  useSwitch,
  VisuallyHidden,
  AriaSwitchProps,
} from "react-aria";
import { motion } from "framer-motion";
import cx from "clsx";

interface Props extends AriaSwitchProps {
  variant?: "reversed" | "default";
}

export default function Switch({ variant = "default", ...props }: Props) {
  let state = useToggleState(props);
  let ref = useRef(null);
  let { inputProps } = useSwitch(props, state, ref);
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label
      className={cx(
        "flex justify-between items-center flex-wrap gap-x-4 gap-y-2 transition-opacity cursor-pointer normal-case",
        props.isDisabled ? "opacity-50" : "opacity-100",
        variant === "default" && "flex-row",
        variant === "reversed" && "flex-row-reverse"
      )}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>

      {props.children}

      <span
        className={cx(
          "block relative h-5 w-10 rounded-full transition-all border border-black box-content",
          isFocusVisible && "ring-2 ring-offset-2 ring-black",
          state.isSelected ? "bg-black" : "bg-white"
        )}
      >
        <motion.span
          variants={{
            on: {
              x: "1.25rem",
            },
            off: {
              x: 0,
            },
          }}
          initial={state.isSelected ? "on" : "off"}
          animate={state.isSelected ? "on" : "off"}
          className={cx(
            "absolute top-0.5 left-0.5 size-4 rounded-full transition-colors",

            state.isSelected ? "bg-white" : "bg-black"
          )}
        ></motion.span>
      </span>
    </label>
  );
}
