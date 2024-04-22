"use client";

import Footer from "@/components/footer";

export default function Contacts() {
  return (
    <div className="flex flex-col items-stretch min-h-full">
      <div className="flex gap-4 p-[2vmax] items-start lg:items-end flex-col lg:flex-row grow mb-24">
        <div className="self-stretch md:basis-3/5 max-md:aspect-[4/3]">
          <div className="relative overflow-hidden h-full w-full">
            <a
              href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps"
              className="text-[#eeeeee] text-[12px] absolute top-[0px]"
            >
              Москва
            </a>
            <a
              href="https://yandex.ru/maps/213/moscow/?ll=37.637524%2C55.754031&mode=routes&rtext=~55.754031%2C37.637524&rtt=auto&ruri=~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NjcxNDg5NBI90KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINGD0LvQuNGG0LAg0KHQvtC70Y_QvdC60LAsIDEvMtGBMSIKDdOMFkIVIQRfQg%2C%2C&utm_campaign=desktop&utm_medium=mapframe&utm_source=maps&z=17.53"
              className="text-[#eeeeee] text-[12px] absolute top-[14px]"
            >
              Яндекс Карты
            </a>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.637524%2C55.754031&mode=routes&rtext=~55.754031%2C37.637524&rtt=auto&ruri=~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NjcxNDg5NBI90KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINGD0LvQuNGG0LAg0KHQvtC70Y_QvdC60LAsIDEvMtGBMSIKDdOMFkIVIQRfQg%2C%2C&utm_campaign=desktop&utm_medium=search&utm_source=maps&z=17.53"
              allowFullScreen
              className="relative w-full h-full"
            ></iframe>
          </div>
        </div>
        <div>
          <p>адрес:</p>
          <p className="underline mb-8">г. Москва,ул.Солянка,1/2с1</p>

          <p>телефон:</p>
          <a className="underline mb-8 inline-block" href="tel:+74956362981">
            +7 495 636 29 81
          </a>

          <p>график работы:</p>
          <p className="underline">с 8:00 до 19:00 / ежедневно</p>
        </div>
      </div>

      <div className="px-[2vmax] pb-[2vmax]">
        <Footer withTree />
      </div>
    </div>
  );
}
