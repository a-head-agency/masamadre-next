import { redirect } from "next/navigation";

export default function TakeawaysNotAvailable() {
  if (process.env.FEATURE_TAKEAWAYS !== "off") {
    redirect(process.env.NEXT_PUBLIC_URL!);
  }

  return (
    <div className="min-h-svh flex flex-col items-center select-none p-8">
      <img className="h-6" src="/logo.svg" alt="masa madre logo" />
      <div className="grow"></div>
      <strong>Самовывоз пока не доступен</strong>
      <div className="grow"></div>
    </div>
  );
}
