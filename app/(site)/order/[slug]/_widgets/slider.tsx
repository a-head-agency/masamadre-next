"use client";

import { ArrowIcon } from "@/icons";
import clsx from "clsx";
import { useCallback, useMemo, useRef, useState } from "react";
import { useHover, useInterval } from "usehooks-ts";

interface Props {
  fallback: string;
  images: string[];
  autoplay?: boolean;
}

export default function Slider(props: Props) {
  const [slide, setSlide] = useState(0);
  const images = useMemo(() => {
    if (props.images.length) return props.images;
    return [props.fallback];
  }, [props.images, props.fallback]);
  const container = useRef<HTMLDivElement>(null);

  const isHovered = useHover(container);

  useInterval(
    useCallback(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, [setSlide, images]),
    props.autoplay && !isHovered ? 5000 : null
  );

  const next = useCallback(() => {
    setSlide((prev) => {
      if (prev + 1 < images.length) {
        return prev + 1;
      }
      return prev;
    });
  }, [images]);

  const prev = useCallback(() => {
    setSlide((prev) => {
      if (prev - 1 >= 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const hasNext = useMemo(() => slide + 1 < images.length, [slide, images]);

  const hasPrev = useMemo(() => 0 <= slide - 1, [slide]);

  return (
    <div className="relative w-full" ref={container}>
      <div className="absolute top-2 right-2 z-10 flex">
        <button
          type="button"
          onClick={prev}
          disabled={!hasPrev}
          className="p-2 bg-white outline-none focus-visible:border-black text-black disabled:text-gray-500 transition-colors border-2 border-transparent z-10 flex items-center justify-center"
        >
          <ArrowIcon className="size-4 rotate-180" />
        </button>
        <button
          type="button"
          disabled={!hasNext}
          onClick={next}
          className="p-2 bg-white outline-none focus-visible:border-black text-black disabled:text-gray-500 transition-colors border-2 border-transparent z-10 flex items-center justify-center"
        >
          <ArrowIcon className="size-4" />
        </button>
      </div>

      <div className="flex md:hidden items-stretch h-64">
        {images.map((img, idx) => (
          <img
            className={clsx(
              "object-cover h-full min-w-0 shrink grow-0 object-center transition-all ease-in-out duration-1000 will-change-[flex-basis]",
              idx == slide ? "basis-full" : "basis-0"
            )}
            src={img}
            alt=""
            key={img}
          />
        ))}
      </div>

      <div className="hidden md:block shrink grow relative h-full">
        <div className="absolute inset-0 flex">
          {images.map((img, idx) => (
            <img
              className={clsx(
                "object-cover h-full min-w-0 shrink grow-0 object-center transition-all ease-in-out duration-1000 will-change-[flex-basis]",
                idx == slide ? "basis-full" : "basis-0"
              )}
              src={img}
              alt=""
              key={img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
