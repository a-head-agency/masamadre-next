"use client";
import TextField from "@/components/ui/TextField";
import DatePicker from "@/components/ui/datepicker-old";
import PhoneField from "@/components/ui/phone-field";
import MyButton from "@/components/ui/button";
import { CrossIcon, MinusIcon, PlusIcon } from "@/icons";
import { FC, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
  ModalOverlayProps,
  PopoverProps,
} from "react-aria-components";
import clsx from "clsx";

const BookingModal: FC<
  Required<Pick<ModalOverlayProps, "isOpen" | "onOpenChange">> & {
    onDatepickerOpenChange?: PopoverProps["onOpenChange"];
  }
> = (props) => {
  const [count, setCount] = useState(0);
  const [date, setDate] = useState<string | null>(null);

  return (
    <Modal className="w-full">
      <Dialog className="relative p-4 xl:p-6 py-6 xl:py-10 bg-white border border-black/50 flex flex-col outline-none">
        {({ close }) => (
          <>
            <button
              type="button"
              className="absolute top-4 right-4 xl:right-6"
              onClick={close}
            >
              <CrossIcon className="text-black size-4 xl:size-6" />
            </button>
            <h2 className="lowercase text-xl font-bold mb-8">Бронирование</h2>

            <div className="flex gap-6 xl:gap-16 mb-6 xl:mb-12 flex-col xl:flex-row">
              <div className="flex-1">
                <TextField
                  id="booking-name"
                  label="на какое имя бронируем?"
                  placeholder="имя"
                  isRequired
                />
              </div>
              <div className="flex-1">
                <PhoneField
                  label="номер телефона"
                  placeholder="телефон"
                  isRequired
                />
              </div>
            </div>

            <div className="flex gap-6 xl:gap-16 mb-6 xl:mb-32 flex-col xl:flex-row">
              <div className="flex-1">
                <p
                  className={["mb-1 mb:mb-2 block lowercase opacity-100"]
                    .filter(Boolean)
                    .join(" ")}
                >
                  Количество персон
                  <span className="text-red-600">*</span>
                </p>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setCount((v) => v + 1)}>
                    <PlusIcon className="size-3 text-black" />
                  </button>
                  <div className="text-xl">{count}</div>
                  <button
                    type="button"
                    onClick={() => setCount((v) => Math.max(0, v - 1))}
                  >
                    <MinusIcon className="size-3 text-black" />
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <DatePicker
                  label="дата посещения"
                  onOpenChange={props.onDatepickerOpenChange}
                  value={date}
                  onChange={setDate}
                  isRequired
                />
              </div>
            </div>

            <TextField
              id="booking-comment"
              label="комментарий"
              placeholder="текст вашего сообщения"
            />
            {/* <button
              type="button"
              className="py-1 px-8 bg-black xl:w-fit text-white lowercase rounded-full mt-6 xl:mt-10"
            >
              Забронировать
            </button> */}
            <div className="mt-6 xl:mt-10">
              <MyButton>забронировать</MyButton>
            </div>
          </>
        )}
      </Dialog>
    </Modal>
  );
};

interface Props {
  withTopPadding?: boolean;
}

export default function Booking({ withTopPadding }: Props) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const scrollable = useRef<HTMLDivElement | null>(null);

  return (
    <DialogTrigger onOpenChange={setIsBookingOpen}>
      <Button
        type="button"
        className={[
          "lowercase outline-none hover:underline w-fit",
          isBookingOpen && "underline",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        Бронирование
      </Button>
      <ModalOverlay
        ref={scrollable}
        onOpenChange={setIsBookingOpen}
        isDismissable
        className="fixed top-0 left-0 overflow-x-hidden w-full overflow-y-auto h-dvh z-50"
      >
        <div
          className={clsx(
            "grid gap-[2vmax] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-[2vmax] pb-[2vmax]",
            withTopPadding
              ? "pt-[calc(6rem+2vmax)] md:pt-[calc(4rem+2vmax)]"
              : "pt-[2vmax]"
          )}
          style={{
            width: "var(--clientWidth, 100%)",
          }}
        >
          <div className="col-start-1 col-span-full md:col-span-2">
            <BookingModal
              isOpen={isBookingOpen}
              onOpenChange={setIsBookingOpen}
            />
          </div>
        </div>
      </ModalOverlay>
    </DialogTrigger>
  );
}
