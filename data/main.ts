import { createPublicApiAxios } from "@/axios";
import { z } from "zod";

const CommonDataScheme = z.object({
  phone: z.string(),
});

export async function getCommonData() {
  const api = createPublicApiAxios();

  const response = await api.get("/api/info");

  const data = CommonDataScheme.parse(response.data)

  return data;
}
