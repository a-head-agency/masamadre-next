import Button from "@/components/ui/button";
import { getOneDish } from "@/data/products";
import { MinusIcon, PlusIcon } from "@/icons";
import { useState } from "react";
import Adder from "./_widgets/adder";
import TotalPrice from "./_widgets/total-price";
import AddToCartButton from "./_widgets/add-to-cart-button";

interface Params {
  slug: string;
}

interface Props {
  params: Params;
}

export default async function Product({ params }: Props) {
  const dish = await getOneDish(Number(params.slug));

  return (
    <>
      <div className="md:h-full mx-[2vmax] pb-[2vmax]">
        <div className="md:h-full flex flex-col md:flex-row gap-8 md:gap-[4%] border border-black p-4">
          <img
            className="object-cover md:hidden w-full object-center"
            src={dish.img}
            alt={dish.alt}
          />
          <div className="hidden md:block shrink grow relative">
            <img
              className="object-cover h-full inset-0 absolute w-full object-center"
              src={dish.img}
              alt={dish.alt}
            />
          </div>
          <div className="basis-[31%] max-w-lg flex flex-col">
            <div className="grow-[3]"></div>

            <h1 className="text-xs md:text-base">
              <span className="font-bold text-sm md:text-2xl">{dish.name}</span>{" "}
              {dish.short_description}
            </h1>

            <div className="text-sm md:text-2xl my-6 flex justify-between items-center">
              <div>{dish.price} ₽</div>
              <Adder dish_id={dish.id} />
            </div>

            <div className="border-t text-xs md:text-base border-black mb-[9vmin]">
              <p>{dish.description}</p>
            </div>

            <div className="border-t text-xs md:text-base border-black mb-[9vmin]">
              <div className="flex gap-4 mb-4">
                <p className="flex-1">
                  <span className="font-bold">состав:</span> {dish.content}
                </p>
                <p className="flex-1">
                  <span className="font-bold">аллергены:</span> {dish.alerg}
                </p>
              </div>
              <p>
                <span className="font-bold">срок хранения:</span>{" "}
                {dish.date_contain}
              </p>
            </div>

            <div className="flex justify-between flex-wrap gap-4 items-center">
              <p className="text-sm md:text-xl">
                <TotalPrice dish_id={dish.id} />
              </p>
              <AddToCartButton dish_id={dish.id} />
            </div>

            <div className="grow-[2]"></div>
          </div>
        </div>
      </div>
    </>
  );
}
