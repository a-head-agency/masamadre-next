"use client";

import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AddToCartButtonNoAuth() {
  const router = useRouter();

  const navigate = () => {
    router.push("/login");
  };

  return (
    <Button isInverted onPress={navigate}>
      <span className="text-xs md:text-base">добавить в корзину</span>
    </Button>
  );
}
