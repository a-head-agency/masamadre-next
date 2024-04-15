"use client";

import { useCallback, useState } from "react";

interface Props {
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

  return (
    <div className="relative bg-red w-full">
      <div className="absolute top-0 right-0 z-10 flex">
        <button
          type="button"
          onClick={prev}
          className="p-2 bg-white  z-10 flex items-center justify-center"
        >
          prev
        </button>
        <button
          type="button"
          onClick={next}
          className="p-2 bg-white  z-10 flex items-center justify-center"
        >
          next
        </button>
      </div>

      <img
        className="object-cover md:hidden w-full h-full object-center"
        src={props.images[slide]}
        alt=""
      />
      <div className="hidden md:block shrink grow relative h-full">
        <img
          className="object-cover h-full inset-0 absolute w-full object-center"
          src={props.images[slide]}
          alt=""
        />
      </div>
    </div>
  );
}
