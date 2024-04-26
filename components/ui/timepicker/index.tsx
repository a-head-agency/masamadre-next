"use client";

import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import TimePickerModal from "./modal";
import { motion, useDragControls, useMotionValue } from "framer-motion";
import {
  CalendarDate,
  CalendarDateTime,
  getDayOfWeek,
  today,
} from "@internationalized/date";
import Button from "../button";

interface VerticalDragSelectorProps<T> {
  options?: T[];
  onValueChange?: (optionIndex: number) => void;
}

function VerticalDragSelector<T extends string>({
  onValueChange = () => {},
  options = [],
}: VerticalDragSelectorProps<T>) {
  const cellSize = 50;
  const cellMaxWidth = useMemo(() => {
    return Math.max(...options.map((o) => o.length));
  }, [options]);
  const y = useMotionValue(0);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: cellSize * 5 + "px",
        width: cellMaxWidth + 2 + "ch",
      }}
    >
      <div
        className="absolute top-0 inset-x-0 bg-gradient-to-t from-transparent to-35% to-white z-50 pointer-events-none"
        style={{
          height: cellSize * 2 + "px",
        }}
      ></div>
      <div
        className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-transparent to-35% to-white z-50 pointer-events-none"
        style={{
          height: cellSize * 2 + "px",
        }}
      ></div>
      <motion.div
        className="text-center absolute top-0 inset-x-0"
        style={{
          y,
          paddingBlock: cellSize * 2 + "px",
        }}
        drag
        dragConstraints={{
          left: 0,
          right: 0,
          top: -cellSize * (options.length - 1),
          bottom: 0,
        }}
        dragTransition={{
          timeConstant: 200,
          power: 0.1,
          modifyTarget(v) {
            const snapped = Math.round(v / cellSize) * cellSize;
            const constrained = Math.min(
              Math.max(snapped, -cellSize * (options.length - 1)),
              0
            );
            console.log({ v, snapped, consrtained: constrained });
            const index = Math.floor(Math.abs(constrained) / cellSize);
            onValueChange(index);
            return constrained;
          },
        }}
        dragElastic={{
          left: 0,
          right: 0,
          top: 0.2,
          bottom: 0.2,
        }}
      >
        {options.map((opt, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center"
            style={{
              height: cellSize + "px",
            }}
          >
            {opt}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

interface TimePickerProps {
  maxMinutes?: number;
  minMinutes?: number;
  onValueChange?: (time: CalendarDateTime) => void;
}

export default function TimePicker({
  minMinutes = 0,
  maxMinutes = 24 * 60,
  onValueChange = () => {},
}: TimePickerProps) {
  const [hoursIndex, setHoursIndex] = useState<number>(0);
  const [minutesIndex, setMinutesIndex] = useState<number>(0);
  const [dayIndex, setDayIndex] = useState<number>(0);
  const [dateTime, setDateTime] = useState<CalendarDateTime>();

  const hoursOptions = useMemo(() => {
    const minHours = Math.floor(minMinutes / 60);
    const maxHours = Math.floor(maxMinutes / 60);
    return Array(24)
      .fill(0)
      .map((_, i) => String(i).padStart(2, "0"))
      .filter((s) => minHours <= Number(s) && Number(s) <= maxHours);
  }, [minMinutes, maxMinutes]);

  const minutesOptions = useMemo(() => {
    return Array(60)
      .fill(0)
      .map((_, i) => String(i).padStart(2, "0"));
  }, []);

  const daysOptions = useMemo(() => {
    const td = today("Europe/Moscow");
    const forward = td.add({ months: 1 });
    const days: CalendarDate[] = [];
    let currentDay = td;
    while (currentDay.compare(forward) <= 0) {
      days.push(currentDay);
      currentDay = currentDay.add({ days: 1 });
    }
    return days;
  }, []);

  const daysOptionsSerialized = useMemo(() => {
    return daysOptions.map((o) => {
      const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

      const months = [
        "янв.",
        "фев.",
        "мар.",
        "апр.",
        "май",
        "июн.",
        "июл.",
        "авг.",
        "сен.",
        "окт.",
        "ноя.",
        "дек.",
      ];

      return `${weekdays[getDayOfWeek(o, "ru-RU")]} ${o.day} ${
        months[o.month - 1]
      }`;
    });
  }, [daysOptions]);

  const select = useCallback(() => {
    const v = daysOptions[dayIndex];

    const hour = Number(hoursOptions[hoursIndex]);
    const minute = Number(minutesOptions[minutesIndex]);
    const datetime = new CalendarDateTime(v.year, v.month, v.day, hour, minute);

    setDateTime(datetime);
    onValueChange(datetime);
  }, [
    daysOptions,
    dayIndex,
    minutesIndex,
    hoursIndex,
    onValueChange,
    minutesOptions,
    hoursOptions,
  ]);

  return (
    <TimePickerModal time={dateTime}>
      <div className="flex flex-col items-stretch justify-evenly h-full">
        <div className="flex items-center justify-center text-2xl">
          <VerticalDragSelector
            options={daysOptionsSerialized}
            onValueChange={setDayIndex}
          />
          <VerticalDragSelector
            options={hoursOptions}
            onValueChange={setHoursIndex}
          />
          <VerticalDragSelector
            options={minutesOptions}
            onValueChange={setMinutesIndex}
          />
        </div>
        <div className="flex justify-center">
          <Button type="button" onPress={select}>
            Выбрать
          </Button>
        </div>
      </div>
    </TimePickerModal>
  );
}
