"use client";

import { CrossIcon } from "@/icons";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button type="button" onClick={router.back}>
      <CrossIcon className="text-black size-4 lg:size-6" />
    </button>
  );
}
