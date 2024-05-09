"use client";

import { useMemo, useState } from "react";
import { useCallbackRef } from "@chakra-ui/react";

/**
 * Given a prop value and state value, the useControllableProp hook is used to determine whether a component is controlled or uncontrolled, and also returns the computed value.
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-controllable#usecontrollableprop
 */
export function useControllableProp<T>(prop: T | undefined, state: T) {
  const controlled = typeof prop !== "undefined";
  const value = controlled ? prop : state;
  return useMemo<[boolean, T]>(() => [controlled, value], [controlled, value]);
}

export interface UseNullableControllableStateProps<T> {
  value?: T | null;
  defaultValue?: T | null | (() => T | null);
  onChange?: (value: T | null) => void;
  shouldUpdate?: (prev: T | null, next: T | null) => boolean;
}

/**
 * The `useControllableState` hook returns the state and function that updates the state, just like React.useState does.
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-controllable#usecontrollablestate
 */
export function useNullableControllableState<T>(
  props: UseNullableControllableStateProps<T>
) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    shouldUpdate = (prev, next) => prev !== next,
  } = props;

  const onChangeProp = useCallbackRef(onChange);
  const shouldUpdateProp = useCallbackRef(shouldUpdate);

  const [uncontrolledState, setUncontrolledState] = useState(
    defaultValue as T | null
  );
  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp : uncontrolledState;

  const setValue = useCallbackRef(
    (next: React.SetStateAction<T | null>) => {
      const setter = next as (prevState?: T | null) => T;
      const nextValue = typeof next === "function" ? setter(value) : next;

      if (!shouldUpdateProp(value, nextValue)) {
        return;
      }

      if (!controlled) {
        setUncontrolledState(nextValue);
      }

      onChangeProp(nextValue);
    },
    [controlled, onChangeProp, value, shouldUpdateProp]
  );

  return [value, setValue] as [
    T | null,
    React.Dispatch<React.SetStateAction<T | null>>
  ];
}
