"use client";
import Button from "@/components/ui/button";
import TimePicker from "@/components/ui/timepicker";
import { useControllableState } from "@chakra-ui/react";
import { CalendarDateTime } from "@internationalized/date";
import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo } from "react";
import { useNullableControllableState } from "@/hooks/utils/use-nullable-controllable-state";
import clsx from "clsx";

interface Props {
  value?: string | null;
  onValueChange?: (iso: string | null) => unknown;
}

export default function DeliveryTimeSelector({ onValueChange, value }: Props) {
  const [serializedDatetime, setSerializedDatetime] =
    useNullableControllableState({
      onChange: onValueChange,
      value,
      defaultValue: null,
    });

  const parsedDatetime = useMemo(() => {
    if (!serializedDatetime) {
      return null;
    }
    const dt = DateTime.fromISO(serializedDatetime);
    return new CalendarDateTime(
      dt.year,
      dt.month,
      dt.day,
      dt.hour,
      dt.minute,
      dt.second,
      dt.millisecond
    );
  }, [serializedDatetime]);

  const setDatetime = useCallback(
    (datetime?: CalendarDateTime | null) => {
      setSerializedDatetime(datetime?.toString() || null);
    },
    [setSerializedDatetime]
  );

  useEffect(() => {
    console.log({ serializedDatetime });
  }, [serializedDatetime]);

  return (
    <div className="col-span-full flex gap-4 flex-wrap">
      <button
        type="button"
        className={clsx(
          "outline-none rounded-full border border-black px-4 py-2 transition-all",
          !parsedDatetime ? "bg-black text-white" : "bg-none text-black"
        )}
        onClick={() => setDatetime(null)}
      >
        как можно быстрее
      </button>
      <TimePicker
        minMinutes={8 * 60}
        maxMinutes={18 * 60}
        value={parsedDatetime}
        onValueChange={setDatetime}
      />
    </div>
  );
}
