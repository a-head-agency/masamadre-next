"use client";
import {
  ListState,
  OverlayTriggerProps,
  useListState,
  useOverlayTriggerState,
  Node,
  Selection,
} from "react-stately";
import {
  AriaListBoxProps,
  DismissButton,
  Overlay,
  mergeProps,
  useFocusRing,
  useListBox,
  useOption,
  usePopover,
} from "react-aria";

// Reuse the ListBox, Popover, and Button from your component library. See below for details.
import { Button, Dialog } from "react-aria-components";
import { useCallback, useMemo, useRef } from "react";
import { MinusIcon, PlusIcon } from "@/icons";
import { default as UIButton } from "@/components/ui/button";
import clsx from "clsx";

interface Props<T> extends AriaListBoxProps<T>, OverlayTriggerProps {
  onApply?: (selection: Selection) => unknown;
  mods: {
    id: number;
    name: string;
    price: number;
  }[];
}

export default function ModificatorSelector<T extends object>({
  mods,
  ...props
}: Props<T>) {
  // Create state based on the incoming props
  let state = useListState(props);

  // Get props for child elements from useSelect
  let triggerRef = useRef<HTMLButtonElement>(null);
  let popoverRef = useRef<HTMLDivElement>(null);
  let listboxRef = useRef<HTMLUListElement>(null);
  let { listBoxProps } = useListBox(
    {
      ...props,
      "aria-label": "добавить по вкусу",
    },
    state,
    listboxRef
  );
  let overlayTriggerState = useOverlayTriggerState(props);
  let popoverProps = usePopover(
    {
      triggerRef,
      popoverRef,
      offset: -32,
    },
    overlayTriggerState
  );
  let triggerWidth = useMemo(
    () => {
      if (triggerRef.current?.clientHeight) {
        return triggerRef.current.clientWidth + "px";
      }
      return "auto";
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [triggerRef.current]
  );

  const onApply = useCallback(() => {
    if (props.onApply) {
      props.onApply(state.selectionManager.selectedKeys);
    }
    overlayTriggerState.close();
  }, [props, state.selectionManager.selectedKeys, overlayTriggerState]);

  const indexedMods = useMemo(() => {
    return mods.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: curr,
      }),
      {} as Record<number, (typeof mods)[0]>
    );
  }, [mods]);

  const selectedItems = useMemo(() => {
    const keys = Array.from(state.selectionManager.selectedKeys);
    return keys.map((k) => indexedMods[Number(k)]);
  }, [state.selectionManager.selectedKeys, indexedMods]);

  return (
    <div>
      <button
        className="w-full outline outline-black outline-1 rounded-md lowercase h-8 px-3 leading-none text-sm flex justify-between items-center gap-4"
        ref={triggerRef}
        onClick={overlayTriggerState.toggle}
      >
        <span>Добавить по вкусу</span>
        <PlusIcon className="h-3" />
      </button>
      {overlayTriggerState.isOpen && (
        <Overlay>
          <div {...popoverProps.underlayProps} className="underlay" />
          <div
            {...popoverProps.popoverProps}
            ref={popoverRef}
            className="popover"
          >
            <DismissButton onDismiss={overlayTriggerState.close} />

            <Dialog
              style={{
                width: triggerWidth,
              }}
              aria-label="добавить по вкусу"
              className="outline-none bg-white rounded-md outline outline-1 outline-offset-0 outline-black"
            >
              <ul {...listBoxProps} ref={listboxRef} className="w-full">
                <li className="mb-4">
                  <button
                    className="w-full rounded-md lowercase h-8 px-3 leading-none text-sm flex justify-between items-center gap-4"
                    onClick={overlayTriggerState.close}
                  >
                    <span>Добавить по вкусу</span>
                    <MinusIcon className="h-3" />
                  </button>
                </li>
                {[...state.collection].map((item) => (
                  <Option key={item.key} item={item} state={state} />
                ))}

                <li className="px-3 flex flex-col items-stretch pt-8 pb-3">
                  <UIButton onPress={onApply}>применить</UIButton>
                </li>
              </ul>
            </Dialog>
          </div>
        </Overlay>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedItems.map((v) => (
          <button
            className="lowercase leading-none flex items-center gap-2"
            key={v.id}
            onClick={() => state.selectionManager.toggleSelection(v.id.toString())}
          >
            <span className="underline">{v.name}</span>
            <img src="/cross-mods.svg" className="h-[0.9em]" alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}

interface OptionProps<T> {
  state: ListState<T>;
  item: Node<T>;
}

function Option<T extends object>({ item, state }: OptionProps<T>) {
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
      className={clsx(
        "px-3 py-1 flex items-center gap-2 outline-none cursor-pointer"
      )}
    >
      <div className="size-4 border relative border-[#B2B2B2] rounded-full">
        {state.selectionManager.isSelected(item.key) && (
          <img
            className="absolute top-1/2 left-1/2 -translate-y-2/3 -translate-x-1/3 w-4"
            src="/checkmark.svg"
            alt=""
          />
        )}
      </div>

      <span className="grow">{item.rendered}</span>
    </li>
  );
}
