import { GetBasketHandlerResult } from "@/app/api/basket/route";
import * as basketService from "@/data/basket";
import axios from "axios";
import useSWR from "swr";
import { z } from "zod";
import * as appWideActions from "@/app/_actions";

export function useBasket() {
  const basket = useSWR("basket", () =>
    axios
      .get<GetBasketHandlerResult>("/api/basket", { withCredentials: true })
      .then((r) => r.data)
  );

  const addDish = async (
    data: z.input<typeof basketService.AddToBasketInputSchema>
  ) => {
    const result = await appWideActions.addToBasketAction(data);
    basket.mutate();
    return result;
  };

  const clearBasket = async () => {
    const result = await appWideActions.clearBasket();
    basket.mutate();
    return result;
  };

  return { ...basket, addDish, clearBasket };
}
