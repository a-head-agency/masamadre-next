"use client";

import { GetUserMeSchemeType } from "@/data/user";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

export default function Bonuses() {
  const { data } = useSWR<GetUserMeSchemeType>("/api/user/me", fetcher);

  return (
    <main className="py-4 px-[2vmax] md:pt-32 flex flex-col w-full md:flex-row gap-4 md:gap-24 max-w-4xl">
      <div>
        <div className="px-4 md:px-0">
          <div className="relative w-[26rem] max-w-full rounded-3xl overflow-hidden aspect-[16/10]">
            <img
              className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none"
              draggable="false"
              src={"/card-bg.png"}
              alt=""
            />
            <div className="absolute top-0 left-0 h-full px-6 py-3 leading-none w-full bg-black/10">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white leading-none">
                  {data?.bonuses ?? 0} р
                </span>
                <img className="invert w-7/12" src="/logo.svg" alt="" />
              </div>
            </div>
          </div>
        </div>

        <p className="px-2 mt-1">краткие условия бонусной программы*</p>
      </div>
    </main>
  );
}
