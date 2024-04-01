"use client";
import Switch from "@/components/ui/switch";
import { BasketIcon, CrossIcon, MinusIcon, PlusIcon } from "@/icons";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
} from "framer-motion";
import { FC, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
  ModalOverlayProps,
} from "react-aria-components";

const MotionModal = motion(Modal);
const MotionModalOverlay = motion(ModalOverlay);

export function CartModal(
  props: Required<Pick<ModalOverlayProps, "isOpen" | "onOpenChange">>
) {
  const items = useMemo(
    () => [
      {
        name: "фокачча пшеничная",
        description: "на цельнозерновой заквасе и оливковом масле",
        price: 300,
        count: 2,
        img: "/b1.png",
      },
      {
        name: "фокачча пшеничная",
        description: "на цельнозерновой заквасе и оливковом масле",
        price: 300,
        count: 2,
        img: "/b2.png",
      },
      {
        name: "фокачча пшеничная",
        description: "на цельнозерновой заквасе и оливковом масле",
        price: 300,
        count: 2,
        img: "/b3.png",
      },
      {
        name: "фокачча пшеничная",
        description: "на цельнозерновой заквасе и оливковом масле",
        price: 300,
        count: 2,
        img: "/b3.png",
      },
      {
        name: "фокачча пшеничная",
        description: "на цельнозерновой заквасе и оливковом масле",
        price: 300,
        count: 2,
        img: "/b3.png",
      },
      {
        name: "фокачча пшеничная",
        description: "на цельнозерновой заквасе и оливковом масле",
        price: 300,
        count: 2,
        img: "/b3.png",
      },
    ],
    []
  );

  const x = useMotionValue("100%");

  return (
    <AnimatePresence>
      {props.isOpen && (
        <MotionModalOverlay
          isDismissable
          isOpen
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onOpenChange={props.onOpenChange}
          className="fixed top-0 left-0 w-full overflow-y-auto min-h-dvh bg-black/30 z-50 flex justify-end"
        >
          <MotionModal
            className="min-h-dvh h-0 w-full max-w-xl"
            transition={{
              duration: 0.45,
              ease: [0.4, 0, 0.2, 1],
            }}
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            drag="x"
            dragElastic={{
              left: 0,
            }}
            dragConstraints={{
              left: 0,
            }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x > 200 || velocity.x > 10) {
                props.onOpenChange(false);
              } else {
                animate(x, "0%", {
                  type: "inertia" as const,
                  bounceStiffness: 300,
                  bounceDamping: 40,
                  timeConstant: 300,
                  min: 0,
                  max: 0,
                });
              }
            }}
            style={{
              x,
            }}
          >
            <Dialog className="min-h-full relative p-6 py-10 sm:p-12 bg-white flex flex-col outline-none">
              {({ close }) => (
                <>
                  <button
                    type="button"
                    className="absolute top-4 right-6"
                    onClick={close}
                  >
                    <CrossIcon className="size-6 text-black" />
                  </button>
                  <div className="pr-12 grow border-b border-black pb-6 sm:pb-12">
                    {items.map((item, index) => (
                      <div className="mb-4 flex gap-4 items-center" key={index}>
                        <img className="size-24" src={item.img} alt="" />
                        <div className="flex flex-col justify-between self-stretch items-stretch">
                          <div className="leading-tight">
                            <div className="font-bold">{item.name}</div>
                            <div>{item.description}</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-lg">
                              <span className="font-bold">{item.price}</span> ₽
                            </div>
                            <div className="flex items-center gap-4">
                              <button type="button">
                                <PlusIcon className="size-4 text-black" />
                              </button>
                              <div>{item.count}шт</div>
                              <button type="button">
                                <MinusIcon className="size-4 text-black" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 sm:mt-12">
                    <div className="mb-2 flex justify-between items-center w-full">
                      <span>Списать 129 бонусов</span>
                      <div>
                        <Switch />
                      </div>
                    </div>
                    <div className="mb-2 flex justify-between items-center w-full">
                      <span>4 товара</span>
                      <div>2620 ₽</div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <span>Начислим бонусы</span>
                      <div>+ 45</div>
                    </div>
                  </div>

                  <button className="mt-6 sm:mt-12 py-2 px-3 w-full lowercase bg-black text-white rounded-full">
                    оформить заказ
                  </button>
                </>
              )}
            </Dialog>
          </MotionModal>
        </MotionModalOverlay>
      )}
    </AnimatePresence>
  );
}

export function Cart() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <DialogTrigger onOpenChange={(v) => setIsCartOpen(v)}>
      <Button>
        <BasketIcon className="text-black h-6 md:h-7" />
      </Button>
      <CartModal isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </DialogTrigger>
  );
}
