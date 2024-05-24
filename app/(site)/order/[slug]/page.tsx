import { getOneDish } from "@/data/products";
import TotalPrice from "./_widgets/total-price";
import AddToCartButtonAuth from "./_widgets/add-to-cart-button-auth";
import Adder from "@/components/functional/adder";
import BackButton from "./_widgets/back-button";
import { getSession } from "@/session";
import { cookies } from "next/headers";
import Slider from "./_widgets/slider";
import clsx from "clsx";

interface Params {
  slug: string;
}

interface Props {
  params: Params;
}

export default async function Product({ params }: Props) {
  const session = await getSession(cookies());
  const dish = await getOneDish(Number(params.slug));

  return (
    <>
      <div className="mx-[2vmax] pb-[2vmax] w-full">
        <div className="md:h-full flex flex-col md:flex-row gap-8 md:gap-[4%] border border-black p-4 relative">
          <div className="absolute z-10 max-md:left-6 md:right-4 top-6 md:top-4">
            <BackButton />
          </div>
          <Slider autoplay fallback={dish.img} images={dish.images} />
          <div className="basis-[31%] max-w-lg flex flex-col  py-8">
            <div className="grow-[3]"></div>

            {dish.is_vine ? (
              <h1 className="text-xs md:text-base normal-case border-b border-black pb-6">
                {dish.make_date} {dish.malbec} /{" "}
                <span className="font-bold text-2xl">{dish.name}</span> /{" "}
                {dish.maker} {dish.flag}
              </h1>
            ) : (
              <h1 className="text-xs md:text-base">
                <span className="font-bold text-sm md:text-2xl">
                  {dish.name}
                </span>{" "}
                {dish.short_description}
              </h1>
            )}

            <div className="text-sm md:text-2xl my-6 flex justify-between items-center">
              <div>{dish.price} ₽</div>
              <Adder dish_id={dish.id} />
            </div>

            {!dish.is_vine && (
              <>
                <div className="border-t text-xs md:text-base border-black mb-[9vmin]">
                  <p>{dish.description}</p>
                </div>

                <div className="border-t text-xs md:text-base border-black mb-[9vmin]">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <p
                      className={clsx(
                        dish.content.length > 100
                          ? "col-span-full"
                          : "col-span-1"
                      )}
                    >
                      <span className="font-bold">состав:</span> {dish.content}
                    </p>
                    <p
                      className={clsx(
                        dish.alerg.length > 100 ? "col-span-full" : "col-span-1"
                      )}
                    >
                      <span className="font-bold">кбжу:</span> {dish.alerg}
                    </p>
                  </div>
                  <p>
                    <span className="font-bold">срок хранения:</span>{" "}
                    {dish.date_contain}
                  </p>
                </div>
              </>
            )}

            {dish.is_vine && (
              <>
                <div className="grow-[90]"></div>
                <div className="border-b border-black mb-6 pb-2">
                  {dish.cert === "org" && (
                    <div className="flex items-center gap-2">
                      <img src="/org.svg" className="h-5" alt="" />
                      org
                    </div>
                  )}
                  {dish.cert === "bio" && (
                    <div className="flex items-center gap-2">
                      <img src="/bio.svg" className="h-5" alt="" />
                      bio
                    </div>
                  )}
                  {dish.cert === "eco" && (
                    <div className="flex items-center gap-2">
                      <img src="/eco.svg" className="h-5" alt="" />
                      eco
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="flex justify-between flex-wrap gap-4 items-center">
              {session.isAuthenticated && (
                <p className="text-sm md:text-xl">
                  <TotalPrice dish_id={dish.id} />
                </p>
              )}
              <AddToCartButtonAuth dish_id={dish.id} />
            </div>

            <div className="grow-[2]"></div>
          </div>
        </div>
      </div>
    </>
  );
}
