"use client";
import type { AriaListBoxProps } from "react-aria";
import { ListState, Node, SelectState, useListState } from "react-stately";
import { mergeProps, useFocusRing, useListBox, useOption } from "react-aria";
import { useRef } from "react";
import cx from "clsx";

export default function ListBox<T extends object>(
  props: AriaListBoxProps<T> & {
    state: SelectState<T>;
  }
) {
  // Create state based on the incoming props
  let { state } = props;

  // Get props for the listbox element
  let ref = useRef(null);
  let { listBoxProps } = useListBox(props, state, ref);

  return (
    <>
      <ul {...listBoxProps} className="border border-black py-1" ref={ref}>
        {[...state.collection].map((item) => (
          <Option key={item.key} item={item} state={state} />
        ))}
      </ul>
    </>
  );
}

function Option<T>({ item, state }: { item: Node<T>; state: ListState<T> }) {
  // Get props for the option element
  let ref = useRef(null);
  let { optionProps } = useOption({ key: item.key }, state, ref);

  // Determine whether we should show a keyboard
  // focus ring for accessibility
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      data-focus-visible={isFocusVisible}
      className={cx(
        "outline-none px-4 py-1 cursor-pointer",
        isFocusVisible && "bg-black/10 transition-colors",
        state.selectionManager.isSelected(item.key) && "!bg-black text-white"
      )}
    >
      {item.rendered}
    </li>
  );
}
