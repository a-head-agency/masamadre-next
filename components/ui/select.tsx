"use client";
import { Item, useSelectState } from "react-stately";
import { AriaSelectProps, HiddenSelect, useSelect } from "react-aria";

// Reuse the ListBox, Popover, and Button from your component library. See below for details.
import { Button, Dialog } from "react-aria-components";
import ListBox from "./listbox";
import Popover from "./popover";
import { useRef } from "react";

export default function Select<T extends object>(props: AriaSelectProps<T>) {
  // Create state based on the incoming props
  let state = useSelectState(props);

  // Get props for child elements from useSelect
  let ref = useRef<HTMLButtonElement>(null);
  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  return (
    <div className="block">
      <div {...labelProps}>{props.label}</div>
      <HiddenSelect
        isDisabled={props.isDisabled}
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <Button
        className="w-full bg-red flex justify-between items-center"
        {...triggerProps}
        ref={ref}
      >
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : "Select an option"}
        </span>
        <span aria-hidden="true" style={{ paddingLeft: 5 }}>
          ▼
        </span>
      </Button>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <ListBox {...menuProps} state={state}>
            {props.children}
          </ListBox>
        </Popover>
      )}
    </div>
  );
}
