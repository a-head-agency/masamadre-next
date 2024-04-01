import Footer from "@/components/footer";
import { BasketIcon } from "@/icons";
import Link from "next/link";
import { getProducts, getVines } from "@/data/products";
import Vines from "./_widgets/vines";

// async function getProducts() {
//   const res = await fetch(process.env.NEXT_PUBLIC_NEXT_URL + "/api/products");

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default async function Order() {
  const products = await getProducts();
  const { vines } = await getVines();

  return (
    <div className="min-h-full flex flex-col">
      <div className="px-[2vmax] py-4 flex flex-col lowercase items-start">
        {products?.dishes.map((c: any) => (
          <Link key={c.id} className="w-fit lowercase" href={"#" + c.id}>
            {c.name}
          </Link>
        ))}
      </div>
      {products?.dishes.map((c: any, i: number) => (
        <div className="mb-16 px-[2vmax]" key={i} id={c.id}>
          {c.nameSrc && (
            <div className="flex items-center gap-4 lowercase mb-4">
              <img
                className="h-8 select-none pointer-events-none"
                draggable="false"
                src={c.nameSrc}
                alt={c.name}
              />
              <span>
                С {c.timeFrom} до {c.timeTo}
              </span>
            </div>
          )}
          <div
            className="grid gap-[2vmax] grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            key={i}
          >
            {c.items.map((item: any) => (
              <div className="leading-4" key={item.id}>
                <Link href={`order/${item.id}`}>
                  <img
                    className="aspect-square mb-4 w-full border border-black/25 object-cover object-center"
                    src={item.img}
                    alt={item.name}
                  />
                </Link>
                <div className="flex flex-col md:flex-row gap-x-4 gap-y-2 items-stretch justify-between pr-2">
                  <Link className="block" href={`order/${item.id}`}>
                    <h3 className="font-bold lowercase">{item.name}</h3>
                    <p>{item.description}</p>
                  </Link>

                  <div className="flex justify-between md:flex-col items-end gap-2">
                    <p className="text-nowrap whitespace-nowrap">
                      {item.price} ₽
                    </p>
                    <BasketIcon className="h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mb-16">
        <div className="flex items-center gap-4 lowercase mb-4 px-[2vmax]">
          <img
            className="h-8 select-none pointer-events-none"
            draggable="false"
            src="/karta-vin.svg"
            alt="Карта вин"
          />
        </div>

        <div className="flex flex-col gap-8">
          {vines?.map((type) => (
            <Vines {...type} key={type.id} />
          ))}
        </div>
      </div>

      <div className="grow"></div>
      <div className="p-[2vmax]">
        <Footer withTree />
      </div>
    </div>
  );
}
