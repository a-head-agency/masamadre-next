"use client";
import { useBasket } from "@/hooks/basket";
import { BasketIcon, CrossIcon, MinusIcon, PlusIcon } from "@/icons";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
} from "framer-motion";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
  ModalOverlayProps,
} from "react-aria-components";
import CustomImage from "@/components/ui/custom-image";

import UIButton from "@/components/ui/button";

const MotionModal = motion(Modal);
const MotionModalOverlay = motion(ModalOverlay);

export function CartModal(
  props: Required<Pick<ModalOverlayProps, "isOpen" | "onOpenChange">>
) {
  const basket = useBasket();

  const w = window.innerWidth;

  const x = useMotionValue(w);

  const checkout = () => {
    location.pathname = "/checkout";
  };

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
              x: w,
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: w,
            }}
            drag="x"
            dragElastic={{
              left: 0,
            }}
            dragConstraints={{
              left: 0,
            }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x > 200 || velocity.x > 20) {
                props.onOpenChange(false);
              } else {
                animate(x, 0, {
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
            <Dialog
              className="min-h-full relative p-6 py-10 sm:p-12 bg-white flex flex-col outline-none"
              aria-label="Корзина"
            >
              {({ close }) => (
                <>
                  <button
                    type="button"
                    className="absolute top-4 right-6"
                    onClick={close}
                  >
                    <CrossIcon className="size-6 text-black" />
                  </button>
                  <div className="pr-12 grow pb-6 sm:pb-12">
                    {basket.data?.list.map((item, index) => (
                      <div className="mb-4 flex gap-4 items-start" key={item.id}>
                        <div className="relative size-24 shrink-0">
                          <CustomImage
                            className="object-contain select-none object-center bg-[#F6F6F6]"
                            fill
                            draggable="false"
                            src={item.img}
                            alt={item.name}
                            placeholderSrc="/fallback.png"
                          />
                        </div>
                        <div className="flex flex-col justify-between self-stretch items-stretch grow">
                          <div className="leading-tight">
                            <div className="font-bold">{item.name}</div>
                            {item.mods.length ? (
                              <div>
                                {item.mods.map((m) => `+ ${m.name}`).join(", ")}
                              </div>
                            ) : (
                              <div>{item.short_description}</div>
                            )}
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-lg">
                              <span className="font-bold">{item.price}</span> ₽
                            </div>
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                onClick={() =>
                                  basket.addDish({
                                    id: item.id,
                                    dish_id: item.dish_id,
                                    mods: item.mods.map((v) => v.id),
                                    count:
                                      (basket.data?.list.find(
                                        (d) => d.id === item.id
                                      )?.count || 0) + 1,
                                  })
                                }
                              >
                                <PlusIcon className="size-4 text-black" />
                              </button>
                              <div>{item.count}шт</div>
                              <button
                                type="button"
                                onClick={() =>
                                  basket.addDish({
                                    id: item.id,
                                    dish_id: item.dish_id,
                                    mods: item.mods.map((v) => v.id),
                                    count:
                                      (basket.data?.list.find(
                                        (d) => d.id === item.id
                                      )?.count || 1) - 1,
                                  })
                                }
                              >
                                <MinusIcon className="size-4 text-black" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 sm:mt-12 border-t border-black">
                    {/* <div className="mb-2">
                      <Switch>Списать 129 бонусов</Switch>
                    </div> */}
                    <div className="mb-2 flex justify-between items-center w-full">
                      <span>{basket.data?.total_count} товара</span>
                      <div>{basket.data?.total_price} ₽</div>
                    </div>
                    {/* <div className="flex justify-between items-center w-full">
                      <span>Начислим бонусы</span>
                      <div>+ 45</div>
                    </div> */}
                  </div>

                  <div className="mt-6 sm:mt-12 flex flex-col items-stretch gap-4">
                    <UIButton
                      onPress={checkout}
                      isDisabled={
                        !basket.data?.list || !basket.data.list.length
                      }
                    >
                      оформить заказ
                    </UIButton>
                    {Boolean(basket.data?.list.length) && (
                      <UIButton onPress={basket.clearBasket} isInverted>
                        очистить корзину
                      </UIButton>
                    )}
                  </div>
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
  const { data, isLoading } = useBasket();

  return (
    <>
      <button disabled={isLoading} onClick={() => setIsCartOpen(!isCartOpen)}>
        <BasketIcon
          count={data?.total_count}
          className="text-black h-6 md:h-7"
        />
      </button>
      <CartModal isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
