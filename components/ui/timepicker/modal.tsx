"use client";

import Button from "@/components/ui/button";
import { CalendarDateTime, getDayOfWeek } from "@internationalized/date";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Dialog, ModalOverlay, Modal } from "react-aria-components";
import { useBoolean } from "usehooks-ts";

const MotionModalOverlay = motion(ModalOverlay);
const MotionModal = motion(Modal);

const inertiaTransition = {
  type: "inertia" as const,
  bounceStiffness: 300,
  bounceDamping: 40,
  timeConstant: 300,
};

const staticTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
};

interface Props extends PropsWithChildren {
  time?: CalendarDateTime;
  onOpenChange?: (isOpen: boolean) => void;
}

export default function TimePickerModal({
  children,
  time,
  onOpenChange = () => {},
}: Props) {
  const {
    value: isOpen,
    setFalse: close,
    setValue: setIsOpen,
  } = useBoolean(false);

  const _onOpenChange = useCallback(
    (isOpen: boolean) => {
      setIsOpen(isOpen);
      onOpenChange(isOpen);
    },
    [setIsOpen, onOpenChange]
  );

  const serializedTime = useMemo(() => {
    if (time) {
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

      return `${weekdays[getDayOfWeek(time, "ru-RU")]} ${time.day} ${
        months[time.month - 1]
      } ${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(
        2,
        "0"
      )}`;
    } else {
      return "ко времени";
    }
  }, [time]);

  let h = 400;
  let TOP_MARGIN = (window?.innerHeight || 400) - h;
  let y = useMotionValue(h);
  let bgOpacity = useTransform(y, [0, h], [0.4, 0]);
  let bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;

  return (
    <>
      <Button isInverted onPress={() => _onOpenChange(true)}>
        <span className="lowercase">{serializedTime}</span>
      </Button>
      <AnimatePresence>
        {isOpen && (
          <MotionModalOverlay
            // Force the modal to be open when AnimatePresence renders it.
            isOpen
            isDismissable
            onOpenChange={_onOpenChange}
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: bg as any,
            }}
          >
            <MotionModal
              className="bg-white absolute bottom-0 w-full rounded-t-xl overflow-hidden shadow-lg will-change-transform z-[9999]"
              initial={{ y: h }}
              animate={{ y: 0 }}
              exit={{ y: h }}
              transition={staticTransition}
              style={{
                y,
                top: TOP_MARGIN,
                // Extra padding at the bottom to account for rubber band scrolling.
                paddingBottom: window.screen.height,
              }}
              drag="y"
              dragConstraints={{ top: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
                  close();
                } else {
                  animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
                }
              }}
            >
              {/* drag affordance */}
              <div className="mx-auto w-12 mt-2 h-1.5 rounded-full bg-gray-400 absolute top-0 inset-x-0" />
              <Dialog
                className="px-4 pb-4 pt-[1.375rem] outline-none"
                aria-label="Выберите время"
                style={{
                  height: h + "px",
                }}
              >
                {children}
              </Dialog>
            </MotionModal>
          </MotionModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}
