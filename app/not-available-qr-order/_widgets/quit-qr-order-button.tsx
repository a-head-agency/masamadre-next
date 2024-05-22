"use client";

import { optOutQROrder } from "@/app/_actions";
import Button from "@/components/ui/button";

export default function QuitQrOrderButton() {
  const onClick = () => {
    optOutQROrder();
  };
  return <Button onPress={onClick}>выйти из заказа по qr-коду</Button>;
}
