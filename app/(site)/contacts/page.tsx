"use client";

import Footer from "@/components/footer";

import dynamic from "next/dynamic";

const MyMap = dynamic(() => import("./_widgets/map"), {
  ssr: false,
});

export default function Contacts() {
  // console.log(ymaps3)
  return (
    <div className="flex flex-col items-stretch min-h-full">
      <div className="flex gap-4 p-[2vmax] items-start lg:items-end flex-col lg:flex-row grow mb-24">
        {/*  */}
        <div className="self-stretch md:basis-3/5 max-md:aspect-[4/3]">
          <MyMap
            coordinates={{
              lat: 55.754031,
              lng: 37.637524,
            }}
          />
        </div>
        <div>
          <p>адрес:</p>
          <p className="underline mb-8">г. Москва,ул.Солянка,1/2с1</p>

          <p>телефон:</p>
          <a className="underline mb-8 inline-block" href="tel:+74956362981">
            +7 495 636 29 81
          </a>

          <p>график работы:</p>
          <p className="underline">с 8:00 до 18:00 / ежедневно</p>
        </div>
      </div>

      <div className="px-[2vmax] pb-[2vmax]">
        <Footer withTree />
      </div>
    </div>
  );
}
