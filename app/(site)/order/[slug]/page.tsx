import { getOneDish } from "@/data/products";
import TotalPrice from "./_widgets/total-price";
import AddToCartButtonAuth from "./_widgets/add-to-cart-button-auth";
import AddToCartButtonNoAuth from "./_widgets/add-to-cart-button-noauth";
import AdderAuth from "./_widgets/adder-auth";
import AdderNoAuth from "./_widgets/adder-noauth";
import BackButton from "./_widgets/back-button";
import { getSession } from "@/session";
import { cookies } from "next/headers";
import Slider from "./_widgets/slider";

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
      <div className="md:h-full mx-[2vmax] pb-[2vmax]">
        <div className="md:h-full flex flex-col md:flex-row gap-8 md:gap-[4%] border border-black p-4 relative">
          <div className="absolute right-4 top-4 hidden md:block">
            <BackButton />
          </div>
          <Slider autoplay fallback={dish.img} images={dish.images} />
          <div className="basis-[31%] max-w-lg flex flex-col  py-8">
            <div className="grow-[3]"></div>

            <h1 className="text-xs md:text-base">
              <span className="font-bold text-sm md:text-2xl">{dish.name}</span>{" "}
              {dish.short_description}
            </h1>

            <div className="text-sm md:text-2xl my-6 flex justify-between items-center">
              <div>{dish.price} ₽</div>
              <AdderAuth dish_id={dish.id} />
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
