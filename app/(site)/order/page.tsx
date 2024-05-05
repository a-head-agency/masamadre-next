import Footer from "@/components/footer";
import Link from "next/link";
import { getDishes } from "@/data/products";
import AddToBasketButton from "./_widgets/add-to-basket-button";
import SliderView from "./_widgets/slider-view";
import ScrollTopButton from "./_widgets/scroll-top-button";

interface TableViewProps {
  category: {
    name: string;
    show_title?: boolean;
  };
  dishes: {
    id: number;
    name: string;
    price: number;
  }[];
}
function TableView(props: TableViewProps) {
  return (
    <div>
      {props.category.name && props.category.show_title && (
        <div className="flex items-center gap-4 lowercase mb-4">
          <h2 className="text-3xl font-display">{props.category.name}</h2>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="text-lg w-full md:max-w-[66%]">
          <thead>
            <tr className="*:text-start *:pb-10 *:px-2 *:font-normal">
              <th className="w-0: md:w-1/12 !p-0"></th>
              <th className="">Название</th>
              <th>Цена</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.dishes.map((d) => (
              <tr className="*:pb-10 *:px-2 odd:bg-[#F5F5F5]" key={d.id}>
                <td className="w-0 md:w-1/12 !p-0"></td>
                <td>{d.name}</td>
                <td className="whitespace-nowrap">{d.price} ₽</td>
                <td className="text-end align-bottom !pb-3 pr-3">
                  <div className="inline-block">
                    <AddToBasketButton dish_id={d.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface GridViewProps {
  category: {
    name: string;
    show_title?: boolean;
  };
  dishes: {
    id: number;
    img: string;
    name: string;
    short_description?: string;
    price: number;
  }[];
}
function GridView(props: GridViewProps) {
  return (
    <div>
      {props.category.name && props.category.show_title && (
        <div className="flex items-center gap-4 lowercase mb-4">
          <h2 className="text-3xl font-display">{props.category.name}</h2>
        </div>
      )}
      <div className="grid gap-[2vmax] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {props.dishes.map((item) => (
          <div className="leading-4 flex flex-col items-stretch" key={item.id}>
            <Link href={`order/${item.id}`}>
              <img
                className="aspect-square mb-4 w-full border border-black/25 object-cover object-center"
                src={item.img}
                alt={item.name}
              />
            </Link>
            <div className="flex flex-col grow md:flex-row gap-x-4 gap-y-2 items-stretch justify-between pr-2">
              <Link className="block" href={`order/${item.id}`}>
                <h3 className="font-bold lowercase">{item.name}</h3>
                <p>{item.short_description}</p>
              </Link>

              <div className="flex justify-between md:flex-col items-end gap-2">
                <p className="text-nowrap whitespace-nowrap">{item.price} ₽</p>
                <AddToBasketButton dish_id={item.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Order() {
  const categoriesWithDishes = await getDishes();

  return (
    <div className="min-h-full flex flex-col">
      <ScrollTopButton />
      <div className="px-[2vmax] py-4 flex flex-col lowercase items-start">
        {categoriesWithDishes.map((dc) => (
          <Link
            key={dc.category.id}
            className="w-fit lowercase"
            href={"#" + dc.category.link}
          >
            {dc.category.name}
          </Link>
        ))}
      </div>
      {categoriesWithDishes.map((dc, i) => (
        <div className="mb-16 px-[2vmax]" key={i} id={dc.category.link}>
          {dc.category.type === "column_list" && (
            <TableView category={dc.category} dishes={dc.dishes} />
          )}
          {dc.category.type === "grid" && (
            <GridView category={dc.category} dishes={dc.dishes} />
          )}
          {dc.category.type === "slider" && (
            <SliderView dishes={dc.dishes} category={dc.category} />
          )}
        </div>
      ))}

      {/* <div className="mb-16">
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
      </div> */}

      <div className="grow"></div>
      <div className="p-[2vmax]">
        <Footer withTree />
      </div>
    </div>
  );
}
