import { getOneDish } from "@/data/products";
import BackButton from "./_widgets/back-button";
import { getSession } from "@/session";
import { cookies } from "next/headers";
import Slider from "./_widgets/slider";
import Details from "./_widgets/details";

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
          <div className="basis-[31%] max-w-lg py-8">
            <Details isAuthenticated={session.isAuthenticated} dish={dish} />
          </div>
        </div>
      </div>
    </>
  );
}
