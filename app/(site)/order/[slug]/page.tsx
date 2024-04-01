"use client";
import Button from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@/icons";
import { useState } from "react";

interface Params {
  slug: string;
}

interface Props {
  params: Params;
}

export default function Product({ params }: Props) {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="md:h-full mx-[2vmax] pb-[2vmax]">
        <div className="md:h-full flex flex-col md:flex-row gap-8 md:gap-[4%] border border-black p-4">
          <img
            className="object-cover md:hidden w-full object-center"
            src="/bread.png"
            alt="bread"
          />
          <div className="hidden md:block shrink grow relative">
            <img
              className="object-cover h-full inset-0 absolute w-full object-center"
              src="/bread.png"
              alt="bread"
            />
          </div>
          <div className="basis-[31%] max-w-lg flex flex-col">
            <div className="grow-[3]"></div>

            <h1 className="text-xs md:text-base">
              <span className="font-bold text-sm md:text-2xl">пшеничный</span>{" "}
              наш вариант французской булки
            </h1>

            <div className="text-sm md:text-2xl my-6 flex justify-between items-center">
              <div>300 ₽</div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setCount((v) => v + 1)}>
                  <PlusIcon className="size-[0.6em]" />
                </button>
                <span>{count}шт</span>
                <button
                  type="button"
                  disabled={count === 0}
                  className="disabled:opacity-50 transition-opacity"
                  onClick={() => setCount((v) => Math.max(v - 1, 0))}
                >
                  <MinusIcon className="size-[0.6em]" />
                </button>
              </div>
            </div>

            <div className="border-t text-xs md:text-base border-black mb-[9vmin]">
              <p>
                лёгкий блестящий мякиш с большими дырками и ароматом оливкового
                масла; тесто на закваске длительной ферментации (сутки), с белым
                перцем и морской солью на корочке
              </p>
            </div>

            <div className="border-t text-xs md:text-base border-black mb-[9vmin]">
              <div className="flex gap-4 mb-4">
                <p className="flex-1">
                  <span className="font-bold">состав:</span> пшеничная мука в/с,
                  вода, соль, сахар, дрожжи хлебопекарные, закваска
                  цельнозерновая, оливковое масло
                </p>
                <p className="flex-1">
                  <span className="font-bold">аллергены:</span> глютен,
                  неглютен, супер глютен,
                </p>
              </div>
              <p>
                <span className="font-bold">срок хранения:</span> <br />
                1-2 дня без потери качеств
              </p>
            </div>

            <div className="flex justify-between flex-wrap gap-4 items-center">
              <p className="text-sm md:text-xl">всего: 600 ₽</p>
              <Button isInverted>
                <span className="text-xs md:text-base">добавить в корзину</span>
              </Button>
            </div>

            <div className="grow-[2]"></div>
          </div>
        </div>
      </div>
    </>
  );
}
