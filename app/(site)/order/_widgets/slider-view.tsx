"use client";

import { ArrowIcon } from "@/icons";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import AddToBasketButton from "./add-to-basket-button";
import Link from "next/link";
import CustomImage from "@/components/ui/custom-image";

interface SliderViewProps {
  category: {
    id: number;
    name: string;
    show_title?: boolean;
    subtitle?: string;
  };
  dishes: {
    id: number;
    img: string;
    name: string;
    make_date?: string;
    flag?: string;
    maker?: string;
    price: number;
    from_hour: string;
    to_hour: string;
  }[];
}

export default function SliderView({ category, dishes }: SliderViewProps) {
  const scrollEl = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"start" | "end" | "middle">("start");
  const { scrollXProgress, scrollX } = useScroll({
    container: scrollEl,
  });
  const localStorageKey = `scroll-view-${category.id}-scroll-offset`;

  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    if (latest >= 1) {
      setPosition("end");
      return;
    }
    if (latest <= 0) {
      setPosition("start");
      return;
    }

    setPosition("middle");
  });

  useMotionValueEvent(scrollX, "change", (latest) => {
    localStorage.setItem(localStorageKey, latest.toString());
  });

  useLayoutEffect(() => {
    if (scrollEl.current) {
      const savedPosition = Number(
        localStorage.getItem(localStorageKey) || "0"
      );
      scrollEl.current.scrollLeft = savedPosition;
    }
  }, []);

  const onScrollRequest = useCallback(
    (direction: "forward" | "backward") => {
      if (scrollEl.current) {
        const { scrollLeft, clientWidth } = scrollEl.current;

        if (direction === "forward") {
          scrollEl.current.scrollTo({
            left: scrollLeft + clientWidth * 0.75,
            behavior: "smooth",
          });
        }
        if (direction === "backward") {
          scrollEl.current.scrollTo({
            left: scrollLeft - clientWidth * 0.75,
            behavior: "smooth",
          });
        }
      }
    },
    [scrollEl]
  );

  return (
    <div>
      {category.show_title && (
        <h2 className="text-3xl font-display mb-8">{category.name}</h2>
      )}

      <div className="flex justify-between items-end gap-4 text-xl mb-4">
        <h2 className="underline">{category.subtitle}</h2>
        <div className="flex items-center gap-2">
          <motion.button
            variants={{
              visible: {
                opacity: 1,
                visibility: "visible",
                transitionEnd: {
                  visibility: "visible",
                },
              },
              hidden: {
                opacity: 0,
                transitionEnd: {
                  visibility: "hidden",
                },
              },
            }}
            initial={position === "start" ? "hidden" : "visible"}
            animate={position === "start" ? "hidden" : "visible"}
            className="flex items-center gap-2 leading-none"
            type="button"
            disabled={position === "start"}
            onClick={() => onScrollRequest("backward")}
          >
            <ArrowIcon className="text-black h-3 rotate-180" />
          </motion.button>
          <motion.button
            variants={{
              visible: {
                opacity: 1,
                visibility: "visible",
                transitionEnd: {
                  visibility: "visible",
                },
              },
              hidden: {
                opacity: 0,
                transitionEnd: {
                  visibility: "hidden",
                },
              },
            }}
            initial={position === "end" ? "hidden" : "visible"}
            animate={position === "end" ? "hidden" : "visible"}
            className="flex items-center gap-2 leading-none"
            type="button"
            disabled={position === "end"}
            onClick={() => onScrollRequest("forward")}
          >
            <ArrowIcon className="text-black h-3" />
            more
          </motion.button>
        </div>
      </div>

      <div
        className="overflow-x-auto px-px snap-x scroll-smooth flex items-stretch scrollbar-none"
        ref={scrollEl}
      >
        {dishes.map((v) => (
          <div
            key={v.id}
            className="group w-52 p-4 shrink-0 flex flex-col border border-transparent -mx-[0.5px] hover:border-black focus-within:border-black transition-colors"
          >
            <Link href={`order/${v.id}`}>
              <div className="px-8 mb-8">
                <div className="w-full relative aspect-[142/540]">
                  <CustomImage
                    className="object-contain object-bottom"
                    fill
                    src={v.img}
                    alt={v.name}
                  />
                </div>
              </div>
            </Link>

            <div className="text-balance leading-[1.1] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
              <h3 className="font-bold">{v.name}</h3>
              <p>{v.maker}</p>
              <p>
                {v.make_date} {v.flag}
              </p>
            </div>

            <div className="grow"></div>

            <div className="flex justify-between items-end gap-4 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pt-8">
              <span>{v.price} ₽</span>
              <AddToBasketButton
                dish_id={v.id}
                from_hour_iso={v.from_hour}
                to_hour_iso={v.to_hour}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
