"use client";

import { ArrowIcon } from "@/icons";
import ChevronDownIcon from "@/icons/chevron-down";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";

interface Props {
  links: {
    to: string;
    content: ReactNode;
    textValue: string;
    exact: boolean;
  }[];
}

export function NavigationDropdown({ links }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Select
      className="px-4 md:hidden"
      selectedKey={pathname}
      onSelectionChange={(k) =>
        location.pathname !== k && router.push(k.toString())
      }
      placeholder="выберите"
      aria-label="navigation"
    >
      <Button
        className={[
          "w-full border group px-2 py-1 lowercase rounded flex justify-between items-center text-start border-black outline-none pressed:rounded-b-none pressed:border-b-transparent",
        ].join(" ")}
      >
        <SelectValue className="placeholder-shown:opacity-50" />
        <ChevronDownIcon className="text-black size-4 aspect-square group-pressed:-scale-y-100 transition-transform" />
      </Button>
      <Popover className="bg-white w-[--trigger-width]" offset={0}>
        <ListBox
          className={[
            "outline-none border border-black rounded border-t-0 rounded-t-none",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {links.map((l) => (
            <ListBoxItem
              id={l.to}
              key={l.to}
              textValue={l.textValue}
              className="cursor-pointer lowercase px-2 outline-none focus:bg-black focus:text-white rounded-none"
            >
              {l.content}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}
