"use client";

import { ArrowIcon } from "@/icons";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export default function ScrollTopButton() {
  const { scrollY } = useScroll();

  const [isHidden, setIsHidden] = useState(true)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 100) {
      setIsHidden(false)
    }
    else {
      setIsHidden(true)
    }
  })

  const onClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="fixed bottom-8 right-8 flex outline-none focus-visible:border-black transition-colors items-center justify-center size-12 bg-white border border-black/25 z-40"
      style={{
        display: isHidden ? 'none' : 'flex'
      }}
      onClick={onClick}
    >
      <ArrowIcon className="text-black h-4 -rotate-90" />
    </button>
  );
}
