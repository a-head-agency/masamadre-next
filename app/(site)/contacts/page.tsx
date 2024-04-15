import Footer from "@/components/footer";

export default function Contacts() {
  return (
    <div>
      <div className="flex gap-4 p-[2vmax] items-start lg:items-end mb-32 flex-col lg:flex-row ">
        <img src="/map.png" className="h-[70vmin]" alt="" />
        <div>
          <p>адрес:</p>
          <p className="underline mb-8">г. Москва,ул.Солянка,1/2с1</p>

          <p>телефон:</p>
          <p className="underline mb-8">+7 999 346 57 74</p>

          <p>график работы:</p>
          <p className="underline">с 8:00 до 18:00 / ежедневно</p>
        </div>
      </div>

      <Footer withTree />
    </div>
  );
}
