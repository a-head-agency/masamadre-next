import Footer from "@/components/footer";
import Button from "@/components/ui/button";
import TextField from "@/components/ui/TextField";

export default function Work() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="grow flex items-center px-[2vmax] py-8">
        <div className="hidden sm:block grow-[3]"></div>
        <div className="w-full sm:max-w-sm flex flex-col gap-4 sm:gap-12">
          <TextField placeholder="имя" />
          <TextField placeholder="телефон" />
          <TextField placeholder="email" />
          <TextField placeholder="text here" />
          <div className="contents sm:block">
            <Button>отправить заявку</Button>
          </div>
        </div>
        <div className="hidden sm:block grow-[1]"></div>
      </div>
      <div className="px-[2vmax] pb-[2vmax] pt-32">
        <Footer withTree withPhone />
      </div>
    </div>
  );
}
