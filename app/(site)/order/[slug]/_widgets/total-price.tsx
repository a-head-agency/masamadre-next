"use client";

import { useBasket } from "@/hooks/basket";
import { useMemo } from "react";

interface Props {
  dish_id: number;
}

export default function TotalPrice(props: Props) {
  const basket = useBasket();

  const totalSum = useMemo(() => {
    const dish = basket.data?.list.find((d) => d.dish_id === props.dish_id);
    return (dish?.count || 0) * (dish?.price || 0);
  }, [basket.data, props.dish_id]);

  return <span>всего: {totalSum} ₽</span>;
}
