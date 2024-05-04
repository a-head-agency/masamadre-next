import { FC, ReactNode, useEffect, useState } from "react";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  SelectValue,
  Select,
} from "react-aria-components";

const SelectOld: FC<{
  label?: ReactNode;
  options: { label: ReactNode; code: string }[];
  big?: boolean;
  onChange: (code: string) => void;
  value: string | null;
}> = ({ label, options, big, onChange, value}) => {

  const _onChange = (vals: any) => {
    console.log(vals)
    onChange(vals)
  }

  return (
    <Select
      selectedKey={value}
      onSelectionChange={_onChange as any}
      placeholder="выберите"
      className="flex flex-col gap-2"
    >
      {label && <Label className="opacity-50 block lowercase">{label}</Label>}

      <Button
        type="button"
        className={[
          "w-full border-b py-1 leading-tight text-start border-black outline-none",
          big && "text-xl",
        ].join(" ")}
      >
        <SelectValue className="placeholder-shown:opacity-50" />
      </Button>
      <Popover className="bg-white w-[--trigger-width]">
        <ListBox
          className={["py-2 outline-none border border-black", big && "text-xl"]
            .filter(Boolean)
            .join(" ")}
        >
          {options.map((opt) => (
            <ListBoxItem
              id={opt.code}
              key={opt.code}
              className="cursor-pointer outline-none px-2 focus:bg-black focus:text-white rounded-none"
            >
              {opt.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
};

export default SelectOld;
