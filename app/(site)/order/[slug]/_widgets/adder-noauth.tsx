"use client";

import { MinusIcon, PlusIcon } from "@/icons";
import { useRouter } from "next/navigation";

export default function AdderNoAuth() {
  const router = useRouter();

  const navigate = () => {
    router.push("/login");
  };

  return (
    <div className="flex gap-4">
      <button type="button" onClick={navigate}>
        <PlusIcon className="size-[0.6em]" />
      </button>
      <span>0шт</span>
      <button
        type="button"
        className="disabled:opacity-50 transition-opacity"
        onClick={navigate}
      >
        <MinusIcon className="size-[0.6em]" />
      </button>
    </div>
  );
}
