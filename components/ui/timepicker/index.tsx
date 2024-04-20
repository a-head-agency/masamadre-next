"use client";

import { useEffect, useMemo, useState } from "react";
import TimePickerModal from "./modal";
import { motion, useDragControls } from "framer-motion";
import { time } from "console";

interface VerticalDragNumberSelectorProps {
  min: number;
  max: number;
  onValueChange?: (value: number) => void;
}

function VerticalDragNumberSelector({
  min,
  max,
  onValueChange = () => {},
}: VerticalDragNumberSelectorProps) {
  const cellSize = 50;
  return (
    <div
      className="relative w-[5ch] overflow-hidden"
      style={{
        height: cellSize * 5 + "px",
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
          paddingBlock: cellSize * 2 + "px",
        }}
        drag
        dragConstraints={{
          left: 0,
          right: 0,
          top: -cellSize * max,
          bottom: 0,
        }}
        dragTransition={{
          timeConstant: 200,
          power: 0.1,
          modifyTarget(v) {
            const snapped = Math.round(v / cellSize) * cellSize;
            const constrained = Math.min(Math.max(snapped, -cellSize * max), 0);
            console.log({ v, snapped, consrtained: constrained });
            const value = Math.floor(Math.abs(constrained) / cellSize);
            onValueChange(value);
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
        {[...Array(max + 1)].map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center"
            style={{
              height: cellSize + "px",
            }}
          >
            {String(idx).padStart(2, "0")}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

interface TimePickerProps {
  onValueChange?: (time: { hours: number; minutes: number }) => void;
}

export default function TimePicker({
  onValueChange = () => {},
}: TimePickerProps) {
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();

  useEffect(() => {
    console.log({ hours, minutes });
    if (hours != undefined && minutes != undefined) {
      onValueChange({
        hours,
        minutes,
      });
    }
  }, [hours, minutes, onValueChange]);

  const time = useMemo(() => {
    if (hours == undefined || minutes == undefined) {
      return;
    }
    return {
      hours,
      minutes,
    };
  }, [hours, minutes]);

  const resetTimeOnOpen = (isOpen: boolean) => {
    console.log("open changed", isOpen);
    if (isOpen) {
      setMinutes(undefined);
      setHours(undefined);
    }
  };

  return (
    <TimePickerModal time={time} onOpenChange={resetTimeOnOpen}>
      <div className="h-full flex items-center justify-center text-2xl">
        <VerticalDragNumberSelector min={0} max={23} onValueChange={setHours} />
        <VerticalDragNumberSelector
          min={0}
          max={59}
          onValueChange={setMinutes}
        />
      </div>
    </TimePickerModal>
  );
}
