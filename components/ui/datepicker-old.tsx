"use client";

import { ChevronDown } from "@/icons";
import { CalendarDate, DateValue } from "@internationalized/date";
import { DateTime } from "luxon";
import { FC, ReactNode, useCallback, useMemo } from "react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DatePickerProps,
  DateSegment,
  DateSegmentRenderProps,
  Group,
  Heading,
  Popover,
} from "react-aria-components";

const InputDatepicker: FC<
  {
    label?: ReactNode;
    isBrightLabel?: boolean;
    isRequired?: boolean;
    value: string | null;
    onChange: (s: string) => void;
  } & Omit<DatePickerProps<CalendarDate>, "value" | "onChange">
> = ({ label, isBrightLabel, isRequired, value, onChange, ...props }) => {
  const dateSegmentRenderer = useCallback((s: DateSegmentRenderProps) => {
    if (s.type === "literal") {
      return <span>&nbsp;</span>;
    }
    if (s.type === "day") {
      if (s.isPlaceholder) {
        return "день";
      }
    }
    if (s.type === "year") {
      if (s.isPlaceholder) {
        return "год";
      }
    }
    if (s.type === "month") {
      if (s.isPlaceholder) {
        return "месяц";
      }
      if (s.value)
        return [
          "января",
          "февраля",
          "марта",
          "апреля",
          "мая",
          "июня",
          "июля",
          "августа",
          "сентября",
          "октября",
          "ноября",
          "декабря",
        ][s.value - 1];
    }

    return s.text;
  }, []);

  const _value = useMemo(() => {
    if (!value) return null;
    const dt = DateTime.fromISO(value);
    return new CalendarDate(dt.year, dt.month, dt.day);
  }, [value]);

  const _onChange = useCallback(
    (value?: CalendarDate) => {
      if (value) {
        const iso =
          DateTime.fromObject({
            year: value.year,
            month: value.month,
            day: value.day,
          }).toISO() ?? "";
        onChange(iso);
      }
    },
    [onChange]
  );

  return (
    <DatePicker {...props} value={_value} onChange={_onChange}>
      {label && (
        <label
          className={[
            "mb-2 block lowercase",
            isBrightLabel && "opacity-100",
            !isBrightLabel && "opacity-50",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
          {isRequired && <span className="text-red-600">*</span>}
        </label>
      )}
      <Group className="flex border-b border-black">
        <DateInput className="flex w-full text-start text-xl outline-none leading-normal">
          {(segment) => (
            <DateSegment
              className="outline-none focus:bg-black focus:text-white"
              segment={segment}
            >
              {dateSegmentRenderer}
            </DateSegment>
          )}
        </DateInput>
        <Button className="group size-6 p-1 focus:ring-1 ring-offset-1 rounded transition-shadow ring-black outline-none">
          <ChevronDown className="text-black h-full aspect-square group-pressed:-scale-y-100 transition-transform" />
        </Button>
      </Group>
      <Popover
        shouldFlip={true}
        className="bg-white p-4 border-black border w-[--trigger-width]"
      >
        <Calendar>
          <header className="flex gap-2 justify-between">
            <Button slot="previous">◀</Button>
            <Heading className="text-center" />
            <Button slot="next">▶</Button>
          </header>
          <CalendarGrid className="border-spacing-2 border-separate">
            {(date) => (
              <CalendarCell
                className="size-8 flex items-center selected:bg-black selected:text-white justify-center text-center outline-none rounded border-transparent border-2 focus:border-black transition-colors"
                date={date}
              />
            )}
          </CalendarGrid>
        </Calendar>
      </Popover>
    </DatePicker>
  );
};

export default InputDatepicker;
