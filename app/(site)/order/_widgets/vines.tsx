"use client";

import { ArrowIcon, BasketIcon } from "@/icons";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useRef, useState } from "react";

export interface VineType {
  id: number;
  img: string;
  name: string;
  country: string;
  year: number;
  countryEmoji: string;
  price: number;
}
export interface VineCategoryType {
  id: number;
  name: string;
  items: VineType[];
}

export default function Vines(category: VineCategoryType) {
  const scrollEl = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"start" | "end" | "middle">("start");
  const { scrollXProgress } = useScroll({
    container: scrollEl,
  });

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
    <div key={category.id}>
      <div className="flex justify-between items-end gap-4 text-xl px-[2vmax] mb-4">
        <h2 className="underline">{category.name}</h2>
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
            <ArrowIcon className="text-black h-4 rotate-180" />
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
            <ArrowIcon className="text-black h-4" /> more
          </motion.button>
        </div>
      </div>

      <div
        className="overflow-x-auto snap-x scroll-smooth flex items-stretch px-[2vmax] scrollbar-none"
        ref={scrollEl}
      >
        {category.items.map((v) => (
          <div
            key={v.id}
            className="group w-52 p-4 shrink-0 flex flex-col border border-transparent -mx-[0.5px] hover:border-black focus-within:border-black transition-colors"
          >
            <img
              className="w-full px-8 object-contain object-bottom mb-8"
              src={v.img}
              alt={v.name}
            />

            <div className="text-balance leading-[1.1] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
              <h3 className="font-bold">{v.name}</h3>
              <p>{v.country}</p>
              <p>
                {v.year} {v.countryEmoji}
              </p>
            </div>

            <div className="grow"></div>

            <div className="flex justify-between items-end gap-4 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pt-8">
              <span>{v.price} ₽</span>
              <button type="button">
                <BasketIcon className="h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
