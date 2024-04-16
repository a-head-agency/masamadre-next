"use client";

import { ArrowIcon } from "@/icons";
import { useCallback, useMemo, useState } from "react";

interface Props {
  fallback: string;
  images: string[];
}

export default function Slider(props: Props) {
  const [slide, setSlide] = useState(0);

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

  return (
    <div className="relative w-full">
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

      <img
        className="object-cover md:hidden w-full h-full object-center"
        src={currentImage}
        alt=""
      />
      <div className="hidden md:block shrink grow relative h-full">
        <img
          className="object-cover h-full inset-0 absolute w-full object-center"
          src={currentImage}
          alt=""
        />
      </div>
    </div>
  );
}
