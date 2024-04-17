"use client";

import { ArrowIcon } from "@/icons";
import clsx from "clsx";
import { useCallback, useMemo, useRef, useState } from "react";
import { useInterval } from "usehooks-ts";

interface Props {
  fallback: string;
  images: string[];
  autoplay?: boolean;
}

export default function Slider(props: Props) {
  const [slide, setSlide] = useState(0);

  useInterval(
    useCallback(() => {
      setSlide((prev) => (prev + 1) % props.images.length);
    }, [setSlide, props.images]),
    props.autoplay ? 5000 : null
  );

  const next = useCallback(() => {
    setSlide((prev) => {
      if (prev + 1 < props.images.length) {
        return prev + 1;
      }
      return prev;
    });
  }, [props.images]);

  const prev = useCallback(() => {
    setSlide((prev) => {
      if (prev - 1 >= 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const currentImage = useMemo(() => {
    if (props.images.length === 0) {
      return props.fallback;
    }
    return props.images[slide];
  }, [slide, props.images, props.fallback]);

  const hasNext = useMemo(
    () => slide + 1 < props.images.length,
    [slide, props.images]
  );

  const hasPrev = useMemo(() => 0 <= slide - 1, [slide]);

  const container = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full" ref={container}>
      <div className="absolute hidden">
        {props.images.map((img) => (
          <img src={img} alt="" key={img} />
        ))}
      </div>
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
        {!props.images.length && props.fallback && (
          <img
            className={clsx(
              "object-cover h-full min-w-0 shrink grow-0 object-center"
            )}
            src={props.fallback}
            alt=""
          />
        )}
        {props.images.map((img, idx) => (
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
          {!props.images.length && props.fallback && (
            <img
              className={clsx(
                "object-cover h-full min-w-0 shrink grow-0 object-center"
              )}
              src={props.fallback}
              alt=""
            />
          )}
          {props.images.map((img, idx) => (
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
